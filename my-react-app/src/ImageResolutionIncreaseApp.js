import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageResolutionIncreaseApp = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [increasedImage, setIncreasedImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const image = new Image();
      image.src = event.target.result;
      image.onload = () => {
        setUploadedImage(image);
      };
    };

    reader.readAsDataURL(file);
  };

  const increaseResolution = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const scaleFactor = 2; // Increase resolution by a factor of 2

    canvas.width = uploadedImage.width * scaleFactor;
    canvas.height = uploadedImage.height * scaleFactor;

    context.drawImage(
      uploadedImage,
      0,
      0,
      uploadedImage.width,
      uploadedImage.height,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const increasedImageUrl = canvas.toDataURL();
    setIncreasedImage(increasedImageUrl);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div style={containerStyle}>
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image here...</p>
        ) : (
          <p>Drag and drop an image here, or click to select an image.</p>
        )}
      </div>

      {uploadedImage && (
        <div style={imageContainerStyle}>
          <h2>Original Image</h2>
          <img src={uploadedImage.src} alt="Original" style={imageStyle} />
          <button onClick={increaseResolution} style={buttonStyle}>
            Increase Resolution
          </button>
        </div>
      )}

      {increasedImage && (
        <div style={imageContainerStyle}>
          <h2>Increased Resolution</h2>
          <img src={increasedImage} alt="Increased" style={imageStyle} />
        </div>
      )}
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '2rem',
};

const dropzoneStyle = {
  border: '2px dashed #bbb',
  borderRadius: '8px',
  padding: '2rem',
  textAlign: 'center',
  cursor: 'pointer',
  backgroundColor: '#f8f8f8',
};

const imageContainerStyle = {
  marginTop: '2rem',
  textAlign: 'center',
};

const imageStyle = {
  maxWidth: '100%',
  maxHeight: '400px',
};

const buttonStyle = {
  padding: '0.5rem 1rem',
  fontSize: '1rem',
  fontWeight: 'bold',
  backgroundColor: '#4caf50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginTop: '1rem',
};

export default ImageResolutionIncreaseApp;
