import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEmailTemplateById, uploadEmailConfig } from "../api";
import Editor from "../components/Editor";
import ImageUploader from "../components/ImageUploader";
import Preview from "../components/Preview";

const EmailEditorPage = () => {
  const { templateId } = useParams();
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    getEmailTemplateById(templateId)
      .then((res) => setTemplate(res.data))
      .catch((err) => console.error("Error fetching template:", err));
  }, [templateId]);

  const handleSave = (updatedTemplate) => {
    uploadEmailConfig(updatedTemplate)
      .then((res) => alert("Template saved successfully!"))
      .catch((err) => console.error("Error saving template:", err));
  };

  if (!template) return <p>Loading...</p>;

  return (
    <div>
      <Editor
        title={template.title}
        content={template.content}
        footer={template.footer}
        imageUrls={template.imageUrls}
        onSave={handleSave}
      />
      <ImageUploader />
      <Preview
        title={template.title}
        content={template.content}
        footer={template.footer}
        imageUrls={template.imageUrls}
      />
    </div>
  );
};

export default EmailEditorPage;
