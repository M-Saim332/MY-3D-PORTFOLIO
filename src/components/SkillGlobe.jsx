import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import { useMemo, useRef } from 'react'

function Globe({ skills }) {
  const group = useRef()
  const nodes = useMemo(() => skills.map((skill, index) => {
    const phi = Math.acos(-1 + (2 * index) / Math.max(skills.length - 1, 1))
    const theta = Math.sqrt(skills.length * Math.PI) * phi
    const radius = 2.08
    return { skill, position: [radius * Math.cos(theta) * Math.sin(phi), radius * Math.sin(theta) * Math.sin(phi), radius * Math.cos(phi)] }
  }), [skills])

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[1.72, 28, 28]} />
        <meshBasicMaterial color="#00d9ff" wireframe transparent opacity={0.16} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.25, 0.012, 8, 160]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.65} />
      </mesh>
      {nodes.map(({ skill, position }) => (
        <group position={position} key={skill}>
          <mesh><sphereGeometry args={[0.045, 10, 10]} /><meshBasicMaterial color="#59e391" /></mesh>
          <Html center distanceFactor={8} sprite><span className="skill-orbit-label">{skill}</span></Html>
        </group>
      ))}
    </group>
  )
}

export default function SkillGlobe({ skills }) {
  return (
    <div className="h-[530px] w-full md:h-[650px]" aria-label="Draggable three-dimensional skills globe">
      <Canvas frameloop="demand" camera={{ position: [0, 0, 7.1], fov: 48 }} dpr={[1, 1.25]}>
        <Globe skills={skills} />
        <OrbitControls enablePan={false} enableZoom={false} rotateSpeed={0.55} />
      </Canvas>
    </div>
  )
}
