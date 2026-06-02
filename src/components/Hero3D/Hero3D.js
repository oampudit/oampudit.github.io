import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function Knot({ mouse }) {
  const mesh = useRef();

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += delta * 0.15;
    mesh.current.rotation.y += delta * 0.2;
    // follow mouse slightly
    mesh.current.rotation.z = THREE.MathUtils.lerp(
      mesh.current.rotation.z,
      mouse.current.x * 0.3,
      0.05
    );
    mesh.current.position.y = THREE.MathUtils.lerp(
      mesh.current.position.y,
      mouse.current.y * 0.3,
      0.05
    );
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.2}>
      <mesh ref={mesh} scale={1.4}>
        <torusKnotGeometry args={[1, 0.32, 220, 32]} />
        <MeshDistortMaterial
          color="#5b6380"
          emissive="#818cf8"
          emissiveIntensity={0.22}
          roughness={0.18}
          metalness={0.95}
          distort={0.3}
          speed={1.4}
        />
      </mesh>
    </Float>
  );
}

function OrbitingSpheres() {
  const group = useRef();
  const items = useMemo(
    () =>
      Array.from({ length: 8 }).map((_, i) => ({
        angle: (i / 8) * Math.PI * 2,
        radius: 2.4 + (i % 3) * 0.35,
        speed: 0.3 + (i % 4) * 0.15,
        color: ["#818cf8", "#a5b4fc", "#c7d2fe", "#7dd3fc"][i % 4],
      })),
    []
  );

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.15;
  });

  return (
    <group ref={group}>
      {items.map((item, i) => (
        <Float key={i} speed={item.speed} floatIntensity={0.8}>
          <mesh
            position={[
              Math.cos(item.angle) * item.radius,
              Math.sin(item.angle * 2) * 0.4,
              Math.sin(item.angle) * item.radius,
            ]}
          >
            <sphereGeometry args={[0.12, 24, 24]} />
            <meshStandardMaterial
              color={item.color}
              emissive={item.color}
              emissiveIntensity={0.6}
              toneMapped={false}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function Hero3D() {
  const mouse = useRef({ x: 0, y: 0 });

  const handlePointer = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  return (
    <div
      className="hero3d-wrap"
      onPointerMove={handlePointer}
      style={{ width: "100%", height: "100%", minHeight: 380 }}
    >
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={1.0} color="#a5b4fc" />
          <pointLight position={[-5, -3, -5]} intensity={0.65} color="#7dd3fc" />
          <Knot mouse={mouse} />
          <OrbitingSpheres />
          <ContactShadows
            position={[0, -2, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
          />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
