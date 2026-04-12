import { useState } from "react";
import ProductList from "./Components/ProductList";
import "./App.css";
import AboutUs from "./Components/AboutUs";

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  const handleHomeClick = () => {
    setShowProductList(false);
  };

  return (
    <div className="app-container">
      {/* Landing Page */}
      <div className={`landing-page ${showProductList ? "fade-out" : ""}`}>
        <div className="background-image" />

        <div className="content">
          <div className="landing-content">
            <h1>Welcome to Paradise Nursery</h1>
            <div className="divider" />
            <p className="tagline">Where Green Meets Serenity</p>

            <button
              className="get-started-button"
              onClick={handleGetStartedClick}
              aria-label="Get started shopping"
            >
              Explore Our Collection
            </button>
          </div>

          {/* About Us Section */}
          <div className="aboutus-container">
            <AboutUs />
          </div>
        </div>
      </div>

      {/* Product Listing Page */}
      <div
        className={`product-list-container ${showProductList ? "visible" : ""}`}
      >
        <ProductList onHomeClick={handleHomeClick} />
      </div>
    </div>
  );
}

export default App;
