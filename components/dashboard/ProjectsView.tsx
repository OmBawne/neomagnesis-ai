'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, FolderOpen, X, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Project {
  id: string
  name: string
  description: string
  createdAt: Date
  runs: number
}

const INITIAL_PROJECTS: Project[] = [
  { id: '1', name: 'YouTube Automation', description: 'Auto-generate and upload Shorts daily', createdAt: new Date('2026-05-01'), runs: 42 },
  { id: '2', name: 'Lead Gen Pipeline', description: 'Capture and qualify leads from website', createdAt: new Date('2026-05-10'), runs: 18 },
]

export default function ProjectsView() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS)
  const [showModal, setShowModal] = useState(false)
  const [newName, setNewName] = useState('')
  const [newDesc, setNewDesc] = useState('')

  const createProject = () => {
    if (!newName.trim()) return
    const p: Project = {
      id: Date.now().toString(),
      name: newName.trim(),
      description: newDesc.trim() || 'No description',
      createdAt: new Date(),
      runs: 0,
    }
    setProjects(prev => [p, ...prev])
    setNewName('')
    setNewDesc('')
    setShowModal(false)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/[0.06] flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold text-white">Projects</h1>
          <p className="text-xs text-slate-500 mt-0.5">{projects.length} project{projects.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary text-sm py-2">
          <Plus size={14} /> Create Project
        </button>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <FolderOpen size={40} className="text-slate-700 mb-4" />
            <p className="text-slate-500 text-sm">No projects yet. Create one to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -3 }}
                className="glass-light rounded-xl p-5 border border-white/[0.06] cursor-pointer group hover:border-indigo-500/20 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <FolderOpen size={15} className="text-indigo-400" />
                  </div>
                  <ArrowRight size={14} className="text-slate-700 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">{project.name}</h3>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex items-center justify-between text-[10px] text-slate-600">
                  <span>{project.createdAt.toLocaleDateString()}</span>
                  <span className="text-emerald-500">{project.runs} runs</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Create Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={e => { if (e.target === e.currentTarget) setShowModal(false) }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              className="w-full max-w-md mx-4 glass rounded-2xl p-7"
              style={{ border: '1px solid rgba(99,102,241,0.2)' }}
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-semibold text-white">Create Project</h2>
                <button onClick={() => setShowModal(false)} className="text-slate-500 hover:text-slate-300">
                  <X size={16} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-slate-500 mb-1.5 block">Project Name</label>
                  <input
                    type="text"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && createProject()}
                    placeholder="e.g. YouTube Automation"
                    className="neo-input"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1.5 block">Description (optional)</label>
                  <input
                    type="text"
                    value={newDesc}
                    onChange={e => setNewDesc(e.target.value)}
                    placeholder="What does this project do?"
                    className="neo-input"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowModal(false)} className="btn-ghost flex-1 justify-center">Cancel</button>
                <button onClick={createProject} className="btn-primary flex-1 justify-center">Create</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
