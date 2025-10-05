// components/FreelancerCard/FreelancerCard.jsx
import React from 'react'
import './FreelancerCard.css'

const FreelancerCard = ({ freelancer }) => {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    
    return (
      <>
        {'★'.repeat(fullStars)}
        {hasHalfStar && '½'}
        {'☆'.repeat(5 - Math.ceil(rating))}
      </>
    )
  }

  return (
    <div className="freelancer-card">
      <div className="freelancer-header">
        <div className="avatar">{freelancer.avatar}</div>
        <div className="freelancer-info">
          <h3 className="freelancer-name">{freelancer.name}</h3>
          <p className="freelancer-title">{freelancer.title}</p>
        </div>
      </div>
      
      <div className="rating-section">
        <div className="stars">
          {renderStars(freelancer.rating)}
          <span className="rating-number">{freelancer.rating}</span>
        </div>
        <span className="completed">{freelancer.completed} projetos</span>
      </div>
      
      <div className="freelancer-skills">
        {freelancer.skills.map((skill, index) => (
          <span key={index} className="skill-tag">{skill}</span>
        ))}
      </div>
      
      <div className="freelancer-footer">
        <span className="rate">{freelancer.hourlyRate}</span>
        <button className="btn-hire">Contratar</button>
      </div>
    </div>
  )
}

export default FreelancerCard