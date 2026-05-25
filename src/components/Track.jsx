import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import Papa from 'papaparse';
import { Upload, FileText } from 'lucide-react';
import { Plus, Trash2, Package, Truck, Play, RotateCcw, ZoomIn, ZoomOut, Eye, EyeOff, ChevronLeft, ChevronRight, Settings, Info, History, Download, Save, AlertCircle, Palette, Grid3X3, Layers, Image as ImageIcon } from 'lucide-react';
const ContainerPackingPlatform = () => {
  const mountRef = useRef(null);
  
          
  const statsRef = useRef();
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);      
  const cameraRef = useRef(null);
  const animationRef = useRef(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());

  const [csvFile, setCsvFile] = useState(null);
const [csvError, setCsvError] = useState(null);
const [csvSuccess, setCsvSuccess] = useState(null);

  const controlsRef = useRef({
    isRotating: false,
    lastMouseX: 0,
    lastMouseY: 0,
    radius: 12, 
    theta: Math.PI / 4,
    phi: Math.PI / 3
  });
  
  
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

  // const [container, setContainer] = useState({
  //   length: 0,
  //   width: 0,
  //   height: 2.5 
  // });


  const [container, setContainer] = useState({
  length: 0,
  width: 0,
  height: 0,
  weight_capacity: 0
});
  

const [boxes, setBoxes] = useState([
  { name: 'Box A', length: 0.0, width: 0.0, height: 0.0, weight: 0.0, quantity: 0, color: colorPalette[0].color, border: colorPalette[0].border, selected: true },
  { name: 'Box B', length: 0.0, width: 0.0, height: 0.0, weight: 0.0, quantity: 0, color: colorPalette[1].color, border: colorPalette[1].border, selected: true },
  { name: 'Box C', length: 0.0, width: 0.0, height: 0.0, weight: 0.0, quantity: 0, color: colorPalette[2].color, border: colorPalette[2].border, selected: true },
  { name: 'Box D', length: 0.0, width: 0.0, height: 0.0, weight: 0.0, quantity: 0, color: colorPalette[3].color, border: colorPalette[3].border, selected: true }
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


  const [isRecordingVideo, setIsRecordingVideo] = useState(false);
const [videoProgress, setVideoProgress] = useState(0); 
const [videoBlob, setVideoBlob] = useState(null);
const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
const [pdfProgress, setPdfProgress] = useState(0);

const [animationState, setAnimationState] = useState({
  isPlaying: false,
  currentStep: 0,
  totalSteps: 0,
  
  speed: 1000,
  showOnlyCurrentStep: false,
  allBoxes: null
});


const generateBoxTypeImage = useCallback((boxTypeId) => {
  if (!packingResult) return null;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;

  const boxTypeData = packingResult.box_summary.find(box => box.name === boxTypeName);
  const boxConfig = boxes.find(b => b.name === boxTypeName);

  if (!boxTypeData || !boxConfig) return null;


  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#1f2937';
  ctx.font = 'bold 18px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(`${boxTypeId} - ${boxTypeData.count} Boxes`, canvas.width / 2, 30);


  const containerX = 50;
  const containerY = 60;
  const containerWidth = 300;
  const containerHeight = 200;

  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 2;
  ctx.strokeRect(containerX, containerY, containerWidth, containerHeight);
  ctx.fillStyle = '#e0e7ff';
  ctx.globalAlpha = 0.1;
  ctx.fillRect(containerX, containerY, containerWidth, containerHeight);
  ctx.globalAlpha = 1;

 
  const scaleX = containerWidth / container.length;
  const scaleY = containerHeight / container.height;
  const scale = Math.min(scaleX, scaleY) * 0.8;

  
  boxTypeData.boxes.forEach((box, index) => {
    const x = containerX + (box.x * scale);
    const y = containerY + containerHeight - ((box.z + box.height) * scale);
    const width = box.length * scale;
    const height = box.height * scale;
    const depth = box.width * scale * 0.5;

    drawIsoBox(ctx, x, y + height, width, height, depth, boxConfig.color, boxConfig.border);
    
   
    if (width > 20 && height > 15) {
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`${index + 1}`, x + width / 2, y + height / 2 + 3);
    }
  });

  ctx.fillStyle = '#374151';
  ctx.font = '12px Arial';
  ctx.textAlign = 'left';
  const statsY = canvas.height - 40;
  const totalVolume = boxTypeData.count * boxTypeData.length * boxTypeData.width * boxTypeData.height;
  const containerVolume = container.length * container.width * container.height;
  const percentage = ((totalVolume / containerVolume) * 100).toFixed(1);

  return canvas.toDataURL();
}, [packingResult, boxes, container]);



const generatePDFReport = useCallback(async () => {
  if (!packingResult) {
    alert('No packing result available to generate PDF');
    return;
  }             

  setIsGeneratingPDF(true);
  setPdfProgress(10);

  try {
   z
    if (!window.jspdf) {
      const script1 = document.createElement('script');
      script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      await new Promise((resolve, reject) => {
        script1.onload = resolve;
        script1.onerror = reject;
        document.head.appendChild(script1);
      });

      const script2 = document.createElement('script');
      script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js';
      await new Promise((resolve, reject) => {
        script2.onload = resolve;
        script2.onerror = reject;
        document.head.appendChild(script2);
      });
    }

    setPdfProgress(15);

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPosition = 20;


    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(37, 99, 235);
    doc.text('3D Container Packing Report', pageWidth / 2, yPosition, { align: 'center' });
    
    yPosition += 15;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(107, 114, 128);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, pageWidth / 2, yPosition, { align: 'center' });
    
    yPosition += 20;
    setPdfProgress(20);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('📦 Container Specifications', 20, yPosition);
    yPosition += 10;

    const containerData = [
      ['Dimension', 'Value', 'Unit'],
      ['Length', container.length.toString(), 'meters'],
      ['Width', container.width.toString(), 'meters'],
      ['Height', container.height.toString(), 'meters'],
      ['Total Volume', (container.length * container.width * container.height).toFixed(3), 'm³']
    ];

    doc.autoTable({
      startY: yPosition,
      head: [containerData[0]],
      body: containerData.slice(1),
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246], textColor: 255 },
      styles: { fontSize: 10 },
      margin: { left: 20, right: 20 }
    });

    yPosition = doc.lastAutoTable.finalY + 20;
    setPdfProgress(25);


    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('📊 Packing Summary', 20, yPosition);
    yPosition += 15;

    const summaryData = [
      ['Metric', 'Value'],
      ['Total Boxes Packed', packingResult.total_boxes.toString()],
      ['Space Utilization', `${packingResult.space_utilization}%`],
      ['Container Status', packingResult.container_full ? 'Completely Filled' : 'Partially Filled'],
      ['Box Types', packingResult.box_summary.length.toString()],
      ['Algorithm Used', 'Advanced 3D Bin Packing']
    ];

    doc.autoTable({
      startY: yPosition,
      head: [summaryData[0]],
      body: summaryData.slice(1),
      theme: 'striped',
      headStyles: { fillColor: [34, 197, 94], textColor: 255 },
      styles: { fontSize: 10 },
      margin: { left: 20, right: 20 }
    });

    yPosition = doc.lastAutoTable.finalY + 20;
    setPdfProgress(30);

    doc.addPage();
    yPosition = 20;

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('🎨 3D Box Type Layout Images', 20, yPosition);
    yPosition += 10;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(107, 114, 128);
    doc.text('Each image shows the layout of one specific box type within the container', 20, yPosition);
    yPosition += 15;

    const imagesPerRow = 2;
    const imageWidth = 80;
    const imageHeight = 60;
    const imageSpacingX = 10;
    const imageSpacingY = 85;
    let imageIndex = 0;
    let currentPageStartY = yPosition;

    for (let i = 0; i < packingResult.box_summary.length; i++) {
      const boxType = packingResult.box_summary[i];
   
      const imageDataUrl = generateBoxTypeImage(boxType.id);
      
      if (imageDataUrl) {
        const row = Math.floor(imageIndex / imagesPerRow);
        const col = imageIndex % imagesPerRow;
        
        const xPos = 20 + col * (imageWidth + imageSpacingX);
        const imageYPos = currentPageStartY + row * imageSpacingY;
        
  
        if (imageYPos + imageHeight + 35 > 280) {
          doc.addPage();
          currentPageStartY = 20;
          imageIndex = 0;
          
    
          const newRow = Math.floor(imageIndex / imagesPerRow);
          const newCol = imageIndex % imagesPerRow;
          const newXPos = 20 + newCol * (imageWidth + imageSpacingX);
          const newImageYPos = currentPageStartY + newRow * imageSpacingY;
          
    
          doc.addImage(imageDataUrl, 'PNG', newXPos, newImageYPos, imageWidth, imageHeight);
      
          doc.setFontSize(12);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(0, 0, 0);
          doc.text(`${boxType.id}`, newXPos + imageWidth/2, newImageYPos + imageHeight + 8, { align: 'center' });
         
          doc.setFontSize(8);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(107, 114, 128);
          doc.text(`${boxType.count} boxes | ${boxType.length}×${boxType.width}×${boxType.height}m`, 
                   newXPos + imageWidth/2, newImageYPos + imageHeight + 15, { align: 'center' });
          
          const totalVolume = (boxType.count * boxType.length * boxType.width * boxType.height).toFixed(3);
          const containerVolume = container.length * container.width * container.height;
          const fillPercentage = ((boxType.count * boxType.length * boxType.width * boxType.height) / containerVolume * 100).toFixed(1);
          
          doc.text(`Volume: ${totalVolume}m³ | Fill: ${fillPercentage}%`, 
                   newXPos + imageWidth/2, newImageYPos + imageHeight + 20, { align: 'center' });
        } else {
      
          doc.addImage(imageDataUrl, 'PNG', xPos, imageYPos, imageWidth, imageHeight);
          
       
          doc.setFontSize(12);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(0, 0, 0);
          doc.text(`${boxType.id}`, xPos + imageWidth/2, imageYPos + imageHeight + 8, { align: 'center' });
          

          doc.setFontSize(8);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(107, 114, 128);
          doc.text(`${boxType.count} boxes | ${boxType.length}×${boxType.width}×${boxType.height}m`, 
                   xPos + imageWidth/2, imageYPos + imageHeight + 15, { align: 'center' });
          
          const totalVolume = (boxType.count * boxType.length * boxType.width * boxType.height).toFixed(3);
          const containerVolume = container.length * container.width * container.height;
          const fillPercentage = ((boxType.count * boxType.length * boxType.width * boxType.height) / containerVolume * 100).toFixed(1);
          
          doc.text(`Volume: ${totalVolume}m³ | Fill: ${fillPercentage}%`, 
                   xPos + imageWidth/2, imageYPos + imageHeight + 20, { align: 'center' });
        }
        
        imageIndex++;
      }
      
   
      const imageProgress = 30 + (i / packingResult.box_summary.length) * 30;
      setPdfProgress(Math.round(imageProgress));
    }

    setPdfProgress(60);


    doc.addPage();
    yPosition = 20;

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('📋 Detailed Box Information', 20, yPosition);
    yPosition += 15;

    const boxData = [
      ['Box Type', 'Dimensions (L×W×H)', 'Quantity', 'Individual Volume', 'Total Volume']
    ];

    packingResult.box_summary.forEach(boxType => {
      const individualVolume = (boxType.length * boxType.width * boxType.height).toFixed(3);
      const totalVolume = (boxType.count * parseFloat(individualVolume)).toFixed(3);
      
      boxData.push([
        boxType.id,
        `${boxType.length}×${boxType.width}×${boxType.height}m`,
        boxType.count.toString(),
        `${individualVolume} m³`,
        `${totalVolume} m³`
      ]);
    });

    doc.autoTable({
      startY: yPosition,
      head: [boxData[0]],
      body: boxData.slice(1),
      theme: 'grid',
      headStyles: { fillColor: [168, 85, 247], textColor: 255 },
      styles: { fontSize: 9 },
      margin: { left: 20, right: 20 }
    });

    setPdfProgress(75);


    doc.addPage();
    yPosition = 20;

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('📍 Detailed Box Positions', 20, yPosition);
    yPosition += 15;

    packingResult.box_summary.forEach((boxType, typeIndex) => {
      if (yPosition > 220) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(`${boxType.id} - Position Details`, 20, yPosition);
      yPosition += 10;

      const positionData = [['Box #', 'X Position', 'Y Position', 'Z Position', 'Dimensions']];
      
      boxType.boxes.forEach((box, boxIndex) => {
        positionData.push([
          `#${boxIndex + 1}`,
          `${box.x.toFixed(2)}m`,
          `${box.y.toFixed(2)}m`,
          `${box.z.toFixed(2)}m`,
          `${box.length}×${box.width}×${box.height}m`
        ]);
      });

      doc.autoTable({
        startY: yPosition,
        head: [positionData[0]],
        body: positionData.slice(1),
        theme: 'striped',
        headStyles: { fillColor: [100, 100, 100], textColor: 255 },
        styles: { fontSize: 8 },
        margin: { left: 20, right: 20 }
      });

      yPosition = doc.lastAutoTable.finalY + 15;

      const positionProgress = 75 + (typeIndex / packingResult.box_summary.length) * 15;
      setPdfProgress(Math.round(positionProgress));
    });

    setPdfProgress(90);

 
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(107, 114, 128);
      doc.text(`Page ${i} of ${totalPages}`, pageWidth - 30, 285);
      doc.text('Generated by 3D Container Packing Platform', 20, 285);
    }

  
    const fileName = `Container_Packing_Report_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);

    setPdfProgress(100);
    
    setTimeout(() => {
      setIsGeneratingPDF(false);
      setPdfProgress(0);
      alert('✅ PDF report with 3D box images generated successfully!');
    }, 500);

  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('❌ Error generating PDF report. Please try again.');
    setIsGeneratingPDF(false);
    setPdfProgress(0);
  }
}, [packingResult, container, boxes, generateBoxTypeImage]);


  const [showIndividualBoxImages, setShowIndividualBoxImages] = useState(false);
const [selectedBoxTypeForImage, setSelectedBoxTypeForImage] = useState(null);





function drawIsoBox(ctx, x, y, w, h, d, fillColor, strokeColor) {

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + w, y);
  ctx.lineTo(x + w, y - h);
  ctx.lineTo(x, y - h);
  ctx.closePath();
  ctx.fillStyle = fillColor;
  ctx.fill();
  ctx.strokeStyle = strokeColor;
  ctx.stroke();

  
  ctx.beginPath();
  ctx.moveTo(x, y - h);
  ctx.lineTo(x + w, y - h);
  ctx.lineTo(x + w + d, y - h - d);
  ctx.lineTo(x + d, y - h - d);
  ctx.closePath();
  ctx.fillStyle = lighten(fillColor, 0.15);
  ctx.fill();
  ctx.stroke();


  ctx.beginPath();
  ctx.moveTo(x + w, y);
  ctx.lineTo(x + w + d, y - d);
  ctx.lineTo(x + w + d, y - h - d);
  ctx.lineTo(x + w, y - h);
  ctx.closePath();
  ctx.fillStyle = darken(fillColor, 0.15);
  ctx.fill();
  ctx.stroke();
}

function lighten(hex, amt) {
  const num = parseInt(hex.slice(1), 16);
  const r = Math.min(255, ((num >> 16) + amt * 255)) | 0;
  const g = Math.min(255, (((num >> 8) & 0x00FF) + amt * 255)) | 0;
  const b = Math.min(255, ((num & 0x0000FF) + amt * 255)) | 0;
  return `rgb(${r},${g},${b})`;
}

function darken(hex, amt) {
  const num = parseInt(hex.slice(1), 16);
  const r = Math.max(0, ((num >> 16) - amt * 255)) | 0;
  const g = Math.max(0, (((num >> 8) & 0x00FF) - amt * 255)) | 0;
  const b = Math.max(0, ((num & 0x0000FF) - amt * 255)) | 0;
  return `rgb(${r},${g},${b})`;
}


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
  const createTextTexture = useCallback((text, color = '#000000') => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    canvas.width = 256;
    canvas.height = 128; 
  
    context.fillStyle = 'rgba(255, 255, 255, 0.95)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.strokeStyle = color;
    context.lineWidth = 3;
    context.strokeRect(3, 3, canvas.width - 6, canvas.height - 6);
 
    context.fillStyle = color;
    context.font = 'bold 28px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
 
    const lines = text.split('\n');
    const lineHeight = 35;
    const startY = canvas.height / 2 - ((lines.length - 1) * lineHeight) / 2;
    
    lines.forEach((line, index) => {
      context.fillText(line, canvas.width / 2, startY + index * lineHeight);
    });
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

 
  const updateCameraPosition = useCallback(() => {
    if (!cameraRef.current) return;
    
    const controls = controlsRef.current;
    const centerX = container.length / 2;
    const centerY = container.height / 2;
    const centerZ = container.width / 2;
    
    const x = centerX + controls.radius * Math.sin(controls.phi) * Math.cos(controls.theta);
    const y = centerY + controls.radius * Math.cos(controls.phi);
    const z = centerZ + controls.radius * Math.sin(controls.phi) * Math.sin(controls.theta);
    
    cameraRef.current.position.set(x, y, z);
    cameraRef.current.lookAt(centerX, centerY, centerZ);
  }, [container]);
       

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
      opacity: 0.08,
      side: THREE.DoubleSide,
      depthWrite: false                   
    });
    const facesMesh = new THREE.Mesh(containerGeometry, facesMaterial);
    facesMesh.position.set(container.length/2, container.height/2, container.width/2);
    containerGroup.add(facesMesh);
    

    const floorGeometry = new THREE.PlaneGeometry(container.length, container.width);
    const floorMaterial = new THREE.MeshLambertMaterial({ 
      color: 0xf1f5f9, 
      transparent: true, 
      opacity: 0.9
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(container.length/2, 0, container.width/2);
    floor.receiveShadow = true;
    containerGroup.add(floor);


    const cornerGeometry = new THREE.SphereGeometry(0.03, 8, 8);
    const cornerMaterial = new THREE.MeshLambertMaterial({ color: 0x2563eb, transparent: true, opacity: 0.8 });
    
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




  const drawPackedBoxes = useCallback((result) => {
  if (!sceneRef.current || !result) return;

  const existingBoxes = sceneRef.current.getObjectByName('packedBoxes');
  if (existingBoxes) {
    sceneRef.current.remove(existingBoxes);
  }

  const boxGroup = new THREE.Group();
  boxGroup.name = 'packedBoxes';

  result.box_summary.forEach((boxType) => {
    const boxConfig = boxes.find(b => b.name === boxType.name);
    const color = boxConfig?.color || colorPalette[0].color;
    const borderColor = boxConfig?.border || colorPalette[0].border;

    boxType.boxes.forEach((box, boxIndex) => {
      const individualBoxGroup = new THREE.Group();

 
      const geometry = new THREE.BoxGeometry(box.length, box.height, box.width);
      const material = new THREE.MeshLambertMaterial({ 
        color: color,
        transparent: true,
        opacity: transparentMode ? 0.7 : 0.95
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;


      const edges = new THREE.EdgesGeometry(geometry);
      const wireframeMaterial = new THREE.LineBasicMaterial({ 
        color: borderColor || 0x1f2937, 
        opacity: 1.0,
        transparent: true,
        linewidth: 2
      });
      const wireframeMesh = new THREE.LineSegments(edges, wireframeMaterial);

      individualBoxGroup.add(mesh);
      individualBoxGroup.add(wireframeMesh);

      
      if (showBoxLabels) {
        const textTexture = createTextTexture(`${boxType.id}`, borderColor);
        const labelMaterial = new THREE.MeshBasicMaterial({ 
          map: textTexture, 
          transparent: true,
          opacity: 0.9,
          side: THREE.DoubleSide
        });

   
        const topLabelGeometry = new THREE.PlaneGeometry(
          Math.min(box.length * 0.9, 0.4), 
          Math.min(box.width * 0.9, 0.15)
        );
        const topLabelMesh = new THREE.Mesh(topLabelGeometry, labelMaterial);
        topLabelMesh.rotation.x = -Math.PI / 2;
        topLabelMesh.position.set(0, box.height / 2 + 0.002, 0);
        individualBoxGroup.add(topLabelMesh);
        

        const frontLabelGeometry = new THREE.PlaneGeometry(
          Math.min(box.length * 0.9, 0.4), 
          Math.min(box.height * 0.9, 0.15)
        );
        const frontLabelMesh = new THREE.Mesh(frontLabelGeometry, labelMaterial);
        frontLabelMesh.position.set(0, 0, box.width / 2 + 0.002);
        individualBoxGroup.add(frontLabelMesh);
      }

   
      individualBoxGroup.position.set(
        box.x + box.length / 2,
        box.z + box.height / 2,
        box.y + box.width / 2
      );

      individualBoxGroup.userData = {
        boxType: boxType.id,
        dimensions: { length: box.length, width: box.width, height: box.height },
        position: { x: box.x, y: box.y, z: box.z },
        index: boxIndex,
        color: color,
        originalY: box.z + box.height / 2,
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
      packedBoxes.children.forEach(child => { startPackingAnimation
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
  const startPackingAnimation = useCallback(() => {
  if (!packingResult) return;
  const allBoxes = [];
  packingResult.box_summary.forEach((boxType) => {
    boxType.boxes.forEach((box, boxIndex) => {
      allBoxes.push({
        ...box,
        boxType: boxType.name,
        boxIndex,
        boxConfig: boxes.find(b => b.name === boxType.name)
      });
    });
  });

  allBoxes.sort((a, b) => {
    if (a.z !== b.z) return a.z - b.z; 
    if (a.x !== b.x) return a.x - b.x;
    return a.y - b.y; 
  });
  
  setAnimationState(prev => ({
    ...prev,
    isPlaying: true,
    currentStep: 0,
    totalSteps: allBoxes.length,
    allBoxes: allBoxes
  }));
  
 
  const existingBoxes = sceneRef.current.getObjectByName('packedBoxes');
  if (existingBoxes) {
    sceneRef.current.remove(existingBoxes);
  }
}, [packingResult, boxes]);


const stopPackingAnimation = useCallback(() => {
  setAnimationState(prev => ({
    ...prev,
    isPlaying: false,
    currentStep: 0
  }));
  
  // Restore all boxes
  if (packingResult) {
    drawPackedBoxes(packingResult);
  }
}, [packingResult, drawPackedBoxes]);
const nextAnimationStep = useCallback(() => {
  setAnimationState(prev => ({
    ...prev,
    currentStep: Math.min(prev.currentStep + 1, prev.totalSteps)
  }));
}, []);


const previousAnimationStep = useCallback(() => {
  setAnimationState(prev => ({
    ...prev,
    currentStep: Math.max(prev.currentStep - 1, 0)
  }));
}, []);


const drawAnimatedBoxes = useCallback((stepCount, allBoxes) => {
  if (!sceneRef.current || !allBoxes) return;

  const existingBoxes = sceneRef.current.getObjectByName('packedBoxes');
  if (existingBoxes) {
    sceneRef.current.remove(existingBoxes);
  }

  const boxGroup = new THREE.Group();
  boxGroup.name = 'packedBoxes';

  
  const boxesToShow = allBoxes.slice(0, stepCount);
  
  boxesToShow.forEach((box, index) => {
    const individualBoxGroup = new THREE.Group();
    const color = box.boxConfig?.color || colorPalette[0].color;
    const borderColor = box.boxConfig?.border || colorPalette[0].border;

    const geometry = new THREE.BoxGeometry(box.length, box.height, box.width);
    const material = new THREE.MeshLambertMaterial({ 
      color: color,
      transparent: true,
      opacity: 0.95
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;


    const edges = new THREE.EdgesGeometry(geometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({ 
      color: borderColor || 0x1f2937, 
      opacity: 1.0,
      transparent: true,
      linewidth: 2
    });
    const wireframeMesh = new THREE.LineSegments(edges, wireframeMaterial);

    individualBoxGroup.add(mesh);
    individualBoxGroup.add(wireframeMesh);

    if (showBoxLabels) {
      const textTexture = createTextTexture(`${box.boxType}\n#${index + 1}`, borderColor);
      const labelMaterial = new THREE.MeshBasicMaterial({ 
        map: textTexture, 
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide
      });

      const topLabelGeometry = new THREE.PlaneGeometry(
        Math.min(box.length * 0.9, 0.4), 
        Math.min(box.width * 0.9, 0.15)
      );
      const topLabelMesh = new THREE.Mesh(topLabelGeometry, labelMaterial);
      topLabelMesh.rotation.x = -Math.PI / 2;
      topLabelMesh.position.set(0, box.height / 2 + 0.002, 0);
      individualBoxGroup.add(topLabelMesh);
    }

    // Position the box
    individualBoxGroup.position.set(
      box.x + box.length / 2,
      box.z + box.height / 2,
      box.y + box.width / 2
    );

    // Add animation effect for newest box (highlight current step)
    if (index === stepCount - 1) {
      const highlightGeometry = new THREE.BoxGeometry(
        box.length + 0.05, 
        box.height + 0.05, 
        box.width + 0.05
      );
      const highlightMaterial = new THREE.MeshBasicMaterial({
        color: 0xffff00,
        transparent: true,
        opacity: 0.3,
        side: THREE.BackSide
      });
      const highlightMesh = new THREE.Mesh(highlightGeometry, highlightMaterial);
      individualBoxGroup.add(highlightMesh);
      const animate = () => {
        if (highlightMesh.parent) {
          highlightMaterial.opacity = 0.2 + 0.3 * Math.sin(Date.now() * 0.01);
          requestAnimationFrame(animate);
        }
      };
      animate();
    }
    individualBoxGroup.userData = {
      boxType: box.boxType,
      dimensions: { length: box.length, width: box.width, height: box.height },
      position: { x: box.x, y: box.y, z: box.z },
      index: index,
      color: color,
      step: index + 1
    };

    boxGroup.add(individualBoxGroup);
  });

  sceneRef.current.add(boxGroup);
}, [showBoxLabels, createTextTexture]);

useEffect(() => {
  let intervalId;
  
  if (animationState.isPlaying && animationState.currentStep < animationState.totalSteps) {
    intervalId = setInterval(() => {
      setAnimationState(prev => {
        const nextStep = prev.currentStep + 1;
        if (nextStep >= prev.totalSteps) {
          return { ...prev, isPlaying: false, currentStep: nextStep };
        }
        return { ...prev, currentStep: nextStep };
      });
    }, animationState.speed);
  }
  
  return () => {
    if (intervalId) clearInterval(intervalId);
  };
}, [animationState.isPlaying, animationState.currentStep, animationState.totalSteps, animationState.speed]);
useEffect(() => {
  if (animationState.allBoxes && animationState.currentStep > 0) {
    drawAnimatedBoxes(animationState.currentStep, animationState.allBoxes);
  }
}, [animationState.currentStep, animationState.allBoxes, drawAnimatedBoxes]);
const generatePackingVideo = useCallback(async () => {
  if (!packingResult || !rendererRef.current || !sceneRef.current || !cameraRef.current) {
    alert('❌ No packing result available or 3D scene not ready');
    return;
  }
  setIsRecordingVideo(true);
  setVideoProgress(0);
  try {
    const allBoxes = [];
    packingResult.box_summary.forEach((boxType) => {
      boxType.boxes.forEach((box, boxIndex) => {
        allBoxes.push({
          ...box,
          boxType: boxType.id,
          boxIndex,
          boxConfig: boxes.find(b => b.name=== boxType.name)
        });
      });
    });

    allBoxes.sort((a, b) => {
      if (a.z !== b.z) return a.z - b.z;
      if (a.x !== b.x) return a.x - b.x;
      return a.y - b.y;
    });
    setVideoProgress(10);
    const canvas = rendererRef.current.domElement;
    const stream = canvas.captureStream(30);
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9',
      videoBitsPerSecond: 2500000 
    });
    const recordedChunks = [];
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };
    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      setVideoBlob(blob);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `3D_Packing_Animation_${new Date().toISOString().split('T')[0]}.webm`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setIsRecordingVideo(false);
      setVideoProgress(0);
      alert('🎥 Video downloaded successfully!');
    };
    setVideoProgress(20);
    mediaRecorder.start();
    const existingBoxes = sceneRef.current.getObjectByName('packedBoxes');
    if (existingBoxes) {
      sceneRef.current.remove(existingBoxes);
    }
    const boxGroup = new THREE.Group();
    boxGroup.name = 'packedBoxes'; 
    sceneRef.current.add(boxGroup);
    const frameDuration = 200; // ms per frame (slower for video)
    const pauseBetweenBoxes = 300; // ms pause between boxes
 setVideoProgress(30);
    for (let i = 0; i < allBoxes.length; i++) {
      const box = allBoxes[i];
      const color = box.boxConfig?.color || colorPalette[0].color;
      const borderColor = box.boxConfig?.border || colorPalette[0].border;
      const individualBoxGroup = new THREE.Group();
      const geometry = new THREE.BoxGeometry(box.length, box.height, box.width);
      const material = new THREE.MeshLambertMaterial({ 
        color: color,
        transparent: true,
        opacity: 0.95
      });
  const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      const edges = new THREE.EdgesGeometry(geometry);
      const wireframeMaterial = new THREE.LineBasicMaterial({ 
        color: borderColor || 0x1f2937, 
        opacity: 1.0,
        transparent: true,
        linewidth: 2
      });
      const wireframeMesh = new THREE.LineSegments(edges, wireframeMaterial);
      individualBoxGroup.add(mesh);
      individualBoxGroup.add(wireframeMesh);
      if (showBoxLabels) {
        const textTexture = createTextTexture(`${box.boxType}\n#${i + 1}`, borderColor);
        const labelMaterial = new THREE.MeshBasicMaterial({ 
          map: textTexture, 
          transparent: true,
          opacity: 0.9,
          side: THREE.DoubleSide
        });

        const topLabelGeometry = new THREE.PlaneGeometry(
          Math.min(box.length * 0.9, 0.4), 
          Math.min(box.width * 0.9, 0.15)
        );
        const topLabelMesh = new THREE.Mesh(topLabelGeometry, labelMaterial);
        topLabelMesh.rotation.x = -Math.PI / 2;
        topLabelMesh.position.set(0, box.height / 2 + 0.002, 0);
        individualBoxGroup.add(topLabelMesh);
      }

      // Start position (above container)
      const finalX = box.x + box.length / 2;
      const finalY = box.z + box.height / 2;
      const finalZ = box.y + box.width / 2;
      const startY = container.height + 2; // Start above container

      individualBoxGroup.position.set(finalX, startY, finalZ);

      // Add glow effect for new box
      const highlightGeometry = new THREE.BoxGeometry(
        box.length + 0.05, 
        box.height + 0.05, 
        box.width + 0.05
      );
      const highlightMaterial = new THREE.MeshBasicMaterial({
        color: 0xffff00,
        transparent: true,
        opacity: 0.4,
        side: THREE.BackSide
      });
      const highlightMesh = new THREE.Mesh(highlightGeometry, highlightMaterial);
      individualBoxGroup.add(highlightMesh);

      boxGroup.add(individualBoxGroup);

      
      const animateBoxDrop = () => {
        return new Promise((resolve) => {
          const startTime = Date.now();
          const dropDuration = frameDuration;

          const animateDrop = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / dropDuration, 1);
            
            
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            const currentY = startY + (finalY - startY) * easeProgress;
            individualBoxGroup.position.y = currentY;

           
            rendererRef.current.render(sceneRef.current, cameraRef.current);

            if (progress < 1) {
              requestAnimationFrame(animateDrop);
            } else {
           
              setTimeout(() => {
                if (highlightMesh.parent) {
                  individualBoxGroup.remove(highlightMesh);
                }
                resolve();
              }, 100);
            }
          };
          animateDrop();
        });
      };

   
      await animateBoxDrop();

      
      const progressPercent = 30 + (i / allBoxes.length) * 60;
      setVideoProgress(Math.round(progressPercent));


      await new Promise(resolve => setTimeout(resolve, pauseBetweenBoxes));

      // Render a few extra frames for stability
      for (let j = 0; j < 5; j++) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
        await new Promise(resolve => setTimeout(resolve, 20));
      }
    }

    setVideoProgress(95);

    const originalTheta = controlsRef.current.theta;
    const sweepDuration = 3000; 
    const sweepStart = Date.now();

    const animateCameraSweep = () => {
      const elapsed = Date.now() - sweepStart;
      const progress = elapsed / sweepDuration;

      if (progress < 1) {
        controlsRef.current.theta = originalTheta + (Math.PI * 2 * progress);
        updateCameraPosition();
        rendererRef.current.render(sceneRef.current, cameraRef.current);
        requestAnimationFrame(animateCameraSweep);
      } else {
        controlsRef.current.theta = originalTheta;
        updateCameraPosition();
        
       
        setTimeout(() => {
          mediaRecorder.stop();
          setVideoProgress(100);
        }, 500);
      }
    };

    animateCameraSweep();

  } catch (error) {
    console.error('Error generating video:', error);
    alert('❌ Error generating video. Please try again.');
    setIsRecordingVideo(false);
    setVideoProgress(0);
  }
}, [packingResult, boxes, container, showBoxLabels, createTextTexture, updateCameraPosition]);

const clearVisualization = () => {
  setPackingResult(null);
  setShowStats(false);
  setSelectedBox(null);
  setError(null);


  setAnimationState({
    isPlaying: false,
    currentStep: 0,
    totalSteps: 0,
    speed: 1000,
    showOnlyCurrentStep: false,
    allBoxes: null
  });
  
  if (sceneRef.current) {
    const existingBoxes = sceneRef.current.getObjectByName('packedBoxes');
    if (existingBoxes) sceneRef.current.remove(existingBoxes);
    const existingOutline = sceneRef.current.getObjectByName('selection-outline');
    if (existingOutline) sceneRef.current.remove(existingOutline);
  }
};




useEffect(() => {
  let intervalId;
  
  if (animationState.isPlaying && animationState.currentStep < animationState.totalSteps) {
    intervalId = setInterval(() => {
      setAnimationState(prev => {
        const nextStep = prev.currentStep + 1;
        if (nextStep >= prev.totalSteps) {
          return { ...prev, isPlaying: false, currentStep: nextStep };
        }
        return { ...prev, currentStep: nextStep };
      });
    }, animationState.speed);
  }
  
  return () => {
    if (intervalId) clearInterval(intervalId);
  };
}, [animationState.isPlaying, animationState.currentStep, animationState.totalSteps, animationState.speed]);


useEffect(() => {
  if (animationState.allBoxes && animationState.currentStep > 0) {
    drawAnimatedBoxes(animationState.currentStep, animationState.allBoxes);
  }
}, [animationState.currentStep, animationState.allBoxes, drawAnimatedBoxes]);

useEffect(() => {
  if (!mountRef.current) return;

  // Wait for the DOM to be fully rendered and sized
  const initializeScene = () => {
    const container = mountRef.current;
    if (!container) return;

    // Get actual dimensions, with fallbacks
    const width = container.clientWidth || container.offsetWidth || 800;
    const height = container.clientHeight || container.offsetHeight || 600;

    // Don't initialize if dimensions are still too small
    if (width < 10 || height < 10) {
      setTimeout(initializeScene, 50);
      return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      2000
    );
    updateCameraPosition();
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0xf8fafc, 1);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

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
    if (packingResult) drawPackedBoxes(packingResult);

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
      if (!mountRef.current || !renderer) return;
      const newWidth = mountRef.current.clientWidth || mountRef.current.offsetWidth;
      const newHeight = mountRef.current.clientHeight || mountRef.current.offsetHeight;
      
      if (newWidth > 0 && newHeight > 0) {
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Store cleanup function
    const cleanup = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement) {
        renderer.domElement.removeEventListener('mousedown', handleMouseDown);
        renderer.domElement.removeEventListener('mouseup', handleMouseUp);
        renderer.domElement.removeEventListener('mousemove', handleMouseMove);
        renderer.domElement.removeEventListener('wheel', handleWheel);
        renderer.domElement.removeEventListener('click', handleClick);
      }
      
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };

    return cleanup;
  };

  // Use setTimeout to ensure DOM is ready, or ResizeObserver for more robust detection
  const timeoutId = setTimeout(initializeScene, 0);

  // Alternative: Use ResizeObserver for more robust size detection
  let resizeObserver;
  if (window.ResizeObserver) {
    resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry && entry.contentRect.width > 10 && entry.contentRect.height > 10) {
        clearTimeout(timeoutId);
        resizeObserver.disconnect();
        const cleanup = initializeScene();
        // Store cleanup for the main return
        currentCleanup = cleanup;
      }
    });
    resizeObserver.observe(mountRef.current);
  }

  let currentCleanup;

  return () => {
    clearTimeout(timeoutId);
    if (resizeObserver) {
      resizeObserver.disconnect();
    }
    if (currentCleanup) {
      currentCleanup();
    }
  };
}, []);
//   useEffect(() => {
//     if (!mountRef.current) return;

//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0xf8fafc);
//     sceneRef.current = scene;

//     const camera = new THREE.PerspectiveCamera(
//       75,
//       mountRef.current.clientWidth / mountRef.current.clientHeight,
//       0.1,
//       2000
//     );
//     updateCameraPosition();
//     cameraRef.current = camera;

//     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     // renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
// const width = mountRef.current.clientWidth || 100;
// const height = mountRef.current.clientHeight || 100;
// renderer.setSize(width, height);

//     renderer.shadowMap.enabled = true;
//     renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//     renderer.setClearColor(0xf8fafc, 1);
//     mountRef.current.appendChild(renderer.domElement);
//     rendererRef.current = renderer;

//     const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
//     scene.add(ambientLight);

//     const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
//     directionalLight.position.set(10, 10, 5);
//     directionalLight.castShadow = true;
//     directionalLight.shadow.mapSize.width = 4096;
//     directionalLight.shadow.mapSize.height = 4096;
//     directionalLight.shadow.camera.near = 0.1;
//     directionalLight.shadow.camera.far = 50;
//     directionalLight.shadow.camera.left = -20;
//     directionalLight.shadow.camera.right = 20;
//     directionalLight.shadow.camera.top = 20;
//     directionalLight.shadow.camera.bottom = -20;
//     scene.add(directionalLight);

//     const innerLight1 = new THREE.DirectionalLight(0xffffff, 0.4);
//     innerLight1.position.set(-5, 5, -5);
//     scene.add(innerLight1);

//     const innerLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
//     innerLight2.position.set(5, -5, 5);
//     scene.add(innerLight2);
    
//     const rimLight = new THREE.DirectionalLight(0x4f46e5, 0.4);
//     rimLight.position.set(-5, 2.5, -5);
//     scene.add(rimLight);

//     const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
//     fillLight.position.set(-10, -5, 10);
//     scene.add(fillLight);

//     const handleMouseDown = (event) => {
//       controlsRef.current.isRotating = true;
//       controlsRef.current.lastMouseX = event.clientX;
//       controlsRef.current.lastMouseY = event.clientY;
//       renderer.domElement.style.cursor = 'grabbing';
//     };

//     const handleMouseUp = () => {
//       controlsRef.current.isRotating = false;
//       renderer.domElement.style.cursor = 'grab';
//     };

//     const handleMouseMove = (event) => {
//       const rect = renderer.domElement.getBoundingClientRect();
//       mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
//       mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

//       if (controlsRef.current.isRotating) {
//         const deltaX = event.clientX - controlsRef.current.lastMouseX;
//         const deltaY = event.clientY - controlsRef.current.lastMouseY;
        
//         controlsRef.current.theta -= deltaX * 0.01;
//         controlsRef.current.phi = Math.max(0.1, Math.min(Math.PI - 0.1, controlsRef.current.phi + deltaY * 0.01));
        
//         updateCameraPosition();
        
//         controlsRef.current.lastMouseX = event.clientX;
//         controlsRef.current.lastMouseY = event.clientY;
//       }
//     };

//     const handleWheel = (event) => {
//       event.preventDefault();
//       controlsRef.current.radius = Math.max(5, Math.min(50, controlsRef.current.radius + event.deltaY * 0.01));
//       updateCameraPosition();
//     };

//     const handleClick = (event) => {
//       if (!packingResult) return;
      
//       raycasterRef.current.setFromCamera(mouseRef.current, camera);
//       const packedBoxes = scene.getObjectByName('packedBoxes');
//       if (packedBoxes) {
//         const intersects = raycasterRef.current.intersectObjects(packedBoxes.children, true);
//         if (intersects.length > 0) {
//           let clickedObject = intersects[0].object.parent;
     
//           while (clickedObject && !clickedObject.userData.boxType) {
//             clickedObject = clickedObject.parent;
//           }
//           if (clickedObject && clickedObject.userData.boxType) {
//             setSelectedBox(clickedObject);
//             highlightBox(clickedObject);
//           }
//         } else {
//           setSelectedBox(null);
//           clearHighlight();
//         }
//       }
//     };

//     renderer.domElement.addEventListener('mousedown', handleMouseDown);
//     renderer.domElement.addEventListener('mouseup', handleMouseUp);
//     renderer.domElement.addEventListener('mousemove', handleMouseMove);
//     renderer.domElement.addEventListener('wheel', handleWheel);
//     renderer.domElement.addEventListener('click', handleClick);
//     renderer.domElement.style.cursor = 'grab';

//     drawContainer();
//     drawGrid();
//     if (showAxes) drawAxes();
//     if (packingResult) drawPackedBoxes(packingResult);

//     const animate = () => {
//       animationRef.current = requestAnimationFrame(animate);
  
//       if (animateBoxes && packingResult) {
//         const packedBoxes = scene.getObjectByName('packedBoxes');
//         if (packedBoxes) {
//           const time = Date.now() * 0.001;
//           packedBoxes.children.forEach((boxGroup, index) => {
//             if (boxGroup.userData.originalY !== undefined) {
//               const floatOffset = Math.sin(time + index * 0.5) * 0.02;
//               boxGroup.position.y = boxGroup.userData.originalY + floatOffset;
//             }
//           });
//         }
//       }
      
//       renderer.render(scene, camera);
//     };
//     animate();

//     const handleResize = () => {
//       if (!mountRef.current) return;
//       const width = mountRef.current.clientWidth;
//       const height = mountRef.current.clientHeight;
//       camera.aspect = width / height;
//       camera.updateProjectionMatrix();
//       renderer.setSize(width, height);
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//       window.removeEventListener('resize', handleResize);
//       renderer.domElement.removeEventListener('mousedown', handleMouseDown);
//       renderer.domElement.removeEventListener('mouseup', handleMouseUp);
//       renderer.domElement.removeEventListener('mousemove', handleMouseMove);
//       renderer.domElement.removeEventListener('wheel', handleWheel);
//       renderer.domElement.removeEventListener('click', handleClick);
      
//       if (mountRef.current && renderer.domElement) {
//         mountRef.current.removeChild(renderer.domElement);
//       }
//       renderer.dispose();
//     };
//   }, []);

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
  // const selectedBoxes = boxes.filter(box => box.selected);

  // if (selectedBoxes.length === 0) {
  //   setError('Please select at least one box type to pack');
  //   setLoading(false);
  //   return;
  // }

 if (container.length <= 0 || container.width <= 0 || container.height <= 0) {
  setError('❌ Invalid container dimensions.');
  setLoading(false);
  alert('❌ Container length, width, and height must be > 0.');
  return;
}

if (container.weight_capacity <= 0) {
  setError('❌ Invalid container weight capacity.');
  setLoading(false);
  alert('❌ Weight capacity must be > 0.');
  return;
}

const selectedBoxes = boxes.filter(box => box.selected);

if (selectedBoxes.length === 0) {
  setError('❌ No boxes selected.');
  setLoading(false);
  alert('❌ Select at least one box.');
  return;
}

const invalidBoxes = selectedBoxes.filter(
  box => box.length <= 0 || box.width <= 0 || box.height <= 0 || box.weight <= 0 || box.quantity <= 0
);

if (invalidBoxes.length > 0) {
  const invalidBoxNames = invalidBoxes.map(box => box.name).join(', ');
  setError(`❌ Invalid box data: ${invalidBoxNames}.`);
  setLoading(false);
  alert(`❌ ${invalidBoxNames} have invalid dimensions, weight, or quantity.`);
  return;
}

  try {
    const requestData = {
      container: {
        length: container.length,
        width: container.width,
        height: container.height,
        weight_capacity: container.weight_capacity
      },
      boxes: selectedBoxes.map(box => ({
        name: box.name,
        length: box.length,
        width: box.width,
        height: box.height,
        weight: box.weight,
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

    setPackingResult(result);
    drawPackedBoxes(result);
    setShowStats(true);
    setServerStatus('connected');
    
  } catch (err) {
    console.error('❌ Packing calculation failed:', err);
    setError(err.message || 'Failed to calculate packing optimization');
    setServerStatus('error');
  } finally {
    setLoading(false);
  }
};
//   const calculatePacking = async () => {
//   setLoading(true);
//   setError(null);
//   const selectedBoxes = boxes.filter(box => box.selected);

//   if (selectedBoxes.length === 0) {
//     setError('Please select at least one box type to pack');
//     setLoading(false);
//     return;
//   }

//   try {
//     const requestData = {
//       container: {
//         length: container.length,
//         width: container.width,
//         height: container.height
//       },
//       // Only send selected boxes to backend
//       boxes: selectedBoxes.map(box => ({
//         name: box.name,
//         length: box.length,
//         width: box.width,
//         height: box.height,
//         quantity: box.quantity
//       }))
//     };

//     console.log('🚀 Sending request to backend:', requestData);
//     console.log('📦 Selected boxes for packing:', selectedBoxes.length);

//     const response = await fetch('http://localhost:5000/calculate', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//       },
//       body: JSON.stringify(requestData)
//     });

//     if (!response.ok) {
//       throw new Error(`Backend Error: ${response.status} ${response.statusText}`);
//     }

//     const result = await response.json();
//     console.log('✅ Backend response:', result);

//     if (result.error) {
//       throw new Error(result.error);
//     }

//     if (!result.box_summary || !Array.isArray(result.box_summary)) {
//       throw new Error('Invalid response format from backend');
//     }

//     const enhancedResult = {
//       ...result,
//       algorithm_used: "3D Greedy Bin Packing Algorithm",
//       calculation_time: "Real-time via Python",
//       timestamp: new Date().toISOString()
//     };

//     setPackingResult(enhancedResult);
//     drawPackedBoxes(enhancedResult);
//     setShowStats(true);
//     setServerStatus('connected');
    
//   } catch (err) {
//     console.error('❌ Packing calculation failed:', err);
//     setError(err.message || 'Failed to calculate packing optimization');
//     setServerStatus('error');
//   } finally {
//     setLoading(false);
//   }
// };

  const addBox = () => {
    const newBox = {
    name: `Box ${String.fromCharCode(65 + boxes.length)}`,
      length: 0.5,
      width: 0.4,
       weight: 1.0,
      height: 0.3,
      quantity: 1,
      color: colorPalette[boxes.length % colorPalette.length].color,
      border: colorPalette[boxes.length % colorPalette.length].border,
      selected: true
    };
    setBoxes([...boxes, newBox]);
  };

  const removeBox = (index) => {
    setBoxes(boxes.filter((_, i) => i !== index));
  };
  
  const updateBox = (index, field, value) => {
  const updatedBoxes = [...boxes];
  if (field === 'color') {
    const colorData = colorPalette.find(c => c.color === value) || colorPalette[0];
    updatedBoxes[index].color = colorData.color;
    updatedBoxes[index].border = colorData.border;
  } else if (field === 'selected') {
    updatedBoxes[index].selected = value;
  } else {
    updatedBoxes[index][field] = field === 'name' ? value : Math.max(0.1, parseFloat(value) || 0.1);
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
      radius: 12,
      theta: Math.PI / 4,
      phi: Math.PI / 3
    };
    updateCameraPosition();
    setSelectedBox(null);
    clearHighlight();
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
        controls.theta = Math.PI / 4;
        controls.phi = Math.PI / 3;     
    }
    updateCameraPosition();
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
  const handleCSVUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  setCsvFile(file);
  setCsvError(null);
  setCsvSuccess(null);

  // Validate file type
  if (!file.name.toLowerCase().endsWith('.csv')) {
    setCsvError('Please select a valid CSV file');
    return;
  }

  // Parse CSV file
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
    complete: (results) => {
      try {
        if (results.errors && results.errors.length > 0) {
          setCsvError(`CSV parsing error: ${results.errors[0].message}`);
          return;
        }

        const csvData = results.data;
        if (!csvData || csvData.length === 0) {
          setCsvError('CSV file is empty or invalid');
          return;
        }

        // Validate required columns
        const requiredColumns = ['name', 'length', 'width', 'height', 'quantity'];
        const headers = Object.keys(csvData[0]).map(h => h.toLowerCase().trim());
        
        const missingColumns = requiredColumns.filter(col => 
          !headers.some(header => header.includes(col))
        );

        if (missingColumns.length > 0) {
          setCsvError(`Missing required columns: ${missingColumns.join(', ')}`);
          return;
        }

        // Process and convert CSV data to box format
        const processedBoxes = csvData.map((row, index) => {
          // Find column values (case-insensitive)
          const getColumnValue = (columnName) => {
            const key = Object.keys(row).find(k => 
              k.toLowerCase().trim().includes(columnName.toLowerCase())
            );
            return row[key];
          };

          const id = getColumnValue('name') || `Box ${String.fromCharCode(65 + index)}`;
          const length = parseFloat(getColumnValue('length')) || 0.5;
          const width = parseFloat(getColumnValue('width')) || 0.4;
          const height = parseFloat(getColumnValue('height')) || 0.3;
          const quantity = parseInt(getColumnValue('quantity')) || 1;

          // Validate values
          if (length <= 0 || width <= 0 || height <= 0 || quantity <= 0) {
            throw new Error(`Invalid dimensions or quantity in row ${index + 1}`);
          }

          return {
            name: id.toString(),
            length: Math.max(0.1, length),
            width: Math.max(0.1, width),
            height: Math.max(0.1, height),
            quantity: Math.max(1, quantity),
            color: colorPalette[index % colorPalette.length].color,
            border: colorPalette[index % colorPalette.length].border,
            selected: true 
          };
        });

        // Update boxes state with CSV data
        setBoxes(processedBoxes);
        setCsvSuccess(`✅ Successfully loaded ${processedBoxes.length} box types from CSV`);
        
        // Clear any existing packing results
        clearVisualization();
        
        console.log('📊 CSV data loaded:', processedBoxes);

      } catch (error) {
        console.error('CSV processing error:', error);
        setCsvError(`Error processing CSV: ${error.message}`);
      }
    },
    error: (error) => {
      setCsvError(`Failed to read CSV file: ${error.message}`);
    }
  });
};

// const downloadCSVTemplate = () => {
//   const csvContent = `id,length,width,height,quantity
// Box A,0.5,0.4,0.3,20
// Box B,0.6,0.5,0.4,15
// Box C,0.8,0.6,0.5,10
// Box D,0.7,0.3,0.4,12`;

//   const blob = new Blob([csvContent], { type: 'text/csv' });
//   const url = URL.createObjectURL(blob);
//   const link = document.createElement('a');
//   link.href = url;
//   link.download = 'box_data_template.csv';
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
//   URL.revokeObjectURL(url);
// };

const downloadCSVTemplate = () => {
  const csvContent = `name,length,width,height,weight,quantity
Box A,0.5,0.4,0.3,1.0,20
Box B,0.6,0.5,0.4,1.5,15
Box C,0.8,0.6,0.5,2.0,10
Box D,0.7,0.3,0.4,1.2,12`;

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'box_data_template.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
// const exportCurrentBoxesToCSV = () => {
//   if (boxes.length === 0) {
//     alert('No box data to export');
//     return;
//   }

//   const csvContent = [
//     'id,length,width,height,quantity',
//     ...boxes.map(box => 
//       `${box.name},${box.length},${box.width},${box.height},${box.quantity}`
//     )
//   ].join('\n');

//   const blob = new Blob([csvContent], { type: 'text/csv' });
//   const url = URL.createObjectURL(blob);
//   const link = document.createElement('a');
//   link.href = url;
//   link.download = `box_data_${new Date().toISOString().split('T')[0]}.csv`;
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
//   URL.revokeObjectURL(url);
// };
const exportCurrentBoxesToCSV = () => {
  if (boxes.length === 0) {
    alert('No box data to export');
    return;
  }

  const csvContent = [
    'name,length,width,height,weight,quantity',
    ...boxes.map(box => 
      `${box.name},${box.length},${box.width},${box.height},${box.weight},${box.quantity}`
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `box_data_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
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
                  {/* <p className="text-blue-100 text-sm">Smart Logistics Optimization Platform</p> */}
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
           
                  Container Size (m)
                </h3>
                <div className="space-y-3">
                  {[
             

        { key: 'length', label: 'Length (L)', icon: '📏', unit: 'm' },
      { key: 'width', label: 'Width (W)', icon: '📐', unit: 'm' },
      { key: 'height', label: 'Height (H)', icon: '📊', unit: 'm' },
      { key: 'weight_capacity', label: 'Weight Capacity', icon: '⚖️', unit: 'kg' }

                  ].map(({ key, label, icon }) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {icon} {label}
                      </label>
                      <input
                        type="number"
                       
                         step={key === 'weight_capacity' ? '1' : '0.1'}
                        value={container[key]}
                        onChange={(e) => updateContainer(key, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                       
                         min={key === 'weight_capacity' ? '1' : '0.5'}
                        placeholder={`Enter ${key}`}
                      />
                           {/* <span className="text-xs text-gray-500 mt-1 block">{unit}</span> */}
                    </div>
                  ))}
                  {/* <div className="text-xs text-gray-600 bg-white p-2 rounded border">
                    📦 Container Volume: <strong>{(container.length * container.width * container.height).toFixed(2)}m³</strong>
                  </div> */}

                    <div className="text-xs text-gray-600 bg-white p-2 rounded border">
      📦 Volume: <strong>{(container.length * container.width * container.height).toFixed(2)}m³</strong><br/>
      ⚖️ Weight Limit: <strong>{container.weight_capacity}kg</strong>
    </div>
                </div>
              </div>
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
                
 <div className="mb-4 p-3 bg-white rounded-lg border border-gray-200">
    <div className="flex items-center justify-between mb-3">
      <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        <Upload size={16} className="text-blue-600" />
        📄 CSV Data
      </h4>
    </div>
    
    <div className="space-y-2">

      <div className="relative">
        <input
          type="file"
          accept=".csv"
          onChange={handleCSVUpload}
          className="hidden"
          id="csv-upload"
        />
        
        <label
          htmlFor="csv-upload"
          className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 border-2 border-dashed border-blue-300 rounded-lg px-3 py-2 cursor-pointer transition-all flex items-center justify-center gap-2 text-sm font-medium"
        >
          <Upload size={16} />
          Upload CSV File
        </label>
      </div>

    
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={downloadCSVTemplate}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-xs flex items-center justify-center gap-1 transition-all"
        >
          <Download size={12} />
          Template
        </button>
        <button
          onClick={exportCurrentBoxesToCSV}
          disabled={boxes.length === 0}
          className="bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-700 px-3 py-2 rounded-lg text-xs flex items-center justify-center gap-1 transition-all"
        >
          <FileText size={12} />
          Export
        </button>
      </div>
    </div>


    {csvError && (
      <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
        ❌ {csvError}
      </div>
    )}
    
    {csvSuccess && (
      <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded text-xs text-green-700">
        {csvSuccess}
      </div>
    )}
  </div>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                
{boxes.map((box, index) => (
  <div 
    key={index} 
    className={`border-2 rounded-lg p-3 transition-all cursor-pointer ${
      highlightedBoxType === box.name
        ? 'border-blue-400 bg-blue-50 shadow-md' 
        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
    }`}
    onMouseEnter={() => setHighlightedBoxType(box.id)}
    onMouseLeave={() => setHighlightedBoxType(null)}
  >
    {/* Top Row */}
    <div className="flex justify-between items-center mb-3">
      <div className="flex items-center gap-3">
      
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={box.selected}
            onChange={(e) => updateBox(index, 'selected', e.target.checked)}
            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
          />
        </div>


        <button
          onClick={() => removeBox(index)}
          className="text-red-500 hover:text-red-700 p-1 rounded-full transition-colors hover:bg-red-50"
        >
          <Trash2 size={16} />
        </button>

        <div className="relative">
          <div 
            className="w-8 h-8 rounded-full shadow-md border-2 border-white cursor-pointer transition-transform hover:scale-110"
            style={{ backgroundColor: box.color }}
            title={`${box.name} Color`}
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
          value={box.name}
          onChange={(e) => updateBox(index, 'name', e.target.value)}
          className="font-medium text-gray-800 bg-transparent border-none focus:outline-none text-lg"
          placeholder="Box Name"
        />   
      </div>
    </div>

    {/* Dimensions & Quantity Inputs */}
    <div className="grid grid-cols-4 gap-2">
      {[
        { field: 'length', label: 'L', icon: '📏' },
        { field: 'width', label: 'W', icon: '📐' },
        { field: 'height', label: 'H', icon: '📊' },
        { field: 'quantity', label: 'Qty', icon: '🔢' },
        { field: 'weight', label: 'Wt', icon: '⚖️' },
      ].map(({ field, label, icon }) => (
        <div key={field}>
          <label className="block text-xs text-gray-500 mb-1 font-medium">
            {icon} {label}
          </label>
          <input
            type="number"
            // step={field === 'quantity' ? '1' : '0.1'}
                step={field === 'quantity' ? '1' : field === 'weight' ? '0.1' : '0.1'}
            value={box[field]}
            onChange={(e) => updateBox(index, field, e.target.value)}
            className="w-full px-2 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 transition-all"
            min={field === 'quantity' ? '1' : '0.1'}
          />
        </div>
      ))}
    </div>

    {/* Volume & Total Info */}



    <div className={`text-xs text-gray-500 mt-2 bg-white p-2 rounded border flex justify-between ${!box.selected ? 'bg-gray-100 text-gray-400' : ''}`}>
  <span>📦 Vol: {(box.length * box.width * box.height).toFixed(3)}m³</span>
  <span>⚖️ Wt: {box.weight}kg</span>
  <span>🔢 Total: {(box.length * box.width * box.height * box.quantity).toFixed(3)}m³</span>
  {!box.selected && <span className="text-red-500 font-medium">Not Selected</span>}
</div>
    <div
      className={`text-xs text-gray-500 mt-2 bg-white p-2 rounded border flex justify-between ${
        !box.selected ? 'bg-gray-100 text-gray-400' : ''
      }`}
    >
      <span>📦 Volume: {(box.length * box.width * box.height).toFixed(3)}m³</span>
      <span>🔢 Total: {(box.length * box.width * box.height * box.quantity).toFixed(3)}m³</span>
      
      {!box.selected && (
        <span className="text-red-500 font-medium">Not Selected</span>
      )}
    </div>
  </div>
))}
                </div>
              </div>

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
              </div>

            
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
                  
                  
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                    </label>
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



{packingResult && (
  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-200">
    <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
      <Play size={16} />
      📹 Packing Animation
    </h4>
    
    <div className="space-y-3">
      {/* Progress Bar */}
      <div className="bg-white rounded-lg p-3 border">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-indigo-600 font-bold">
            {animationState.currentStep} / {animationState.totalSteps}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${animationState.totalSteps > 0 ? (animationState.currentStep / animationState.totalSteps) * 100 : 0}%` 
            }}
          ></div>
        </div>
      </div>

      {/* Play/Pause Controls */}
      <div className="flex gap-2">
        {!animationState.isPlaying ? (
          <button
            onClick={startPackingAnimation}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-all"
          >
            <Play size={16} />
            Start Animation
          </button>
        ) : (
          <button
            onClick={() => setAnimationState(prev => ({ ...prev, isPlaying: false }))}
            className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-all"
          >
            ⏸️ Pause
          </button>
        )}
        
        <button
          onClick={stopPackingAnimation}
          className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-all"
        >
          ⏹️ Stop
        </button>
      </div>

      {/* Step Controls */}
      <div className="flex gap-2">
        <button
          onClick={previousAnimationStep}
          disabled={animationState.currentStep === 0}
          className="flex-1 bg-blue-100 hover:bg-blue-200 disabled:bg-gray-100 disabled:text-gray-400 text-blue-700 px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-all"
        >
          ⏮️ Previous
        </button>
        <button
          onClick={nextAnimationStep}
          disabled={animationState.currentStep >= animationState.totalSteps}
          className="flex-1 bg-blue-100 hover:bg-blue-200 disabled:bg-gray-100 disabled:text-gray-400 text-blue-700 px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-all"
        >
          Next ⏭️
        </button>
      </div>

      {/* Speed Control */}
      <div className="bg-white rounded-lg p-3 border">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ⚡ Animation Speed
        </label>
        <input
          type="range"
          min="100"
          max="3000"
          value={animationState.speed}
          onChange={(e) => setAnimationState(prev => ({ 
            ...prev, 
            speed: parseInt(e.target.value) 
          }))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Fast</span>
          <span>{(animationState.speed / 1000).toFixed(1)}s</span>
          <span>Slow</span>
        </div>
      </div>

      {/* Video Recording Button */}
      <div className="bg-white rounded-lg p-3 border">
        <button
          onClick={generatePackingVideo}
          disabled={isRecordingVideo || !packingResult}
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-all transform hover:scale-105 disabled:transform-none shadow-lg"
        >
          {isRecordingVideo ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Recording... {videoProgress}%
            </>
          ) : (
            <>
              🎥 Record Animation Video
            </>
          )}
        </button>
        
        {isRecordingVideo && (
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${videoProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-600 mt-1 text-center">
              {videoProgress < 30 ? 'Setting up recording...' :
               videoProgress < 95 ? 'Recording animation...' : 'Finalizing video...'}
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
)}
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col">
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

          <div className="flex-1 p-2">
            <div className="bg-white rounded-xl shadow-lg h-full relative overflow-hidden border border-gray-200">
              <div 
                ref={mountRef}     
                className="w-full    absolute inset-0" 
              />
              
              
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

              
              {!packingResult && !loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Truck size={64} className="mx-auto mb-4 text-gray-300" />
                  
                    <h3 className="text-xl font-semibold mb-2 text-gray-700">🚀 Optimize Your Packing</h3>
                    <p className="text-sm text-gray-600 mb-4">Set container and box details above.</p>
                    <p className="text-xs text-gray-500 bg-gray-50 px-4 py-2 rounded-lg inline-block">
                    Click <strong>"Calculate"</strong> to see the best fit! 
                    </p>

                  </div>
                </div>
              )}

              
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

             
              {showLegend && packingResult && (
                <div className="absolute top-4 left-4 bg-white bg-opacity-95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200 max-w-xs">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Palette size={16} />
                    🎨 Box Color Legend
                  </h4>
                  <div className="space-y-2">
                    {packingResult.box_summary.map((boxType, index) => {
                      const boxConfig = boxes.find(b => b.name === boxType.name);
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

              {!showLegend && packingResult &&  (
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
  <div className="fixed bottom-4 right-4 bg-white rounded-xl shadow-2xl p-6 max-w-md border border-gray-200 max-h-96 overflow-y-auto z-40" ref={statsRef}>
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



 <div className="grid grid-cols-2 gap-3 mb-4">
      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
        <div className="text-2xl font-bold text-blue-600">{packingResult.total_boxes}</div>
        <div className="text-sm text-blue-700">📦 Total Boxes</div>
      </div>
      <div className="bg-green-50 p-3 rounded-lg border border-green-200">
        <div className="text-2xl font-bold text-green-600">{packingResult.space_utilization}%</div>
        <div className="text-sm text-green-700">📏 Space Used</div>
      </div>
      <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
        <div className="text-2xl font-bold text-purple-600">{packingResult.total_weight}kg</div>
        <div className="text-sm text-purple-700">⚖️ Total Weight</div>
      </div>
      <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
        <div className="text-2xl font-bold text-yellow-600">{packingResult.weight_utilization}%</div>
        <div className="text-sm text-yellow-700">⚖️ Weight Used</div>
      </div>
    </div>

    
    {packingResult.weight_limit_reached && (
      <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
        <div className="flex items-center gap-2 text-orange-800">
          <AlertCircle size={16} />
          <span className="font-medium">Weight Limit Reached</span>
        </div>
        <p className="text-xs text-orange-700 mt-1">
          Container filled to weight capacity ({packingResult.weight_capacity || container.weight_capacity}kg)
        </p>
      </div>
    )}

    
    <div className="space-y-2 max-h-40 overflow-y-auto">
      <h4 className="font-medium text-gray-800 text-sm flex items-center gap-2">
        <Package size={14} />
        📋 Box Summary:
      </h4>

      {packingResult.box_summary.map((boxType, index) => {
        const boxConfig = boxes.find(b => b.name === boxType.name);
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

    {/* View 3D Box Images Button */}
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200 mt-4">
      <button
        onClick={() => setShowIndividualBoxImages(true)}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg"
      >
        <ImageIcon size={20} />
        View 3D Box Type Images
      </button> 

    </div>

    <div className="mt-4 pt-4 border-t border-gray-200">
      <button
        onClick={generatePDFReport}
        disabled={isGeneratingPDF}
        className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-105 disabled:transform-none shadow-lg"
      >
        {isGeneratingPDF ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Generating PDF... {pdfProgress}%
          </>
        ) : (
          <>
            <Download size={20} />
            📄 Download PDF Report
          </>
        )}
      </button>

      {isGeneratingPDF && (
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${pdfProgress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-600 mt-1 text-center">
            {pdfProgress < 30 ? 'Preparing data...' :
             pdfProgress < 60 ? 'Generating tables...' :
             pdfProgress < 90 ? 'Creating diagrams...' : 'Finalizing PDF...'}
          </p>
        </div>
      )}
    </div>
  </div>
)}



{/* {showStats && packingResult && (
  <div className="fixed bottom-4 right-4 bg-white rounded-xl shadow-2xl p-6 max-w-md border border-gray-200 max-h-96 overflow-y-auto z-40" ref={statsRef}>
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <Package className="text-blue-600" size={20} />
        📊 Packing Results
      </h3>
      <button onClick={() => setShowStats(false)} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded hover:bg-gray-100">
        ✕
      </button>
    </div>

   

  </div>
)} */}
   


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
{showIndividualBoxImages && packingResult && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <div className="bg-black bg-opacity-35"></div>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <ImageIcon className="text-purple-600" size={24} />
            Individual Box Type Images
          </h2>
          <button
            onClick={() => setShowIndividualBoxImages(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
          >
            ✕
          </button>
        </div>
        <p className="text-gray-600 mt-2">Each image shows only one type of box and their positions in the container</p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packingResult.box_summary.map((boxType, index) => {
            const boxConfig = boxes.find(b => b.name === boxType.name);
            const imageDataUrl = generateBoxTypeImage(boxType.name);
            
            return (
              <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-6 h-6 rounded-full shadow-sm border-2 border-white"
                    style={{ backgroundColor: boxConfig?.color || colorPalette[0].color }}
                  ></div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{boxType.id}</h3>
                    <p className="text-sm text-gray-600">{boxType.count} boxes</p>
                  </div>
                </div>
                
                {imageDataUrl && (
                  <div className="mb-4">
                    <img 
                      src={imageDataUrl} 
                      alt={`${boxType.id} layout`}
                      className="w-full rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-shadow"
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Dimensions:</span>
                    <span className="font-mono text-gray-800">
                      {boxType.length}×{boxType.width}×{boxType.height}m
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Count:</span>
                    <span className="font-bold text-blue-600">{boxType.count}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Volume:</span>
                    <span className="font-bold text-green-600">
                      {(boxType.count * boxType.length * boxType.width * boxType.height).toFixed(3)}m³
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Container Fill:</span>
                    <span className="font-bold text-purple-600">
                      {(((boxType.count * boxType.length * boxType.width * boxType.height) / (container.length * container.width * container.height)) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.download = `${boxType.id}_layout.png`;
                    link.href = imageDataUrl;
                    link.click();
                  }}
                  className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                >
                  <Download size={16} />
                  Download Image
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default ContainerPackingPlatform;
