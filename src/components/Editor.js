import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getEmailLayout, uploadEmailConfig } from '../api'

const Editor = () => {
  const [layout, setLayout] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [footer, setFooter] = useState("");
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    // Fetch the email layout from the backend
    getEmailLayout()
      .then((res) => setLayout(res.data))
      .catch((err) => console.error("Error fetching layout:", err));
  }, []);

  const handleSubmit = () => {
    const emailConfig = { title, content, footer, imageUrls };
    uploadEmailConfig(emailConfig)
      .then((res) => alert(res.data.message))
      .catch((err) => console.error("Error uploading config:", err));
  };

  return (
    <div>
      <h1>Email Builder</h1>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Content:</label>
        <ReactQuill value={content} onChange={setContent} />
      </div>
      <div>
        <label>Footer:</label>
        <input type="text" value={footer} onChange={(e) => setFooter(e.target.value)} />
      </div>
      <button onClick={handleSubmit}>Save Template</button>
    </div>
  );
};

export default Editor;
