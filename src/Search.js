import React from 'react'

const Search = ({search,setsearch}) => {
  return (
    <form className='searchform'>
    <label htmlFor='searchitem'>Search</label>
    <input 
        id='searchitem'
        type='text'
        role='searchbox'
        placeholder='Search Items'
        value={search}
        onChange={(e)=>setsearch(e.target.value)}

    />
    </form>
  )
}

export default Search