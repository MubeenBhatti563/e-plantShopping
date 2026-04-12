import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { addItem } from "../Components/CartSlice";
import { plantProducts } from "../productItems";
import Cart from "./Cart";
import "./ProductList.css";

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  return (
    <div className="product-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <img
            src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
            alt="Paradise Nursery Logo"
            className="logo"
          />
          <button className="home-link" onClick={handleHomeClick}>
            <h2>Paradise Nursery</h2>
            <span className="tagline-small">Where Green Meets Serenity</span>
          </button>
        </div>

        <button
          className="cart-button"
          onClick={() => setShowCart(true)}
          aria-label={`View cart with ${cartItems.length} items`}
        >
          🛍️ Cart ({cartItems.length})
        </button>
      </nav>

      {!showCart ? (
        <main className="product-grid-container">
          {plantProducts.map((category) => (
            <section className="category-section" key={category.category}>
              <h2 className="category-title">{category.category}</h2>
              <div className="product-grid">
                {category.plants.map((plant) => {
                  const isInCart = cartItems.some(
                    (item) => item.name === plant.name,
                  );

                  return (
                    <article className="product-card" key={plant.name}>
                      <div className="image-container">
                        <img
                          src={plant.image}
                          alt={plant.name}
                          className="product-image"
                          loading="lazy"
                        />
                      </div>

                      <div className="product-info">
                        <h3 className="product-title">{plant.name}</h3>
                        <p className="product-description">
                          {plant.description}
                        </p>
                        <div className="product-price">{plant.cost}</div>

                        <button
                          className={`add-to-cart-btn ${isInCart ? "added" : ""}`}
                          onClick={() => handleAddToCart(plant)}
                          disabled={isInCart}
                          aria-label={`Add ${plant.name} to cart`}
                        >
                          {isInCart ? "✓ Added to Cart" : "Add to Cart"}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </main>
      ) : (
        <Cart onClose={() => setShowCart(false)} />
      )}
    </div>
  );
}

ProductList.propTypes = {
  onHomeClick: PropTypes.func.isRequired,
};

export default ProductList;
