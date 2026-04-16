import img from "./img.jpg"

function Header({setaddproduct, setvieproducts}) {

  function Addclick(){
    setaddproduct(true)
  }

  function handleviewall(){
    const section = document.getElementById('productlist')
    section.scrollIntoView({behavior: 'smooth'})
  }
  
  return(
    <>
    <img className='headerimg' src={img} autoPlay loop muted playsInline >
    </img>
    <div className='headerbutton'>
      <button className='buttons' onClick={Addclick}>Add Product</button>
      <button className='buttons' onClick={handleviewall} >View All Products</button>
    </div>
    <p className='headertext'>Welcome in your perfume application</p>
    <p className='explaintext'>Here you can list your perfume products and sell it to millions people</p>
    
    </>
  )
}

export default Header