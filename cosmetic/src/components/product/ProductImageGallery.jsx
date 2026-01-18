import { useState, useEffect } from "react";

export default function ProductImageGallery({ images }) {

  // only image ki
// const [active, setActive] = useState(images?.[0]);

// useEffect(() => {
//     setActive(images?.[0]);
//   }, [images]);

const [active, setActive] = useState(null);

useEffect(() => {
  if (!images || images.length === 0) return;

  const primary =
    images.find(img => img.isPrimary) || images[0];

  setActive(primary);
}, [images]);


  if (!images || images.length === 0) {
    return <img src="/no-image.png" alt="No Image" />;
  }

  return (
    <div className="image-gallery">
      {/* Thumbnails */}
      <div className="thumbs">
        {images.map(img => (
          // <img
          //   key={img.id}
          //   src={img.imageUrl}
          //   className={active?.id === img.id ? "active" : ""}
          //   onClick={() => setActive(img)}
          // />

          <img
  key={img.id}
  src={img.imageUrl}
  className={active?.id === img.id ? "active" : ""}
  onMouseEnter={() => setActive(img)}   // 👈 hover change
  onClick={() => setActive(img)}        // 👈 click change
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