import {Component} from 'react'
import Header from '../Header'
import DishItem from '../DishItem'
import './index.css'

class Home extends Component {
  state = {
    restaurantData: {},
    categorizedDishes: [],
    selectedCategory: null,
    apiStatus: 'LOADING',
    countByDishId: {}, // To track counts for each dish
  }

  componentDidMount() {
    this.getMenuList()
  }

  getMenuList = async () => {
    this.setState({apiStatus: 'LOADING'})
    const response = await fetch(
      `https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details`,
    )
    const data = await response.json()

    if (response.ok && data.length > 0) {
      const restaurantDetails = {
        branchName: data[0].branch_name,
        nextUrl: data[0].nexturl,
        restaurantId: data[0].restaurant_id,
        restaurantImage: data[0].restaurant_image,
        restaurantName: data[0].restaurant_name,
        tableId: data[0].table_id,
      }

      const categorizedDishes = data[0].table_menu_list.map(category => ({
        categoryName: category.menu_category,
        dishes: category.category_dishes.map(dish => ({
          dishAvailability: dish.dish_Availability,
          dishType: dish.dish_Type, // 1 for non-veg, 2 for veg
          dishId: dish.dish_id,
          dishName: dish.dish_name,
          dishPrice: dish.dish_price,
          dishDescription: dish.dish_description,
          dishImage: dish.dish_image,
          dishCalories: dish.dish_calories,
          dishCurrency: dish.dish_currency,
          addonCat: dish.addonCat, // Add this if available and needed
        })),
      }))

      this.setState({
        restaurantData: restaurantDetails,
        categorizedDishes,
        selectedCategory:
          categorizedDishes.length > 0
            ? categorizedDishes[0].categoryName
            : null, // Select the first category by default
        apiStatus: 'SUCCESS',
      })
    } else {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  handleCategorySelect = categoryName => {
    this.setState({selectedCategory: categoryName})
  }

  handleQuantityChange = (dishId, newCount) => {
    this.setState(prevState => ({
      countByDishId: {
        ...prevState.countByDishId,
        [dishId]: newCount,
      },
    }))
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <p>Loading restaurant menu...</p>
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <p>Failed to load menu. Please try again later.</p>
    </div>
  )

  renderSuccessView = () => {
    const {
      restaurantData,
      categorizedDishes,
      selectedCategory,
      countByDishId,
    } = this.state
    const cartCount = Object.values(countByDishId).reduce((a, b) => a + b, 0)

    const activeCategoryDishes = categorizedDishes.find(
      category => category.categoryName === selectedCategory,
    )

    return (
      <>
        <Header
          restaurantData={restaurantData}
          categorizedDishes={categorizedDishes}
          onCategorySelect={this.handleCategorySelect}
          selectedCategory={selectedCategory}
          cartCount={cartCount}
        />
        <div className="menu-content-container">
          {activeCategoryDishes ? (
            <DishItem
              dishes={activeCategoryDishes.dishes}
              onQuantityChange={this.handleQuantityChange}
            />
          ) : (
            <p className="no-dishes-msg">No dishes found for this category.</p>
          )}
        </div>
      </>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'LOADING':
        return this.renderLoadingView()
      case 'SUCCESS':
        return this.renderSuccessView()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default Home
