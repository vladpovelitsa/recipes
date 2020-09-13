import React, {useEffect, useState} from 'react';
import Recipe from './recipe';
import './App.css';

const App = () => {
  const APP_ID = '71e84971';
  const APP_KEY = 'c6d597a71d1cb801462400f5cc472550';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');


  useEffect(() => {
    getRecipes()
  },[query]) 

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits)
  }

  const undateSearch = e => {
    setSearch(e.target.value) 
  }

  const getSearch = e => {
    e.preventDefault()
    setQuery(search)
    setSearch('')
  } 
  return(
    
    <div className='App'>
      <form onSubmit={getSearch} className='search_form'>
        <input type="text" className='search-bar' value={search} onChange={undateSearch} />
        <button className='search-button'>Search</button>
      </form>
      <div className='recipes'>
        {recipes.map(recipe => (
          <Recipe 
            key={recipe.recipe.label}
            title={recipe.recipe.label} 
            calories={recipe.recipe.calories} 
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
      
    </div>
  )
}

export default App;
