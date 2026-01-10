import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import ProductCard from "../components/ProductCard";
import "../styles/products.css";

export default function ProductListPage() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await axiosInstance.get("/auth/products");
      setProducts(res.data);
    } catch (err) {
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="product-list-page">
      <h2 className="page-title">All Products</h2>

      <div className="product-grid">
        {products.map(product => (
          <ProductCard
            key={product.productId}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}