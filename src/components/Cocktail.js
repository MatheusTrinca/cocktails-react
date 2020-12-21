import React from 'react'
import { Link } from 'react-router-dom'

const Cocktail = ({id, name, alcocholic, image, glass}) => {
  return (
    <article className="cocktail">
      <div className="img-container">
        <img src={image} alt={name}/>
      </div>
      <div className="cocktail-footer">
        <h3>{name}</h3>
        <h4>{glass}</h4>
        <p>{alcocholic}</p>
        <Link to={`/cocktail/${id}`} className="btn btn-primary">Detail</Link>
      </div>
    </article>
  )
}

export default Cocktail
