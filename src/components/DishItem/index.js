import {useState} from 'react'
import './index.css'

const DishItem = ({dishes, onQuantityChange, initialCounts = {}}) => {
  const [countByDishId, setCountByDishId] = useState(initialCounts)

  const handleDecrease = dishId => {
    const currentCount = countByDishId[dishId] || 0
    if (currentCount > 0) {
      const newCount = currentCount - 1
      setCountByDishId(prev => ({
        ...prev,
        [dishId]: newCount,
      }))
      onQuantityChange?.(dishId, newCount)
    }
  }

  const handleIncrease = dishId => {
    const newCount = (countByDishId[dishId] || 0) + 1
    setCountByDishId(prev => ({
      ...prev,
      [dishId]: newCount,
    }))
    onQuantityChange?.(dishId, newCount)
  }

  return (
    <div className="dish-list">
      {dishes.map(dish => (
        <div className="dish-card" key={dish.dishId}>
          <div className="dish-main-info">
            <div
              className={`indicator ${dish.dishType === 2 ? 'veg' : 'non-veg'}`}
            >
              <div
                className={`dot ${
                  dish.dishType === 2 ? 'veg-dot' : 'non-veg-dot'
                }`}
              />
            </div>

            <div className="dish-details">
              <h1 className="dish-name">{dish.dishName}</h1>
              <p className="dish-price-currency">
                {dish.dishCurrency} {dish.dishPrice}
              </p>
              <p className="dish-description">{dish.dishDescription}</p>

              {dish.dishAvailability ? (
                <>
                  <div className="quantity-buttons-container">
                    <button
                      onClick={() => handleDecrease(dish.dishId)}
                      className="quantity-button"
                      disabled={!countByDishId[dish.dishId]}
                    >
                      -
                    </button>
                    <p className="dish-count">
                      {countByDishId[dish.dishId] || 0}
                    </p>
                    <button
                      onClick={() => handleIncrease(dish.dishId)}
                      className="quantity-button"
                    >
                      +
                    </button>
                  </div>
                  {dish.addonCat?.length > 0 && (
                    <p className="customization-msg">
                      Customizations available
                    </p>
                  )}
                </>
              ) : (
                <p className="not-available-text">Not Available</p>
              )}
            </div>
          </div>

          <div className="dish-side-info">
            <p className="calories">{dish.dishCalories} calories</p>
            <img
              className="dish-img"
              src={dish.dishImage}
              alt={dish.dishName}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default DishItem
