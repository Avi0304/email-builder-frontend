import React from "react";

const TemplateList = ({ templates, onTemplateSelect }) => {
  return (
    <div className="template-list">
      <h2>Email Templates</h2>
      {templates.map((template) => (
        <div
          key={template._id}
          className="template-card"
          onClick={() => onTemplateSelect(template._id)}
        >
          <h3>{template.title}</h3>
          <p>{template.content.substring(0, 50)}...</p>
        </div>
      ))}
    </div>
  );
};

export default TemplateList;
