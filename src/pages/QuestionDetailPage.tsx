import React from 'react';
import { useParams, Link } from 'react-router-dom';
import questionsData from '../data/mockQuestions.json';

const getSavedQuestions = () => {
  const saved = localStorage.getItem('questions');
  return saved ? JSON.parse(saved) : [];
};

const allQuestions = () => [
  ...questionsData,
  ...getSavedQuestions()
];

const QuestionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const question = allQuestions().find(q => q.id === id);

  if (!question) {
    return <div className="alert alert-danger">Question not found. <Link to="/">Go back</Link></div>;
  }

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h2 className="card-title">{question.title}</h2>
        <h6 className="card-subtitle mb-2 text-muted">
          {question.difficulty} | {question.company}
        </h6>
        <div className="mb-2">
          {question.tags.map((tag: string) => (
            <span key={tag} className="badge bg-secondary me-1">{tag}</span>
          ))}
        </div>
        <hr />
        <div dangerouslySetInnerHTML={{ __html: question.body || question.excerpt }} />
        <Link to="/" className="btn btn-link mt-3">Back to Questions</Link>
      </div>
    </div>
  );
};

export default QuestionDetailPage; 