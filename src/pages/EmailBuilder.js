import React, { useState } from "react";
import Editor from "../components/Editor";
import ImageUploader from "../components/ImageUploader";
import Preview from "../components/Preview";

const EmailBuilder = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [footer, setFooter] = useState("");
  const [imageUrls, setImageUrls] = useState([]);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div>
        <Editor
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          footer={footer}
          setFooter={setFooter}
        />
        <ImageUploader setImageUrls={setImageUrls} />
      </div>
      <Preview title={title} content={content} footer={footer} imageUrls={imageUrls} />
    </div>
  );
};

export default EmailBuilder;

