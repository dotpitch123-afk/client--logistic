import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { Plus, Trash2, Package, Truck, Play, RotateCcw, ZoomIn, ZoomOut, Eye, EyeOff, ChevronLeft, ChevronRight, Settings, Info, History, Download, Save, AlertCircle, Palette, Grid3X3, Layers } from 'lucide-react';
import html2pdf from 'html2pdf.js';
const ContainerPackingPlatform = () => {
  const mountRef = useRef(null);
  const statsRef = useRef()
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const animationRef = useRef(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const controlsRef = useRef({
  isRotating: false,
  lastMouseX: 0,
  lastMouseY: 0,
  radius: 8,
  theta: 0.5,
  phi: Math.PI / 3
});
  // const controlsRef = useRef({
  //   isRotating: false,
  //   lastMouseX: 0,
  //   lastMouseY: 0,
  //   radius: 8,
  //   theta: 0.5,
  //   phi: Math.PI / 3
  // });
  // const controlsRef = useRef({
  //   isRotating: false,
  //   lastMouseX: 0,
  //   lastMouseY: 0,
  //   radius: 300,
  //   theta: 0,
  //   phi: Math.PI / 4
  // });
  
  // Enhanced color palette for better box recognition
  const colorPalette = [
    { name: 'Fire Red', color: '#FF4444', border: '#CC3333' },
    { name: 'Ocean Blue', color: '#4A90E2', border: '#3A70B2' },
    { name: 'Forest Green', color: '#50C878', border: '#40A068' },
    { name: 'Sunset Orange', color: '#FF8C42', border: '#CC7032' },
    { name: 'Royal Purple', color: '#8A2BE2', border: '#6A1BB2' },
    { name: 'Golden Yellow', color: '#FFD700', border: '#CCA700' },
    { name: 'Pink Flamingo', color: '#FF69B4', border: '#CC5291' },
    { name: 'Turquoise', color: '#40E0D0', border: '#30B0A0' },
    { name: 'Lime Green', color: '#32CD32', border: '#28A428' },
    { name: 'Deep Magenta', color: '#8B008B', border: '#6B006B' },
    { name: 'Steel Blue', color: '#4682B4', border: '#36628A' },
    { name: 'Coral', color: '#FF7F50', border: '#CC6540' }
  ];

  const [container, setContainer] = useState({
    length: 4,
    width: 3,
    height: 2.5
  });
  
  const [boxes, setBoxes] = useState([
    { id: 'Box A', length: 0.5, width: 0.4, height: 0.3, quantity: 20, color: colorPalette[0].color, border: colorPalette[0].border },
    { id: 'Box B', length: 0.6, width: 0.5, height: 0.4, quantity: 15, color: colorPalette[1].color, border: colorPalette[1].border },
    { id: 'Box C', length: 0.8, width: 0.6, height: 0.5, quantity: 10, color: colorPalette[2].color, border: colorPalette[2].border },
    { id: 'Box D', length: 0.7, width: 0.3, height: 0.4, quantity: 12, color: colorPalette[3].color, border: colorPalette[3].border }
  ]);
  
  const [packingResult, setPackingResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);
  const [showGrid, setShowGrid] = useState(true);
  const [showAxes, setShowAxes] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState('perspective');
  const [highlightedBoxType, setHighlightedBoxType] = useState(null);
  const [packingHistory, setPackingHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [serverStatus, setServerStatus] = useState('checking');
  const [showLegend, setShowLegend] = useState(true);
  const [transparentMode, setTransparentMode] = useState(false);
  const [animateBoxes, setAnimateBoxes] = useState(false);
  const [showBoxLabels, setShowBoxLabels] = useState(true);

  useEffect(() => {
    checkServerStatus();
    fetchPackingHistory();
  }, []);

  const checkServerStatus = async () => {
    try {
      const response = await fetch('http://localhost:5000/test', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      setServerStatus(response.ok ? 'connected' : 'error');
    } catch (err) {
      setServerStatus('disconnected');
    }
  };

  // Create text texture for box labels
  const createTextTexture = useCallback((text, color = '#000000') => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    canvas.width = 256;
    canvas.height = 64;
    
    context.fillStyle = 'rgba(255, 255, 255, 0.9)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);
    
    context.fillStyle = color;
    context.font = 'bold 24px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      2000
    );
    updateCameraPosition();
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0xf8fafc, 1);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    // scene.add(ambientLight);

    // const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    // directionalLight.position.set(10, 10, 5);
    // directionalLight.castShadow = true;
    // directionalLight.shadow.mapSize.width = 4096;
    // directionalLight.shadow.mapSize.height = 4096;
    // directionalLight.shadow.camera.near = 0.1;
    // directionalLight.shadow.camera.far = 50;
    // directionalLight.shadow.camera.left = -20;
    // directionalLight.shadow.camera.right = 20;
    // directionalLight.shadow.camera.top = 20;
    // directionalLight.shadow.camera.bottom = -20;
    // scene.add(directionalLight);
const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(10, 10, 5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 4096;
directionalLight.shadow.mapSize.height = 4096;
directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 50;
directionalLight.shadow.camera.left = -20;
directionalLight.shadow.camera.right = 20;
directionalLight.shadow.camera.top = 20;
directionalLight.shadow.camera.bottom = -20;
scene.add(directionalLight);

// Additional lights for better interior visibility
const innerLight1 = new THREE.DirectionalLight(0xffffff, 0.4);
innerLight1.position.set(-5, 5, -5);
scene.add(innerLight1);

const innerLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
innerLight2.position.set(5, -5, 5);
scene.add(innerLight2);

    
    const rimLight = new THREE.DirectionalLight(0x4f46e5, 0.4);
    rimLight.position.set(-5, 2.5, -5);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-10, -5, 10);
    scene.add(fillLight);

    const handleMouseDown = (event) => {
      controlsRef.current.isRotating = true;
      controlsRef.current.lastMouseX = event.clientX;
      controlsRef.current.lastMouseY = event.clientY;
      renderer.domElement.style.cursor = 'grabbing';
    };

    const handleMouseUp = () => {
      controlsRef.current.isRotating = false;
      renderer.domElement.style.cursor = 'grab';
    };

    const handleMouseMove = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      if (controlsRef.current.isRotating) {
        const deltaX = event.clientX - controlsRef.current.lastMouseX;
        const deltaY = event.clientY - controlsRef.current.lastMouseY;
        
        controlsRef.current.theta -= deltaX * 0.01;
        controlsRef.current.phi = Math.max(0.1, Math.min(Math.PI - 0.1, controlsRef.current.phi + deltaY * 0.01));
        
        updateCameraPosition();
        
        controlsRef.current.lastMouseX = event.clientX;
        controlsRef.current.lastMouseY = event.clientY;
      }
    };

    const handleWheel = (event) => {
      event.preventDefault();
      controlsRef.current.radius = Math.max(5, Math.min(50, controlsRef.current.radius + event.deltaY * 0.01));
      updateCameraPosition();
    };

    const handleClick = (event) => {
      if (!packingResult) return;
      
      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const packedBoxes = scene.getObjectByName('packedBoxes');
      if (packedBoxes) {
        const intersects = raycasterRef.current.intersectObjects(packedBoxes.children, true);
        if (intersects.length > 0) {
          let clickedObject = intersects[0].object.parent;
     
          while (clickedObject && !clickedObject.userData.boxType) {
            clickedObject = clickedObject.parent;
          }
          if (clickedObject && clickedObject.userData.boxType) {
            setSelectedBox(clickedObject);
            highlightBox(clickedObject);
          }
        } else {
          setSelectedBox(null);
          clearHighlight();
        }
      }
    };

    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mouseup', handleMouseUp);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('wheel', handleWheel);
    renderer.domElement.addEventListener('click', handleClick);
    renderer.domElement.style.cursor = 'grab';

    drawContainer();
    drawGrid();
    if (showAxes) drawAxes();

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
  
      if (animateBoxes && packingResult) {
        const packedBoxes = scene.getObjectByName('packedBoxes');
        if (packedBoxes) {
          const time = Date.now() * 0.001;
          packedBoxes.children.forEach((boxGroup, index) => {
            if (boxGroup.userData.originalY !== undefined) {
              const floatOffset = Math.sin(time + index * 0.5) * 0.02;
              boxGroup.position.y = boxGroup.userData.originalY + floatOffset;
            }
          });
        }
      }
      
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      renderer.domElement.removeEventListener('mouseup', handleMouseUp);
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('wheel', handleWheel);
      renderer.domElement.removeEventListener('click', handleClick);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const updateCameraPosition = useCallback(() => {
    if (!cameraRef.current) return;
    
    const controls = controlsRef.current;
    const x = controls.radius * Math.sin(controls.phi) * Math.cos(controls.theta);
    const y = controls.radius * Math.cos(controls.phi);
    const z = controls.radius * Math.sin(controls.phi) * Math.sin(controls.theta);
    
    cameraRef.current.position.set(x, y, z);
    cameraRef.current.lookAt(container.length/2, container.height/2, container.width/2);
  }, [container]);

  // const drawContainer = useCallback(() => {
  //   if (!sceneRef.current) return;

  //   const existingContainer = sceneRef.current.getObjectByName('container');
  //   if (existingContainer) {
  //     sceneRef.current.remove(existingContainer);
  //   }

  //   const containerGroup = new THREE.Group();
  //   containerGroup.name = 'container';

  //   const containerGeometry = new THREE.BoxGeometry(container.length, container.height, container.width);
  //   const edges = new THREE.EdgesGeometry(containerGeometry);
  //   const containerMaterial = new THREE.LineBasicMaterial({ 
  //     color: 0x2563eb, 
  //     linewidth: 3,
  //     transparent: true,
  //     opacity: 0.9
  //   });
  //   const containerMesh = new THREE.LineSegments(edges, containerMaterial);
  //   containerMesh.position.set(container.length/2, container.height/2, container.width/2);
  //   containerGroup.add(containerMesh);

  //   const facesMaterial = new THREE.MeshLambertMaterial({ 
  //     color: 0xe0e7ff, 
  //     transparent: true, 
  //     opacity: 0.05,
  //     side: THREE.DoubleSide
  //   });
  //   const facesMesh = new THREE.Mesh(containerGeometry, facesMaterial);
  //   facesMesh.position.set(container.length/2, container.height/2, container.width/2);
  //   containerGroup.add(facesMesh);
    
  //   const floorGeometry = new THREE.PlaneGeometry(container.length, container.width);
  //   const floorMaterial = new THREE.MeshLambertMaterial({ 
  //     color: 0xf1f5f9, 
  //     transparent: true, 
  //     opacity: 0.8
  //   });
  //   const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  //   floor.rotation.x = -Math.PI / 2;
  //   floor.position.set(container.length/2, 0, container.width/2);
  //   floor.receiveShadow = true;
  //   containerGroup.add(floor);

  //   const cornerGeometry = new THREE.SphereGeometry(0.02, 8, 8);
  //   const cornerMaterial = new THREE.MeshLambertMaterial({ color: 0x2563eb, transparent: true, opacity: 0.7 });
    
  //   const corners = [
  //     [0, 0, 0], [container.length, 0, 0], [0, container.height, 0], [container.length, container.height, 0],
  //     [0, 0, container.width], [container.length, 0, container.width], [0, container.height, container.width], [container.length, container.height, container.width]
  //   ];
    
  //   corners.forEach(([x, y, z]) => {
  //     const corner = new THREE.Mesh(cornerGeometry, cornerMaterial);
  //     corner.position.set(x, y, z);
  //     containerGroup.add(corner);
  //   });

  //   sceneRef.current.add(containerGroup);
  // }, [container]);

  const drawContainer = useCallback(() => {
  if (!sceneRef.current) return;

  const existingContainer = sceneRef.current.getObjectByName('container');
  if (existingContainer) {
    sceneRef.current.remove(existingContainer);
  }

  const containerGroup = new THREE.Group();
  containerGroup.name = 'container';

  const containerGeometry = new THREE.BoxGeometry(container.length, container.height, container.width);
  const edges = new THREE.EdgesGeometry(containerGeometry);
  const containerMaterial = new THREE.LineBasicMaterial({ 
    color: 0x2563eb, 
    linewidth: 3,
    transparent: true,
    opacity: 0.9
  });
  const containerMesh = new THREE.LineSegments(edges, containerMaterial);
  containerMesh.position.set(container.length/2, container.height/2, container.width/2);
  containerGroup.add(containerMesh);

  const facesMaterial = new THREE.MeshLambertMaterial({ 
    color: 0xe0e7ff, 
    transparent: true, 
    opacity: 0.05,
    side: THREE.DoubleSide
  });
  const facesMesh = new THREE.Mesh(containerGeometry, facesMaterial);
  facesMesh.position.set(container.length/2, container.height/2, container.width/2);
  containerGroup.add(facesMesh);
  
  const floorGeometry = new THREE.PlaneGeometry(container.length, container.width);
  const floorMaterial = new THREE.MeshLambertMaterial({ 
    color: 0xf1f5f9, 
    transparent: true, 
    opacity: 0.8
  });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(container.length/2, 0, container.width/2);
  floor.receiveShadow = true;
  containerGroup.add(floor);

  const cornerGeometry = new THREE.SphereGeometry(0.02, 8, 8);
  const cornerMaterial = new THREE.MeshLambertMaterial({ color: 0x2563eb, transparent: true, opacity: 0.7 });
  
  const corners = [
    [0, 0, 0], [container.length, 0, 0], [0, container.height, 0], [container.length, container.height, 0],
    [0, 0, container.width], [container.length, 0, container.width], [0, container.height, container.width], [container.length, container.height, container.width]
  ];
  
  corners.forEach(([x, y, z]) => {
    const corner = new THREE.Mesh(cornerGeometry, cornerMaterial);
    corner.position.set(x, y, z);
    containerGroup.add(corner);
  });

  sceneRef.current.add(containerGroup);
}, [container]);

  const drawGrid = useCallback(() => {
    if (!sceneRef.current || !showGrid) return;

    const existingGrid = sceneRef.current.getObjectByName('grid');
    if (existingGrid) {
      sceneRef.current.remove(existingGrid);
    }

    const gridSize = Math.max(container.length, container.width);
    const divisions = Math.floor(gridSize * 10);
    
    const grid = new THREE.GridHelper(gridSize, divisions, 0xcccccc, 0xe2e8f0);
    grid.position.set(container.length/2, 0, container.width/2);
    grid.name = 'grid';
    sceneRef.current.add(grid);
  }, [container, showGrid]);

  const drawAxes = useCallback(() => {
    if (!sceneRef.current || !showAxes) return;

    const existingAxes = sceneRef.current.getObjectByName('axes');
    if (existingAxes) {
      sceneRef.current.remove(existingAxes);
    }

    const axesHelper = new THREE.AxesHelper(Math.max(container.length, container.width, container.height) * 0.7);
    axesHelper.name = 'axes';
    sceneRef.current.add(axesHelper);
  }, [container, showAxes]);

  const drawPackedBoxes = useCallback((result) => {
    if (!sceneRef.current || !result) return;

    const existingBoxes = sceneRef.current.getObjectByName('packedBoxes');
    if (existingBoxes) {
      sceneRef.current.remove(existingBoxes);
    }

    const boxGroup = new THREE.Group();
    boxGroup.name = 'packedBoxes';

    result.box_summary.forEach((boxType) => {
      const boxConfig = boxes.find(b => b.id === boxType.id);
      const color = boxConfig?.color || colorPalette[0].color;
      const borderColor = boxConfig?.border || colorPalette[0].border;
      
      boxType.boxes.forEach((box, boxIndex) => {
        const individualBoxGroup = new THREE.Group();
        
        const geometry = new THREE.BoxGeometry(box.length, box.height, box.width);
        
        const material = new THREE.MeshLambertMaterial({ 
          color: color,
          transparent: true,
          // opacity: transparentMode ? 0.6 : 0.9
          opacity: transparentMode ? 0.7 : 0.95
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        const edges = new THREE.EdgesGeometry(geometry);
        const wireframeMaterial = new THREE.LineBasicMaterial({ 
          color: borderColor || 0x1f2937, 
          // opacity: 0.9, 
          opacity: 1.0,
          transparent: true,
          linewidth: 2
        });
        const wireframeMesh = new THREE.LineSegments(edges, wireframeMaterial);
        
        individualBoxGroup.add(mesh);
        individualBoxGroup.add(wireframeMesh);
        
        // Add text labels if enabled
        if (showBoxLabels) {
          const textTexture = createTextTexture(`${boxType.id}\n#${boxIndex + 1}`, borderColor);
          const labelMaterial = new THREE.MeshBasicMaterial({ 
            map: textTexture, 
            transparent: true,
            opacity: 0.9,
            side: THREE.DoubleSide
          });
          
          // Create label on the top face
          const labelGeometry = new THREE.PlaneGeometry(
            Math.min(box.length * 0.8, 0.3), 
            Math.min(box.width * 0.8, 0.1)
          );
          const labelMesh = new THREE.Mesh(labelGeometry, labelMaterial);
          labelMesh.rotation.x = -Math.PI / 2;
          labelMesh.position.set(0, box.height/2 + 0.001, 0);
          individualBoxGroup.add(labelMesh);
          
          // Create label on the front face
          const frontLabelGeometry = new THREE.PlaneGeometry(
            Math.min(box.length * 0.8, 0.3), 
            Math.min(box.height * 0.8, 0.1)
          );
          const frontLabelMesh = new THREE.Mesh(frontLabelGeometry, labelMaterial);
          frontLabelMesh.position.set(0, 0, box.width/2 + 0.001);
          individualBoxGroup.add(frontLabelMesh);
        }
        
        individualBoxGroup.position.set(
          box.x + box.length/2,
          box.z + box.height/2,
          box.y + box.width/2
        );
        
        individualBoxGroup.userData = {
          boxType: boxType.id,
          dimensions: { length: box.length, width: box.width, height: box.height },
          position: { x: box.x, y: box.y, z: box.z },
          index: boxIndex,
          color: color,
          originalY: box.z + box.height/2,
          totalBoxes: boxType.count,
          boxNumber: boxIndex + 1
        };

        const hoverMaterial = new THREE.MeshLambertMaterial({
          color: color,
          transparent: true,
          opacity: 0.3,
          visible: false
        });
        
        const hoverMesh = new THREE.Mesh(
          new THREE.BoxGeometry(box.length + 0.02, box.height + 0.02, box.width + 0.02),
          hoverMaterial
        );
        individualBoxGroup.add(hoverMesh);
        individualBoxGroup.userData.hoverMesh = hoverMesh;

        boxGroup.add(individualBoxGroup);
      });
    });

    sceneRef.current.add(boxGroup);
  }, [boxes, transparentMode, showBoxLabels, createTextTexture]);

  const highlightBox = useCallback((box) => {
    if (!box) return;
    
    const packedBoxes = sceneRef.current.getObjectByName('packedBoxes');
    if (packedBoxes) {
      packedBoxes.children.forEach(child => {
        if (child.userData.hoverMesh) {
          child.userData.hoverMesh.visible = false;
        }
        child.children.forEach(mesh => {
          if (mesh.material && mesh.material.opacity !== undefined) {
            mesh.material.opacity = child === box ? 1.0 : 0.3;
          }
        });
      });
    }
    
    if (box.userData.hoverMesh) {
      box.userData.hoverMesh.visible = true;
      box.userData.hoverMesh.material.color.setHex(0xfbbf24);
    }
    
    const existingOutline = sceneRef.current.getObjectByName('selection-outline');
    if (existingOutline) {
      sceneRef.current.remove(existingOutline);
    }
    
    const outlineGeometry = new THREE.BoxGeometry(
      box.userData.dimensions.length + 0.04,
      box.userData.dimensions.height + 0.04,
      box.userData.dimensions.width + 0.04
    );
    const outlineMaterial = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.6,
      side: THREE.BackSide
    });
    const outline = new THREE.Mesh(outlineGeometry, outlineMaterial);
    outline.position.copy(box.position);
    outline.name = 'selection-outline';
    

    const pulseSpeed = 2;
    const animate = () => {
      if (outline.parent) {
        outline.material.opacity = 0.3 + 0.3 * Math.sin(Date.now() * 0.005 * pulseSpeed);
        requestAnimationFrame(animate);
      }
    };
    animate();
    
    sceneRef.current.add(outline);
  }, []);

  const clearHighlight = useCallback(() => {
    const packedBoxes = sceneRef.current.getObjectByName('packedBoxes');
    if (packedBoxes) {
      packedBoxes.children.forEach(child => {
        if (child.userData.hoverMesh) {
          child.userData.hoverMesh.visible = false;
        }
        child.children.forEach(mesh => {
          if (mesh.material && mesh.material.opacity !== undefined) {
            mesh.material.opacity = transparentMode ? 0.6 : 0.9;
          }
        });
      });
    }
    
    const existingOutline = sceneRef.current.getObjectByName('selection-outline');
    if (existingOutline) {
      sceneRef.current.remove(existingOutline);
    }
  }, [transparentMode]);

  useEffect(() => { drawContainer(); }, [container, drawContainer]);
  useEffect(() => { drawGrid(); }, [showGrid, drawGrid]);
  useEffect(() => {
    if (showAxes) {
      drawAxes();
    } else {
      const existingAxes = sceneRef.current?.getObjectByName('axes');
      if (existingAxes) sceneRef.current.remove(existingAxes);
    }
  }, [showAxes, drawAxes]);

  useEffect(() => {
    if (packingResult) {
      drawPackedBoxes(packingResult);
    }
  }, [transparentMode, showBoxLabels, drawPackedBoxes, packingResult]);

  const calculatePacking = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const requestData = {
        container: {
          length: container.length,
          width: container.width,
          height: container.height
        },
        boxes: boxes.map(box => ({
          id: box.id,
          length: box.length,
          width: box.width,
          height: box.height,
          quantity: box.quantity
        }))
      };

      console.log('🚀 Sending request to backend:', requestData);

      const response = await fetch('http://localhost:5000/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error(`Backend Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('✅ Backend response:', result);

      if (result.error) {
        throw new Error(result.error);
      }

      if (!result.box_summary || !Array.isArray(result.box_summary)) {
        throw new Error('Invalid response format from backend');
      }

      const enhancedResult = {
        ...result,
        algorithm_used: "3D Greedy Bin Packing Algorithm",
        calculation_time: "Real-time via Python",
        timestamp: new Date().toISOString()
      };

      setPackingResult(enhancedResult);
      drawPackedBoxes(enhancedResult);
      setShowStats(true);
      setServerStatus('connected');
      
      await fetchPackingHistory();
      
    } catch (err) {
      console.error('❌ Packing calculation failed:', err);
      setError(err.message || 'Failed to calculate packing optimization');
      setServerStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const fetchPackingHistory = async () => { 
    try {
      const response = await fetch('http://localhost:5000/resultall');
      if (response.ok) {
        const history = await response.json();
        setPackingHistory(history.slice(0, 20).reverse());
        console.log('📈 Loaded packing history:', history.length, 'results');
      }
    } catch (err) {
      console.error('Failed to fetch history:', err);
    }
  };

  const addBox = () => {
    const newBox = {
      id: `Box ${String.fromCharCode(65 + boxes.length)}`,
      length: 0.5,
      width: 0.4,
      height: 0.3,
      quantity: 1,
      color: colorPalette[boxes.length % colorPalette.length].color,
      border: colorPalette[boxes.length % colorPalette.length].border
    };
    setBoxes([...boxes, newBox]);
  };

  const removeBox = (index) => {
    setBoxes(boxes.filter((_, i) => i !== index));
  };

//   useEffect(() => {
// const fetchresultdata = async()=>{
// const result = await axios.get('')
// }
//   }, [fetchresultdata])
  
  const updateBox = (index, field, value) => {
    const updatedBoxes = [...boxes];
    if (field === 'color') {
      const colorData = colorPalette.find(c => c.color === value) || colorPalette[0];
      updatedBoxes[index].color = colorData.color;
      updatedBoxes[index].border = colorData.border;
    } else {
      updatedBoxes[index][field] = field === 'id' ? value : Math.max(0.1, parseFloat(value) || 0.1);
    }
    setBoxes(updatedBoxes);
  };

  const updateContainer = (field, value) => {
    setContainer(prev => ({
      ...prev,
      [field]: Math.max(0.5, parseFloat(value) || 0.5)
    }));
  };

  const resetView = () => {
    controlsRef.current = {
      isRotating: false,
      lastMouseX: 0,
      lastMouseY: 0,
      radius: 15,
      theta: 0,
      phi: Math.PI / 4
    };
    updateCameraPosition();
    setSelectedBox(null);
    clearHighlight();
  };

  const clearVisualization = () => {
    setPackingResult(null);
    setShowStats(false);
    setSelectedBox(null);
    setError(null);
    if (sceneRef.current) {
      const existingBoxes = sceneRef.current.getObjectByName('packedBoxes');
      if (existingBoxes) sceneRef.current.remove(existingBoxes);
      const existingOutline = sceneRef.current.getObjectByName('selection-outline');
      if (existingOutline) sceneRef.current.remove(existingOutline);
    }
  };

  const changeViewMode = (mode) => {
    setViewMode(mode);
    const controls = controlsRef.current;
    
    switch(mode) {
      case 'top':
        controls.theta = 0;
        controls.phi = 0.01;
        break;
      case 'front':
        controls.theta = 0;
        controls.phi = Math.PI / 2;
        break;
      case 'side':
        controls.theta = Math.PI / 2;
        controls.phi = Math.PI / 2;
        break;
      default:
        controls.theta = 0;
        controls.phi = Math.PI / 4;     
    }
    updateCameraPosition();
  };

  const exportResults = () => {
    if (!packingResult) return;
    
    const exportData = {
      ...packingResult,
      container_dimensions: container,
      input_boxes: boxes,
      export_timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `container-packing-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const loadHistoryResult = (historyItem) => {
    setPackingResult(historyItem);
    drawPackedBoxes(historyItem);
    setShowStats(true);
    setShowHistory(false);
    
    if (historyItem.container) {
      setContainer(historyItem.container);
    }
    if (historyItem.boxes_input) {
      setBoxes(historyItem.boxes_input.map((box, index) => ({
        ...box,
        color: boxes[index]?.color || colorPalette[index % colorPalette.length].color,
        border: boxes[index]?.border || colorPalette[index % colorPalette.length].border
      })));
    }
  };

  const getServerStatusIndicator = () => {
    switch(serverStatus) {
      case 'connected':
        return { color: 'bg-green-500', text: 'Connected', icon: '🟢' };
      case 'disconnected':
        return { color: 'bg-red-500', text: 'Disconnected', icon: '🔴' };
      case 'error':
        return { color: 'bg-yellow-500', text: 'Error', icon: '🟡' };
      default:
        return { color: 'bg-gray-500', text: 'Checking...', icon: '⚪' };
    }
  };

  const statusIndicator = getServerStatusIndicator();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="flex h-screen">
        
        <div className={`bg-white shadow-2xl transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-96'} flex flex-col border-r border-gray-200`}>
    
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            {!sidebarCollapsed && (
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold flex items-center gap-2">
                    <Truck size={24} />
                    3D Container Packing
                  </h1>
                  <p className="text-blue-100 text-sm">Smart Logistics Optimization Platform</p>
                </div>
                <button
                  onClick={() => setSidebarCollapsed(true)}
                  className="p-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
              </div>
            )}
            {sidebarCollapsed && (
              <button
                onClick={() => setSidebarCollapsed(false)}
                className="w-full p-2 rounded-lg hover:bg-blue-700 transition-colors flex justify-center"
              >
                <ChevronRight size={20} />
              </button>
            )}
          </div>

          {!sidebarCollapsed && (
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                <span className="text-sm font-medium text-gray-700">Backend Server</span>
                <span className='text-md text-align-justify'></span>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${statusIndicator.color}`}></div>
                  <span className="text-xs text-gray-600">{statusIndicator.text}</span>
                  <button
                    onClick={checkServerStatus}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    Refresh
                  </button>
                </div>
              </div>

          
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Package className="text-blue-600" size={20} />
                  Container Dimensions (m)
                </h3>
                <div className="space-y-3">
                  {[
                    { key: 'length', label: 'Length (L)', icon: '📏' },
                    { key: 'width', label: 'Width (W)', icon: '📐' },
                    { key: 'height', label: 'Height (H)', icon: '📊' }
                  ].map(({ key, label, icon }) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {icon} {label}
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={container[key]}
                        onChange={(e) => updateContainer(key, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        min="0.5"
                        placeholder={`Enter ${key}`}
                      />
                    </div>
                  ))}
                  <div className="text-xs text-gray-600 bg-white p-2 rounded border">
                    📦 Container Volume: <strong>{(container.length * container.width * container.height).toFixed(2)}m³</strong>
                  </div>
                </div>
              </div>

              {/* Enhanced Box Types */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <Package className="text-green-600" size={20} />
                    Box Types ({boxes.length})
                  </h3>
                  <button
                    onClick={addBox}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition-all transform hover:scale-105 shadow-md"
                  >
                    <Plus size={16} />
                    Add Box
                  </button>
                </div>
                
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {boxes.map((box, index) => (
                    <div 
                      key={index} 
                      className={`border-2 rounded-lg p-3 transition-all cursor-pointer ${
                        highlightedBoxType === box.id 
                          ? 'border-blue-400 bg-blue-50 shadow-md' 
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                      onMouseEnter={() => setHighlightedBoxType(box.id)}
                      onMouseLeave={() => setHighlightedBoxType(null)}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-3">
                          {/* Enhanced Color Picker */}
                          <div className="relative">
                            <div 
                              className="w-8 h-8 rounded-full shadow-md border-2 border-white cursor-pointer transition-transform hover:scale-110"
                              style={{ backgroundColor: box.color }}
                              title={`${box.id} Color`}
                            ></div>
                            <select
                              value={box.color}
                              onChange={(e) => updateBox(index, 'color', e.target.value)}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            >
                              {colorPalette.map((colorData, colorIndex) => (
                                <option key={colorIndex} value={colorData.color}>
                                  {colorData.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <input
                            type="text"
                            value={box.id}
                            onChange={(e) => updateBox(index, 'id', e.target.value)}
                            className="font-medium text-gray-800 bg-transparent border-none focus:outline-none text-lg"
                            placeholder="Box Name"
                          />
                        </div>
                        <button
                          onClick={() => removeBox(index)}
                          className="text-red-500 hover:text-red-700 p-2 rounded-full transition-colors hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { field: 'length', label: 'L', icon: '📏' },
                          { field: 'width', label: 'W', icon: '📐' },
                          { field: 'height', label: 'H', icon: '📊' },
                         
                        ].map(({ field, label, icon }) => (
                          <div key={field}>
                            <label className="block text-xs text-gray-500 mb-1 font-medium">
                              {icon} {label}
                            </label>
                            <input
                              type="number"
                              step={field === 'quantity' ? '1' : '0.1'}
                              value={box[field]}
                              onChange={(e) => updateBox(index, field, e.target.value)}
                              className="w-full px-2 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 transition-all"
                              min={field === 'quantity' ? '1' : '0.1'}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-gray-500 mt-2 bg-white p-2 rounded border flex justify-between">
                        <span>📦 Volume: {(box.length * box.width * box.height).toFixed(3)}m³</span>
                        <span>🔢 Total: {(box.length * box.width * box.height * box.quantity).toFixed(3)}m³</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={calculatePacking}
                  disabled={loading || serverStatus !== 'connected'}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-105 disabled:transform-none shadow-lg"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Calculating Optimization...
                    </>
                  ) : (
                    <>
                      <Play size={20} />
                      Calculate Optimal Packing
                    </>
                  )}
                </button>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={resetView}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all"
                  >
                    <RotateCcw size={16} />
                    Reset View
                  </button>
                  <button
                    onClick={clearVisualization}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all"
                  >
                    <Trash2 size={16} />
                    Clear
                  </button>
                </div>

                {packingHistory.length > 0 && (
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all"
                  >
                    <History size={16} />
                    View History ({packingHistory.length})
                  </button>
                )}
              </div>

              {/* Enhanced View Controls */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Settings size={16} />
                  3D View Controls
                </h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { mode: 'perspective', label: '🔄 3D View' },
                      { mode: 'top', label: '⬇️ Top View' },
                      { mode: 'front', label: '⬅️ Front View' },
                      { mode: 'side', label: '⬆️ Side View' }
                    ].map(({ mode, label }) => (
                      <button
                        key={mode}
                        onClick={() => changeViewMode(mode)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          viewMode === mode
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  
                 
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="text-red-500" size={16} />
                    <h4 className="font-medium text-red-800">Connection Error</h4>
                  </div>
                  <p className="text-red-700 text-sm mb-2">{error}</p>
                  <div className="text-xs text-red-600 bg-red-100 p-2 rounded">
                    🔧 Make sure your backend server is running on <strong>http://localhost:5000</strong>
                  </div>
                  <button
                    onClick={checkServerStatus}
                    className="mt-2 text-xs bg-red-100 hover:bg-red-200 text-red-700 px-2 py-1 rounded transition-colors"
                  >
                    Check Server Status Again
                  </button>
                </div>
              )}

              {/* API Information */}
              {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-1">
                  <Info size={14} />
                  Backend API Status
                </h4>
                <div className="text-xs text-blue-700 space-y-1">
                  <div>🔗 <strong>Base URL:</strong> http://localhost:5000</div>
                  <div>📡 <strong>Calculate:</strong> POST /calculate</div>
                  <div>📜 <strong>History:</strong> GET /resultall</div>
                  <div>🏥 <strong>Health:</strong> GET /test</div>
                </div>
              </div> */}
            </div>
          )}
        </div>

       
        <div className="flex-1 flex flex-col">
          {/* Enhanced Top Toolbar */}
          <div className="bg-white shadow-sm border-b border-gray-200 p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  🎯 3D Container Visualization
                </h2>
                {selectedBox && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
                    <Info size={14} />
                    Selected: <strong>{selectedBox.userData?.boxType || 'Unknown Box'}</strong> 
                    <span className="text-xs">#{selectedBox.userData?.boxNumber || '?'}</span>
                  </div>
                )}
                {packingResult && (
                  <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                    <Package size={14} />
                    <strong>{packingResult.total_boxes} boxes</strong> • <strong>{packingResult.space_utilization}%</strong> filled
                  </div>
                )}
              </div>
             
            </div>
          </div>

          <div className="flex-1 p-4">
            <div className="bg-white rounded-xl shadow-lg h-full relative overflow-hidden border border-gray-200">
              <div 
                ref={mountRef} 
                className="w-full h-full"
              />
              
              {/* Loading Overlay */}
              {loading && (
                <div className="absolute inset-0 bg-white bg-opacity-95 flex items-center justify-center backdrop-blur-sm z-50">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">🧠 Calculating Optimal Packing...</h3>
                    <p className="text-gray-600 text-sm">Running 3D bin packing algorithm</p>
                    <div className="mt-4 bg-blue-50 px-4 py-2 rounded-lg inline-block">
                      <p className="text-xs text-blue-700">⚡ Processing via Python backend</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Empty State */}
              {!packingResult && !loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Truck size={64} className="mx-auto mb-4 text-gray-300" />
                    <h3 className="text-xl font-semibold mb-2 text-gray-700">🚀 Ready for 3D Packing Optimization</h3>
                    <p className="text-sm text-gray-600 mb-4">Configure your container dimensions and box types above</p>
                    <p className="text-xs text-gray-500 bg-gray-50 px-4 py-2 rounded-lg inline-block">
                      Then click <strong>"Calculate Optimal Packing"</strong> to see the magic! ✨
                    </p>
                  </div>
                </div>
              )}

              {/* Server Connection Warning */}
              {serverStatus !== 'connected' && !loading && (
                <div className="absolute top-4 left-4 right-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-yellow-800">
                    <AlertCircle size={16} />
                    <span className="font-medium">Backend Server Not Connected</span>
                  </div>
                  <p className="text-xs text-yellow-700 mt-1">
                    Make sure your backend server is running on port 5000
                  </p>
                </div>
              )}

              {/* Enhanced Color Legend */}
              {showLegend && packingResult && (
                <div className="absolute top-4 left-4 bg-white bg-opacity-95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200 max-w-xs">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Palette size={16} />
                    🎨 Box Color Legend
                  </h4>
                  <div className="space-y-2">
                    {packingResult.box_summary.map((boxType, index) => {
                      const boxConfig = boxes.find(b => b.id === boxType.id);
                      return (
                        <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                          <div 
                            className="w-4 h-4 rounded-full shadow-sm border-2 border-white"
                            style={{ backgroundColor: boxConfig?.color || colorPalette[0].color }}
                          ></div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-800">{boxType.id}</div>
                            <div className="text-xs text-gray-500">
                              {boxType.count} boxes • {boxType.length}×{boxType.width}×{boxType.height}m
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => setShowLegend(false)}
                    className="mt-3 text-xs text-gray-500 hover:text-gray-700 w-full text-center"
                  >
                    Hide Legend
                  </button>
                </div>
              )}

              {!showLegend && packingResult && (
                <button
                  onClick={() => setShowLegend(true)}
                  className="absolute top-4 left-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-lg p-2 shadow-md border border-gray-200 transition-all"
                  title="Show Color Legend"
                >
                  <Palette size={16} className="text-gray-600" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

          
      {showStats && packingResult && (
         <div className="fixed bottom-4 right-4 bg-white rounded-xl shadow-2xl p-6 max-w-md border border-gray-200 max-h-96 overflow-y-auto z-40">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Package className="text-blue-600" size={20} />
              📊 Packing Results
            </h3>
            <button
              onClick={() => setShowStats(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded hover:bg-gray-100"
            >
              ✕
            </button>
          </div>
          
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 text-center border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">{packingResult.total_boxes}</div>
              <div className="text-xs text-blue-700 font-medium">📦 Total Boxes</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 text-center border border-green-200">
              <div className="text-2xl font-bold text-green-600">{packingResult.space_utilization}%</div>
              <div className="text-xs text-green-700 font-medium">🎯 Space Used</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 text-center border border-purple-200">
              <div className="text-2xl font-bold text-purple-600">
                {(container.length * container.width * container.height).toFixed(2)}
              </div>
              <div className="text-xs text-purple-700 font-medium">📏 Volume (m³)</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3 text-center border border-orange-200">
              <div className="text-2xl font-bold text-orange-600">
                {packingResult.container_full ? '✅ Full' : '⚠️ Partial'}
              </div>
              <div className="text-xs text-orange-700 font-medium">📊 Fill Status</div>
            </div>
          </div>

          {/* Algorithm Information */}
          {/* <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-xs text-gray-600 mb-1 font-medium">🧠 Algorithm Details</div>
            <div className="text-sm font-medium text-gray-800">{packingResult.algorithm_used || 'Greedy 3D Bin Packing'}</div>
            <div className="text-xs text-gray-500 mt-1">
              ⚡ {packingResult.calculation_time || 'Real-time'} • 
              🕒 {new Date(packingResult.timestamp || Date.now()).toLocaleTimeString()}
            </div>
          </div> */}

          {/* Enhanced Box Type Summary */}
          <div className="space-y-2 max-h-40 overflow-y-auto">
            <h4 className="font-medium text-gray-800 text-sm flex items-center gap-2">
              <Package size={14} />
              📋 Box Summary:
            </h4>
            {packingResult.box_summary.map((boxType, index) => {
              const boxConfig = boxes.find(b => b.id === boxType.id);
              return (
                <div key={index} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full shadow-sm border border-gray-300"
                      style={{ backgroundColor: boxConfig?.color || colorPalette[0].color }}
                    ></div>
                    <span className="text-sm font-medium">{boxType.id}</span>
                    <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded border">
                      {boxType.length}×{boxType.width}×{boxType.height}m
                    </span>
                  </div>
                  <div className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {boxType.count}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex gap-2">
            <button 
              onClick={exportResults}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1"
            >
              <Download size={12} />
              Export JSON
            </button>

<button 
  onClick={() => {
       const element = statsRef.current;
    const opt = {
      margin:       0.5,
      filename:     'packing-results.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  }}
  className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1"
>
  📄 Generate PDF
</button>

            <button 
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(packingResult, null, 2));
                alert('📋 Results copied to clipboard!');
              }}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1"
            >
              <Save size={12} />
              Copy Data
            </button>
          </div>
        </div>
      )}


      {showHistory && (
        <div className="fixed top-4 left-4 bg-white rounded-xl shadow-2xl p-4 w-80 max-h-96 overflow-y-auto border border-gray-200 z-40">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <History className="text-purple-600" size={20} />
              📜 Packing History
            </h3>
            <button
              onClick={() => setShowHistory(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded hover:bg-gray-100"
            >
              ✕
            </button>
          </div>
          
          {packingHistory.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <History size={32} className="mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No packing history yet</p>
              <p className="text-xs text-gray-400 mt-1">Run calculations to build history</p>
            </div>
          ) : (
            <div className="space-y-3">
              {packingHistory.map((item, index) => (
                <div 
                  key={index}
                  onClick={() => loadHistoryResult(item)}
                  className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium text-gray-800">
                      📊 Result #{packingHistory.length - index}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(item.created_at || item.timestamp || Date.now()).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500">Boxes:</span>
                      <div className="font-medium text-blue-600">{item.total_boxes}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Efficiency:</span>
                      <div className="font-medium text-green-600">{item.space_utilization}%</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Status:</span>
                      <div className="font-medium text-orange-600">
                        {item.container_full ? 'Full' : 'Partial'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    
      {selectedBox && (
        <div className="fixed top-4 right-4 bg-white rounded-xl shadow-2xl p-4 border border-gray-200 min-w-72 z-40">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Package className="text-blue-600" size={16} />
            🔍 Selected Box Details
          </h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-gray-600 font-medium">📦 Type:</span> 
              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full shadow-sm border border-gray-300"
                  style={{ backgroundColor: selectedBox.userData?.color || '#666' }}
                ></div>
                <span className="font-semibold text-blue-600">{selectedBox.userData?.boxType}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600 font-medium">🔢 Box Number:</span> 
              <span className="font-semibold text-purple-600">
                #{selectedBox.userData?.boxNumber} of {selectedBox.userData?.totalBoxes}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600 font-medium">📏 Dimensions (m):</span> 
              <span className="font-mono text-gray-800 text-sm">
                {selectedBox.userData?.dimensions?.length?.toFixed(2)} × 
                {selectedBox.userData?.dimensions?.width?.toFixed(2)} × 
                {selectedBox.userData?.dimensions?.height?.toFixed(2)}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600 font-medium">🎯 Position (m):</span> 
              <span className="font-mono text-gray-800 text-xs">
                ({selectedBox.userData?.position?.x?.toFixed(2)}, 
                {selectedBox.userData?.position?.y?.toFixed(2)}, 
                {selectedBox.userData?.position?.z?.toFixed(2)})
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span className="text-gray-600 font-medium">📊 Volume:</span> 
              <span className="font-medium text-purple-600">
                {(selectedBox.userData?.dimensions?.length * 
                  selectedBox.userData?.dimensions?.width * 
                  selectedBox.userData?.dimensions?.height)?.toFixed(3)} m³
              </span>
            </div>
          </div>
          
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => {
                setSelectedBox(null);
                clearHighlight();
              }}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm transition-colors"
            >
              Clear Selection
            </button>
            <button
              onClick={() => {
                const boxType = selectedBox.userData?.boxType;
                setHighlightedBoxType(boxType);
                setTimeout(() => setHighlightedBoxType(null), 2000);
              }}
              className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg text-sm transition-colors"
            >
              Highlight Type
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContainerPackingPlatform;
















    //   