# BiC — Business Innovation Community (VIT Chennai)

An immersive 3D web experience built to showcase the **Business Innovation Community (BiC)** club at VIT Chennai .


---

## How to run on a completely new system

### 1. Prerequisites
Ensure you have **Node.js** (version 18 or higher recommended) installed on your system. You can check this by running:
```bash
node -v
```

### 2. Setup
1. Clone the repository and navigate to the project directory:
   ```bash
   git clone <repository-url>
   cd BIC-1
   ```
2. Install all the required packages (including Three.js, GSAP, Lenis, and physics engines):
   ```bash
   npm install
   ```

### 3. Running Locally
Start the local development server:
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

### 4. Build for Production
To generate a optimized production build in the `dist` folder:
```bash
npm run build
```
