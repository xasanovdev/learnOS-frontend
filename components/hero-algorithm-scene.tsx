"use client";

import { useEffect, useRef } from "react";
import { BrainCircuit, Route, Sparkles } from "lucide-react";
import * as THREE from "three";

type TreeNode = {
  label: string;
  position: THREE.Vector3;
};

function createLabelTexture(label: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;

  const context = canvas.getContext("2d");

    if (!context) {
    return new THREE.CanvasTexture(canvas);
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#191713";
  context.font = "700 48px sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(label, 64, 66);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  return texture;
}

function createEdge(
  from: THREE.Vector3,
  to: THREE.Vector3,
  material: THREE.Material,
) {
  const direction = new THREE.Vector3().subVectors(to, from);
  const length = direction.length();
  const geometry = new THREE.CylinderGeometry(0.018, 0.018, length, 14);
  const cylinder = new THREE.Mesh(geometry, material);
  const midpoint = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5);

  cylinder.position.copy(midpoint);
  cylinder.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction.clone().normalize(),
  );

  return cylinder;
}

export function HeroAlgorithmScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.28, 8.6);

    const root = new THREE.Group();
    scene.add(root);

    root.scale.setScalar(0.82);
    root.position.y = -0.12;

    const ambient = new THREE.AmbientLight(0xffffff, 1.35);
    scene.add(ambient);

    const key = new THREE.PointLight(0x79e0d4, 44, 20);
    key.position.set(-3.5, 4, 5);
    scene.add(key);

    const warm = new THREE.PointLight(0xff6b35, 20, 16);
    warm.position.set(4, -2, 4);
    scene.add(warm);

    const baseEdgeMaterial = new THREE.MeshBasicMaterial({
      color: 0xf7f4ec,
      transparent: true,
      opacity: 0.16,
    });
    const activeEdgeMaterial = new THREE.MeshBasicMaterial({
      color: 0x79e0d4,
      transparent: true,
      opacity: 0.64,
    });
    const nodeGeometry = new THREE.SphereGeometry(0.34, 40, 40);
    const haloGeometry = new THREE.TorusGeometry(0.48, 0.014, 10, 90);
    const treeNodes: TreeNode[] = [
      { label: "8", position: new THREE.Vector3(0, 1.65, 0.1) },
      { label: "3", position: new THREE.Vector3(-1.85, 0.35, 0.2) },
      { label: "10", position: new THREE.Vector3(1.85, 0.35, 0.05) },
      { label: "1", position: new THREE.Vector3(-2.85, -1.05, 0.3) },
      { label: "6", position: new THREE.Vector3(-0.9, -1.05, 0.1) },
      { label: "9", position: new THREE.Vector3(0.9, -1.05, 0.18) },
      { label: "14", position: new THREE.Vector3(2.85, -1.05, 0.28) },
    ];
    const edges = [
      [0, 1],
      [0, 2],
      [1, 3],
      [1, 4],
      [2, 5],
      [2, 6],
    ] as const;
    const traversal = [0, 1, 3, 1, 4, 0, 2, 5, 2, 6, 2, 0];
    const nodeMeshes: THREE.Mesh[] = [];
    const nodeMaterials: THREE.MeshStandardMaterial[] = [];
    const labelSprites: THREE.Sprite[] = [];
    const labelMaterials: THREE.SpriteMaterial[] = [];
    const labelTextures: THREE.CanvasTexture[] = [];
    const haloMeshes: THREE.Mesh[] = [];

    treeNodes.forEach((node, index) => {
      const material = new THREE.MeshStandardMaterial({
        color: index === 0 ? 0xffc857 : 0xf7f4ec,
        emissive: index === 0 ? 0xff6b35 : 0x1b9aaa,
        emissiveIntensity: index === 0 ? 0.34 : 0.12,
        metalness: 0.18,
        opacity: 0,
        roughness: 0.34,
        transparent: true,
      });
      const mesh = new THREE.Mesh(nodeGeometry, material);
      mesh.position.copy(node.position);
      mesh.userData.initialPosition = node.position.clone();
      mesh.userData.phase = index * 0.5;
      root.add(mesh);
      nodeMeshes.push(mesh);
      nodeMaterials.push(material);

      const haloMaterial = new THREE.MeshBasicMaterial({
        color: index === 0 ? 0xff6b35 : 0x1b9aaa,
        opacity: 0,
        transparent: true,
      });
      const halo = new THREE.Mesh(haloGeometry, haloMaterial);
      halo.position.copy(node.position);
      halo.rotation.x = Math.PI / 2.25;
      root.add(halo);
      haloMeshes.push(halo);

      const texture = createLabelTexture(node.label);
      const labelMaterial = new THREE.SpriteMaterial({
        map: texture,
        opacity: 0,
        transparent: true,
      });
      const label = new THREE.Sprite(labelMaterial);
      label.position.copy(node.position);
      label.position.z += 0.43;
      label.scale.set(0.48, 0.48, 1);
      root.add(label);
      labelSprites.push(label);
      labelMaterials.push(labelMaterial);
      labelTextures.push(texture);
    });

    const edgeMeshes = edges.map(([from, to], index) => {
      const edge = createEdge(
        treeNodes[from].position,
        treeNodes[to].position,
        index < 3 ? activeEdgeMaterial.clone() : baseEdgeMaterial.clone(),
      );
      root.add(edge);
      return edge;
    });

    const cursorMaterial = new THREE.MeshStandardMaterial({
      color: 0xff6b35,
      emissive: 0xff6b35,
      emissiveIntensity: 0.65,
      metalness: 0.1,
      roughness: 0.25,
    });
    const cursor = new THREE.Mesh(
      new THREE.SphereGeometry(0.13, 24, 24),
      cursorMaterial,
    );
    root.add(cursor);

    const rootRingGeometry = new THREE.TorusGeometry(1.3, 0.01, 8, 120);
    const rootRingMaterial = new THREE.MeshBasicMaterial({
      color: 0x79e0d4,
      transparent: true,
      opacity: 0.18,
    });
    const rings = [0, 1, 2].map((index) => {
      const ring = new THREE.Mesh(rootRingGeometry, rootRingMaterial.clone());
      ring.position.set(0, 0.18, -0.15);
      ring.rotation.set(Math.PI / 2.4, 0.18 * index, 0.45 * index);
      ring.scale.setScalar(1 + index * 0.42);
      root.add(ring);
      return ring;
    });

    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 120;
    const particlePositions = new Float32Array(particleCount * 3);

    for (let index = 0; index < particleCount; index += 1) {
      particlePositions[index * 3] = (Math.random() - 0.5) * 7.2;
      particlePositions[index * 3 + 1] = (Math.random() - 0.5) * 4.1;
      particlePositions[index * 3 + 2] = (Math.random() - 0.5) * 3.2;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3),
    );
    const particles = new THREE.Points(
      particlesGeometry,
      new THREE.PointsMaterial({
        color: 0x1b9aaa,
        size: 0.025,
        transparent: true,
        opacity: 0.38,
      }),
    );
    root.add(particles);

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.floor(width));
      const nextHeight = Math.max(1, Math.floor(height));

      renderer.setSize(nextWidth, nextHeight, false);
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      const reveal = Math.min(elapsed / 1.2, 1);
      const easedReveal = 1 - (1 - reveal) ** 3;
      const traversalTime = (elapsed * 0.75) % (traversal.length - 1);
      const traversalIndex = Math.floor(traversalTime);
      const traversalProgress = traversalTime - traversalIndex;
      const from = treeNodes[traversal[traversalIndex]].position;
      const to = treeNodes[traversal[traversalIndex + 1]].position;

      cursor.position.lerpVectors(from, to, traversalProgress);
      cursor.position.z += 0.58;
      cursor.scale.setScalar(0.9 + Math.sin(elapsed * 8) * 0.18);

      root.rotation.y = Math.sin(elapsed * 0.18) * 0.1;
      root.rotation.x = -0.08 + Math.sin(elapsed * 0.16) * 0.035;
      root.scale.setScalar(0.72 + easedReveal * 0.1);
      root.position.y = -0.2 + (1 - easedReveal) * 0.35;
      particles.rotation.y = elapsed * 0.025;

      nodeMeshes.forEach((node, index) => {
        const phase = node.userData.phase as number;
        const initialPosition = node.userData.initialPosition as THREE.Vector3;
        const visitDistance = Math.abs(traversal[traversalIndex] - index);
        const active = visitDistance === 0;
        const pulse = Math.sin(elapsed * 2.4 + phase) * 0.035;
        const entranceDelay = Math.min(1, Math.max(0, (elapsed - index * 0.08) / 0.7));
        const entrance = 1 - (1 - entranceDelay) ** 3;
        const material = nodeMaterials[index];
        const haloMaterial = haloMeshes[index].material as THREE.MeshBasicMaterial;
        const labelMaterial = labelMaterials[index];

        node.scale.setScalar((0.55 + entrance * 0.45) * (active ? 1.18 : 1 + pulse));
        node.position.copy(initialPosition);
        node.position.y += (1 - entrance) * 0.35 + Math.sin(elapsed * 1.2 + phase) * 0.015;
        material.opacity = entrance;
        material.emissiveIntensity = active ? 0.7 : index === 0 ? 0.34 : 0.12;
        labelMaterial.opacity = entrance;

        haloMeshes[index].position.copy(node.position);
        haloMeshes[index].rotation.z += active ? 0.018 : 0.006;
        haloMaterial.opacity = active ? 0.32 : 0.09 * entrance;
        haloMeshes[index].scale.setScalar(active ? 1.12 : 0.94);

        labelSprites[index].position.copy(node.position);
        labelSprites[index].position.z += 0.44;
      });

      edgeMeshes.forEach((edge, index) => {
        const material = edge.material as THREE.MeshBasicMaterial;
        const edgePair = edges[index];
        const currentNode = traversal[traversalIndex];
        const highlighted =
          traversalIndex > index ||
          edgePair[0] === currentNode ||
          edgePair[1] === currentNode;
        material.opacity = highlighted ? 0.58 + Math.sin(elapsed * 3) * 0.08 : 0.16;
      });

      rings.forEach((ring, index) => {
        ring.rotation.z += 0.0014 + index * 0.0005;
        const material = ring.material as THREE.MeshBasicMaterial;
        material.opacity = 0.09 + Math.sin(elapsed + index) * 0.035;
      });

      renderer.render(scene, camera);
      frameRef.current = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }

      resizeObserver.disconnect();
      nodeGeometry.dispose();
      haloGeometry.dispose();
      rootRingGeometry.dispose();
      cursor.geometry.dispose();
      cursorMaterial.dispose();
      particlesGeometry.dispose();
      nodeMaterials.forEach((material) => material.dispose());
      labelMaterials.forEach((material) => material.dispose());
      labelTextures.forEach((texture) => texture.dispose());
      haloMeshes.forEach((halo) => {
        (halo.material as THREE.Material).dispose();
      });
      edgeMeshes.forEach((edge) => {
        edge.geometry.dispose();
        (edge.material as THREE.Material).dispose();
      });
      baseEdgeMaterial.dispose();
      activeEdgeMaterial.dispose();
      rings.forEach((ring) => {
        ring.geometry.dispose();
        (ring.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative mt-11 w-full max-w-6xl pb-10 lg:mt-10">
      <div className="absolute -left-2 top-16 z-10 hidden w-56 rounded-lg border border-[#191713]/10 bg-[#f7f4ec]/90 p-4 text-left shadow-xl shadow-[#191713]/10 backdrop-blur-md md:block">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1b9aaa]">
          Tree traversal
        </p>
        <div className="mt-4 space-y-3">
          {["Root", "Left branch", "Right branch"].map((item, index) => (
            <div key={item} className="flex items-center gap-3">
              <span className="flex size-7 items-center justify-center rounded-md bg-[#191713] font-mono text-xs text-[#f7f4ec]">
                {index + 1}
              </span>
              <div className="h-2 flex-1 rounded-full bg-[#191713]/10">
                <div
                  className="h-full rounded-full bg-[#1b9aaa]"
                  style={{ width: `${78 - index * 18}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute -right-2 top-4 z-10 hidden rotate-2 rounded-md bg-[#ff6b35] px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-[#ff6b35]/20 sm:block">
        DFS traversal active
      </div>

      <div className="absolute -bottom-1 right-8 z-10 hidden max-w-64 -rotate-2 rounded-lg border border-[#1b9aaa]/25 bg-[#e7f8f4] p-4 text-left shadow-xl shadow-[#191713]/10 lg:block">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#146c6f]">
          <BrainCircuit className="size-4" aria-hidden="true" />
          Visual mode ready
        </div>
        <p className="text-sm leading-6 text-[#315d5a]">
          Watch a binary tree light up as the traversal cursor moves through
          each branch.
        </p>
      </div>

      <div className="mx-auto overflow-hidden rounded-lg border border-[#191713]/15 bg-[#191713] p-3 text-left shadow-2xl shadow-[#191713]/20 md:w-[82%]">
        <div className="relative min-h-[360px] overflow-hidden rounded-md border border-white/10 bg-[#14130f] sm:min-h-[430px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(27,154,170,.24),transparent_42%),linear-gradient(180deg,rgba(255,255,255,.04),transparent)]" />
          <canvas
            ref={canvasRef}
            aria-label="Animated Three.js binary tree traversal scene"
            className="absolute inset-0 h-full w-full"
          />

          <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/10 bg-white/[0.08] px-3 py-1.5 text-xs font-medium text-white/70 backdrop-blur-md">
            Binary tree: pre-order trace
          </div>
          <div className="pointer-events-none absolute bottom-4 left-4 right-4 text-white">
            <div className="flex flex-col gap-3 rounded-md border border-white/10 bg-black/30 p-3 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <Route className="size-4 text-[#79e0d4]" />
                <p className="text-sm font-medium">Visit order</p>
              </div>
              <div className="flex flex-wrap gap-2 font-mono text-xs text-white/70">
                {["8", "3", "1", "6", "10", "9", "14"].map((node) => (
                  <span
                    key={node}
                    className="rounded-full border border-white/10 bg-white/[0.08] px-2.5 py-1"
                  >
                    {node}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs text-white/50">
                <Sparkles className="size-4 text-[#f7c948]" />
                Smooth traversal replay
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
