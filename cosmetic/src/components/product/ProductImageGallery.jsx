import { useState, useEffect } from "react";

export default function ProductImageGallery({ images }) {
  // const [active, setActive] = useState(null);
const [active, setActive] = useState(images?.[0]);


useEffect(() => {
    setActive(images?.[0]);
  }, [images]);


  if (!images || images.length === 0) {
    return <img src="/no-image.png" alt="No Image" />;
  }
  //   useEffect(() => {
  //   if (images && images.length > 0) {
  //     setActive(images[0]);   // 🔥 RESET ACTIVE IMAGE
  //   }
  // }, [images]);

  return (
    <div className="image-gallery">
      {/* Thumbnails */}
      <div className="thumbs">
        {images.map(img => (
          <img
            key={img.id}
            src={img.imageUrl}
            className={active?.id === img.id ? "active" : ""}
            onClick={() => setActive(img)}
          />
        ))}
      </div>

      {/* Main Image */}
      <div className="main-image">
        <img src={active?.imageUrl} />
      </div>
    </div>
  );
}