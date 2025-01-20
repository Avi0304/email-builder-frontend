import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getEmailTemplates, renderAndDownloadTemplate } from "../api"; // Ensure both functions are imported
import NavBar1 from "../components/NavBar1";
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress'; // Import the CircularProgress component
import '../styles/App.css';

export default function TemplatePage() {
  const [templates, setTemplates] = useState([]);
  const [alertMessage, setAlertMessage] = useState(""); 
  const [loading, setLoading] = useState(true); // Add a loading state
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all templates from the backend
    getEmailTemplates()
      .then((res) => {
        setTemplates(res.data);
        setLoading(false); // Stop the loading spinner when the data is fetched
      })
      .catch((err) => {
        console.error("Error fetching templates:", err);
        setLoading(false); // Stop the loading spinner on error
      });
  }, []);

  const handleTemplateClick = (templateId) => {
    // Navigate to the editing page for the selected template
    navigate(`/edit/${templateId}`);
  };

  const handleNewTemplate = () => {
    // Navigate to the page for creating a new template
    navigate("/new");
  };

  const handleDownloadExistingTemplate = async (template, event) => {
    event.stopPropagation(); // Prevent card click when download button is clicked
    
    try {
      const templateData = {
        title: template.title,
        content: template.content,
        footer: template.footer,
        imageUrls: template.imageURL || [], // Ensure imageURLs are passed
        logo: template.logo || "", // Pass logo if available
        titleStyle: template.titleStyle, // Pass title styles
        contentStyle: template.contentStyle, // Pass content styles
        footerStyle: template.footerStyle, // Pass footer styles
      };

      const file = await renderAndDownloadTemplate(templateData);

      const blob = new Blob([file], { type: "text/html" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${template.title.replace(/\s+/g, "_")}_template.html`;
      link.click();

      // Set the success message for the alert
      setAlertMessage("Template downloaded successfully!");

      setTimeout(() => {
        setAlertMessage(""); // Reset alert message
      }, 3000);
    } catch (error) {
      console.error("Error downloading template:", error);
      alert("Failed to download template. Please try again.");
    }
  };

  return (
    <>
      <NavBar1 />

      <div className="template-container" style={{ marginLeft: '20px', marginTop: '100px', marginRight: '20px' }}>
        <div className="homepage-header">
          <h1>Email Templates</h1>
          <button className="new-template-button" onClick={handleNewTemplate}>
            New Template
          </button>
        </div>

        {/* Show alert if the message is not empty */}
        {alertMessage && (
          <Alert variant="filled" severity="success" style={{ marginBottom: '20px' }}>
            {alertMessage}
          </Alert>
        )}

        {/* Show loading spinner while templates are being fetched */}
        {loading ? (
          <div className="loading-container" style={{ textAlign: 'center', marginTop: '50px' }}>
            <CircularProgress />
            <p>Loading templates...</p>
          </div>
        ) : (
          <div className="template-grid">
            {templates.map((template) => (
              <div
                key={template._id}
                className="template-card"
                onClick={() => handleTemplateClick(template._id)} // Navigate on card click
              >
                <h3>{template.title}</h3>
                <p>{template.content.substring(0, 50)}...</p>
                <div className="card-actions mt-3">
                  <button
                    className="btn btn-primary"
                    onClick={(e) => handleDownloadExistingTemplate(template, e)} // Pass event to handleDownloadExistingTemplate
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
