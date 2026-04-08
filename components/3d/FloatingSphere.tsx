'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingSphere({ color = '#7f5af0' }: { color?: string }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
            meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.5;
        }
    });

    return (
        <mesh ref={meshRef} scale={2}>
            <sphereGeometry args={[1, 64, 64]} />
            <MeshDistortMaterial
                color={color}
                attach="material"
                distort={0.4}
                speed={2}
                roughness={0.2}
                metalness={0.8}
                emissive={color}
                emissiveIntensity={0.5}
            />
        </mesh>
    );
}

export default function FloatingSphereComponent({ color = '#7f5af0' }: { color?: string }) {
    return (
        <div className="w-full h-full pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <FloatingSphere color={color} />
            </Canvas>
        </div>
    );
}
