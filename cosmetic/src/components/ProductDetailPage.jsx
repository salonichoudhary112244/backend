import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

import ProductBreadcrumb from "../components/product/ProductBreadcrumb";
import ProductHeader from "../components/product/ProductHeader";
import ProductPricing from "../components/product/ProductPricing";
import ProductVariants from "../components/product/ProductVariants";
import ProductBuyBox from "../components/product/ProductBuyBox";
import ProductTabs from "../components/product/ProductTabs";
import ProductImageGallery from "../components/product/ProductImageGallery";

import "../styles/ProductDetailPage.css";

export default function ProductDetailPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      const res = await axiosInstance.get(`/auth/products/${id}/page`);
      setProduct(res.data);
      setSelectedVariant(res.data.variants?.[0] || null);
    } catch (err) {
      console.error(err);
      alert("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h3>Loading...</h3>;
  if (!product) return <h3>Product not found</h3>;

  return (
    <div className="product-page">

      <ProductBreadcrumb product={product} />

      <div className="product-layout">

        {/* LEFT – Sticky Images */}
        <div className="product-left">
          <ProductImageGallery
            images={
              selectedVariant?.images?.length
                ? selectedVariant.images
                : product.images
            }
          />
        </div>

        {/* RIGHT – Scrollable Content */}
        <div className="product-right">
          <ProductHeader product={product} />
          <ProductPricing variant={selectedVariant} />
          <ProductVariants
            variants={product.variants}
            selected={selectedVariant}
             productId={product.id}//add this line add to cart
            onSelect={setSelectedVariant}
          />
          <ProductBuyBox variant={selectedVariant} />
        </div>

      </div>

      <ProductTabs product={product} />
    </div>
  );
}