// FiltersGroup.js
import {BsSearch} from 'react-icons/bs'
import './index.css'

const FiltersGroup = props => {
  const {
    ratingsList,
    changeRating,
    activeRatingId,
    categoryOptions,
    changeCategory,
    activeCategoryId,
    changeSearchInput,
    clearFilters,
  } = props

  const renderRatingsFiltersList = () => {
    return ratingsList.map(rating => {
      const onClickRatingItem = () => changeRating(rating.ratingId)
      const ratingClassName =
        activeRatingId === rating.ratingId ? 'and-up active-rating' : 'and-up'

      return (
        <li
          className="rating-item"
          key={rating.ratingId}
          onClick={onClickRatingItem}
        >
          <img
            src={rating.imageUrl}
            alt={`rating ${rating.ratingId}`}
            className="rating-img"
          />
          <p className={ratingClassName}>& up</p>
        </li>
      )
    })
  }

  const renderCategoriesList = () => {
    return categoryOptions.map(category => {
      const onClickCategoryItem = () => changeCategory(category.categoryId)
      const isActive = category.categoryId === activeCategoryId
      const categoryClassName = isActive
        ? 'category-name active-category-name'
        : 'category-name'

      return (
        <li
          className="category-item"
          key={category.categoryId}
          onClick={onClickCategoryItem}
        >
          <p className={categoryClassName}>{category.name}</p>
        </li>
      )
    })
  }

  const onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      props.enterSearchInput()
    }
  }

  const onChangeSearchInput = event => {
    changeSearchInput(event.target.value)
  }

  return (
    <div className="filters-group-container">
      <div className="search-input-container">
        <input
          className="search-input"
          type="search"
          placeholder="Search"
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <BsSearch className="search-icon" />
      </div>
      <div>
        <h1 className="category-heading">Category</h1>
        <ul className="categories-list">{renderCategoriesList()}</ul>
      </div>
      <div>
        <h1 className="rating-heading">Rating</h1>
        <ul className="ratings-list">{renderRatingsFiltersList()}</ul>
      </div>
      <button
        type="button"
        className="clear-filters-btn"
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
