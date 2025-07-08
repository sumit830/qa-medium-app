import React from 'react';

export interface QuestionCardProps {
  id: string;
  title: string;
  tags: string[];
  difficulty: string;
  company: string;
  excerpt: string;
  onClick?: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ id, title, tags, difficulty, company, excerpt, onClick }) => (
  <div className="card mb-3" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <h6 className="card-subtitle mb-2 text-muted">
        {difficulty} | {company}
      </h6>
      <p className="card-text">{excerpt}</p>
      <div>
        {tags.map(tag => (
          <span key={tag} className="badge bg-secondary me-1">{tag}</span>
        ))}
      </div>
    </div>
  </div>
);

export default QuestionCard; 