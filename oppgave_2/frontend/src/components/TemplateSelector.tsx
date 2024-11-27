import React from 'react';

export default function TemplateSelector({ templates, selectedTemplate, onTemplateChange }) {
  return (
    <div className="form-group">
      <label>Choose Option:</label>
      <select value={selectedTemplate} onChange={onTemplateChange}>
        <option value="">Make arrangement from scratch</option>
        {templates.map((template) => (
          <option key={template.id} value={template.id}>
            {template.title}
          </option>
        ))}
      </select>
    </div>
  );
}
