import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { items } from "./Data";
import Product from "./Product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetail = ({ cart, setCart }) => {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const foundProduct = items.find((item) => String(item.id) === String(id));
    setProduct(foundProduct || {});

    if (foundProduct) {
      const filteredRelated = items.filter(
        (item) => item.category === foundProduct.category && item.id !== foundProduct.id
      );
      setRelatedProducts(filteredRelated);
    } else {
      setRelatedProducts([]);
    }
  }, [id]);

  const addToCart = (id, price, title, description, imgSrc) => {
    const obj = {
      id,
      price,
      title,
      description,
      imgSrc,
    };
    setCart([...cart, obj]);
    toast.success("Item added to cart", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };

  if (!product?.id) {
    return (
      <div className="container py-5 text-center">
        <h2>Product not found</h2>
      </div>
    );
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="container py-4 py-md-5">
        <div className="product-detail-card">
          <div className="img">
            <img src={product.imgSrc} alt={product.title} />
          </div>
          <div className="text-center text-md-start detail-content">
            <h1 className="card-title mb-3">{product.title}</h1>
            <p className="card-text mb-4">{product.description}</p>
            <div className="detail-actions">
              <button className="btn btn-primary">{product.price} ₹</button>
              <button
                onClick={() =>
                  addToCart(
                    product.id,
                    product.price,
                    product.title,
                    product.description,
                    product.imgSrc
                  )
                }
                className="btn btn-warning"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-center mt-3">Related Products</h2>
      <Product cart={cart} setCart={setCart} items={relatedProducts} />
    </>
  );
};

export default ProductDetail;
