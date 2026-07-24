import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function BulbIntro({ onEnter }) {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState('idle'); // idle | flicker | lit
  const pulledRef = useRef(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const W = window.innerWidth;
    const H = window.innerHeight;

    // ── SCENE ────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020203);

    const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 100);
    camera.position.set(0, -0.8, 8.5);
    camera.lookAt(0, -0.8, 0);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    } catch (err) {
      // WebGL unavailable — skip the intro entirely and go straight to the site
      // so the visitor isn't stranded on a blank overlay.
      console.warn('BulbIntro: WebGL unavailable — skipping intro.', err);
      onEnter();
      return;
    }
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // ── LIGHTS ───────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0x0a0502, 0.4);
    scene.add(ambient);

    const rimLeft = new THREE.PointLight(0xffb83d, 1.0, 12);
    rimLeft.position.set(-3.5, 1, 1);
    scene.add(rimLeft);

    const rimRight = new THREE.PointLight(0xffedd0, 0.8, 10);
    rimRight.position.set(3.5, -2, 1);
    scene.add(rimRight);

    // Spotlight pointing at back wall to reveal text
    const spotReveal = new THREE.SpotLight(0xffedd0, 18, 16, Math.PI * 0.18, 0.6, 1.5);
    spotReveal.position.set(0, 0, 1);
    scene.add(spotReveal);

    const spotTarget = new THREE.Object3D();
    scene.add(spotTarget);
    spotReveal.target = spotTarget;

    const mainBurstLight = new THREE.PointLight(0xf5a623, 0, 20);
    scene.add(mainBurstLight);

    // ── BACK WALL TEXT REVEAL ──
    const wallGeo = new THREE.PlaneGeometry(16, 12);
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x050508,
      roughness: 0.85,
      metalness: 0.1,
    });
    const backWall = new THREE.Mesh(wallGeo, wallMat);
    backWall.position.set(0, -0.8, -1.8);
    scene.add(backWall);

    // ── BULB SHAPE ───────────────────────────────────────
    const pts = [];
    for (let i = 0; i <= 32; i++) {
      const a = (i / 32) * 2.28;
      pts.push(new THREE.Vector2(Math.sin(a) * 1.05, Math.cos(a) * 1.05));
    }
    pts.push(new THREE.Vector2(0.48, -1.05), new THREE.Vector2(0.44, -1.3));
    for (let j = 0; j < 5; j++) {
      const yy = -1.3 - j * 0.1;
      pts.push(new THREE.Vector2(0.40, yy));
      pts.push(new THREE.Vector2(0.43, yy - 0.05));
    }
    pts.push(new THREE.Vector2(0.22, -1.82));
    pts.push(new THREE.Vector2(0.0,  -1.92));

    const latheGeo = new THREE.LatheGeometry(pts, 40);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xf8e8a0,
      emissive: 0x1f0f02,
      emissiveIntensity: 0.3,
      metalness: 0.0,
      roughness: 0.05,
      transmission: 0.75,
      ior: 1.5,
      thickness: 0.8,
      specularIntensity: 2.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      transparent: true,
      opacity: 1.0,
    });
    const bulbMesh = new THREE.Mesh(latheGeo, glassMat);

    // Filament
    const filPts = [];
    for (let i = 0; i < 22; i++) {
      const t = i / 21, a = t * Math.PI * 4.5, r = 0.15 * (1 - t * 0.4);
      filPts.push(new THREE.Vector3(Math.cos(a) * r, -0.38 + t * 0.72, Math.sin(a) * r));
    }
    const filCurve = new THREE.CatmullRomCurve3(filPts);
    const filGeo = new THREE.TubeGeometry(filCurve, 48, 0.02, 8);
    const filMat = new THREE.MeshBasicMaterial({ color: 0xbb7722 });
    const filament = new THREE.Mesh(filGeo, filMat);

    // Threads
    const threadGeo = new THREE.TorusGeometry(0.39, 0.045, 8, 32);
    const threadMat = new THREE.MeshStandardMaterial({ color: 0x181818, metalness: 0.95, roughness: 0.2 });
    const threads = [];
    for (let j = 0; j < 5; j++) {
      const t = new THREE.Mesh(threadGeo, threadMat);
      t.position.y = -1.3 - j * 0.1;
      t.rotation.x = Math.PI / 2;
      threads.push(t);
    }

    // Create a wrapper for just the bulb components to rotate them 180 degrees so socket is on top
    const rotatedBulb = new THREE.Group();
    rotatedBulb.add(bulbMesh, filament, ...threads);
    // Rotate 180 degrees around X/Z so threads are at the top (facing y > 0)
    rotatedBulb.rotation.x = Math.PI;
    // Offset the rotated bulb so the socket top (now at y ~ 1.3) aligns perfectly at (0, -1.8, 0)
    rotatedBulb.position.y = -1.8;

    // Pendulum Group contains bulb and hangs from the ceiling pivot point (0, 3.2, 0)
    const pendulumGroup = new THREE.Group();
    pendulumGroup.position.set(0, 3.2, 0);

    // Inner nested group offsets the bulb down along Y, representing the string length
    const bulbWrapper = new THREE.Group();
    bulbWrapper.position.set(0, -1.4, 0); // hangs down from pivot
    bulbWrapper.add(rotatedBulb);

    // Add bulb wrapper to the main pendulum group
    pendulumGroup.add(bulbWrapper);
    scene.add(pendulumGroup);

    // Thin single pendulum line from the pivot (0,0) down to the bulb top
    const stringGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, -3.2, 0) // string connects to top of bulb socket at the bottom of string length
    ]);
    const stringMat = new THREE.LineBasicMaterial({ color: 0x6e481f, linewidth: 2 });
    const pendulumString = new THREE.Line(stringGeo, stringMat);
    pendulumGroup.add(pendulumString);

    // ── CLICK TO TRIGGER LIGHT/ENTER ────────────────────
    const triggerPull = () => {
      if (pulledRef.current) return;
      pulledRef.current = true;
      setPhase('flicker');

      let count = 0;
      const iv = setInterval(() => {
        const on = Math.random() > 0.35;
        filMat.color.setHex(on ? 0xffdd44 : 0x221100);
        glassMat.emissiveIntensity = on ? 1.2 : 0.15;
        spotReveal.intensity = on ? 40 : 2;
        mainBurstLight.intensity = on ? 15 : 0;
        count++;
        if (count > 20) {
          clearInterval(iv);
          filMat.color.setHex(0xffee80);
          glassMat.emissive.setHex(0x553300);
          glassMat.emissiveIntensity = 1.5;
          glassMat.transmission = 0.2;
          spotReveal.intensity = 60;
          mainBurstLight.intensity = 20;
          setPhase('lit');
          setTimeout(() => onEnter(), 1000);
        }
      }, 50);
    };

    // Raycaster to detect click specifically on the bulb
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (e) => {
      if (pulledRef.current) return;
      mouse.x = (e.clientX / W) * 2 - 1;
      mouse.y = -(e.clientY / H) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects([bulbMesh], true);
      if (intersects.length > 0) {
        triggerPull();
      }
    };

    window.addEventListener('click', handleClick);

    // ── RESIZE ───────────────────────────────────────────
    const onResize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize, { passive: true });

    // ── ANIMATION LOOP ────────────────────────────────────
    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = Date.now() * 0.0012;

      // Pure trigonometric mathematical pendulum swing (no physics tilt or local rotation bugs)
      // Swings left and right like a clean After Effects animation anchor
      const maxAngle = 0.65; // swing angle in radians
      const angle = Math.sin(t * 2.8) * maxAngle;
      pendulumGroup.rotation.z = angle;

      // Get world position of the bulb to update lights and targets
      const bulbWorldPos = new THREE.Vector3();
      bulbMesh.getWorldPosition(bulbWorldPos);

      // Spotlight originates from the bulb center
      spotReveal.position.copy(bulbWorldPos);
      
      // Spotlight projects onto back wall
      spotTarget.position.set(bulbWorldPos.x * 2.2, bulbWorldPos.y - 0.5, -1.8);

      mainBurstLight.position.copy(bulbWorldPos);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', onResize);
      // Free GPU resources and the WebGL context once the intro is gone.
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
    <div
      className={`bulb-intro ${phase === 'lit' ? 'lit' : ''}`}
      style={{ cursor: phase === 'idle' ? 'pointer' : 'default' }}
    >
      <canvas className="bulb-intro-canvas" ref={canvasRef} />

      {phase === 'idle' && (
        <div style={{
          position: 'absolute',
          top: '55%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: "'Syne', sans-serif",
          fontSize: 'clamp(56px, 12vw, 150px)',
          fontWeight: 800,
          color: 'var(--amber)',
          mixBlendMode: 'color-dodge',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0.9,
          textAlign: 'center',
          userSelect: 'none',
        }}>
          BiC
        </div>
      )}

      {phase === 'idle' && (
        <div style={{
          position: 'absolute', bottom: '8%', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
          pointerEvents: 'none', zIndex: 10,
        }}>
          <div style={{
            fontFamily: "'DM Mono', monospace", fontSize: 11,
            letterSpacing: '0.28em', textTransform: 'uppercase',
            color: 'rgba(245,166,35,0.85)',
            animation: 'pulseHint 1.8s ease-in-out infinite',
          }}>
            Click the bulb to turn on the light
          </div>
          <div style={{
            width: 1, height: 48,
            background: 'linear-gradient(to bottom, rgba(245,166,35,0.6), transparent)',
          }} />
        </div>
      )}

      <div className={`flicker-overlay ${phase === 'flicker' ? 'active' : ''}`} />
    </div>
  );
}
