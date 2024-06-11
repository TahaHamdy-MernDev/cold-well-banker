import React, { useState } from "react";
import { Form } from "react-bootstrap";

const ImageUploader = ({ maxImages, name, onFilesSelect }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    const images = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.type.startsWith("image/")) {
        images.push(file);
        if (images.length > maxImages) {
          images.pop();
        }
      }
    }

    setSelectedFiles([...images]);
    onFilesSelect(images);
  };

  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Control
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          name={name} 
        />
      </Form.Group>
      <div>
        {selectedFiles.map((file, index) => (
          <img
            key={index}
            src={URL.createObjectURL(file)}
            alt={`Preview ${index + 1}`}
            style={{ maxWidth: "100px", marginRight: "10px" }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
