import React from 'react'

import LineItems from './LineItems';
const ItemList = ({ items, handlecheck, handledelete }) => {
  return (
    <ul>
        {items.map((item) => (
          <LineItems
          item={item}
          key={item.id}
          handlecheck={handlecheck}
          handledelete={handledelete}
          />
        ))}
      </ul>
  )
}

export default ItemList
