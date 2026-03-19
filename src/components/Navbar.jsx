import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { items } from "./Data";
import { BsCartCheck, BsList, BsX } from "react-icons/bs";

function Navbar({ setData, cart }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setsearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const filterByCategory = (category) => {
    const element = items.filter((product) => product.category === category);
    setData(element);
    setMenuOpen(false);
  };

  const filterByPrice = (price) => {
    const element = items.filter((product) => Number(product.price) >= price);
    setData(element);
    setMenuOpen(false);
  };

  const resetFilters = () => {
    setData(items);
    setMenuOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const term = searchTerm.trim();
    if (!term) return;
    navigate(`/search/${term}`);
    setsearchTerm("");
    setMenuOpen(false);
  };

  return (
    <header className="site-header sticky-top">
      <div className="nav-bar">
        <Link to="/" className="brand">
          E-Cart
        </Link>

        <form onSubmit={handleSubmit} className="search-bar">
          <input
            value={searchTerm}
            onChange={(e) => setsearchTerm(e.target.value)}
            type="text"
            placeholder="Search products"
          />
        </form>

        <div className="nav-actions">
          <Link to="/cart" className="cart cart-link" aria-label="Cart">
            <button type="button" className="btn btn-primary position-relative cart-btn">
              <BsCartCheck className="cart-icon" />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
                <span className="visually-hidden">cart items</span>
              </span>
            </button>
          </Link>

          {location.pathname === "/" && (
            <button
              type="button"
              className="menu-toggle"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close filters" : "Open filters"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <BsX /> : <BsList />}
            </button>
          )}
        </div>
      </div>

      {location.pathname === "/" && (
        <div className={`nav-bar-wrapper ${menuOpen ? "show" : ""}`}>
          <button onClick={resetFilters} className="filter-chip active-chip">
            No Filter
          </button>
          <button onClick={() => filterByCategory("mobiles")} className="filter-chip">
            Mobiles
          </button>
          <button onClick={() => filterByCategory("laptops")} className="filter-chip">
            Laptops
          </button>
          <button onClick={() => filterByCategory("tablets")} className="filter-chip">
            Tablets
          </button>
          <button onClick={() => filterByPrice(29999)} className="filter-chip">
            ≥ 29999
          </button>
          <button onClick={() => filterByPrice(49999)} className="filter-chip">
            ≥ 49999
          </button>
          <button onClick={() => filterByPrice(69999)} className="filter-chip">
            ≥ 69999
          </button>
          <button onClick={() => filterByPrice(89999)} className="filter-chip">
            ≥ 89999
          </button>
        </div>
      )}
    </header>
  );
}

export default Navbar;
