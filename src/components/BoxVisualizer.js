import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const createTextSprite = (message) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = "Bold 40px Arial";
  context.fillStyle = "white";
  context.strokeStyle = "black";
  context.lineWidth = 6;
  context.strokeText(message, 0, 40);
  context.fillText(message, 0, 40);

  const texture = new THREE.CanvasTexture(canvas);
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(40, 20, 1); // Adjust for readability
  return sprite;
};

const Visualization = ({ data }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container || !data?.container || !data?.packedBoxes) return;

    container.innerHTML = "";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / 400,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, 400);
    container.appendChild(renderer.domElement);

    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    const { container: cont, packedBoxes } = data;

    const outerBoxGeometry = new THREE.BoxGeometry(cont.length, cont.height, cont.width);
    const outerBoxMaterial = new THREE.MeshBasicMaterial({ color: 0x999999, wireframe: true });
    const outerBox = new THREE.Mesh(outerBoxGeometry, outerBoxMaterial);
    outerBox.position.set(cont.length / 2, cont.height / 2, cont.width / 2);
    scene.add(outerBox);

    packedBoxes.forEach((box, index) => {
      const { dimension, position, id } = box;

      if (
        Array.isArray(dimension) && dimension.length === 3 &&
        Array.isArray(position) && position.length === 3
      ) {
        const geometry = new THREE.BoxGeometry(...dimension);
        const color = new THREE.Color(`hsl(${(index * 40) % 360}, 100%, 50%)`);
        const material = new THREE.MeshStandardMaterial({ color });
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(
          position[0] + dimension[0] / 2,
          position[1] + dimension[1] / 2,
          position[2] + dimension[2] / 2
        );

        scene.add(mesh);

        const label = createTextSprite(id || `Box${index + 1}`);
        label.position.set(
          mesh.position.x,
          mesh.position.y + dimension[1] / 2 + 5, 
          mesh.position.z
        );
        scene.add(label);
      }
    });

    camera.position.set(cont.length, cont.height, cont.width * 2);
    camera.lookAt(cont.length / 2, cont.height / 2, cont.width / 2);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      container.innerHTML = "";
    };
  }, [data]);

  return <div ref={mountRef} className="border mt-4 rounded shadow" />;
};

export default Visualization;
