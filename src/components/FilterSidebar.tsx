import React from 'react';

export interface FilterSidebarProps {
  tags: string[];
  selectedTags: string[];
  onTagChange: (tag: string) => void;
  difficulties: string[];
  selectedDifficulty: string;
  onDifficultyChange: (difficulty: string) => void;
  companies: string[];
  selectedCompany: string;
  onCompanyChange: (company: string) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  tags,
  selectedTags,
  onTagChange,
  difficulties,
  selectedDifficulty,
  onDifficultyChange,
  companies,
  selectedCompany,
  onCompanyChange,
}) => (
  <div className="mb-4">
    <h5>Filter</h5>
    <div className="mb-3">
      <label className="form-label">Tags</label>
      <div>
        {tags.map(tag => (
          <div className="form-check form-check-inline" key={tag}>
            <input
              className="form-check-input"
              type="checkbox"
              id={`tag-${tag}`}
              checked={selectedTags.includes(tag)}
              onChange={() => onTagChange(tag)}
            />
            <label className="form-check-label" htmlFor={`tag-${tag}`}>{tag}</label>
          </div>
        ))}
      </div>
    </div>
    <div className="mb-3">
      <label className="form-label">Difficulty</label>
      <select className="form-select" value={selectedDifficulty} onChange={e => onDifficultyChange(e.target.value)}>
        <option value="">All</option>
        {difficulties.map(difficulty => (
          <option key={difficulty} value={difficulty}>{difficulty}</option>
        ))}
      </select>
    </div>
    <div className="mb-3">
      <label className="form-label">Company</label>
      <select className="form-select" value={selectedCompany} onChange={e => onCompanyChange(e.target.value)}>
        <option value="">All</option>
        {companies.map(company => (
          <option key={company} value={company}>{company}</option>
        ))}
      </select>
    </div>
  </div>
);

export default FilterSidebar; 