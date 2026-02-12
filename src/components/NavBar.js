import React from 'react';

// Define a functional component called Navbar
const Navbar = ({ categories, activeCategory, onChangeCategory }) => {
  return (
    <nav className="navbar">
      {categories.map(category => (
        <button
          key={category}
          className={`nav-btn ${category === activeCategory ? 'active' : ''}`}
          onClick={() => onChangeCategory(category)}
        >
          {category}
        </button>
      ))}
    </nav>
  );
};

export default Navbar;
