import React from "react";
import { useDropzone } from "react-dropzone";
import { uploadImage } from "../api";

const ImageUploader = ({ setImageUrls }) => {
  const onDrop = (acceptedFiles) => {
    const formData = new FormData();
    formData.append("image", acceptedFiles[0]);

    uploadImage(formData)
      .then((res) => {
        setImageUrls((prev) => [...prev, res.data.imageUrl]);
      })
      .catch((err) => console.error("Error uploading image:", err));
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={{ border: "2px dashed #ddd", padding: "20px" }}>
      <input {...getInputProps()} />
      <p>Drag & drop an image, or click to select one</p>
    </div>
  );
};

export default ImageUploader;
