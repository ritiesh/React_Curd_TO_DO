import ItemList from "./ItemList"




function Content({ items, handlecheck, handledelete }) {


  return (
    <>
      {(items.length) ? (<ItemList
                          items={items}
                          handlecheck={handlecheck}
                          handledelete={handledelete}
      />) : (<p>Your list is empty</p>)}

    </>
  )
}

export default Content