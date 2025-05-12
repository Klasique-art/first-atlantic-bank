import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import router from 'next/navigation'

export default function FirstAtlanticBankCelebration() {
  const containerRef = useRef(null);
  const [animatingDoor, setAnimatingDoor] = useState(false);
  const [navigating, setNavigating] = useState(false);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const mixerRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());
  const animationsRef = useRef([]);
  const doorRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3;
    controls.maxDistance = 20;
    controls.maxPolarAngle = Math.PI / 2;
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Main color theme - purple
    const mainColor = new THREE.Color(0x8a2be2);
    
    // Bank building
    createBankBuilding(scene, mainColor);
    
    // Add congratulatory text
    createCongratulationsText(scene);
    
    // Add people
    createPeople(scene);
    
    // Add door with click event
    createInteractiveDoor(scene);

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      const delta = clockRef.current.getDelta();
      
      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }
      
      // Update all animations
      animationsRef.current.forEach(animation => {
        if (animation.update) animation.update(delta);
      });
      
      controls.update();
      renderer.render(scene, camera);
      
      if (!navigating) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Handle door click and navigation
  useEffect(() => {
    if (animatingDoor) {
      // Camera animation for door click
      const startPosition = new THREE.Vector3().copy(cameraRef.current.position);
      const targetPosition = new THREE.Vector3(doorRef.current.position.x, doorRef.current.position.y + 1, doorRef.current.position.z + 2);
      
      const startTime = Date.now();
      const duration = 2000; // 2 seconds animation
      
      const animateCameraMove = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease in-out function
        const eased = progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        // Update camera position
        cameraRef.current.position.lerpVectors(startPosition, targetPosition, eased);
        
        if (progress < 1) {
          requestAnimationFrame(animateCameraMove);
        } else {
          // Animation complete, navigate
          setAnimatingDoor(false);
          setNavigating(true);
          
          // Flash the screen white before navigation
          const originalColor = sceneRef.current.background.clone();
          sceneRef.current.background = new THREE.Color(0xffffff);
          rendererRef.current.render(sceneRef.current, cameraRef.current);
          
          setTimeout(() => {
            router.push('/office');
          }, 500);
        }
      };
      
      // Disable controls during animation
      controlsRef.current.enabled = false;
      animateCameraMove();
    }
  }, [animatingDoor]);

  function createBankBuilding(scene, mainColor) {
    // Floor
    const floorGeometry = new THREE.PlaneGeometry(30, 30);
    const floorMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffffff,
      roughness: 0.1
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);
    
    // Walls
    const wallMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xf5f5f5,
      roughness: 0.2
    });
    
    // Back wall
    const backWallGeometry = new THREE.BoxGeometry(30, 8, 0.3);
    const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
    backWall.position.set(0, 4, -15);
    backWall.castShadow = true;
    backWall.receiveShadow = true;
    scene.add(backWall);
    
    // Side walls
    const leftWallGeometry = new THREE.BoxGeometry(0.3, 8, 30);
    const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
    leftWall.position.set(-15, 4, 0);
    leftWall.castShadow = true;
    leftWall.receiveShadow = true;
    scene.add(leftWall);
    
    const rightWallGeometry = new THREE.BoxGeometry(0.3, 8, 30);
    const rightWall = new THREE.Mesh(rightWallGeometry, wallMaterial);
    rightWall.position.set(15, 4, 0);
    rightWall.castShadow = true;
    rightWall.receiveShadow = true;
    scene.add(rightWall);
    
    // Front wall with door gap
    const frontWallLeft = new THREE.Mesh(
      new THREE.BoxGeometry(12, 8, 0.3),
      wallMaterial
    );
    frontWallLeft.position.set(-9, 4, 15);
    frontWallLeft.castShadow = true;
    frontWallLeft.receiveShadow = true;
    scene.add(frontWallLeft);
    
    const frontWallRight = new THREE.Mesh(
      new THREE.BoxGeometry(12, 8, 0.3),
      wallMaterial
    );
    frontWallRight.position.set(9, 4, 15);
    frontWallRight.castShadow = true;
    frontWallRight.receiveShadow = true;
    scene.add(frontWallRight);
    
    const frontWallTop = new THREE.Mesh(
      new THREE.BoxGeometry(6, 3, 0.3),
      wallMaterial
    );
    frontWallTop.position.set(0, 6.5, 15);
    frontWallTop.castShadow = true;
    frontWallTop.receiveShadow = true;
    scene.add(frontWallTop);
    
    // Ceiling
    const ceilingGeometry = new THREE.PlaneGeometry(30, 30);
    const ceilingMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 8;
    ceiling.receiveShadow = true;
    scene.add(ceiling);
    
    // Counter
    const counterBaseGeometry = new THREE.BoxGeometry(20, 1, 3);
    const counterBaseMaterial = new THREE.MeshStandardMaterial({ 
      color: mainColor.clone().multiplyScalar(0.8).getHex(),
      roughness: 0.3
    });
    const counterBase = new THREE.Mesh(counterBaseGeometry, counterBaseMaterial);
    counterBase.position.set(0, 0.5, -5);
    counterBase.castShadow = true;
    counterBase.receiveShadow = true;
    scene.add(counterBase);
    
    const counterTopGeometry = new THREE.BoxGeometry(20, 0.2, 4);
    const counterTopMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.3
    });
    const counterTop = new THREE.Mesh(counterTopGeometry, counterTopMaterial);
    counterTop.position.set(0, 1.1, -5);
    counterTop.castShadow = true;
    counterTop.receiveShadow = true;
    scene.add(counterTop);
    
    // Counter dividers
    for (let i = -9; i <= 9; i += 3) {
      if (i !== 0) {
        const dividerGeometry = new THREE.BoxGeometry(0.1, 2, 3);
        const dividerMaterial = new THREE.MeshStandardMaterial({ 
          color: mainColor.clone().multiplyScalar(0.9).getHex()
        });
        const divider = new THREE.Mesh(dividerGeometry, dividerMaterial);
        divider.position.set(i, 2, -5);
        divider.castShadow = true;
        divider.receiveShadow = true;
        scene.add(divider);
      }
    }
    
    // ATMs on the wall
    for (let i = -10; i <= 10; i += 10) {
      const atmBaseGeometry = new THREE.BoxGeometry(3, 4, 0.5);
      const atmBaseMaterial = new THREE.MeshStandardMaterial({ 
        color: mainColor.clone().multiplyScalar(0.9).getHex()
      });
      const atmBase = new THREE.Mesh(atmBaseGeometry, atmBaseMaterial);
      atmBase.position.set(i, 3, -14.7);
      atmBase.castShadow = true;
      atmBase.receiveShadow = true;
      scene.add(atmBase);
      
      const atmScreenGeometry = new THREE.PlaneGeometry(2, 1.5);
      const atmScreenMaterial = new THREE.MeshBasicMaterial({ color: 0x222222 });
      const atmScreen = new THREE.Mesh(atmScreenGeometry, atmScreenMaterial);
      atmScreen.position.set(i, 3.5, -14.4);
      scene.add(atmScreen);
      
      const atmKeypadGeometry = new THREE.BoxGeometry(1.5, 1, 0.3);
      const atmKeypadMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
      const atmKeypad = new THREE.Mesh(atmKeypadGeometry, atmKeypadMaterial);
      atmKeypad.position.set(i, 2.2, -14.4);
      atmKeypad.castShadow = true;
      scene.add(atmKeypad);
    }
    
    // Waiting area
    const seatGeometry = new THREE.BoxGeometry(8, 0.5, 2);
    const seatMaterial = new THREE.MeshStandardMaterial({ 
      color: mainColor.clone().multiplyScalar(0.7).getHex() 
    });
    const seat = new THREE.Mesh(seatGeometry, seatMaterial);
    seat.position.set(-5, 0.25, 10);
    seat.castShadow = true;
    seat.receiveShadow = true;
    scene.add(seat);
    
    const seatBackGeometry = new THREE.BoxGeometry(8, 2, 0.3);
    const seatBack = new THREE.Mesh(seatBackGeometry, seatMaterial);
    seatBack.position.set(-5, 1.5, 9);
    seatBack.castShadow = true;
    seatBack.receiveShadow = true;
    scene.add(seatBack);
    
    // Plants
    for (let i = -12; i <= 12; i += 24) {
      const potGeometry = new THREE.CylinderGeometry(1, 0.8, 1.5, 16);
      const potMaterial = new THREE.MeshStandardMaterial({ 
        color: mainColor.clone().multiplyScalar(0.6).getHex()
      });
      const pot = new THREE.Mesh(potGeometry, potMaterial);
      pot.position.set(i, 0.75, 12);
      pot.castShadow = true;
      pot.receiveShadow = true;
      scene.add(pot);
      
      const plantGeometry = new THREE.SphereGeometry(1.2, 16, 16);
      const plantMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
      const plant = new THREE.Mesh(plantGeometry, plantMaterial);
      plant.position.set(i, 2.5, 12);
      plant.scale.y = 1.5;
      plant.castShadow = true;
      scene.add(plant);
    }
    
    // Digital screens on walls showing "Digital Bank of the Year"
    for (let i = -10; i <= 10; i += 10) {
      const screenFrameGeometry = new THREE.BoxGeometry(5, 3, 0.2);
      const screenFrameMaterial = new THREE.MeshStandardMaterial({ 
        color: mainColor.clone().multiplyScalar(1.2).getHex(),
        metalness: 0.5
      });
      const screenFrame = new THREE.Mesh(screenFrameGeometry, screenFrameMaterial);
      screenFrame.position.set(i, 5, -14.8);
      screenFrame.castShadow = true;
      scene.add(screenFrame);
      
      const screenGeometry = new THREE.PlaneGeometry(4.6, 2.6);
      const screenMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x000000 
      });
      const screen = new THREE.Mesh(screenGeometry, screenMaterial);
      screen.position.set(i, 5, -14.7);
      scene.add(screen);
      
      // Animated text on screen - simulated with a sprite
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 256;
      const context = canvas.getContext('2d');
      context.fillStyle = '#000000';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.font = 'bold 40px Arial';
      context.textAlign = 'center';
      context.fillStyle = mainColor.clone().multiplyScalar(1.5).getStyle();
      context.fillText('DIGITAL BANK', canvas.width/2, canvas.height/2 - 20);
      context.fillText('OF THE YEAR', canvas.width/2, canvas.height/2 + 40);
      
      const texture = new THREE.CanvasTexture(canvas);
      const textSpriteMaterial = new THREE.SpriteMaterial({ map: texture });
      const textSprite = new THREE.Sprite(textSpriteMaterial);
      textSprite.scale.set(4.5, 2.5, 1);
      textSprite.position.set(i, 5, -14.6);
      scene.add(textSprite);
      
      // Create pulsing animation for the text
      const pulseAnimation = {
        time: 0,
        update: (delta) => {
          pulseAnimation.time += delta;
          const pulse = 0.9 + 0.1 * Math.sin(pulseAnimation.time * 2);
          textSprite.scale.set(4.5 * pulse, 2.5 * pulse, 1);
        }
      };
      
      animationsRef.current.push(pulseAnimation);
    }
    
    // First Atlantic Bank Logo on the wall
    const logoBaseGeometry = new THREE.CircleGeometry(3, 32);
    const logoBaseMaterial = new THREE.MeshStandardMaterial({ 
      color: mainColor,
      metalness: 0.3,
      roughness: 0.2
    });
    const logoBase = new THREE.Mesh(logoBaseGeometry, logoBaseMaterial);
    logoBase.position.set(0, 5, -14.7);
    scene.add(logoBase);
    
    // Create text for the logo
    const logoCanvas = document.createElement('canvas');
    logoCanvas.width = 512;
    logoCanvas.height = 512;
    const logoContext = logoCanvas.getContext('2d');
    logoContext.fillStyle = mainColor.getStyle();
    logoContext.fillRect(0, 0, logoCanvas.width, logoCanvas.height);
    logoContext.font = 'bold 60px Arial';
    logoContext.textAlign = 'center';
    logoContext.fillStyle = '#ffffff';
    logoContext.fillText('FIRST', logoCanvas.width/2, logoCanvas.height/2 - 40);
    logoContext.fillText('ATLANTIC', logoCanvas.width/2, logoCanvas.height/2 + 30);
    logoContext.fillText('BANK', logoCanvas.width/2, logoCanvas.height/2 + 100);
    
    const logoTexture = new THREE.CanvasTexture(logoCanvas);
    const logoMaterial = new THREE.SpriteMaterial({ map: logoTexture });
    const logoSprite = new THREE.Sprite(logoMaterial);
    logoSprite.scale.set(6, 6, 1);
    logoSprite.position.set(0, 5, -14.6);
    scene.add(logoSprite);
    
    // Create rotating animation for the logo
    const rotateAnimation = {
      update: (delta) => {
        logoBase.rotation.z -= delta * 0.2;
      }
    };
    
    animationsRef.current.push(rotateAnimation);
  }

  function createCongratulationsText(scene) {
    // Create a floating 3D text for "Congratulations"
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 256;
    const context = canvas.getContext('2d');
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = 'bold 70px Arial';
    context.textAlign = 'center';
    context.fillStyle = '#8a2be2';
    context.fillText('CONGRATULATIONS!', canvas.width/2, canvas.height/2);
    context.font = 'bold 40px Arial';
    context.fillText('Digital Bank of the Year', canvas.width/2, canvas.height/2 + 60);
    
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(15, 4, 1);
    sprite.position.set(0, 7, 0);
    scene.add(sprite);
    
    // Create floating animation
    const floatAnimation = {
      time: 0,
      update: (delta) => {
        floatAnimation.time += delta;
        sprite.position.y = 7 + 0.2 * Math.sin(floatAnimation.time * 1.5);
        // Also add some rotation
        sprite.material.rotation += delta * 0.1;
      }
    };
    
    animationsRef.current.push(floatAnimation);
    
    // Add celebration particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 100;
    
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    const mainColor = new THREE.Color(0x8a2be2);
    const goldColor = new THREE.Color(0xffd700);
    
    for (let i = 0; i < particleCount; i++) {
      // Random position in a dome shape above
      const radius = 12 * Math.random();
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 0.5; // Half sphere
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = 10 + radius * Math.cos(phi); // Start from y=10
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
      
      // Alternate between main color and gold
      const color = i % 2 === 0 ? mainColor : goldColor;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    
    // Create falling animation for particles
    const particleAnimation = {
      time: 0,
      velocities: Array(particleCount).fill().map(() => ({
        x: (Math.random() - 0.5) * 0.5,
        y: -Math.random() * 2 - 1,
        z: (Math.random() - 0.5) * 0.5
      })),
      update: (delta) => {
        particleAnimation.time += delta;
        
        const positions = particles.geometry.attributes.position.array;
        
        for (let i = 0; i < particleCount; i++) {
          positions[i * 3] += particleAnimation.velocities[i].x * delta;
          positions[i * 3 + 1] += particleAnimation.velocities[i].y * delta;
          positions[i * 3 + 2] += particleAnimation.velocities[i].z * delta;
          
          // Reset particles that fall below the floor
          if (positions[i * 3 + 1] < 0) {
            positions[i * 3] = (Math.random() - 0.5) * 24;
            positions[i * 3 + 1] = 10 + Math.random() * 5;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 24;
          }
        }
        
        particles.geometry.attributes.position.needsUpdate = true;
      }
    };
    
    animationsRef.current.push(particleAnimation);
  }

  function createPeople(scene) {
    // Create simplified people (customers and bank staff)
    const createPerson = (x, z, height, color, isMoving = false) => {
      const group = new THREE.Group();
      
      // Body
      const bodyGeometry = new THREE.CapsuleGeometry(0.25, height, 8, 8);
      const bodyMaterial = new THREE.MeshStandardMaterial({ color });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.position.y = height / 2 + 0.25;
      body.castShadow = true;
      group.add(body);
      
      // Head
      const headGeometry = new THREE.SphereGeometry(0.25, 16, 16);
      const headMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xf5d0c0 // Skin tone
      });
      const head = new THREE.Mesh(headGeometry, headMaterial);
      head.position.y = height + 0.5;
      head.castShadow = true;
      group.add(head);
      
      // Position the person
      group.position.set(x, 0, z);
      scene.add(group);
      
      // Add animation for moving people
      if (isMoving) {
        const personAnimation = {
          time: Math.random() * Math.PI * 2, // Random start phase
          startX: x,
          startZ: z,
          walkRadius: 1 + Math.random() * 2, // Random walk radius
          update: (delta) => {
            personAnimation.time += delta;
            
            // Walking in small circles or patterns
            group.position.x = personAnimation.startX + 
              personAnimation.walkRadius * Math.cos(personAnimation.time * 0.5);
            group.position.z = personAnimation.startZ + 
              personAnimation.walkRadius * Math.sin(personAnimation.time * 0.5);
            
            // Rotate to face walking direction
            group.rotation.y = Math.atan2(
              group.position.x - (group.position.x - delta * Math.sin(personAnimation.time * 0.5)),
              group.position.z - (group.position.z - delta * Math.cos(personAnimation.time * 0.5))
            );
          }
        };
        
        animationsRef.current.push(personAnimation);
      }
      
      return group;
    };
    
    // Create bank tellers behind counter
    for (let i = -9; i <= 9; i += 3) {
      if (i !== 0) { // Skip the middle position
        createPerson(i, -4, 1.7, 0x222288);
      }
    }
    
    // Create customers
    createPerson(-3, 1, 1.6, 0x883333, true);
    createPerson(3, 3, 1.5, 0x338833, true);
    createPerson(-7, 7, 1.65, 0x885533, true);
    createPerson(7, 2, 1.55, 0x663366, true);
    createPerson(-5, 9, 1.7, 0x553388, true);
    
    // Create seated customers
    createPerson(-7, 10, 1.0, 0x772277);
    createPerson(-3, 10, 1.0, 0x227777);
  }

  function createInteractiveDoor(scene) {
    // Door frame
    const doorFrameGeometry = new THREE.BoxGeometry(6, 5, 0.5);
    const doorFrameMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8a2be2,
      metalness: 0.3,
      roughness: 0.2
    });
    const doorFrame = new THREE.Mesh(doorFrameGeometry, doorFrameMaterial);
    doorFrame.position.set(0, 2.5, 15);
    doorFrame.castShadow = true;
    doorFrame.receiveShadow = true;
    scene.add(doorFrame);
    
    // Door
    const doorGeometry = new THREE.BoxGeometry(5, 4, 0.3);
    const doorMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x9932CC,
      metalness: 0.5,
      roughness: 0.1
    });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(0, 2, 14.9);
    door.castShadow = true;
    door.receiveShadow = true;
    scene.add(door);
    doorRef.current = door;
    
    // Door handle
    const handleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.8, 8);
    const handleMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xf0f0f0,
      metalness: 0.8,
      roughness: 0.1
    });
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    handle.rotation.z = Math.PI / 2;
    handle.position.set(1.5, 2, 14.7);
    handle.castShadow = true;
    scene.add(handle);
    
    // Add text above door
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const context = canvas.getContext('2d');
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = 'bold 40px Arial';
    context.textAlign = 'center';
    context.fillStyle = '#8a2be2';
    context.fillText('OFFICE', canvas.width/2, canvas.height/2);
    
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(5, 1.5, 1);
    sprite.position.set(0, 5, 14.7);
    scene.add(sprite);
    
    // Make the door clickable
    const doorRaycaster = new THREE.Raycaster();
    const doorMouse = new THREE.Vector2();
    
    const onMouseClick = (event) => {
      // Calculate mouse position in normalized device coordinates
      doorMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      doorMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Update the picking ray with the camera and mouse position
      doorRaycaster.setFromCamera(doorMouse, cameraRef.current);
      
      // Calculate objects intersecting the picking ray
      const intersects = doorRaycaster.intersectObject(door);
      
      if (intersects.length > 0 && !animatingDoor) {
        // Door clicked!
        setAnimatingDoor(true);
        
        // Visual feedback - flash the door
        const originalColor = door.material.color.clone();
        door.material.color.set(0xffffff);
        
        setTimeout(() => {
          door.material.color.copy(originalColor);
        }, 200);
      }
    };
    
    window.addEventListener('click', onMouseClick);
    
    // Add to cleanup
    return () => {
      window.removeEventListener('click', onMouseClick);
    };
  }

  return (
    <div className="w-full h-screen bg-purple-100 relative">
      <div 
        ref={containerRef} 
        className="w-full h-full"
      />
      {navigating && (
        <div className="absolute inset-0 flex items-center justify-center bg-white">
          <div className="text-2xl font-bold text-purple-800">Navigating to Office...</div>
        </div>
      )}
      <div className="absolute top-4 left-4 bg-purple-800 text-white p-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold">First Atlantic Bank</h1>
        <p className="text-lg">Digital Bank of the Year</p>
      </div>
      <div className="absolute bottom-4 right-4 bg-white bg-opacity-80 p-3 rounded-lg shadow-lg">
        <p className="text-purple-800 font-semibold">Click the door to enter the office</p>
      </div>
    </div>
  );
}