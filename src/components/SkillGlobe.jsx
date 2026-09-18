import { Canvas } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import { useMemo } from 'react'
import {
  SiPython, SiJavascript, SiTypescript, SiCplusplus, SiMysql,
  SiReact, SiNextdotjs, SiNodedotjs, SiFastapi, SiTailwindcss,
  SiTensorflow, SiHuggingface, SiLangchain, SiGit, SiGithub,
  SiDocker, SiPostgresql, SiRedis, SiJupyter,
  SiPostman, SiVercel,
} from 'react-icons/si'
import { FaBrain, FaNetworkWired } from 'react-icons/fa'
import { BsBarChartFill } from 'react-icons/bs'
import { MdMemory, MdSchema } from 'react-icons/md'
import { TbMathFunction, TbBinaryTree } from 'react-icons/tb'
import { VscServerProcess } from 'react-icons/vsc'

// ─── Skill metadata: color + icon ───────────────────────────────────────────
export const SKILL_META = {
  // Languages & Frameworks
  Python:            { color: '#3776ab', Icon: SiPython },
  JavaScript:        { color: '#f7df1e', Icon: SiJavascript },
  TypeScript:        { color: '#3178c6', Icon: SiTypescript },
  'C++':             { color: '#00599c', Icon: SiCplusplus },
  SQL:               { color: '#e38c00', Icon: SiMysql },
  React:             { color: '#61dafb', Icon: SiReact },
  'Next.js':         { color: '#e2e8f0', Icon: SiNextdotjs },
  'Node.js':         { color: '#68a063', Icon: SiNodedotjs },
  FastAPI:           { color: '#009688', Icon: SiFastapi },
  'Tailwind CSS':    { color: '#38bdf8', Icon: SiTailwindcss },

  // AI / ML
  'Deep Learning':   { color: '#ff6b6b', Icon: FaBrain },
  NLP:               { color: '#c084fc', Icon: FaNetworkWired },
  XGBoost:           { color: '#f97316', Icon: BsBarChartFill },
  LSTM:              { color: '#a78bfa', Icon: MdMemory },
  LangChain:         { color: '#00c4a7', Icon: SiLangchain },
  RAG:               { color: '#fb7185', Icon: MdSchema },
  HuggingFace:       { color: '#ffcc00', Icon: SiHuggingface },
  TensorFlow:        { color: '#ff6f00', Icon: SiTensorflow },
  'Model Evaluation':{ color: '#34d399', Icon: BsBarChartFill },

  // Tools
  Git:               { color: '#f05032', Icon: SiGit },
  GitHub:            { color: '#e0e0e0', Icon: SiGithub },
  Docker:            { color: '#2496ed', Icon: SiDocker },
  PostgreSQL:        { color: '#336791', Icon: SiPostgresql },
  Redis:             { color: '#dc382d', Icon: SiRedis },
  Jupyter:           { color: '#f37626', Icon: SiJupyter },
  'Power BI':        { color: '#f2c811', Icon: BsBarChartFill },
  Postman:           { color: '#ef5b25', Icon: SiPostman },
  Vercel:            { color: '#e2e8f0', Icon: SiVercel },

  // Foundations
  'Data Structures':       { color: '#60a5fa', Icon: TbBinaryTree },
  Algorithms:              { color: '#34d399', Icon: TbBinaryTree },
  'Complexity Analysis':   { color: '#a78bfa', Icon: TbMathFunction },
  OOP:                     { color: '#f59e0b', Icon: VscServerProcess },
  'Linear Algebra':        { color: '#e879f9', Icon: TbMathFunction },
  Probability:             { color: '#38bdf8', Icon: TbMathFunction },
  'System Design':         { color: '#fb923c', Icon: VscServerProcess },
  'Computer Architecture': { color: '#94a3b8', Icon: MdMemory },
}

const DEFAULT_COLORS = [
  '#00d9ff', '#59e391', '#8b5cf6', '#ffad66',
  '#f472b6', '#34d399', '#60a5fa', '#fbbf24',
]

export function getSkillColor(skill, idx) {
  return SKILL_META[skill]?.color ?? DEFAULT_COLORS[idx % DEFAULT_COLORS.length]
}

// ─── Inner Globe (Three.js scene) ───────────────────────────────────────────
function Globe({ skills }) {
  const nodes = useMemo(() =>
    skills.map((skill, index) => {
      const phi   = Math.acos(-1 + (2 * index) / Math.max(skills.length - 1, 1))
      const theta = Math.sqrt(skills.length * Math.PI) * phi
      const r     = 2.08
      const meta  = SKILL_META[skill] ?? { color: DEFAULT_COLORS[index % DEFAULT_COLORS.length] }
      return {
        skill,
        color: meta.color,
        Icon:  meta.Icon ?? null,
        position: [
          r * Math.cos(theta) * Math.sin(phi),
          r * Math.sin(theta) * Math.sin(phi),
          r * Math.cos(phi),
        ],
      }
    }), [skills])

  return (
    <group>
      {/* Wireframe sphere */}
      <mesh>
        <sphereGeometry args={[1.72, 28, 28]} />
        <meshBasicMaterial color="#00d9ff" wireframe transparent opacity={0.16} />
      </mesh>

      {/* Equatorial ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.25, 0.012, 8, 160]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.65} />
      </mesh>

      {/* Skill nodes */}
      {nodes.map(({ skill, color, Icon, position }) => (
        <group position={position} key={skill}>
          <mesh>
            <sphereGeometry args={[0.052, 10, 10]} />
            <meshBasicMaterial color={color} />
          </mesh>
          <Html center distanceFactor={8} sprite>
            <span
              className="skill-orbit-label"
              style={{ color, textShadow: `0 0 8px ${color}88, 0 0 18px ${color}44` }}
            >
              {Icon && (
                <Icon
                  style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4, fontSize: 10 }}
                />
              )}
              {skill}
            </span>
          </Html>
        </group>
      ))}
    </group>
  )
}

// ─── Exported component ──────────────────────────────────────────────────────
export default function SkillGlobe({ skills }) {
  return (
    <div
      className="h-[530px] w-full md:h-[650px]"
      aria-label="Draggable three-dimensional skills globe"
    >
      <Canvas frameloop="always" camera={{ position: [0, 0, 7.1], fov: 48 }} dpr={[1, 1.5]}>
        <Globe skills={skills} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          rotateSpeed={0.55}
          enableDamping
          dampingFactor={0.08}
          autoRotate
          autoRotateSpeed={1.4}
        />
      </Canvas>
    </div>
  )
}
