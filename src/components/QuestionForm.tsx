import React, { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import '../App.css';

export interface QuestionFormProps {
  title: string;
  onTitleChange: (value: string) => void;
  body: string;
  onBodyChange: (value: string) => void;
  tags: string;
  onTagsChange: (value: string) => void;
  difficulty: string;
  onDifficultyChange: (value: string) => void;
  company: string;
  onCompanyChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  title,
  onTitleChange,
  body,
  onBodyChange,
  tags,
  onTagsChange,
  difficulty,
  onDifficultyChange,
  company,
  onCompanyChange,
  onSubmit,
}) => {
  const { quill, quillRef } = useQuill({
    theme: 'snow',
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        // Remove the direction button
        // [{ 'direction': 'rtl' }], // <-- Do not include this
        [{ 'align': [] }],
        ['clean']
      ]
    }
  });

  useEffect(() => {
    if (quill) {
      // Set the initial value only if the editor is empty or default
      if (
        !quill.root.innerHTML ||
        quill.root.innerHTML === '<p><br></p>' ||
        quill.root.innerHTML === ''
      ) {
        quill.root.innerHTML = body || '';
      }

      const setAllLTR = () => {
        // Set dir attribute on root if not already set
        if (quill.root.getAttribute('dir') !== 'ltr') {
          quill.root.setAttribute('dir', 'ltr');
        }
        // Set dir and textAlign on all child elements if needed
        Array.from(quill.root.querySelectorAll('*')).forEach((el: any) => {
          if (el.getAttribute('dir') !== 'ltr') {
            el.setAttribute('dir', 'ltr');
          }
          if (el.style.textAlign !== 'left') {
            el.style.textAlign = 'left';
          }
        });
        // Send back the current editor content
        onBodyChange(quill.root.innerHTML);
      };

      quill.on('text-change', setAllLTR);
      setAllLTR();
      return () => {
        quill.off('text-change', setAllLTR);
      };
    }
  }, [quill, body, onBodyChange]);

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={e => onTitleChange(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Body</label>
        <div ref={quillRef}  />
      </div>
      <div className="mb-3">
        <label className="form-label">Tags (comma separated)</label>
        <input
          type="text"
          className="form-control"
          value={tags}
          onChange={e => onTagsChange(e.target.value)}
          placeholder="e.g. JavaScript, System Design, HR"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Difficulty</label>
        <select className="form-select" value={difficulty} onChange={e => onDifficultyChange(e.target.value)} required>
          <option value="">Select difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Company</label>
        <input
          type="text"
          className="form-control"
          value={company}
          onChange={e => onCompanyChange(e.target.value)}
          placeholder="e.g. Google, Amazon"
        />
      </div>
      <button type="submit" className="btn btn-success">Post Question</button>
    </form>
  );
};

export default QuestionForm; 