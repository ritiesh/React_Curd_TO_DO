import React from 'react'

const SearchItem = ({search,setSearch}) => {
  return (
    <form className='searchForm' onSubmit={(e)=>e.preventDefault()}>
      <input
      
      autoFocus
      type='text'
      value={search}
      placeholder='Search items'
      onChange={(e)=>setSearch(e.target.value)}
      ></input>
    </form>
  )
}

export default SearchItem
