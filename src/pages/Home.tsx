import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionList from '../components/QuestionList';
import FilterSidebar from '../components/FilterSidebar';
import questionsData from '../data/mockQuestions.json';

const PAGE_SIZE = 5;

const getSavedQuestions = () => {
  const saved = localStorage.getItem('questions');
  return saved ? JSON.parse(saved) : [];
};

const allQuestions = () => [
  ...questionsData,
  ...getSavedQuestions()
];

const allTags = Array.from(new Set(allQuestions().flatMap(q => q.tags)));
const allDifficulties = Array.from(new Set(allQuestions().map(q => q.difficulty)));
const allCompanies = Array.from(new Set(allQuestions().map(q => q.company)));

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Recompute questions on filter or new question
  const questions = useMemo(() => allQuestions(), []);

  const filteredQuestions = questions.filter(q =>
    (selectedTags.length === 0 || selectedTags.every(tag => q.tags.includes(tag))) &&
    (!selectedDifficulty || q.difficulty === selectedDifficulty) &&
    (!selectedCompany || q.company === selectedCompany)
  );

  const visibleQuestions = filteredQuestions.slice(0, visibleCount);
  const hasMore = visibleCount < filteredQuestions.length;

  const loadMore = () => {
    setVisibleCount(prev => prev + PAGE_SIZE);
  };

  return (
    <div className="row">
      <div className="col-md-3">
        <FilterSidebar
          tags={allTags}
          selectedTags={selectedTags}
          onTagChange={tag =>
            setSelectedTags(selectedTags.includes(tag)
              ? selectedTags.filter(t => t !== tag)
              : [...selectedTags, tag])
          }
          difficulties={allDifficulties}
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={setSelectedDifficulty}
          companies={allCompanies}
          selectedCompany={selectedCompany}
          onCompanyChange={setSelectedCompany}
        />
      </div>
      <div className="col-md-9">
        <QuestionList
          questions={visibleQuestions}
          hasMore={hasMore}
          loadMore={loadMore}
          onQuestionClick={id => navigate(`/question/${id}`)}
        />
      </div>
    </div>
  );
};

export default Home; 