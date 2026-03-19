import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = ({ items, cart, setCart }) => {
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

      <div className="container my-4 my-md-5">
        <div className="row g-4 justify-content-center">
          {items.length > 0 ? (
            items.map((product) => (
              <div key={product.id} className="col-12 col-sm-6 col-lg-4 d-flex justify-content-center">
                <div className="card product-card h-100">
                  <Link to={`/product/${product.id}`} className="product-image-wrap">
                    <img src={product.imgSrc} className="card-img-top product-image" alt={product.title} />
                  </Link>
                  <div className="card-body d-flex flex-column text-center">
                    <h5 className="card-title product-title">{product.title}</h5>
                    <p className="card-text product-description">{product.description}</p>
                    <div className="product-actions mt-auto">
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
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <h3>No products found</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Product;
