import React, { useState } from "react";
import { uploadEmailConfig } from "../api";

const TemplateEditor = ({ template, setTemplate }) => {
  const [editingField, setEditingField] = useState(null);

  const handleFieldChange = (field, value) => {
    setTemplate((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    uploadEmailConfig(template)
      .then(() => alert("Template saved successfully!"))
      .catch((err) => console.error("Error saving template:", err));
  };

  return (
    <div className="template-editor">
      <h2>Edit Template</h2>
      <button onClick={handleSave}>Save Template</button>

      <div className="editable-field">
        <label>Title</label>
        <input
          type="text"
          value={template.title}
          onChange={(e) => handleFieldChange("title", e.target.value)}
        />
      </div>

      <div className="editable-field">
        <label>Content</label>
        <textarea
          value={template.content}
          onChange={(e) => handleFieldChange("content", e.target.value)}
        />
      </div>

      <div className="editable-field">
        <label>Footer</label>
        <input
          type="text"
          value={template.footer}
          onChange={(e) => handleFieldChange("footer", e.target.value)}
        />
      </div>
    </div>
  );
};

export default TemplateEditor;
