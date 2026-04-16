import { useState, useEffect } from 'react'
import Header from './header/Header'
import Productcard from './productcard/Productcard'
import Productlist from './productlist/Productlist'
import './App.css'

function App() {
  const [addproduct, setaddproduct] = useState(false)
  const [products,setproduct] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/products')
    .then(res => res.json())
    .then(data => setproduct(data))
    .catch(err => console.log(err))
  }, [])

  return(
    <>
    <Header 
    setaddproduct={setaddproduct} />

    <div id='productlist'>
      <Productlist
      products={products}
      setproduct={setproduct} />
    </div>
    
    <Productcard 
    addproduct={addproduct} 
    setaddproduct={setaddproduct} 
    products={products} 
    setproduct={setproduct} />
    </>
  )
}

export default App
