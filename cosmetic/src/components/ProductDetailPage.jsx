import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

import ProductBreadcrumb from "../components/product/ProductBreadcrumb";
import ProductHeader from "../components/product/ProductHeader";
import ProductPricing from "../components/product/ProductPricing";
import ProductVariants from "../components/product/ProductVariants";
import ProductBuyBox from "../components/product/ProductBuyBox";
import ProductTabs from "../components/product/ProductTabs";
import ProductImageGallery from "../components/product/ProductImageGallery";

import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { addToWishlistApi, removeWishlistApi, getWishlistApi } from "../api/wishlistApi";
import { getStoredUser } from "../utils/auth";

import "../styles/ProductDetailPage.css";

import ProductReviews from "../components/review/ProductReviews";

export default function ProductDetailPage() {
  const { id } = useParams();
const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(true);
const [variantImages, setVariantImages] = useState([]);

//wishlist
  const user = getStoredUser();
const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      loadProduct();
    }
  }, [id]);

  //veriant image ke liye add kiya
useEffect(() => {
  if (!selectedVariant?.id) {
    setVariantImages([]); // variant nahi → clear
    return;
  }

  axiosInstance
    .get(`/auth/products/${id}/images?variantId=${selectedVariant.id}`)
    .then(res => {
      setVariantImages(res.data || []); // 🔥 overwrite only
    })
    .catch(() => {
      setVariantImages([]);
    });
}, [selectedVariant?.id, id]);


const galleryImages =
  selectedVariant?.id
    ? (variantImages.length > 0 ? variantImages : product?.images || [])
    : product?.images || [];



console.log("GALLERY IMAGES", galleryImages);


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
    //wishlist
    if (user?.id) {
  const wishRes = await getWishlistApi(user.id);
  const exists = wishRes.data.some(
    (w) => w.productId === Number(id)
  );
  setWishlisted(exists);
}
  };

  //wishlist

  const toggleWishlist = async () => {
  if (!user?.id) {
    navigate("/login");
    return;
  }

  if (wishlisted) {
    await removeWishlistApi(user.id, Number(id));
    setWishlisted(false);
  } else {
    await addToWishlistApi({
      userId: user.id,
      productId: Number(id),
    });
    setWishlisted(true);
  }

  window.dispatchEvent(new Event("wishlistUpdated"));
};


  if (loading) return <h3>Loading...</h3>;
  if (!product) return <h3>Product not found</h3>;

  return (
    <div className="product-page">

      <ProductBreadcrumb product={product} />

      <div className="product-layout">

        {/* LEFT – Sticky Images */}
        <div className="product-left">
          {/* <ProductImageGallery
            // images={
            //   selectedVariant?.images?.length
            //     ? selectedVariant.images
            //     : product.images
            // }
images={variantImages.length ? variantImages : product.images} */}

<ProductImageGallery images={galleryImages} />

        </div>

        {/* RIGHT – Scrollable Content */}
        <div className="product-right">
          {/* <ProductHeader product={product} /> */}
     {/* wishlist */}
          <div className="product-header-row">
  <ProductHeader product={product} />

  <div className="wishlist-icon" onClick={toggleWishlist}>
    {wishlisted ? (
      <MdFavorite color="#e91e63" size={28} />
    ) : (
      <MdFavoriteBorder size={28} />
    )}
  </div>
</div>

          <ProductPricing variant={selectedVariant} />
          <ProductVariants
            variants={product.variants}
            selected={selectedVariant}
             productId={product.id}//add this line add to cart
            onSelect={setSelectedVariant}
          />
          <ProductBuyBox
           variant={selectedVariant} 
          productId={Number(id)}   // 🔥 GUARANTEED productId
         />
        </div>

      </div>

<ProductTabs product={product} />

<ProductReviews productId={Number(id)} />

    </div>
  );
}