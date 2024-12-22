import Header from "./Header"
import Content from "./Content"
import Footer from "./Footer";
import { useState, useEffect } from "react"
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequest";


function App() {
  const API_URL = "https://json-server-to-do.onrender.com/items"
  const [items, setItems] = useState([])

  const [search, setSearch] = useState('')

  const [newItem, setNewItem] = useState('')

  const [fetchError, setFetchError] = useState(null)

  const [isLoding, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) throw Error("Data is not received")
        const listitems = await response.json()
        setItems(listitems)
        setFetchError(null)
      } catch (error) {
        setFetchError(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    setTimeout(() => { (async () => await fetchItems())() }, 2000)
  }, [])

  const additem = async (item) => {

    const id = items.length ? items[items.length - 1].id + 1 : 1
    const addNewItem = { id, checked: false, item }
    const listitems = [...items, addNewItem]
    setItems(listitems)

    const postOption = {
      method: 'POST',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify(addNewItem)
    }
    const result = await apiRequest(API_URL, postOption)
    if (result) setFetchError(result)
  }

  const handlecheck = async (id) => {
    const list = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item)
    setItems(list)

    const itemone = list.filter((item) => item.id === id)
    const updateOption = {
      method: 'PATCH',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify({ checked: itemone[0].checked })
    }
    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl, updateOption)
    if (result) setFetchError(result)

  }

  const handledelete = async (id) => {
    const list = items.filter((item) => item.id !== id)
    setItems(list)

    const deleteOption = {
      method: 'DELETE'
    }

    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl, deleteOption)
    if (result) setFetchError(result)

  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!newItem) return
    console.log(newItem)
    additem(newItem)
    setNewItem('')
  }

  return (
    <div className="App">
      <Header title="TO-DO List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <main>
        {isLoding && <p>Data is Loading....</p>}
        {fetchError && <p>{`Error:${fetchError}`}</p>}
        {!isLoding && !fetchError && <Content
          items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLocaleLowerCase()))}
          handlecheck={handlecheck}
          handledelete={handledelete}
        />}
      </main>
      <Footer
        length={items.length}
      />
    </div>
  );

}
export default App