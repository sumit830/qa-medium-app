import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionForm from '../components/QuestionForm';

function generateId() {
  return Date.now().toString();
}

const AskQuestion: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [company, setCompany] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newQuestion = {
      id: generateId(),
      title,
      body,
      tags: tags.split(',').map(t => t.trim()),
      difficulty,
      company,
      excerpt: body.replace(/<[^>]+>/g, '').slice(0, 100) + '...'
    };
    const saved = localStorage.getItem('questions');
    const questions = saved ? JSON.parse(saved) : [];
    questions.push(newQuestion);
    localStorage.setItem('questions', JSON.stringify(questions));
    // Reset form
    setTitle('');
    setBody('');
    setTags('');
    setDifficulty('');
    setCompany('');
    alert('Question submitted!');
    navigate('/');
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <QuestionForm
          title={title}
          onTitleChange={setTitle}
          body={body}
          onBodyChange={setBody}
          tags={tags}
          onTagsChange={setTags}
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
          company={company}
          onCompanyChange={setCompany}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AskQuestion; 