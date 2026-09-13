import { Component, memo, useCallback, useMemo, useRef, useState, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { AdditiveBlending, BufferAttribute, BufferGeometry, Group, Mesh, MeshBasicMaterial, Points, PointsMaterial } from 'three';
import type { NodeId } from '../data';
import { nodes } from '../data';
import { corePositions, nodeSize } from '../config';

interface SceneProps {
  onHover: (active: boolean) => void;
  onSelect: (id: NodeId) => void;
}

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

class SceneBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return this.props.fallback;
    return this.props.children;
  }
}

const Scene3D = ({ onHover, onSelect }: SceneProps) => {
  const [{ webgl, reducedMotion, mobile }] = useState(() => ({
    webgl: supportsWebGL(),
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    mobile: window.innerWidth < 640,
  }));

  const fallback = <SceneFallback />;

  if (!webgl) return fallback;

  return (
    <SceneBoundary fallback={fallback}>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: mobile ? [0, 3.2, 18] : [0, 2.6, 11.5], fov: mobile ? 50 : 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (e) => e.preventDefault());
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 1.2, 0]} intensity={2.4} color="#8b5cf6" />
        <pointLight position={[-6, -3, -5]} intensity={2} color="#22d3ee" />
        <pointLight position={[6, 3, 4]} intensity={2} color="#6366f1" />

        <Revolve>
          <Galaxy reducedMotion={reducedMotion} />
        </Revolve>

        <StarDust />
        <StarField />

        <NodeLayer onSelect={onSelect} onHover={onHover} />

        <OrbitControls
          enableZoom={!mobile}
          enablePan={false}
          enableDamping={!reducedMotion}
          dampingFactor={0.07}
          rotateSpeed={0.55}
          zoomSpeed={0.7}
          autoRotate={!reducedMotion}
          autoRotateSpeed={0.45}
          minDistance={mobile ? 9 : 4}
          maxDistance={mobile ? 24 : 16}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={(4 * Math.PI) / 5}
          target={[0, 0, 0]}
        />
      </Canvas>
    </SceneBoundary>
  );
};

export default memo(Scene3D);

function Revolve({ children }: { children: ReactNode }) {
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.028;
  });
  return <group ref={ref}>{children}</group>;
}

const GALAXY_COUNT = 4400;
const ARM_COUNT = 3;
const ARM_RADIUS = 3.9;
const ARM_SWIRL = 1.4;

function galaxyPositions() {
  const arr = new Float32Array(GALAXY_COUNT * 3);
  for (let i = 0; i < GALAXY_COUNT; i++) {
    const r = Math.pow(Math.random(), 0.5) * ARM_RADIUS;
    const theta = Math.random() * Math.PI * 2;
    const offset = (Math.random() - 1) * ARM_SWIRL;
    const bend = 5.5 / r;
    const arm = Math.floor(Math.random() * ARM_COUNT);
    const arms = ((theta + (arm * Math.PI * 2) / ARM_COUNT) % (Math.PI * 2)) + offset * 3;
    const rad = r * (1 + Math.sin(arms * 2.5) * 0.25);
    arr[i * 3] = rad * Math.cos(arms + bend);
    arr[i * 3 + 1] = (Math.random() - 0.5) * (0.7 - r * 0.06);
    arr[i * 3 + 2] = rad * Math.sin(arms + bend);
  }
  return arr;
}

function galaxyColors() {
  const arr = new Float32Array(GALAXY_COUNT * 3);
  const palette: Array<[number, number, number]> = [
    [0.66, 0.55, 0.98],
    [0.35, 0.62, 1.0],
    [0.68, 0.4, 0.94],
    [0.42, 0.9, 0.95],
  ];
  for (let i = 0; i < GALAXY_COUNT; i++) {
    const c = palette[Math.floor(Math.random() * palette.length)];
    arr[i * 3] = c[0];
    arr[i * 3 + 1] = c[1];
    arr[i * 3 + 2] = c[2];
  }
  return arr;
}

const DUST_POSITIONS = galaxyCloudPositions(900, 4.5, 5.5);
const STAR_POSITIONS = galaxyCloudPositions(700, 8, 18);
const GALAXY_POSITIONS = galaxyPositions();
const GALAXY_COLORS = galaxyColors();

function galaxyCloudPositions(count: number, minR: number, spread: number) {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = minR + Math.random() * spread;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
    arr[i * 3 + 2] = r * Math.cos(phi);
  }
  return arr;
}

function Galaxy({ reducedMotion }: { reducedMotion: boolean }) {
  const spinRef = useRef<Group>(null);
  const materialRef = useRef<PointsMaterial>(null);

  const galaxyGeo = useMemo(() => {
    const g = new BufferGeometry();
    g.setAttribute('position', new BufferAttribute(GALAXY_POSITIONS, 3));
    g.setAttribute('color', new BufferAttribute(GALAXY_COLORS, 3));
    return g;
  }, []);

  const ringGeo = useMemo(() => {
    const pts: number[] = [];
    const r = ARM_RADIUS * 0.95;
    const segs = 220;
    for (let i = 0; i <= segs; i++) {
      const a = (i / segs) * Math.PI * 2;
      pts.push(Math.cos(a) * r, 0, Math.sin(a) * r);
    }
    const g = new BufferGeometry();
    g.setAttribute('position', new BufferAttribute(new Float32Array(pts), 3));
    return g;
  }, []);

  useFrame((_, delta) => {
    const t = performance.now();
    if (spinRef.current) {
      spinRef.current.rotation.y += (reducedMotion ? 0 : delta) * 0.05;
      spinRef.current.rotation.x += (reducedMotion ? 0 : delta) * 0.012;
    }
    if (materialRef.current) {
      materialRef.current.opacity = 0.78 + Math.sin(t * 0.0006) * 0.06;
    }
  });

  return (
    <group ref={spinRef}>
      <points geometry={galaxyGeo}>
        <pointsMaterial
          ref={materialRef}
          size={0.04}
          vertexColors
          transparent
          opacity={0.8}
          depthWrite={false}
          sizeAttenuation
          blending={AdditiveBlending}
        />
      </points>
      <lineLoop geometry={ringGeo}>
        <lineBasicMaterial color="#4f46e5" transparent opacity={0.18} />
      </lineLoop>
    </group>
  );
}

interface NodeProps {
  node: (typeof nodes)[number];
  position: [number, number, number];
  size: number;
  onSelect: (id: NodeId) => void;
  onHover: (active: boolean) => void;
}

function NodeSphere({ node, position, size, onSelect, onHover }: NodeProps) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<Group>(null);
  const hitRef = useRef<Mesh>(null);
  const shieldRef = useRef<Mesh>(null);
  const downAt = useRef(0);
  const big = node.id === 'about';

  const handleOver = useCallback(
    (e: { stopPropagation: () => void }) => {
      e.stopPropagation();
      setHovered(true);
      onHover(true);
    },
    [onHover],
  );
  const handleOut = useCallback(
    (e: { stopPropagation: () => void }) => {
      e.stopPropagation();
      setHovered(false);
      onHover(false);
    },
    [onHover],
  );
  const handleClick = useCallback(
    (e: { stopPropagation: () => void }) => {
      e.stopPropagation();
      onSelect(node.id);
    },
    [node.id, onSelect],
  );
  const handleDown = useCallback(() => {
    downAt.current = performance.now();
  }, []);
  const handleUp = useCallback(
    (e: { stopPropagation: () => void }) => {
      const drag = performance.now() - downAt.current > 120;
      if (!drag) handleClick(e);
    },
    [handleClick],
  );

  useFrame((state, delta) => {
    const g = groupRef.current;
    if (g) {
      g.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.4 + position[0]) * 0.035;
    }
    const hit = hitRef.current;
    if (hit) {
      const k = 1 - Math.pow(0.001, delta);
      const target = hovered ? 1.15 : 1;
      hit.scale.x += (target - hit.scale.x) * k;
      hit.scale.y += (target - hit.scale.y) * k;
      hit.scale.z += (target - hit.scale.z) * k;
    }
    const shield = shieldRef.current;
    if (shield) {
      shield.rotation.x += delta * 0.08;
      shield.rotation.y += delta * 0.14;
      const k = 1 - Math.pow(0.001, delta);
      const scaleTarget = hovered ? 1.35 : 1.05;
      shield.scale.x += (scaleTarget - shield.scale.x) * k;
      shield.scale.y += (scaleTarget - shield.scale.y) * k;
      shield.scale.z += (scaleTarget - shield.scale.z) * k;
      const mat = shield.material as MeshBasicMaterial;
      const opacityTarget = hovered ? 0.2 : 0;
      mat.opacity += (opacityTarget - mat.opacity) * (1 - Math.pow(0.001, delta));
    }
  });

  return (
    <group position={position}>
      <group ref={groupRef}>
        <mesh
          ref={hitRef}
          onPointerOver={handleOver}
          onPointerOut={handleOut}
          onClick={handleClick}
          onPointerDown={handleDown}
          onPointerUp={handleUp}
        >
          <sphereGeometry args={[size * 1.6, 20, 20]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
        <mesh ref={shieldRef}>
          <icosahedronGeometry args={[size * 2.2, 1]} />
          <meshBasicMaterial color={node.color} wireframe transparent opacity={0.055} depthWrite={false} />
        </mesh>
        <Html center zIndexRange={[40, 0]} style={{ pointerEvents: 'auto', touchAction: 'manipulation', cursor: 'pointer' }}>
          <div
            className={`node-badge${big ? ' node-badge-lg' : ''}${hovered ? ' node-badge-hover' : ''}`}
            role="button"
            aria-label={node.title}
            onClick={(e) => {
              e.stopPropagation();
              handleClick(e);
            }}
          >
            <img src={node.icon} alt={node.title} className="node-icon" draggable={false} />
          </div>
        </Html>
        {hovered && (
          <group position={[0, 0.72, 0]}>
            <mesh>
              <boxGeometry args={[0.016, 0.42, 0.016]} />
              <meshBasicMaterial color={node.color} transparent opacity={0.55} depthWrite={false} />
            </mesh>
            <Html position={[0, 0.16, 0]} center zIndexRange={[40, 0]} style={{ pointerEvents: 'none' }}>
              <div className="node-label" style={{ color: node.color }}>
                {node.title}
              </div>
            </Html>
          </group>
        )}
      </group>
    </group>
  );
}

function OrbitRing({
  radius,
  size,
  color,
  speed,
  offset,
  tilt = 0.12,
}: {
  radius: number;
  size: number;
  color: string;
  speed: number;
  offset: number;
  tilt?: number;
}) {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    const g = ref.current;
    if (!g) return;
    const k = state.clock.elapsedTime * speed + offset;
    g.position.x = Math.cos(k) * radius;
    g.position.z = Math.sin(k) * radius;
    g.position.y = Math.sin(k * 1.7) * 0.12;
    g.rotation.x += 0.02;
  });
  return (
    <group ref={ref} rotation={[tilt, 0, 0]}>
      <mesh>
        <icosahedronGeometry args={[size, 0]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

const ORBITS: Array<{ radius: number; size: number; color: string; speed: number; offset: number }> = [
  { radius: 0.55, size: 0.025, color: '#a78bfa', speed: 0.65, offset: 0 },
  { radius: 0.8, size: 0.018, color: '#22d3ee', speed: 0.52, offset: 2.4 },
  { radius: 1.08, size: 0.03, color: '#818cf8', speed: 0.4, offset: 4.5 },
];

function NodeLayer({ onSelect, onHover }: { onSelect: (id: NodeId) => void; onHover: (active: boolean) => void }) {
  return (
    <group>
      {nodes.map((node) => (
        <group key={node.id}>
          <NodeSphere
            node={node}
            position={corePositions[node.id]}
            size={nodeSize[node.id]}
            onSelect={onSelect}
            onHover={onHover}
          />
          <group position={corePositions[node.id]}>
            {ORBITS.map((o) => (
              <OrbitRing key={o.offset} {...o} />
            ))}
          </group>
        </group>
      ))}
    </group>
  );
}

function StarDust() {
  const ref = useRef<Points>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.012;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[DUST_POSITIONS, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#8b5cf6" transparent opacity={0.3} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function StarField() {
  const ref = useRef<Points>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.004;
    (ref.current.material as PointsMaterial).opacity = 0.4 + Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[STAR_POSITIONS, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#c4b5fd" transparent opacity={0.4} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function SceneFallback() {
  return (
    <div className="grid h-full w-full place-items-center" aria-hidden="true">
      <svg className="w-40 text-ink/20" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M100 22l78 45v66l-78 45-78-45V67Z" />
        <path d="M100 22v156M22 67h156M38 89l62 36 62-36" opacity="0.6" />
      </svg>
    </div>
  );
}