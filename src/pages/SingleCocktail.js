import React from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {

  const [loading, setLoading] = useState(false);
  const [cocktail, setCocktail] = useState(null);

  
  const {id} = useParams();

   const fetchCocktail = useCallback(async () => {
    setLoading(true);  
    try {
      const response = await fetch(`${url}${id}`);
      const data = await response.json();
      if(data.drinks){
        const {
          strDrink: name, 
          strAlcoholic: alcoholic, 
          strDrinkThumb: image, 
          strGlass: glass,
          strCategory: category,
          strInstructions: instructions,
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        } = data.drinks[0]

        const ingredients = [
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        ]
        const newCocktail = {name, alcoholic, image, category, glass, instructions, ingredients};
        setCocktail(newCocktail);
        setLoading(false);
      }else{
        setLoading(false);
        setCocktail(null);
      }

    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [id])

  useEffect(() => {
    fetchCocktail();
  }, [fetchCocktail])

  if(loading){
    return <Loading/>
  }

  if(!cocktail){
    return (
      <section className="section-title">
        <h4>No information about this cocktail avaliable</h4>
      </section>
    )
  }

  const {name, alcoholic, image, glass, category, instructions, ingredients} = cocktail

  return (
    <section className="section cocktail-section">
      <Link className="btn btn-primary" to="/">Back Home</Link>
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={image} alt={name}/>
        <div className="drink-info">
          <p>
            <span className="drink-data">Name: </span>
            {name}
          </p>
          <p>
            <span className="drink-data">Category: </span>
            {category}
          </p>
          <p>
            <span className="drink-data">Info: </span>
            {alcoholic}
          </p>
          <p>
            <span className="drink-data">Glass: </span>
            {glass}
          </p>
          <p>
            <span className="drink-data">Instructions: </span>
            {instructions}
          </p>
          <p>
            <span className="drink-data">Ingredients: </span>
            {ingredients.map((ingredient, index) => {
              return ingredient ? <span key={index}>{ingredient}</span> : null
            })}
          </p>
        </div>
      </div>
    </section>
  )
}

export default SingleCocktail
