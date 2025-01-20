const Preview = ({ title, content, footer, imageUrls = [] }) => {
  return (
    <div style={{ border: "1px solid #ddd", padding: "20px" }}>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <div>
        {imageUrls.map((url, index) => (
          <img key={index} src={url} alt={`Uploaded ${index}`} style={{ maxWidth: "100%" }} />
        ))}
      </div>
      <footer>{footer}</footer>
    </div>
  );
};

export default Preview;
