import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter
} from "@dnd-kit/core";

import {
  SortableContext,
  useSortable,
  arrayMove,
  horizontalListSortingStrategy
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import {
  Box,
  Typography,
  Button,
  Grid,
  Paper
} from "@mui/material";

import { useProduct } from "../../api/ProductContext";

/* -------------------- Sortable Item -------------------- */
function SortableImage({ id, image, index }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <Grid item xs={6} md={3}>
      <Paper
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        sx={{ p: 1, cursor: "grab" }}
      >
        <img
          src={image.preview}
          alt="preview"
          style={{
            width: "100%",
            height: 120,
            objectFit: "contain"
          }}
        />
        <Typography align="center" variant="caption">
          Order : {index + 1}
        </Typography>
      </Paper>
    </Grid>
  );
}

/* -------------------- Main Component -------------------- */
export default function ImageUploadStep({ onNext }) {
  const { productState } = useProduct();
  const productId = productState.productId;

  const [images, setImages] = useState([]);
  //add this line
    const [primaryIndex, setPrimaryIndex] = useState(0);

  /* -------- Select Images -------- */
  const handleFiles = (e) => {
    const files = Array.from(e.target.files);

    const mapped = files.map((file,index) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
         isPrimary: images.length === 0 && index === 0
    }));

    setImages((prev) => [...prev, ...mapped]);
  };

  /* -------- Drag End -------- */
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setImages((items) => {
      const oldIndex = items.findIndex(i => i.id === active.id);
      const newIndex = items.findIndex(i => i.id === over.id);

       // update primary index also
      if (oldIndex === primaryIndex) setPrimaryIndex(newIndex);

      return arrayMove(items, oldIndex, newIndex);
    });
  };

    /* -------- Set Primary -------- */
  const setPrimary = (index) => {
    setPrimaryIndex(index);
  };

  /* -------- Upload Images -------- */
  const uploadImages = async () => {
    if (images.length === 0) {
      alert("Add images first");
      return;
    }

    const formData = new FormData();
    images.forEach((img,index) => {
      formData.append("files", img.file);
        formData.append("orders", index);
    });

        formData.append("primaryIndex", primaryIndex);

    await fetch(
      `http://localhost:8080/auth/products/${productId}/images`,
      {
        method: "POST",
        body: formData
      }
    );

    alert("Images uploaded successfully");
    setImages([]);
    onNext();
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Upload Product Images
      </Typography>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFiles}
      />

      {/* -------- Drag & Drop Grid -------- */}
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={images.map(i => i.id)}
          strategy={horizontalListSortingStrategy}
        >
          <Grid container spacing={2} mt={2}>
            {images.map((img, index) => (
              <SortableImage
                key={img.id}
                id={img.id}
                image={img}
                index={index}
              />
            ))}
          </Grid>
        </SortableContext>
      </DndContext>

      <Button
        variant="contained"
        sx={{ mt: 4 }}
        onClick={uploadImages}
      >
        Upload Images
      </Button>
    </Box>
  );
}