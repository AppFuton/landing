import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';

function Logo() {
  const ref = useRef<THREE.Object3D | null>(null);
  const { scene } = useGLTF('/cat.glb');

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      position={[0, -0.1, 0]}
      scale={[1, 1, 1]}
    />
  );
}

export const Hero3D: React.FC = () => {
  return (
    <div className="h-full w-full">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 1], fov: 45 }}>
        <Suspense fallback={null}>
          <Environment
            preset="city"
            environmentIntensity={0} 
          />
          <Logo />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Suspense>
      </Canvas>
    </div>
  );
};