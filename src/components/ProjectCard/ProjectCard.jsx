// components/ProjectCard/ProjectCard.jsx
import React from 'react'
import './ProjectCard.css'

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <div className="project-header">
        <h3 className="project-title">{project.title}</h3>
        <span className="budget">{project.budget}</span>
      </div>
      
      <p className="project-description">{project.description}</p>
      
      <div className="project-client">
        <i className="fas fa-building"></i>
        <span>{project.client}</span>
      </div>
      
      <div className="project-skills">
        {project.skills.map((skill, index) => (
          <span key={index} className="skill-tag">{skill}</span>
        ))}
      </div>
      
      <div className="project-footer">
        <div className="project-meta">
          <span className="posted-time">{project.posted}</span>
          <span className="proposals">{project.proposals} propostas</span>
        </div>
        <button className="btn-apply">Enviar Proposta</button>
      </div>
    </div>
  )
}

export default ProjectCard