import React from "react";
import { Link } from "react-router-dom";

const Cart = ({ cart, setCart }) => {
  return (
    <div className="container my-4 my-md-5">
      {cart.length === 0 ? (
        <div className="text-center py-5">
          <h1 className="mb-3">Your Cart is Empty</h1>
          <Link to="/" className="btn btn-warning">
            Continue Shopping...
          </Link>
        </div>
      ) : (
        <>
          <div className="row g-4 justify-content-center">
            {cart.map((product, index) => (
              <div key={`${product.id}-${index}`} className="col-12 col-lg-10 col-xl-9">
                <div className="card cart-card shadow-sm border-0">
                  <div className="row g-0 align-items-center">
                    <div className="col-12 col-md-4">
                      <img
                        src={product.imgSrc}
                        className="img-fluid rounded-start cart-image"
                        alt={product.title}
                      />
                    </div>
                    <div className="col-12 col-md-8">
                      <div className="card-body text-center text-md-start">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text">{product.description}</p>
                        <div className="product-actions justify-content-center justify-content-md-start">
                          <button className="btn btn-primary">{product.price} ₹</button>
                          <button className="btn btn-warning">Buy Now</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-footer-actions text-center my-5">
            <button className="btn btn-warning">CheckOut</button>
            <button onClick={() => setCart([])} className="btn btn-danger">
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
