import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ onNavigate }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const W = window.innerWidth, H = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.set(0, 0, 7);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
    } catch (err) {
      // WebGL unavailable (hardware acceleration off, locked-down or in-app browser).
      // Skip the 3D scene; the static hero content stays visible.
      console.warn('Hero: WebGL unavailable — showing static hero.', err);
      return;
    }
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    scene.add(new THREE.AmbientLight(0x221508, 2));

    const amberKey = new THREE.PointLight(0xf5a623, 6, 20);
    amberKey.position.set(-3, 4, 3);
    scene.add(amberKey);

    const fillLight = new THREE.PointLight(0x8b5cf6, 3, 15);
    fillLight.position.set(4, -2, 2);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0x00e8f0, 2, 12);
    rimLight.position.set(0, -3, -4);
    scene.add(rimLight);

    const glow = new THREE.PointLight(0xffcc5c, 5, 6);
    glow.position.set(0, 0.1, 0);
    scene.add(glow);

    // Bulb
    const pts = [];
    for (let i = 0; i <= 30; i++) {
      const a = (i / 30) * 2.3;
      pts.push(new THREE.Vector2(Math.sin(a) * 1.05, Math.cos(a) * 1.05));
    }
    pts.push(new THREE.Vector2(0.45, -1.05), new THREE.Vector2(0.40, -1.3));
    for (let j = 0; j < 5; j++) {
      const yy = -1.3 - j * 0.09;
      pts.push(new THREE.Vector2(0.37, yy), new THREE.Vector2(0.40, yy - 0.04));
    }
    pts.push(new THREE.Vector2(0.2, -1.78), new THREE.Vector2(0.0, -1.88));

    const latheGeo = new THREE.LatheGeometry(pts, 40);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xfff4d6, metalness: 0.0, roughness: 0.04,
      transmission: 0.88, ior: 1.5, thickness: 1.2,
      specularIntensity: 1.4, clearcoat: 1.0, clearcoatRoughness: 0.06,
    });
    const bulbMesh = new THREE.Mesh(latheGeo, glassMat);

    const innerGeo = new THREE.SphereGeometry(0.72, 24, 24);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0xffdd66, transparent: true, opacity: 0.12 });
    const innerGlow = new THREE.Mesh(innerGeo, innerMat);
    innerGlow.position.y = 0.05;

    const filPts = [];
    for (let i = 0; i < 22; i++) {
      const t = i / 21, a = t * Math.PI * 4, r = 0.18 * (1 - t * 0.45);
      filPts.push(new THREE.Vector3(Math.cos(a) * r, -0.35 + t * 0.7, Math.sin(a) * r));
    }
    const filCurve = new THREE.CatmullRomCurve3(filPts);
    const filGeo = new THREE.TubeGeometry(filCurve, 48, 0.022, 8);
    const filMat = new THREE.MeshBasicMaterial({ color: 0xffcc44 });
    const filament = new THREE.Mesh(filGeo, filMat);

    const threadGeo = new THREE.TorusGeometry(0.38, 0.045, 8, 32);
    const threadMat = new THREE.MeshStandardMaterial({ color: 0x1e1e1e, metalness: 0.95, roughness: 0.2 });
    const threadGroup = new THREE.Group();
    for (let j = 0; j < 5; j++) {
      const t = new THREE.Mesh(threadGeo, threadMat);
      t.position.y = -1.32 - j * 0.09; t.rotation.x = Math.PI / 2;
      threadGroup.add(t);
    }

    const bulbGroup = new THREE.Group();
    bulbGroup.add(bulbMesh, innerGlow, filament, threadGroup);
    scene.add(bulbGroup);

    // Orbiting halos
    const rings = [
      { r: 1.9, tube: 0.011, rot: [0.4, 0, 0], speed: 0.003, color: 0xf5a623, op: 0.5 },
      { r: 2.4, tube: 0.007, rot: [0, 0.5, 0.3], speed: -0.002, color: 0x8b5cf6, op: 0.4 },
      { r: 2.9, tube: 0.005, rot: [0.8, 0.2, 0], speed: 0.0015, color: 0x00e8f0, op: 0.3 },
    ].map(d => {
      const geo = new THREE.TorusGeometry(d.r, d.tube, 8, 80);
      const mat = new THREE.MeshBasicMaterial({ color: d.color, transparent: true, opacity: d.op });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.set(...d.rot);
      scene.add(mesh);
      return { mesh, speed: d.speed };
    });

    // Particles
    const pCount = 200;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      const phi = Math.acos(2 * Math.random() - 1), theta = Math.random() * 2 * Math.PI;
      const r = 2.5 + Math.random() * 3.5;
      pPos[i] = r * Math.sin(phi) * Math.cos(theta);
      pPos[i+1] = r * Math.sin(phi) * Math.sin(theta);
      pPos[i+2] = r * Math.cos(phi);
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0xf5a623, size: 0.04, transparent: true, opacity: 0.5 });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    let targetRotX = 0, targetRotY = 0, curRotX = 0, curRotY = 0;
    const onMouseMove = (e) => {
      targetRotY = ((e.clientX / W) - 0.5) * 0.9;
      targetRotX = ((e.clientY / H) - 0.5) * -0.5;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const onResize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize, { passive: true });

    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = Date.now() * 0.001;
      curRotX += (targetRotX - curRotX) * 0.05;
      curRotY += (targetRotY - curRotY) * 0.05;
      bulbGroup.rotation.y = curRotY + Math.sin(t * 0.4) * 0.08;
      bulbGroup.rotation.x = curRotX + Math.sin(t * 0.3) * 0.05;
      bulbGroup.position.y = Math.sin(t * 0.6) * 0.12;
      const pulse = 0.5 + Math.sin(t * 2.5) * 0.5;
      glow.intensity = 4 + pulse * 2.5;
      innerMat.opacity = 0.08 + pulse * 0.1;
      filMat.color.setHSL(0.11 + pulse * 0.04, 1, 0.5 + pulse * 0.1);
      rings.forEach(({ mesh, speed }) => { mesh.rotation.z += speed; mesh.rotation.x += speed * 0.5; });
      particles.rotation.y += 0.0008;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      // Release GPU resources so repeated navigation doesn't leak memory
      // or exhaust the browser's WebGL context limit.
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
          materials.forEach((m) => {
            Object.values(m).forEach((v) => { if (v && v.isTexture) v.dispose(); });
            m.dispose();
          });
        }
      });
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, []);

  return (
    <section className="hero-stage">
      <div className="hero-canvas-container">
        <canvas className="hero-canvas" ref={canvasRef} />
      </div>
      <div className="hero-content">
        <p className="hero-eyebrow">VIT Chennai · EST. 2024</p>
        <h1 className="hero-title">BiC</h1>
        <p className="hero-subtitle">Business Innovation Community</p>
        <div className="hero-cta">
          <button className="btn btn-amber" onClick={() => onNavigate('defy')}>Explore DeFy ↗</button>
          <button className="btn btn-ghost" onClick={() => onNavigate('events')}>Upcoming Events</button>
        </div>
      </div>
      <div className="hero-scroll-hint">scroll</div>
    </section>
  );
}
