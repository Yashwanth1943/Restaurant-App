import React, {useState} from 'react'
import CartIcon from '../CartIcon'
import './index.css'

const Header = ({
  categorizedDishes,
  restaurantData,
  onCategorySelect,
  selectedCategory,
  cartCount,
}) => {
  const [hoveredCategory, setHoveredCategory] = useState(null)

  const handleMouseEnter = categoryName => setHoveredCategory(categoryName)
  const handleMouseLeave = () => setHoveredCategory(null)

  return (
    <>
      <nav className="nav">
        <h1 className="restaurant-name">{restaurantData.restaurantName}</h1>
        <div className="orders-container">
          <p className="my-orders-text">My Orders</p>
          <CartIcon count={cartCount} />
        </div>
      </nav>

      <nav className="selection-nav">
        {categorizedDishes.map(eachDish => (
          <button
            className={`item ${
              selectedCategory === eachDish.categoryName ? 'underlined' : ''
            } ${hoveredCategory === eachDish.categoryName ? 'hovered' : ''}`}
            key={eachDish.categoryName}
            onClick={() => onCategorySelect(eachDish.categoryName)}
            onMouseEnter={() => handleMouseEnter(eachDish.categoryName)}
            onMouseLeave={handleMouseLeave}
          >
            {eachDish.categoryName}
          </button>
        ))}
      </nav>
    </>
  )
}

export default Header
