'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useEffect, useState } from 'react';
import { 
  OrbitControls, 
  Environment, 
  Float, 
  Sphere,
  Box,
  Torus
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';

// Individual floating objects with unique behaviors
function FloatingSphere({ position, color, scale = 1 }: { position: [number, number, number], color: string, scale?: number }) {
  const ref = useRef<Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = time * 0.3;
      ref.current.rotation.y = time * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={ref} args={[0.6 * scale, 64, 64]} position={position}>
        <meshStandardMaterial 
          color={color}
          metalness={0.9}
          roughness={0.1}
        />
      </Sphere>
    </Float>
  );
}

function FloatingBox({ position, color, scale = 1 }: { position: [number, number, number], color: string, scale?: number }) {
  const ref = useRef<Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = time * 0.4;
      ref.current.rotation.z = time * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
      <Box ref={ref} args={[1 * scale, 1 * scale, 1 * scale]} position={position}>
        <meshStandardMaterial 
          color={color}
          metalness={0.7}
          roughness={0.2}
        />
      </Box>
    </Float>
  );
}

function FloatingTorus({ position, color, scale = 1 }: { position: [number, number, number], color: string, scale?: number }) {
  const ref = useRef<Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = time * 0.2;
      ref.current.rotation.y = time * 0.4;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.8} floatIntensity={2.5}>
      <Torus ref={ref} args={[0.8 * scale, 0.3 * scale, 16, 32]} position={position}>
        <meshStandardMaterial 
          color={color}
          metalness={0.8}
          roughness={0.1}
        />
      </Torus>
    </Float>
  );
}

// Main 3D Scene with simplified floating objects
function Scene({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      {/* Enhanced Lighting Setup */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1}
        castShadow
      />
      
      {/* Colored accent lights */}
      <pointLight position={[-8, 4, -4]} color="#3b82f6" intensity={0.5} />
      <pointLight position={[8, -4, 4]} color="#8b5cf6" intensity={0.5} />
      <pointLight position={[0, 8, 0]} color="#06b6d4" intensity={0.3} />

      {/* Environment for realistic reflections */}
      <Environment preset="studio" />

      {/* Multiple floating geometries arranged in 3D space */}
      <FloatingSphere position={[-3, 1, -1]} color="#3b82f6" scale={isMobile ? 0.7 : 1} />
      <FloatingBox position={[3, -1, 1]} color="#8b5cf6" scale={isMobile ? 0.6 : 0.8} />
      <FloatingTorus position={[0, 2, -2]} color="#06b6d4" scale={isMobile ? 0.8 : 1.2} />
      <FloatingSphere position={[2, 2, -3]} color="#ec4899" scale={isMobile ? 0.4 : 0.6} />
      {!isMobile && (
        <>
          <FloatingSphere position={[-2, -2, 2]} color="#10b981" scale={0.7} />
          <FloatingBox position={[4, 1, -1]} color="#f59e0b" scale={0.5} />
          <FloatingTorus position={[-4, 0, 1]} color="#ef4444" scale={0.8} />
        </>
      )}

      {/* Interactive controls */}
      <OrbitControls 
        enablePan={false}
        enableZoom={false}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 3}
        autoRotate
        autoRotateSpeed={isMobile ? 0.2 : 0.3}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  );
}

// Main Hero3D component
export default function Hero3D() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="h-full w-full relative">
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none z-10" />
      
      <Canvas
        camera={{ 
          position: isMobile ? [0, 0, 12] : [0, 0, 10], 
          fov: isMobile ? 60 : 50,
        }}
        shadows
        className="bg-transparent"
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <Scene isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}