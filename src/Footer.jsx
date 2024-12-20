import React from 'react'

function Footer({ length }) {


  return (
    <footer >
      <h1>{length}List {length === 1 ? "item" : "items"}</h1>
    </footer>
  )
}

export default Footer