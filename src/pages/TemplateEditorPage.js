import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmailTemplateById, uploadEmailConfig, uploadImage, } from '../api';
import '../styles/TemplateEditorPage.css';
import Navbar2 from '../components/NavBar2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faUnderline, faAlignLeft, faAlignJustify, faAlignCenter, faAlignRight, } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Alert from '@mui/material/Alert';
import Footer from '../components/Footer'



export default function TemplateEditorPage() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");

  const [template, setTemplate] = useState({
    title: "Your Email Title Here",
    content: "Your email content goes here. Edit to customize.",
    footer: "Your email footer here.",
    titleStyle: { color: "#000000", fontSize: "16px", fontFamily: "Arial", textAlign: "left" },
    contentStyle: { color: "#000000", fontSize: "16px", fontFamily: "Arial", textAlign: "left" },
    footerStyle: { color: "#000000", fontSize: "16px", fontFamily: "Arial", textAlign: "left" },
    logo: "", // Add a logo field to the template
    imageURL: [], // Ensure imageURL is initialized as an empty array
  });

  const [selectedElement, setSelectedElement] = useState(null);
  const fileInputRef = useRef(null);


  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const footerRef = useRef(null);


  // Fetch template if templateId exists
  useEffect(() => {
    if (templateId) {
      getEmailTemplateById(templateId)
        .then(res => {
          setTemplate(prev => ({
            ...prev,
            ...res.data,
            imageURL: res.data.imageURL || [], // Ensure imageURL is an array
            logo: res.data.logo || "", // Ensure logo is set
          }));
        })
        .catch(err => console.error("Error fetching template:", err));
    }
  }, [templateId]);

  useEffect(() => {
    if (templateId) {
      getEmailTemplateById(templateId)
        .then((res) => {
          setTemplate(res.data); // Populate state with fetched data, including styles
        })
        .catch((err) => console.error("Error fetching template:", err));
    }
  }, [templateId]);



  // Apply text styles based on selection
  const applyTextStyles = () => {
    if (selectedElement) {
      setTemplate((prev) => ({
        ...prev,
        [`${selectedElement}Style`]: {
          ...prev[`${selectedElement}Style`],
        },
        [selectedElement]: document.querySelector(`[contentEditable="true"]`).innerText, // Save content dynamically
      }));
      setAlertMessage("Apply changes successfully...");

      setTimeout(() => {
        setAlertMessage(""); // Reset alert message
      }, 3000);
    }
  };



  const handleTextStyleChange = (styleProperty, value) => {
    if (selectedElement) {
      // Make a copy of the template to avoid mutating the state directly
      const updatedTemplate = { ...template };

      // Get the current style of the selected element
      const currentStyle = { ...updatedTemplate[`${selectedElement}Style`] }; // Create a copy of the current style

      // Update the style property (e.g., fontWeight, fontSize, etc.)
      currentStyle[styleProperty] = value;

      // Update the template state with the new style
      updatedTemplate[`${selectedElement}Style`] = currentStyle;

      // Set the updated template state
      setTemplate(updatedTemplate);
    }
  };


  const handleTextTransformChange = (transform) => {
    if (selectedElement) {
      const updatedTemplate = { ...template };
      // eslint-disable-next-line
      const currentElement = updatedTemplate[`${selectedElement}Style`] || {}; // Ensure we're accessing the correct style
      const content = template[selectedElement] || ""; // Ensure we're accessing content correctly

      if (typeof content === 'string') {
        let transformedContent = content;

        // Apply the transformation based on the action
        switch (transform) {
          case 'uppercase':
            transformedContent = content.toUpperCase();
            break;
          case 'lowercase':
            transformedContent = content.toLowerCase();
            break;
          case 'capitalize':
            transformedContent = content
              .toLowerCase()
              .replace(/\b\w/g, (char) => char.toUpperCase());
            break;
          default:
            break;
        }

        // Ensure we're updating the correct selected element's content
        updatedTemplate[selectedElement] = transformedContent;

        setTemplate(updatedTemplate);
      } else {
        console.log('Content is not a string:', content); // Log content for debugging
      }
    }
  };



  const handleAlignmentChange = (alignment) => {
    setTemplate(prev => ({
      ...prev,
      [`${selectedElement}Style`]: {
        ...prev[`${selectedElement}Style`],
        textAlign: alignment
      }
    }));
  };


  // Save the updated template
  const handleSave = () => {
    uploadEmailConfig(template) // Send the entire template object, including styles
      .then(() => {
        navigate("/template");
        setAlertMessage("Template Save Successfully...");

        setTimeout(() => {
          setAlertMessage(""); // Reset alert message
        }, 3000);
      })
      .catch((err) => console.error("Error saving template:", err));
  };


  const handleFontSizeChange = (size) => {
    setTemplate(prev => ({
      ...prev,
      [`${selectedElement}Style`]: {
        ...prev[`${selectedElement}Style`],
        fontSize: size
      }
    }));
  };

  // image upload 

  // const handleImageUpload = async (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append("image", file);

  //     try {
  //       const res = await uploadImage(formData); // Call the backend API
  //       const uploadedImageUrl = res.data.imageUrl; // Get the relative path from the response

  //       setTemplate((prev) => ({
  //         ...prev,
  //         imageURL: [...prev.imageURL, uploadedImageUrl], // Add the relative path to the array
  //       }));

  //       setAlertMessage("Image Uploaded...");

  //       setTimeout(() => {
  //         setAlertMessage(""); // Reset alert message
  //       }, 3000);
  //     } catch (error) {
  //       console.error("Error uploading image:", error);

  //       setAlertMessage("Failed to upload the image. Please try again..");

  //       setTimeout(() => {
  //         setAlertMessage(""); // Reset alert message
  //       }, 3000);
  //     }
  //   }
  // };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
  
      try {
        // Replace with your actual backend API URL
        const res = await uploadImage(formData);  // Call your backend API
        if (res && res.data && res.data.imageUrl) {
          const uploadedImageUrl = res.data.imageUrl; // Ensure the server response contains the correct image URL
          
          // Save the image URL in the state
          setTemplate((prev) => ({
            ...prev,
            imageURL: [...prev.imageURL, uploadedImageUrl],
          }));
  
          setAlertMessage("Image uploaded successfully.");
  
          // Reset alert after 3 seconds
          setTimeout(() => {
            setAlertMessage("");
          }, 3000);
        } else {
          setAlertMessage("Image upload failed. No URL received.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        setAlertMessage("Failed to upload image. Please try again.");
  
        setTimeout(() => {
          setAlertMessage("");
        }, 3000);
      }
    }
  };
  


  const handleRemoveImage = (index) => {
    setTemplate((prev) => {
      const updatedImageURL = [...prev.imageURL]; // Create a copy of the current image array
      updatedImageURL.splice(index, 1); // Remove the image at the given index
      return {
        ...prev,
        imageURL: updatedImageURL, // Update the state with the new array
      };
    });
    setAlertMessage("Image Remove Successfully...");

    setTimeout(() => {
      setAlertMessage(""); // Reset alert message
    }, 3000);
  };



  return (
    <Navbar2>
      {alertMessage && (
        <Alert variant="filled" severity="success" style={{ marginBottom: '20px', marginTop: '20px' }}>
          {alertMessage}
        </Alert>
      )}
      <div className="template-editor-container">
        <div className="template-preview">
          {/* Render the logo */}
          {template.logo && (
            <div className="template-logo" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img
                src={template.logo}
                alt="Logo"
                className="logo-image"
                style={{ width: '100px', height: '100px' }}
              />
            </div>
          )}

          {/* Title */}
          <h2
            ref={titleRef}
            contentEditable={selectedElement === "title"}
            style={template.titleStyle}
            onClick={() => setSelectedElement("title")}
            dangerouslySetInnerHTML={{ __html: template.title }}
          ></h2>

          {/* Content */}
          <p
            ref={contentRef}
            contentEditable={selectedElement === "content"}
            style={template.contentStyle}
            onClick={() => setSelectedElement("content")}
            dangerouslySetInnerHTML={{ __html: template.content }}
          ></p>

          {/* Footer */}
          <footer
            ref={footerRef}
            contentEditable={selectedElement === "footer"}
            style={template.footerStyle}
            onClick={() => setSelectedElement("footer")}
            dangerouslySetInnerHTML={{ __html: template.footer }}
          ></footer>

          {/* Render image gallery */}
          {/* Render image gallery */}
          {template.imageURL && template.imageURL.length > 0 ? (
            <div className="image-gallery">
              {template.imageURL.map((url, index) => (
                <div key={index} className="image-container">
                  <img
                    src={url}  // Use the image URL
                    alt={`Uploaded Image ${index + 1}`}  // Alt text for the image
                    className="template-image"
                  />
                  <button
                    className="remove-image-button"
                    onClick={() => handleRemoveImage(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No images available</p>
          )}

        </div>

        <div className="template-editor-controls">
          <h3>Editing Panel</h3>

          <div className='editor-control'>
            <label style={{ fontWeight: 'bold' }}>Text Style:</label>
            <ButtonGroup color="secondary" aria-label="Text Style Button Group" className="text-transform-button-group">
              <Button onClick={() => handleTextStyleChange("fontWeight", "bold")}>
                <FontAwesomeIcon icon={faBold} />
              </Button>
              <Button onClick={() => handleTextStyleChange("fontStyle", "italic")}>
                <FontAwesomeIcon icon={faItalic} />
              </Button>
              <Button onClick={() => handleTextStyleChange("textDecoration", "underline")}>
                <FontAwesomeIcon icon={faUnderline} />
              </Button>
            </ButtonGroup>
          </div>

          <div className="editor-control">
            <label style={{ fontWeight: "bold" }}>Alignment</label>
            <div>
              <ButtonGroup color="secondary" aria-label="Text Alignment Button Group" className="text-transform-button-group">
                <Button onClick={() => handleAlignmentChange('left')}>
                  <FontAwesomeIcon icon={faAlignLeft} />
                </Button>
                <Button onClick={() => handleAlignmentChange('center')}>
                  <FontAwesomeIcon icon={faAlignCenter} />
                </Button>
                <Button onClick={() => handleAlignmentChange('justify')}>
                  <FontAwesomeIcon icon={faAlignJustify} />
                </Button>
                <Button onClick={() => handleAlignmentChange('right')}>
                  <FontAwesomeIcon icon={faAlignRight} />
                </Button>
              </ButtonGroup>
            </div>
          </div>

          <div className="editor-control">
            <label>Text Color:</label>
            <input
              type="color"
              value={template[`${selectedElement}Style`]?.color || "#000000"}
              onChange={(e) =>
                setTemplate((prev) => ({
                  ...prev,
                  [`${selectedElement}Style`]: {
                    ...prev[`${selectedElement}Style`],
                    color: e.target.value,
                  },
                }))
              }
            />
          </div>

          <div className="editor-control">
            <label>Font Size:</label>
            <ButtonGroup color="secondary" aria-label="Font Size Button Group" className="text-transform-button-group">
              <Button onClick={() => handleFontSizeChange('12px')}>
                XS
              </Button>
              <Button onClick={() => handleFontSizeChange('16px')}>
                M
              </Button>
              <Button onClick={() => handleFontSizeChange('20px')}>
                L
              </Button>
              <Button onClick={() => handleFontSizeChange('24px')}>
                XL
              </Button>
            </ButtonGroup>
          </div>

          <div className='editor-control'>
            <label>Text Transform:</label>
            <ButtonGroup variant="contained" aria-label="Text Transform Button Group" className="text-transform-button-group">
              <Button onClick={() => handleTextTransformChange('uppercase')}>AA</Button>
              <Button onClick={() => handleTextTransformChange('lowercase')}>aa</Button>
              <Button onClick={() => handleTextTransformChange('capitalize')}>Aa</Button>
            </ButtonGroup>
          </div>

          <div className="editor-control">
            <label>Font Style:</label>
            <select
              value={template[`${selectedElement}Style`]?.fontFamily || "Arial"}
              onChange={(e) => setTemplate(prev => ({
                ...prev,
                [`${selectedElement}Style`]: {
                  ...prev[`${selectedElement}Style`],
                  fontFamily: e.target.value
                }
              }))}
            >
              <option value="Arial">Arial</option>
              <option value="Georgia">Georgia</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Verdana">Verdana</option>
            </select>
          </div>

          {/* Add Upload Image Input */}
          <div className="editor-control" style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Upload Image:</label>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              style={{
                display: 'none', // Hide default file input button
              }}
              id="fileInput"
            />
            <button
              style={{
                padding: '8px 16px',
                backgroundColor: '#218838',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'background-color 0.3s ease', // Smooth transition for background color
              }}
              onClick={() => document.getElementById('fileInput').click()} // Trigger file input click on button click
              onMouseEnter={(e) => e.target.style.backgroundColor = '#2bbb33'} // Change color on hover
              onMouseLeave={(e) => e.target.style.backgroundColor = '#218838'} // Revert color on mouse leave
            >
              Choose File
            </button>
          </div>


          <div style={{ display: 'inline-flex', gap: '40px' }}>
            <button onClick={applyTextStyles} className="apply-button" style={{ marginLeft: '60px' }}>
              Apply Changes
            </button>
            <button onClick={handleSave} className="save-button">
              Save Template
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </Navbar2>
  );
}
