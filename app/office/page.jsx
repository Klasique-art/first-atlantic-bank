"use client";
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const OfficePage = () => {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());
  const animationsRef = useRef([]);
  const mixerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 15);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3;
    controls.maxDistance = 30;
    controls.maxPolarAngle = Math.PI / 2 - 0.1; // Prevent camera going below floor
    controls.target.set(0, 3, 0);
    controlsRef.current = controls;

    // Lighting
    setupLighting(scene);
    
    // Create office environment
    createOfficeEnvironment(scene);
    
    // Add executive desk and furniture
    createExecutiveArea(scene);
    
    // Add meeting area
    createMeetingArea(scene);
    
    // Add waiting area with comfortable seating
    createWaitingArea(scene);
    
    // Add decorative plants and art
    createDecorativeElements(scene);
    
    // Add office people
    createOfficePeople(scene);
    
    // Add large windows with vibrant view
    createWindowsWithView(scene);
    
    // Add "Digital Bank of the Year" display
    createAwardDisplay(scene);

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
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Set loaded state to trigger fade-in effect
    setTimeout(() => {
      setLoaded(true);
    }, 500);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      // Dispose of all geometries and materials
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, []);

  function createMeetingArea(scene) {
    // Conference table
    const tableTopGeometry = new THREE.BoxGeometry(6, 0.2, 3);
    const tableTopMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8B4513,
      roughness: 0.3,
      metalness: 0.1
    });
    const tableTop = new THREE.Mesh(tableTopGeometry, tableTopMaterial);
    tableTop.position.set(5, 0.6, -5);
    tableTop.castShadow = true;
    scene.add(tableTop);
    
    // Table legs
    const tableLegGeometry = new THREE.BoxGeometry(0.2, 0.6, 0.2);
    const tableLegMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x5c3317,
      roughness: 0.5
    });
    
    const legPositions = [
      [-2.9, -1.4], [2.9, -1.4],
      [-2.9, 1.4], [2.9, 1.4]
    ];
    
    legPositions.forEach(([x, z]) => {
      const leg = new THREE.Mesh(tableLegGeometry, tableLegMaterial);
      leg.position.set(x + 5, 0.3, z - 5);
      leg.castShadow = true;
      scene.add(leg);
    });
    
    // Chairs around the table
    const chairGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const chairMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x9370DB,
      roughness: 0.6
    });
    
    const chairPositions = [
      [2, -2.5], [-2, -2.5],
      [2, 0], [-2, 0],
      [2, 2.5], [-2, 2.5]
    ];
    
    chairPositions.forEach(([x, z]) => {
      const chair = new THREE.Mesh(chairGeometry, chairMaterial);
      chair.position.set(x + 5, 0.4, z - 5);
      chair.castShadow = true;
      scene.add(chair);
    });
    
    // Whiteboard
    const whiteboardGeometry = new THREE.BoxGeometry(4, 2.5, 0.1);
    const whiteboardMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffffff,
      roughness: 0.9
    });
    const whiteboard = new THREE.Mesh(whiteboardGeometry, whiteboardMaterial);
    whiteboard.position.set(8, 1.75, -5);
    scene.add(whiteboard);
    
    // Whiteboard content
    const whiteboardCanvas = document.createElement('canvas');
    whiteboardCanvas.width = 512;
    whiteboardCanvas.height = 256;
    const whiteboardCtx = whiteboardCanvas.getContext('2d');
    
    whiteboardCtx.fillStyle = 'white';
    whiteboardCtx.fillRect(0, 0, 512, 256);
    
    whiteboardCtx.strokeStyle = '#8a2be2';
    whiteboardCtx.lineWidth = 3;
    whiteboardCtx.beginPath();
    whiteboardCtx.moveTo(50, 50);
    whiteboardCtx.lineTo(462, 50);
    
    whiteboardCtx.font = 'bold 24px Arial';
    whiteboardCtx.fillStyle = '#8a2be2';
    whiteboardCtx.fillText('Digital Strategy 2025', 50, 40);
    
    // Draw some chart-like elements
    whiteboardCtx.strokeStyle = '#4b0082';
    whiteboardCtx.lineWidth = 2;
    
    const dataPoints = [30, 45, 60, 75, 90];
    dataPoints.forEach((height, index) => {
      whiteboardCtx.fillStyle = `hsl(${index * 60}, 70%, 50%)`;
      whiteboardCtx.fillRect(100 + index * 80, 200 - height, 50, height);
    });
    
    const whiteboardTexture = new THREE.CanvasTexture(whiteboardCanvas);
    const whiteboardContentMaterial = new THREE.MeshBasicMaterial({ map: whiteboardTexture });
    const whiteboardContent = new THREE.Mesh(
      new THREE.PlaneGeometry(3.8, 2.3), 
      whiteboardContentMaterial
    );
    whiteboardContent.position.set(8, 1.75, -4.95);
    scene.add(whiteboardContent);
  }

  function createWaitingArea(scene) {
    // Comfortable seating arrangement
    const createSofa = (x, z, rotation) => {
      const sofaBaseGeometry = new THREE.BoxGeometry(3, 0.5, 1);
      const sofaBaseMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8a2be2,
        roughness: 0.6
      });
      const sofaBase = new THREE.Mesh(sofaBaseGeometry, sofaBaseMaterial);
      sofaBase.position.set(x, 0.25, z);
      sofaBase.rotation.y = rotation;
      sofaBase.castShadow = true;
      scene.add(sofaBase);
      
      const sofaBackGeometry = new THREE.BoxGeometry(3, 1, 0.5);
      const sofaBack = new THREE.Mesh(sofaBackGeometry, sofaBaseMaterial);
      sofaBack.position.set(x, 1, z - 0.25);
      sofaBack.rotation.y = rotation;
      sofaBack.castShadow = true;
      scene.add(sofaBack);
    };
    
    createSofa(12, 10, 0);
    createSofa(12, 7, 0);
    
    // Coffee table
    const coffeeTableGeometry = new THREE.BoxGeometry(2, 0.3, 1);
    const coffeeTableMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x5c3317,
      roughness: 0.3,
      metalness: 0.1
    });
    const coffeeTable = new THREE.Mesh(coffeeTableGeometry, coffeeTableMaterial);
    coffeeTable.position.set(12, 0.5, 8.5);
    coffeeTable.castShadow = true;
    scene.add(coffeeTable);
    
    // Magazines on coffee table
    const createMagazine = (offsetX, offsetZ) => {
      const magazineGeometry = new THREE.BoxGeometry(0.3, 0.4, 0.2);
      const magazineMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xCC0000,
        roughness: 0.8
      });
      const magazine = new THREE.Mesh(magazineGeometry, magazineMaterial);
      magazine.position.set(12 + offsetX, 0.8, 8.5 + offsetZ);
      magazine.rotation.z = Math.random() * 0.5;
      scene.add(magazine);
    };
    
    createMagazine(-0.3, -0.2);
    createMagazine(0.3, 0.2);
  }

  function setupLighting(scene) {
    // Ambient light for global illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Main directional light (sunlight)
    const sunlight = new THREE.DirectionalLight(0xffffeb, 1);
    sunlight.position.set(10, 20, 15);
    sunlight.castShadow = true;
    sunlight.shadow.mapSize.width = 2048;
    sunlight.shadow.mapSize.height = 2048;
    sunlight.shadow.camera.near = 0.5;
    sunlight.shadow.camera.far = 50;
    sunlight.shadow.camera.left = -20;
    sunlight.shadow.camera.right = 20;
    sunlight.shadow.camera.top = 20;
    sunlight.shadow.camera.bottom = -20;
    sunlight.shadow.bias = -0.0001;
    scene.add(sunlight);
    
    // Soft fill light from the opposite side
    const fillLight = new THREE.DirectionalLight(0xc2d0ff, 0.5);
    fillLight.position.set(-10, 10, -10);
    scene.add(fillLight);
    
    // Warm overhead office lights
    for (let x = -12; x <= 12; x += 6) {
      for (let z = -12; z <= 12; z += 6) {
        if (Math.abs(x) < 3 && Math.abs(z) < 3) continue; // Skip center area
        
        const pointLight = new THREE.PointLight(0xffe3c2, 0.7, 15);
        pointLight.position.set(x, 7, z);
        pointLight.castShadow = true;
        pointLight.shadow.mapSize.width = 512;
        pointLight.shadow.mapSize.height = 512;
        scene.add(pointLight);
        
        // Light fixture (simplified)
        const fixtureGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 16);
        const fixtureMaterial = new THREE.MeshStandardMaterial({ 
          color: 0xffffff,
          emissive: 0xffffcc,
          emissiveIntensity: 0.4
        });
        const fixture = new THREE.Mesh(fixtureGeometry, fixtureMaterial);
        fixture.position.set(x, 7, z);
        scene.add(fixture);
      }
    }
    
    // Accent lights for art and displays
    const purpleSpotlight = new THREE.SpotLight(0x9370DB, 1, 20, Math.PI / 6, 0.5);
    purpleSpotlight.position.set(0, 6, -14);
    purpleSpotlight.target.position.set(0, 4, -14.8);
    scene.add(purpleSpotlight);
    scene.add(purpleSpotlight.target);
  }

  function createOfficeEnvironment(scene) {
    // Floor - premium wood parquet
    const floorTexture = createWoodTexture();
    const floorGeometry = new THREE.PlaneGeometry(40, 40);
    const floorMaterial = new THREE.MeshStandardMaterial({ 
      map: floorTexture,
      roughness: 0.3,
      metalness: 0.1
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);
    
    // Ceiling
    const ceilingGeometry = new THREE.PlaneGeometry(40, 40);
    const ceilingMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xfcfcfc,
      roughness: 0.9
    });
    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 8;
    ceiling.receiveShadow = true;
    scene.add(ceiling);
    
    // Walls
    const wallMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xf9f9f9,
      roughness: 0.5
    });
    
    // Back wall (with accent wall)
    const backWallGeometry = new THREE.BoxGeometry(40, 8, 0.2);
    const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
    backWall.position.set(0, 4, -20);
    backWall.receiveShadow = true;
    scene.add(backWall);
    
    // Purple accent wall section
    const accentWallGeometry = new THREE.BoxGeometry(10, 8, 0.3);
    const accentWallMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8a2be2,
      roughness: 0.2
    });
    const accentWall = new THREE.Mesh(accentWallGeometry, accentWallMaterial);
    accentWall.position.set(0, 4, -19.9);
    scene.add(accentWall);
    
    // Side walls (with windows)
    const leftWallGeometry = new THREE.BoxGeometry(0.2, 8, 40);
    const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
    leftWall.position.set(-20, 4, 0);
    leftWall.receiveShadow = true;
    scene.add(leftWall);
    
    const rightWallGeometry = new THREE.BoxGeometry(0.2, 8, 40);
    const rightWall = new THREE.Mesh(rightWallGeometry, wallMaterial);
    rightWall.position.set(20, 4, 0);
    rightWall.receiveShadow = true;
    scene.add(rightWall);
    
    // Front wall (with entrance)
    const frontWallLeft = new THREE.Mesh(
      new THREE.BoxGeometry(15, 8, 0.2),
      wallMaterial
    );
    frontWallLeft.position.set(-12.5, 4, 20);
    frontWallLeft.receiveShadow = true;
    scene.add(frontWallLeft);
    
    const frontWallRight = new THREE.Mesh(
      new THREE.BoxGeometry(15, 8, 0.2),
      wallMaterial
    );
    frontWallRight.position.set(12.5, 4, 20);
    frontWallRight.receiveShadow = true;
    scene.add(frontWallRight);
    
    const frontWallTop = new THREE.Mesh(
      new THREE.BoxGeometry(10, 2, 0.2),
      wallMaterial
    );
    frontWallTop.position.set(0, 7, 20);
    frontWallTop.receiveShadow = true;
    scene.add(frontWallTop);
    
    // Door frame
    const doorFrameGeometry = new THREE.BoxGeometry(10, 6, 0.5);
    const doorFrameMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8a2be2,
      metalness: 0.3,
      roughness: 0.2
    });
    const doorFrame = new THREE.Mesh(doorFrameGeometry, doorFrameMaterial);
    doorFrame.position.set(0, 3, 20);
    scene.add(doorFrame);
    
    // Glass doors (semi-transparent)
    const doorGeometry = new THREE.BoxGeometry(4.7, 5.7, 0.1);
    const doorMaterial = new THREE.MeshPhysicalMaterial({ 
      color: 0xffffff,
      transparent: true,
      opacity: 0.3,
      roughness: 0,
      transmission: 0.9,
      reflectivity: 1.0
    });
    
    const leftDoor = new THREE.Mesh(doorGeometry, doorMaterial);
    leftDoor.position.set(-2.4, 3, 19.8);
    scene.add(leftDoor);
    
    const rightDoor = new THREE.Mesh(doorGeometry, doorMaterial);
    rightDoor.position.set(2.4, 3, 19.8);
    scene.add(rightDoor);
    
    // Door handles
    const handleGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 8);
    const handleMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xc0c0c0,
      metalness: 0.9,
      roughness: 0.1
    });
    
    const leftHandle = new THREE.Mesh(handleGeometry, handleMaterial);
    leftHandle.rotation.z = Math.PI / 2;
    leftHandle.position.set(-0.5, 3, 19.7);
    scene.add(leftHandle);
    
    const rightHandle = new THREE.Mesh(handleGeometry, handleMaterial);
    rightHandle.rotation.z = Math.PI / 2;
    rightHandle.position.set(0.5, 3, 19.7);
    scene.add(rightHandle);
  }

  function createWindowsWithView(scene) {
    // Window frames on left and right walls
    const createWindowOnWall = (isLeft) => {
      const xPos = isLeft ? -19.9 : 19.9;
      const rotation = isLeft ? -Math.PI / 2 : Math.PI / 2;
      
      for (let z = -15; z <= 15; z += 10) {
        // Window frame
        const frameGeometry = new THREE.BoxGeometry(8, 5, 0.2);
        const frameMaterial = new THREE.MeshStandardMaterial({ 
          color: 0x8a2be2,
          metalness: 0.2
        });
        const frame = new THREE.Mesh(frameGeometry, frameMaterial);
        frame.position.set(xPos, 4, z);
        frame.rotation.y = rotation;
        scene.add(frame);
        
        // Glass
        const glassGeometry = new THREE.PlaneGeometry(7.6, 4.6);
        const glassMaterial = new THREE.MeshPhysicalMaterial({ 
          color: 0xffffff,
          transparent: true,
          opacity: 0.3,
          transmission: 0.9,
          roughness: 0,
          envMapIntensity: 1
        });
        const glass = new THREE.Mesh(glassGeometry, glassMaterial);
        glass.position.set(xPos + (isLeft ? 0.11 : -0.11), 4, z);
        glass.rotation.y = rotation;
        scene.add(glass);
        
        // Create vibrant outdoor scenery visible through window
        const sceneDepth = 20;
        const sceneryOffset = isLeft ? -sceneDepth : sceneDepth;
        
        // Background sky gradient
        const skyCanvas = document.createElement('canvas');
        skyCanvas.width = 512;
        skyCanvas.height = 512;
        const skyCtx = skyCanvas.getContext('2d');
        const skyGradient = skyCtx.createLinearGradient(0, 0, 0, 512);
        skyGradient.addColorStop(0, '#1e90ff');
        skyGradient.addColorStop(1, '#87ceeb');
        skyCtx.fillStyle = skyGradient;
        skyCtx.fillRect(0, 0, 512, 512);
        
        const skyTexture = new THREE.CanvasTexture(skyCanvas);
        const skyGeometry = new THREE.PlaneGeometry(40, 20);
        const skyMaterial = new THREE.MeshBasicMaterial({ 
          map: skyTexture,
          side: THREE.DoubleSide
        });
        const sky = new THREE.Mesh(skyGeometry, skyMaterial);
        sky.position.set(xPos + (isLeft ? -10 : 10), 10, z);
        sky.rotation.y = rotation;
        scene.add(sky);
        
        // Add mountains or cityscape
        const cityCanvas = document.createElement('canvas');
        cityCanvas.width = 512;
        cityCanvas.height = 256;
        const cityCtx = cityCanvas.getContext('2d');
        
        // Paint sky background first
        cityCtx.fillStyle = '#0000';
        cityCtx.fillRect(0, 0, 512, 256);
        
        // Draw buildings/mountains
        for (let i = 0; i < 15; i++) {
          const buildingWidth = 20 + Math.random() * 50;
          const buildingHeight = 100 + Math.random() * 150;
          const xPos = i * 35;
                
          // Random hue for building
          const hue = Math.random() * 60 - 30 + 210; // Blue-ish
          cityCtx.fillStyle = `hsl(${hue}, 70%, ${40 + Math.random() * 20}%)`;
          
          // Draw building shape
          cityCtx.beginPath();
          cityCtx.rect(xPos, 256 - buildingHeight, buildingWidth, buildingHeight);
          cityCtx.fill();
          
          // Add windows
          cityCtx.fillStyle = 'rgba(255, 255, 200, 0.8)';
          for (let wy = 0; wy < buildingHeight - 10; wy += 15) {
            for (let wx = 0; wx < buildingWidth - 5; wx += 10) {
              if (Math.random() > 0.3) { // Some windows are lit
                cityCtx.fillRect(xPos + 5 + wx, 256 - buildingHeight + 5 + wy, 5, 10);
              }
            }
          }
        }
        
        const cityTexture = new THREE.CanvasTexture(cityCanvas);
        const cityGeometry = new THREE.PlaneGeometry(30, 15);
        const cityMaterial = new THREE.MeshBasicMaterial({ 
          map: cityTexture,
          transparent: true,
          side: THREE.DoubleSide
        });
        const city = new THREE.Mesh(cityGeometry, cityMaterial);
        city.position.set(xPos + (isLeft ? -10 : 10), 5, z);
        city.rotation.y = rotation;
        scene.add(city);
        
        // Add some trees in the foreground
        for (let i = 0; i < 5; i++) {
          const treeX = xPos + (isLeft ? -5 : 5) + (Math.random() - 0.5) * 8;
          const treeZ = z + (Math.random() - 0.5) * 7;
          const treeHeight = 1.5 + Math.random() * 1.5;
          
          // Tree trunk
          const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.3, treeHeight, 8);
          const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
          const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
          trunk.position.set(treeX, treeHeight/2, treeZ);
          scene.add(trunk);
          
          // Tree foliage
          const foliageGeometry = new THREE.SphereGeometry(1 + Math.random() * 0.5, 8, 8);
          const foliageMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x228B22,
            roughness: 0.8
          });
          const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
          foliage.position.set(treeX, treeHeight + 0.5, treeZ);
          foliage.scale.y = 1.5;
          scene.add(foliage);
        }
      }
    };
    
    createWindowOnWall(true); // Left wall
    createWindowOnWall(false); // Right wall
    
    // Large window at the back with vibrant view
    const backWindowFrameGeometry = new THREE.BoxGeometry(15, 6, 0.2);
    const backWindowFrameMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8a2be2,
      metalness: 0.2
    });
    const backWindowFrame = new THREE.Mesh(backWindowFrameGeometry, backWindowFrameMaterial);
    backWindowFrame.position.set(10, 4, -19.9);
    scene.add(backWindowFrame);
    
    // Glass for back window
    const backGlassGeometry = new THREE.PlaneGeometry(14.6, 5.6);
    const backGlassMaterial = new THREE.MeshPhysicalMaterial({ 
      color: 0xffffff,
      transparent: true,
      opacity: 0.3,
      transmission: 0.9,
      roughness: 0
    });
    const backGlass = new THREE.Mesh(backGlassGeometry, backGlassMaterial);
    backGlass.position.set(10, 4, -19.85);
    scene.add(backGlass);
    
    // Create a beautiful garden view outside the back window
    // Background sky
    const skyCanvas = document.createElement('canvas');
    skyCanvas.width = 512;
    skyCanvas.height = 512;
    const skyCtx = skyCanvas.getContext('2d');
    const skyGradient = skyCtx.createLinearGradient(0, 0, 0, 512);
    skyGradient.addColorStop(0, '#5d8aa8');
    skyGradient.addColorStop(1, '#add8e6');
    skyCtx.fillStyle = skyGradient;
    skyCtx.fillRect(0, 0, 512, 512);
    
    const skyTexture = new THREE.CanvasTexture(skyCanvas);
    const gardenSkyGeometry = new THREE.PlaneGeometry(30, 15);
    const gardenSkyMaterial = new THREE.MeshBasicMaterial({ 
      map: skyTexture,
      side: THREE.DoubleSide
    });
    const gardenSky = new THREE.Mesh(gardenSkyGeometry, gardenSkyMaterial);
    gardenSky.position.set(10, 10, -25);
    scene.add(gardenSky);
    
    // Garden with flowers
    const gardenCanvas = document.createElement('canvas');
    gardenCanvas.width = 512;
    gardenCanvas.height = 256;
    const gardenCtx = gardenCanvas.getContext('2d');
    
    // Draw grass background
    gardenCtx.fillStyle = '#228B22';
    gardenCtx.fillRect(0, 128, 512, 128);
    
    // Draw flowers and plants
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * 512;
      const y = 128 + Math.random() * 100;
      const size = 2 + Math.random() * 5;
      const hue = Math.random() * 360;
      
      gardenCtx.fillStyle = `hsl(${hue}, 100%, 60%)`;
      gardenCtx.beginPath();
      gardenCtx.arc(x, y, size, 0, Math.PI * 2);
      gardenCtx.fill();
      
      // Draw stem
      gardenCtx.strokeStyle = '#006400';
      gardenCtx.lineWidth = 1;
      gardenCtx.beginPath();
      gardenCtx.moveTo(x, y);
      gardenCtx.lineTo(x, y + 10 + Math.random() * 20);
      gardenCtx.stroke();
    }
    
    const gardenTexture = new THREE.CanvasTexture(gardenCanvas);
    const gardenGeometry = new THREE.PlaneGeometry(20, 10);
    const gardenMaterial = new THREE.MeshBasicMaterial({ 
      map: gardenTexture,
      transparent: true,
      side: THREE.DoubleSide
    });
    const garden = new THREE.Mesh(gardenGeometry, gardenMaterial);
    garden.position.set(10, 5, -23);
    scene.add(garden);
    
    // Add 3D trees and plants around the garden
    for (let i = 0; i < 10; i++) {
      const treeX = 10 + (Math.random() - 0.5) * 15;
      const treeZ = -22 - Math.random() * 5;
      const treeHeight = 1 + Math.random() * 3;
      
      // Tree trunk
      const trunkGeometry = new THREE.CylinderGeometry(0.1, 0.2, treeHeight, 8);
      const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
      const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
      trunk.position.set(treeX, treeHeight/2, treeZ);
      scene.add(trunk);
      
      // Tree foliage - different shapes for variety
      let foliage;
      if (Math.random() > 0.5) {
        // Round tree
        const foliageGeometry = new THREE.SphereGeometry(0.8 + Math.random() * 0.5, 8, 8);
        const foliageMaterial = new THREE.MeshStandardMaterial({ 
          color: new THREE.Color().setHSL(0.3 + Math.random() * 0.15, 0.6, 0.4),
          roughness: 0.8
        });
        foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
        foliage.position.set(treeX, treeHeight + 0.5, treeZ);
      } else {
        // Conical tree
        const foliageGeometry = new THREE.ConeGeometry(1 + Math.random() * 0.5, 2 + Math.random(), 8);
        const foliageMaterial = new THREE.MeshStandardMaterial({ 
          color: new THREE.Color().setHSL(0.25 + Math.random() * 0.1, 0.7, 0.4),
          roughness: 0.8
        });
        foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
        foliage.position.set(treeX, treeHeight + 1, treeZ);
      }
      scene.add(foliage);
    }
  }

  function createExecutiveArea(scene) {
    // Main executive desk - premium wood with glass top
    const deskBaseGeometry = new THREE.BoxGeometry(4, 0.8, 2);
    const deskBaseMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x5c3317,
      roughness: 0.3,
      metalness: 0.2
    });
    const deskBase = new THREE.Mesh(deskBaseGeometry, deskBaseMaterial);
    deskBase.position.set(-10, 0.4, -12);
    deskBase.castShadow = true;
    deskBase.receiveShadow = true;
    scene.add(deskBase);
    
    // Glass desktop
    const deskTopGeometry = new THREE.BoxGeometry(4.4, 0.1, 2.4);
    const deskTopMaterial = new THREE.MeshPhysicalMaterial({ 
      color: 0xffffff,
      transparent: true,
      opacity: 0.3,
      transmission: 0.9,
      roughness: 0,
      reflectivity: 1.0
    });
    const deskTop = new THREE.Mesh(deskTopGeometry, deskTopMaterial);
    deskTop.position.set(-10, 0.85, -12);
    deskTop.castShadow = true;
    deskTop.receiveShadow = true;
    scene.add(deskTop);
    
    // Computer on desk
    const monitorStandGeometry = new THREE.BoxGeometry(0.2, 0.3, 0.2);
    const computerMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x333333,
      roughness: 0.8
    });
    const monitorStand = new THREE.Mesh(monitorStandGeometry, computerMaterial);
    monitorStand.position.set(-10, 1, -12.5);
    monitorStand.castShadow = true;
    scene.add(monitorStand);
    
    const monitorFrameGeometry = new THREE.BoxGeometry(1.6, 1, 0.1);
    const monitorFrame = new THREE.Mesh(monitorFrameGeometry, computerMaterial);
    monitorFrame.position.set(-10, 1.65, -12.5);
    monitorFrame.castShadow = true;
    scene.add(monitorFrame);
    
    const screenGeometry = new THREE.PlaneGeometry(1.5, 0.9);
    const screenMaterial = new THREE.MeshBasicMaterial({ color: 0x3a86ff });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(-10, 1.65, -12.45);
    scene.add(screen);
    
    // Create screen content - bank interface
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 512;
    screenCanvas.height = 256;
    const screenCtx = screenCanvas.getContext('2d');
    
    // Background gradient
    const gradient = screenCtx.createLinearGradient(0, 0, 512, 256);
    gradient.addColorStop(0, '#3a86ff');
    gradient.addColorStop(1, '#8a2be2');
    screenCtx.fillStyle = gradient;
    screenCtx.fillRect(0, 0, 512, 256);
    
    // Header
    screenCtx.fillStyle = '#ffffff';
    screenCtx.fillRect(20, 20, 472, 40);
    
    // Bank name
    screenCtx.fillStyle = '#8a2be2';
    screenCtx.font = 'bold 24px Arial';
    screenCtx.fillText('First Atlantic Bank - Digital Dashboard', 30, 50);
    
    // Dashboard elements
    screenCtx.fillStyle = 'rgba(255,255,255,0.8)';
    screenCtx.fillRect(20, 80, 472, 156);
    
    screenCtx.fillStyle = '#333';
    screenCtx.font = '18px Arial';
    screenCtx.fillText('Total Assets: $1,245,678,902', 40, 110);
    screenCtx.fillText('New Accounts: 1,234', 40, 140);
    screenCtx.fillText('Digital Transactions: 456,789', 40, 170);
    screenCtx.fillText('Customer Satisfaction: 98.7%', 40, 200);
    
    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    const screenDisplayMaterial = new THREE.MeshBasicMaterial({ map: screenTexture });
    screen.material = screenDisplayMaterial;
    
    // Keyboard
    const keyboardGeometry = new THREE.BoxGeometry(1.2, 0.1, 0.4);
    const keyboardMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x444444,
      roughness: 0.8
    });
    const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
    keyboard.position.set(-10.5, 0.95, -11.7);
    keyboard.rotation.z = -0.1;
    scene.add(keyboard);
    
    // Mouse
    const mouseGeometry = new THREE.BoxGeometry(0.3, 0.1, 0.2);
    const mouseMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x666666,
      roughness: 0.7
    });
    const mouse = new THREE.Mesh(mouseGeometry, mouseMaterial);
    mouse.position.set(-9.3, 0.95, -11.7);
    scene.add(mouse);
    
    // Executive chair
    const chairBaseGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.2, 16);
    const chairBaseMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x444444,
      metalness: 0.3,
      roughness: 0.7
    });
    const chairBase = new THREE.Mesh(chairBaseGeometry, chairBaseMaterial);
    chairBase.position.set(-10, 0.1, -10);
    chairBase.castShadow = true;
    scene.add(chairBase);
    
    // Chair back
    const chairBackGeometry = new THREE.BoxGeometry(1.2, 1.5, 0.2);
    const chairBackMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8a2be2,
      metalness: 0.1,
      roughness: 0.6
    });
    const chairBack = new THREE.Mesh(chairBackGeometry, chairBackMaterial);
    chairBack.position.set(-10, 1.25, -10.1);
    chairBack.castShadow = true;
    scene.add(chairBack);
    
    // Chair seat
    const chairSeatGeometry = new THREE.BoxGeometry(1.2, 0.2, 1);
    const chairSeat = new THREE.Mesh(chairSeatGeometry, chairBackMaterial);
    chairSeat.position.set(-10, 0.6, -10);
    chairSeat.castShadow = true;
    scene.add(chairSeat);
    
    // Desk accessories
    const penGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.2, 8);
    const penMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8a2be2,
      metalness: 0.5 
    });
    const pen = new THREE.Mesh(penGeometry, penMaterial);
    pen.rotation.z = Math.PI / 2;
    pen.position.set(-9.3, 0.95, -11.7);
    scene.add(pen);
    
    // Business card holder
    const cardHolderGeometry = new THREE.BoxGeometry(0.5, 0.1, 0.3);
    const cardHolderMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x5c3317,
      metalness: 0.2,
      roughness: 0.6
    });
    const cardHolder = new THREE.Mesh(cardHolderGeometry, cardHolderMaterial);
    cardHolder.position.set(-9.5, 0.95, -11.3);
    scene.add(cardHolder);
    
    // Small ornamental plant
    const plantPotGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.3, 16);
    const plantPotMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8B4513,
      roughness: 0.7
    });
    const plantPot = new THREE.Mesh(plantPotGeometry, plantPotMaterial);
    plantPot.position.set(-8.7, 0.95, -11.5);
    scene.add(plantPot);
    
    const plantGeometry = new THREE.SphereGeometry(0.15, 8, 8);
    const plantMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x228B22,
      roughness: 0.8
    });
    const plant = new THREE.Mesh(plantGeometry, plantMaterial);
    plant.position.set(-8.7, 1.1, -11.5);
    scene.add(plant);
}

function createWoodTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    // Wood grain base color
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(0, 0, 256, 256);
    
    // Create wood grain effect
    ctx.strokeStyle = 'rgba(139, 69, 19, 0.3)';
    for (let y = 0; y < 256; y += 10) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      
      for (let x = 0; x < 256; x += 10) {
        ctx.lineTo(x + (Math.random() - 0.5) * 5, y);
      }
      
      ctx.stroke();
    }
    
    return new THREE.CanvasTexture(canvas);
  }

  function createOfficePeople(scene) {
    // Business executive
    const executiveGeometry = new THREE.BoxGeometry(0.5, 1.8, 0.3);
    const executiveMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x4169E1,
      roughness: 0.6
    });
    const executive = new THREE.Mesh(executiveGeometry, executiveMaterial);
    executive.position.set(-9, 0.9, -10);
    scene.add(executive);
    
    // Head
    const headGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const headMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xFDD9B5,
      roughness: 0.8
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(-9, 1.7, -10);
    scene.add(head);
    
    // Meeting participants
    const participantPositions = [
      [5, -2, -5],
      [5, 0, -5],
      [5, 2, -5]
    ];
    
    participantPositions.forEach(([x, z, offsetZ]) => {
      const participantGeometry = new THREE.BoxGeometry(0.4, 1.6, 0.3);
      const participantMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x9370DB,
        roughness: 0.6
      });
      const participant = new THREE.Mesh(participantGeometry, participantMaterial);
      participant.position.set(x, 0.8, z);
      scene.add(participant);
      
      // Head
      const participantHead = new THREE.Mesh(headGeometry, headMaterial);
      participantHead.position.set(x, 1.5, z);
      scene.add(participantHead);
    });
    
    // Receptionist
    const receptionistGeometry = new THREE.BoxGeometry(0.4, 1.7, 0.3);
    const receptionistMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xDDA0DD,
      roughness: 0.6
    });
    const receptionist = new THREE.Mesh(receptionistGeometry, receptionistMaterial);
    receptionist.position.set(0, 0.85, 19);
    scene.add(receptionist);
    
    // Receptionist head
    const receptionistHead = new THREE.Mesh(headGeometry, headMaterial);
    receptionistHead.position.set(0, 1.6, 19);
    scene.add(receptionistHead);
  }

  function createAwardDisplay(scene) {
    // Large award display
    const awardBaseGeometry = new THREE.BoxGeometry(6, 0.5, 2);
    const awardBaseMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffd700,
      metalness: 0.7,
      roughness: 0.2
    });
    const awardBase = new THREE.Mesh(awardBaseGeometry, awardBaseMaterial);
    awardBase.position.set(0, 4, -14.5);
    scene.add(awardBase);
    
    // Award plaque
    const awardPlaqueGeometry = new THREE.BoxGeometry(5.5, 0.2, 1.5);
    const awardPlaqueMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffffff,
      roughness: 0.9
    });
    const awardPlaque = new THREE.Mesh(awardPlaqueGeometry, awardPlaqueMaterial);
    awardPlaque.position.set(0, 4.25, -14.5);
    scene.add(awardPlaque);
    
    // Award text canvas
    const awardCanvas = document.createElement('canvas');
    awardCanvas.width = 512;
    awardCanvas.height = 256;
    const awardCtx = awardCanvas.getContext('2d');
    
    // Golden gradient background
    const awardGradient = awardCtx.createLinearGradient(0, 0, 512, 256);
    awardGradient.addColorStop(0, '#ffd700');
    awardGradient.addColorStop(1, '#daa520');
    awardCtx.fillStyle = awardGradient;
    awardCtx.fillRect(0, 0, 512, 256);
    
    // Award text
    awardCtx.fillStyle = 'white';
    awardCtx.font = 'bold 36px Arial';
    awardCtx.textAlign = 'center';
    awardCtx.fillText('Digital Bank of the Year', 256, 100);
    awardCtx.font = '24px Arial';
    awardCtx.fillText('First Atlantic Bank', 256, 150);
    awardCtx.font = '18px Arial';
    awardCtx.fillText('2024 Excellence Award', 256, 200);
    
    const awardTexture = new THREE.CanvasTexture(awardCanvas);
    const awardTextMaterial = new THREE.MeshBasicMaterial({ map: awardTexture });
    const awardTextPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(5, 2.5), 
      awardTextMaterial
    );
    awardTextPlane.position.set(0, 4.35, -14.3);
    scene.add(awardTextPlane);
  }

  function createDecorativeElements(scene) {
    // Abstract art piece on the wall
    const artCanvas = document.createElement('canvas');
    artCanvas.width = 512;
    artCanvas.height = 256;
    const artCtx = artCanvas.getContext('2d');
    
    // Create a dynamic abstract art piece
    const gradient = artCtx.createLinearGradient(0, 0, 512, 256);
    gradient.addColorStop(0, '#8a2be2');
    gradient.addColorStop(1, '#4b0082');
    artCtx.fillStyle = gradient;
    artCtx.fillRect(0, 0, 512, 256);
    
    // Add geometric shapes
    for (let i = 0; i < 20; i++) {
      artCtx.beginPath();
      const x = Math.random() * 512;
      const y = Math.random() * 256;
      const radius = 10 + Math.random() * 50;
      const hue = Math.random() * 360;
      
      artCtx.fillStyle = `hsla(${hue}, 70%, 50%, 0.6)`;
      artCtx.arc(x, y, radius, 0, Math.PI * 2);
      artCtx.fill();
    }
    
    const artTexture = new THREE.CanvasTexture(artCanvas);
    const artGeometry = new THREE.PlaneGeometry(4, 2);
    const artMaterial = new THREE.MeshBasicMaterial({ map: artTexture });
    const art = new THREE.Mesh(artGeometry, artMaterial);
    art.position.set(0, 5, -19.9);
    scene.add(art);
    
    // Decorative plants
    const createPlant = (x, z) => {
      // Plant pot
      const potGeometry = new THREE.CylinderGeometry(0.3, 0.4, 0.4, 16);
      const potMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8B4513,
        roughness: 0.7
      });
      const pot = new THREE.Mesh(potGeometry, potMaterial);
      pot.position.set(x, 0.2, z);
      scene.add(pot);
      
      // Plant foliage
      const foliageGeometry = new THREE.SphereGeometry(0.5, 8, 8);
      const foliageMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x228B22,
        roughness: 0.8
      });
      const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
      foliage.position.set(x, 0.6, z);
      scene.add(foliage);
    };
    
    // Place plants in corners and strategic locations
    createPlant(19, 19);
    createPlant(-19, 19);
    createPlant(19, -19);
    createPlant(-19, -19);
    createPlant(0, 15);
  }

  // Component render
  return (
    <div 
      ref={containerRef} 
      className={`w-full h-screen transition-opacity duration-500 ${
        loaded ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
};

export default OfficePage;