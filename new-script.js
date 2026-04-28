// =========================
// Mobile Nav
// =========================
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    navToggle.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      navToggle.classList.remove("active");
    });
  });
}

// =========================
// Typing Hero Text
// =========================
const typingText = document.getElementById("typingText");

if (typingText) {
  const phrase = "Building intelligent software with data, AI, and scale.";
  let index = 0;
  let isDeleting = false;

  function typeLoop() {
    if (!isDeleting) {
      typingText.textContent = phrase.slice(0, index + 1);
      index++;

      if (index === phrase.length) {
        setTimeout(() => {
          isDeleting = true;
          typeLoop();
        }, 1600);
        return;
      }
    } else {
      typingText.textContent = phrase.slice(0, index - 1);
      index--;

      if (index === 0) {
        isDeleting = false;
      }
    }

    const speed = isDeleting ? 34 : 54;
    setTimeout(typeLoop, speed);
  }

  typeLoop();
}

// =========================
// Three.js Lava Shader Cube Graphic
// =========================
const canvas = document.getElementById("three-bg");

if (canvas && window.THREE) {
  const scene = new THREE.Scene();

  const isMobile = window.innerWidth < 768;

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.set(0, 0, 8);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));

  // -------------------------
  // Procedural Lava Shader
  // No external texture files needed
  // -------------------------
  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;

    void main() {
      vUv = uv;
      vPosition = position;
      vNormal = normal;

      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    uniform float time;
    uniform vec2 resolution;

    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);

      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));

      vec2 u = f * f * (3.0 - 2.0 * f);

      return mix(a, b, u.x)
        + (c - a) * u.y * (1.0 - u.x)
        + (d - b) * u.x * u.y;
    }

    float fbm(vec2 p) {
      float value = 0.0;
      float amplitude = 0.5;

      for (int i = 0; i < 6; i++) {
        value += amplitude * noise(p);
        p *= 2.0;
        amplitude *= 0.5;
      }

      return value;
    }

    void main() {
      vec2 uv = vUv;

      vec2 movingUv1 = uv * 3.2 + vec2(time * 0.12, -time * 0.08);
      vec2 movingUv2 = uv * 6.0 + vec2(-time * 0.05, time * 0.16);

      float lava = fbm(movingUv1);
      float veins = fbm(movingUv2);

      float pattern = smoothstep(0.35, 1.0, lava + veins * 0.55);

      vec3 deep = vec3(0.015, 0.018, 0.055);
      vec3 purple = vec3(0.35, 0.10, 0.75);
      vec3 cyan = vec3(0.00, 0.78, 1.00);
      vec3 hot = vec3(1.00, 0.24, 0.05);
      vec3 gold = vec3(1.00, 0.72, 0.12);

      vec3 color = mix(deep, purple, pattern);
      color = mix(color, cyan, smoothstep(0.45, 0.82, veins));
      color = mix(color, hot, smoothstep(0.72, 1.0, pattern));
      color = mix(color, gold, smoothstep(0.84, 1.0, lava));

      float rim = 1.0 - max(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 0.0);
      rim = pow(rim, 2.0);

      color += rim * vec3(0.15, 0.75, 1.0);

      float glow = smoothstep(0.62, 1.0, pattern);
      color += glow * vec3(0.65, 0.18, 0.95);

      gl_FragColor = vec4(color, 0.88);
    }
  `;

  const lavaUniforms = {
    time: { value: 0 },
    resolution: {
      value: new THREE.Vector2(window.innerWidth, window.innerHeight)
    }
  };

  const lavaMaterial = new THREE.ShaderMaterial({
    uniforms: lavaUniforms,
    vertexShader,
    fragmentShader,
    transparent: true
  });

  // -------------------------
  // Equal-sided cube object
  // 6 sides, mapped to 6 sections
  // -------------------------
  const cubeGroup = new THREE.Group();
  cubeGroup.position.set(isMobile ? 0 : 3.35, isMobile ? -0.2 : 0.1, -0.5);
  scene.add(cubeGroup);

  const cubeSize = isMobile ? 2.1 : 2.55;

  const lavaCube = new THREE.Mesh(
    new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize, 40, 40, 40),
    lavaMaterial
  );

  cubeGroup.add(lavaCube);

  // Outer glowing wireframe
  const edgeMaterial = new THREE.LineBasicMaterial({
    color: 0x67e8f9,
    transparent: true,
    opacity: 0.42
  });

  const edgeLines = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(cubeSize * 1.03, cubeSize * 1.03, cubeSize * 1.03)),
    edgeMaterial
  );

  cubeGroup.add(edgeLines);

  // Inner smaller cube
  const innerMaterial = new THREE.MeshBasicMaterial({
    color: 0xa855f7,
    wireframe: true,
    transparent: true,
    opacity: 0.32
  });

  const innerCube = new THREE.Mesh(
    new THREE.BoxGeometry(cubeSize * 0.58, cubeSize * 0.58, cubeSize * 0.58),
    innerMaterial
  );

  cubeGroup.add(innerCube);

  // Orbital rings around cube
  const rings = [];

  function addRing(radius, color, opacity, rotation) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(radius, 0.012, 16, 180),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity
      })
    );

    ring.rotation.set(rotation.x, rotation.y, rotation.z);
    cubeGroup.add(ring);
    rings.push(ring);
  }

  addRing(cubeSize * 0.92, 0x38bdf8, 0.32, { x: 1.1, y: 0.2, z: 0.0 });
  addRing(cubeSize * 1.08, 0xa855f7, 0.24, { x: 0.2, y: 1.15, z: 0.7 });
  addRing(cubeSize * 1.22, 0x22d3ee, 0.18, { x: 0.85, y: 0.65, z: 0.3 });

  // -------------------------
  // Particles
  // -------------------------
  function createParticles(count, spread, color, size, opacity) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * spread;
      positions[i + 1] = (Math.random() - 0.5) * spread * 0.72;
      positions[i + 2] = (Math.random() - 0.5) * spread;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color,
      size,
      transparent: true,
      opacity,
      depthWrite: false
    });

    return new THREE.Points(geometry, material);
  }

  const starfieldBack = createParticles(
    isMobile ? 500 : 950,
    42,
    0xffffff,
    0.018,
    0.38
  );

  const starfieldFront = createParticles(
    isMobile ? 220 : 420,
    24,
    0x7dd3fc,
    0.028,
    0.44
  );

  scene.add(starfieldBack);
  scene.add(starfieldFront);

  // -------------------------
  // Lighting
  // -------------------------
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const cyanLight = new THREE.PointLight(0x38bdf8, 2.6, 50);
  cyanLight.position.set(5, 4, 7);
  scene.add(cyanLight);

  const purpleLight = new THREE.PointLight(0xa855f7, 2.2, 50);
  purpleLight.position.set(-5, -3, 6);
  scene.add(purpleLight);

  const hotLight = new THREE.PointLight(0xff6b00, 1.6, 40);
  hotLight.position.set(0, 3, 4);
  scene.add(hotLight);

  // -------------------------
  // Section-based rotation
  // Cube has 6 faces, mapped to 6 sections
  // -------------------------
  const sectionIds = ["home", "about", "experience", "projects", "skills", "education"];

  const sectionRotations = {
    home:       { x: -0.42, y:  0.58, z:  0.00 },
    about:      { x:  0.22, y:  1.57, z:  0.00 },
    experience: { x: -0.18, y:  3.14, z:  0.00 },
    projects:   { x:  0.18, y:  4.71, z:  0.00 },
    skills:     { x: -1.57, y:  4.71, z:  0.10 },
    education:  { x:  1.57, y:  3.14, z: -0.10 }
  };

  let activeSection = "home";

  const targetRotation = {
    x: sectionRotations.home.x,
    y: sectionRotations.home.y,
    z: sectionRotations.home.z
  };

  function updateActiveSection() {
    const triggerLine = window.scrollY + window.innerHeight * 0.38;

    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const section = document.getElementById(sectionIds[i]);
      if (!section) continue;

      if (section.offsetTop <= triggerLine) {
        activeSection = sectionIds[i];
        break;
      }
    }

    const next = sectionRotations[activeSection];

    targetRotation.x = next.x;
    targetRotation.y = next.y;
    targetRotation.z = next.z;
  }

  window.addEventListener("scroll", updateActiveSection);
  updateActiveSection();

  // -------------------------
  // Mouse interaction
  // -------------------------
  const mouse = { x: 0, y: 0 };
  const smoothMouse = { x: 0, y: 0 };

  window.addEventListener("mousemove", (event) => {
    mouse.x = (event.clientX / window.innerWidth - 0.5) * 2;
    mouse.y = (event.clientY / window.innerHeight - 0.5) * 2;
  });

  // -------------------------
  // Resize
  // -------------------------
  function handleResize() {
    const mobileNow = window.innerWidth < 768;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobileNow ? 1.5 : 2));

    lavaUniforms.resolution.value.set(window.innerWidth, window.innerHeight);

    cubeGroup.position.x = mobileNow ? 0 : 3.35;
    cubeGroup.position.y = mobileNow ? -0.2 : 0.1;
    cubeGroup.position.z = -0.5;
  }

  window.addEventListener("resize", handleResize);

  // -------------------------
  // Animation
  // -------------------------
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsed = clock.getElapsedTime();

    lavaUniforms.time.value = elapsed;

    smoothMouse.x += (mouse.x - smoothMouse.x) * 0.045;
    smoothMouse.y += (mouse.y - smoothMouse.y) * 0.045;

    cubeGroup.rotation.x += (targetRotation.x - cubeGroup.rotation.x) * 0.055;
    cubeGroup.rotation.y += (targetRotation.y - cubeGroup.rotation.y) * 0.055;
    cubeGroup.rotation.z += (targetRotation.z - cubeGroup.rotation.z) * 0.055;

    cubeGroup.position.x = (isMobile ? 0 : 3.35) + smoothMouse.x * 0.22;
    cubeGroup.position.y = (isMobile ? -0.2 : 0.1) - smoothMouse.y * 0.12 + Math.sin(elapsed * 1.25) * 0.08;

    lavaCube.rotation.x += 0.0015;
    lavaCube.rotation.y += 0.0018;

    innerCube.rotation.x -= 0.006;
    innerCube.rotation.y += 0.008;

    edgeLines.rotation.x += 0.0012;
    edgeLines.rotation.y -= 0.0014;

    rings.forEach((ring, index) => {
      ring.rotation.z += 0.002 + index * 0.0008;
      ring.rotation.x += 0.0008;
    });

    starfieldBack.rotation.y += 0.0002;
    starfieldFront.rotation.y -= 0.00042;

    starfieldFront.position.x = smoothMouse.x * 0.16;
    starfieldFront.position.y = -smoothMouse.y * 0.1;

    cyanLight.position.x = 5 + smoothMouse.x * 1.6;
    cyanLight.position.y = 4 - smoothMouse.y * 1.1;

    purpleLight.position.x = -5 - smoothMouse.x * 1.4;
    purpleLight.position.y = -3 + smoothMouse.y * 1.0;

    camera.position.x += (smoothMouse.x * 0.1 - camera.position.x) * 0.035;
    camera.position.y += (-smoothMouse.y * 0.08 - camera.position.y) * 0.035;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  animate();
}
