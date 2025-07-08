import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import QuestionCard, { QuestionCardProps } from './QuestionCard';

export interface QuestionListProps {
  questions: QuestionCardProps[];
  hasMore: boolean;
  loadMore: () => void;
  onQuestionClick?: (id: string) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({ questions, hasMore, loadMore, onQuestionClick }) => (
  <InfiniteScroll
    dataLength={questions.length}
    next={loadMore}
    hasMore={hasMore}
    loader={<h4>Loading...</h4>}
    endMessage={<p style={{ textAlign: 'center' }}><b>No more questions</b></p>}
  >
    {questions.map((q) => (
      <QuestionCard key={q.id} {...q} onClick={onQuestionClick ? () => onQuestionClick(q.id) : undefined} />
    ))}
  </InfiniteScroll>
);

export default QuestionList; 