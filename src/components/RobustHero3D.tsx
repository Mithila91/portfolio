'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useEffect, useState } from 'react';
import { OrbitControls, Float } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Error boundary for Three.js components
function ErrorFallback() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 rounded-2xl">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 bg-primary/40 rounded-full animate-pulse"></div>
        </div>
        <p className="text-muted-foreground">3D Scene Loading...</p>
      </div>
    </div>
  );
}

function AnimatedBox() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    try {
      if (meshRef.current) {
        meshRef.current.rotation.x += delta * 0.5;
        meshRef.current.rotation.y += delta * 0.3;
      }
    } catch (error) {
      console.warn('Three.js animation error:', error);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color="#3b82f6" 
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    try {
      if (meshRef.current) {
        meshRef.current.rotation.y += delta * 0.4;
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
      }
    } catch (error) {
      console.warn('Three.js animation error:', error);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={[2.5, 0, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial 
          color="#8b5cf6"
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
}

function AnimatedTorus() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    try {
      if (meshRef.current) {
        meshRef.current.rotation.x += delta * 0.2;
        meshRef.current.rotation.z += delta * 0.4;
        meshRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.8) * 0.3;
      }
    } catch (error) {
      console.warn('Three.js animation error:', error);
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.8} floatIntensity={2.5}>
      <mesh ref={meshRef} position={[-2.5, 0, 0]}>
        <torusGeometry args={[1, 0.4, 16, 32]} />
        <meshStandardMaterial 
          color="#06b6d4"
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      {/* Lighting setup */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1}
        castShadow
      />
      <pointLight position={[-10, -10, -10]} color="#3b82f6" intensity={0.3} />
      <pointLight position={[10, 10, 10]} color="#8b5cf6" intensity={0.3} />
      
      {/* 3D Objects */}
      <AnimatedBox />
      <AnimatedSphere />
      <AnimatedTorus />
      
      {/* Camera controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.5}
        enableDamping
        dampingFactor={0.1}
      />
    </>
  );
}

export default function RobustHero3D() {
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle any potential errors
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes('THREE') || event.message.includes('WebGL')) {
        setError(true);
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (!mounted || error) {
    return <ErrorFallback />;
  }

  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ 
          position: [0, 0, 6], 
          fov: 60,
        }}
        className="bg-transparent"
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        onError={() => setError(true)}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}