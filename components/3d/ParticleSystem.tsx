'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 500, color = "#ffffff", size = 0.05, speed = 0.05 }: { count?: number, color?: string, size?: number, speed?: number }) {
    const mesh = useRef<THREE.Points>(null);
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 30; // Spread out more for digital universe
            pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
        }
        return pos;
    }, [count]);

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.y = state.clock.getElapsedTime() * speed;
            mesh.current.rotation.x = Math.sin(state.clock.getElapsedTime() * (speed * 2)) * 0.1;
        }
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={size}
                color={color}
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export default function ParticleSystem({ count = 1000 }: { count?: number }) {
    return (
        <div className="absolute inset-0 pointer-events-none z-0">
            <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
                {/* White/Silver stars */}
                <Particles count={Math.floor(count * 0.6)} color="#ffffff" size={0.03} speed={0.02} />
                {/* Purple cosmic dust */}
                <Particles count={Math.floor(count * 0.2)} color="#7f5af0" size={0.06} speed={0.03} />
                {/* Pink cosmic dust */}
                <Particles count={Math.floor(count * 0.2)} color="#ff6b9d" size={0.05} speed={0.04} />
            </Canvas>
        </div>
    );
}
