import React, { useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Bounds, Environment, Lightformer } from '@react-three/drei';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import * as THREE from 'three';

// Use the clean single-layer logo (2 flat paths). The "_3d" SVG fakes depth with
// 6 stacked shapes, which extrude into overlapping / z-fighting surfaces.
const svgUrl = new URL('/img/gonzydesigns_logo.svg', import.meta.url).href;

// Real extruded 3D logo built from the SVG paths. Desktop: rotates toward the
// mouse. Touch devices (no hover): slow continuous spin instead.
function LogoModel() {
  const spin = useRef();
  const target = useRef({ x: 0, y: 0 });
  const svg = useLoader(SVGLoader, svgUrl);
  const isTouch = useMemo(
    () => window.matchMedia('(hover: none) and (pointer: coarse)').matches,
    []
  );

  // Build extruded geometry from each SVG shape, then center everything at origin.
  const geometries = useMemo(() => {
    const geos = [];
    svg.paths.forEach((path) => {
      SVGLoader.createShapes(path).forEach((shape) => {
        geos.push(
          new THREE.ExtrudeGeometry(shape, {
            depth: 28,
            bevelEnabled: true,
            bevelThickness: 4,
            bevelSize: 2.5,
            bevelSegments: 5,
            curveSegments: 28,
          })
        );
      });
    });

    // Center all geometry on the origin so rotation pivots about the middle.
    const box = new THREE.Box3();
    geos.forEach((g) => {
      g.computeBoundingBox();
      box.union(g.boundingBox);
    });
    const center = new THREE.Vector3();
    box.getCenter(center);
    geos.forEach((g) => g.translate(-center.x, -center.y, -center.z));
    return geos;
  }, [svg]);

  // Track the mouse across the whole page (pointless on touch screens).
  useEffect(() => {
    if (isTouch) return undefined;
    const onMove = (e) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [isTouch]);

  // Touch: slow continuous spin with a gentle tilt. Desktop: ease toward the mouse.
  useFrame((state, delta) => {
    if (!spin.current) return;
    if (isTouch) {
      spin.current.rotation.y += delta * 0.4;
      spin.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.12;
      return;
    }
    const ry = target.current.x * 0.9;
    const rx = target.current.y * 0.55;
    spin.current.rotation.y += (ry - spin.current.rotation.y) * 0.08;
    spin.current.rotation.x += (rx - spin.current.rotation.x) * 0.08;
  });

  return (
    <group ref={spin}>
      {/* SVG's Y axis points down — flip it so the logo is upright. */}
      <group scale={[1, -1, 1]}>
        {geometries.map((g, i) => (
          <mesh key={i} geometry={g}>
            {/* Futuristic: polished iridescent metal with a clearcoat sheen. */}
            <meshPhysicalMaterial
              color="#0e3f52"
              metalness={1}
              roughness={0.18}
              clearcoat={1}
              clearcoatRoughness={0.14}
              iridescence={1}
              iridescenceIOR={1.35}
              iridescenceThicknessRange={[130, 470]}
              envMapIntensity={1.4}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default function Logo3D() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 520], fov: 35, near: 1, far: 4000 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[-220, 320, 420]} intensity={0.8} />

      {/* In-scene studio env (no external HDR) so the metal reflects colored light. */}
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3} color="#7fe9ff" position={[0, 4, -6]} scale={[12, 8, 1]} />
        <Lightformer form="rect" intensity={2.5} color="#a371f7" position={[-6, 1, 2]} scale={[10, 3, 1]} rotation={[0, Math.PI / 2, 0]} />
        <Lightformer form="rect" intensity={2} color="#00ffcc" position={[6, -3, 3]} scale={[10, 4, 1]} rotation={[0, -Math.PI / 2, 0]} />
        <Lightformer form="rect" intensity={1.8} color="#ffffff" position={[0, -5, 4]} scale={[12, 5, 1]} />
      </Environment>

      <Suspense fallback={null}>
        <Bounds fit clip observe margin={1.15}>
          <LogoModel />
        </Bounds>
      </Suspense>
    </Canvas>
  );
}
