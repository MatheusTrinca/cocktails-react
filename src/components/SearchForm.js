import React from 'react'
import { useGlobalContext } from '../context'
import { useEffect } from 'react';

const SearchForm = () => {

  const {setSearchItem} = useGlobalContext();

  const searchValue = React.useRef('');

  const searchDrink = () => {
    setSearchItem(searchValue.current.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    searchValue.current.focus();
  }, [])
  
  return (
    <section className="section search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Search your favorite drink</label>
          <input type="text" ref={searchValue} onChange={searchDrink}/>
        </div>
      </form>
    </section>
  )
}

export default SearchForm
