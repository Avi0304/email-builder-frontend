import React from "react";

const TemplatePreview = ({ template }) => {
  const { title, content, footer, imageUrls } = template;

  return (
    <div className="template-preview">
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <div>
        {imageUrls &&
          imageUrls.map((url, index) => (
            <img key={index} src={url} alt={`Uploaded ${index}`} style={{ maxWidth: "100%" }} />
          ))}
      </div>
      <footer>{footer}</footer>
    </div>
  );
};

export default TemplatePreview;
