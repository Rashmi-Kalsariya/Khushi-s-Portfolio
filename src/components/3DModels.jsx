import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Cylinder, Torus } from '@react-three/drei';

const goldMaterial = {
  color: '#FFD700',
  metalness: 0.9,
  roughness: 0.1,
  envMapIntensity: 2.0,
  clearcoat: 1.0,
  clearcoatRoughness: 0.05,
  reflectivity: 1.0,
  emissive: '#332200',
  emissiveIntensity: 0.1
};

export function ScalesOfJustice({ position = [0, 0, 0], scale = 1 }) {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Central post */}
      <Cylinder args={[0.05, 0.05, 2]} position={[0, 0, 0]}>
        <meshPhysicalMaterial {...goldMaterial} />
      </Cylinder>
      
      {/* Base */}
      <Cylinder args={[0.3, 0.4, 0.2]} position={[0, -1, 0]}>
        <meshPhysicalMaterial {...goldMaterial} />
      </Cylinder>
      
      {/* Cross beam */}
      <Box args={[2, 0.08, 0.08]} position={[0, 0.5, 0]}>
        <meshPhysicalMaterial {...goldMaterial} />
      </Box>
      
      {/* Left chain */}
      <Cylinder args={[0.02, 0.02, 0.6]} position={[-0.8, 0.2, 0]}>
        <meshPhysicalMaterial {...goldMaterial} />
      </Cylinder>
      
      {/* Right chain */}
      <Cylinder args={[0.02, 0.02, 0.6]} position={[0.8, 0.2, 0]}>
        <meshPhysicalMaterial {...goldMaterial} />
      </Cylinder>
      
      {/* Left scale pan */}
      <Cylinder args={[0.25, 0.25, 0.05]} position={[-0.8, -0.1, 0]}>
        <meshPhysicalMaterial {...goldMaterial} />
      </Cylinder>
      
      {/* Right scale pan */}
      <Cylinder args={[0.25, 0.25, 0.05]} position={[0.8, -0.1, 0]}>
        <meshPhysicalMaterial {...goldMaterial} />
      </Cylinder>
    </group>
  );
}

export function Gavel({ position = [0, 0, 0], scale = 1 }) {
  const gavelRef = useRef();
  
  useFrame((state) => {
    if (gavelRef.current) {
      gavelRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
  });

  return (
    <group ref={gavelRef} position={position} scale={scale}>
      {/* Handle */}
      <Cylinder args={[0.04, 0.04, 1.5]} position={[0, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
        <meshPhysicalMaterial {...goldMaterial} />
      </Cylinder>
      
      {/* Head */}
      <Cylinder args={[0.15, 0.15, 0.6]} position={[0.6, 0.35, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshPhysicalMaterial {...goldMaterial} />
      </Cylinder>
      
      {/* Sound block */}
      <Box args={[0.4, 0.1, 0.4]} position={[0.2, -0.8, 0]}>
        <meshPhysicalMaterial {...goldMaterial} />
      </Box>
    </group>
  );
}

export function LawBook({ position = [0, 0, 0], scale = 1 }) {
  const bookRef = useRef();
  
  useFrame((state) => {
    if (bookRef.current) {
      bookRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={bookRef} position={position} scale={scale}>
      {/* Book cover */}
      <Box args={[0.8, 1.2, 0.1]} position={[0, 0, 0]}>
        <meshPhysicalMaterial {...goldMaterial} />
      </Box>
      
      {/* Pages */}
      <Box args={[0.75, 1.15, 0.08]} position={[0, 0, -0.05]}>
        <meshPhysicalMaterial color="#F5F5DC" metalness={0.1} roughness={0.8} />
      </Box>
      
      {/* Spine decoration */}
      <Box args={[0.82, 0.1, 0.12]} position={[0, 0.4, 0]}>
        <meshPhysicalMaterial {...goldMaterial} />
      </Box>
      <Box args={[0.82, 0.1, 0.12]} position={[0, -0.4, 0]}>
        <meshPhysicalMaterial {...goldMaterial} />
      </Box>
    </group>
  );
}

export function JusticeRing({ position = [0, 0, 0], scale = 1 }) {
  const ringRef = useRef();
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      ringRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <group ref={ringRef} position={position} scale={scale}>
      <Torus args={[0.8, 0.1, 8, 16]} position={[0, 0, 0]}>
        <meshPhysicalMaterial {...goldMaterial} />
      </Torus>
      <Torus args={[0.6, 0.05, 8, 16]} position={[0, 0, 0]}>
        <meshPhysicalMaterial {...goldMaterial} />
      </Torus>
    </group>
  );
}