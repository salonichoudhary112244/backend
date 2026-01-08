import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  Paper,
  IconButton,
  Grid
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";

import {
  DndContext,
  closestCenter
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useProduct } from "../../services/ProductContext";
import axiosInstance from "../../utils/axiosInstance";

/* ---------------- Sortable Image Card ---------------- */
function SortableImage({ image, onDelete, onSetPrimary }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      sx={{ p: 1, display: "flex", alignItems: "center", mb: 1 }}
      {...attributes}
      {...listeners}
    >
      <img
        src={image.preview}
        alt=""
        style={{ width: 80, height: 80, objectFit: "cover", marginRight: 16 }}
      />

      <Box sx={{ flex: 1 }}>
        {image.isPrimary && (
          <Typography color="primary" fontSize={12}>
            PRIMARY IMAGE
          </Typography>
        )}
      </Box>

      <IconButton onClick={() => onSetPrimary(image.id)}>
        <StarIcon color={image.isPrimary ? "warning" : "disabled"} />
      </IconButton>

      <IconButton onClick={() => onDelete(image.id)}>
        <DeleteIcon />
      </IconButton>
    </Paper>
  );
}

/* ---------------- Main Component ---------------- */
export default function VariantImageUploadStep({ onNext }) {
  const { productState } = useProduct();

  const [variants, setVariants] = useState([]);
  const [variantId, setVariantId] = useState("");
  const [images, setImages] = useState([]);

  /* ✅ FETCH VARIANTS */
  useEffect(() => {
    if (!productState.productId) return;

    axiosInstance
      .get(`/auth/products/${productState.productId}/variants`)
      .then(res => setVariants(res.data))
      .catch(() => alert("Failed to load variants"));
  }, [productState.productId]);

  /* Select files */
  const handleFiles = (e) => {
    const files = Array.from(e.target.files);

    const mapped = files.map((file, index) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
      isPrimary: images.length === 0 && index === 0
    }));

    setImages(prev => [...prev, ...mapped]);
  };

  /* Drag reorder */
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setImages(items => {
      const oldIndex = items.findIndex(i => i.id === active.id);
      const newIndex = items.findIndex(i => i.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  /* Set primary */
  const setPrimary = (id) => {
    setImages(images.map(img => ({
      ...img,
      isPrimary: img.id === id
    })));
  };

  /* Delete image */
  const removeImage = (id) => {
    setImages(images.filter(img => img.id !== id));
  };

  /* Upload */
  const uploadImages = async () => {
    if (!variantId || images.length === 0) {
      alert("Select variant and images");
      return;
    }

    const formData = new FormData();
    images.forEach(img => formData.append("files", img.file));

    await axiosInstance.post(
      `/auth/products/${productState.productId}/images?variantId=${variantId}`,
      formData
    );

    alert("Images uploaded successfully");
    onNext();
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Variant Image Upload
      </Typography>

      {/* ✅ VARIANT DROPDOWN (FIXED) */}
      <Select
        fullWidth
        value={variantId}
        onChange={(e) => setVariantId(e.target.value)}
        sx={{ mb: 2 }}
        displayEmpty
      >
        <MenuItem value="" disabled>
          Select Variant
        </MenuItem>

        {variants.map(v => (
          <MenuItem key={v.id} value={v.id}>
            {v.sku}   {/* 🔥 FIX: sku instead of name */}
          </MenuItem>
        ))}
      </Select>

      <Button variant="outlined" component="label">
        Select Images
        <input hidden type="file" multiple onChange={handleFiles} />
      </Button>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={images.map(i => i.id)}
          strategy={verticalListSortingStrategy}
        >
          <Grid container direction="column" sx={{ mt: 2 }}>
            {images.map(img => (
              <SortableImage
                key={img.id}
                image={img}
                onDelete={removeImage}
                onSetPrimary={setPrimary}
              />
            ))}
          </Grid>
        </SortableContext>
      </DndContext>

      <Button variant="contained" sx={{ mt: 3 }} onClick={uploadImages}>
        Upload Images
      </Button>
    </Box>
  );
}