import { useState } from "react"
import search from "./search.png"

function Productlist({products}){

    const [query, setquery] = useState("")

    const filtered = products.filter(product =>
        product.perfumename?.toLowerCase().includes(query.toLowerCase())
    )

    if(products.length ===0){
        return(
            <p className="noproduct">No products found. Add ypur first perfume!</p>
        )
    }
    return(
        <>
        <div className="mainarea">
        <h1 className="catalog">Perfume catalog</h1>
        <img className="searchicon" src={search} ></img>
        <input type="search" className="search" placeholder="Search a perfume" value={query} onChange={e => setquery(e.target.value)}></input>
        
        {filtered.length === 0 ? (
            <p className="noproduct">No perfume named {query} found</p>
        ) : (
        <div className="cards">
        {products?.map((product,index) =>(
            <div key={index} className="card">
                <img className="proimage"
                    src={`http://localhost:3000/uploads/${product.perfumeimage}`} 
                    alt={product.perfumename} 
                />
                <div className="nameprice">
                    <p id="nameprice">{product.perfumename}</p>
                    <p id="nameprice">{product.perfumeprice} DZ</p>
                </div>
                <div >
                    <p className="description" title={product.description}>
                        {product.description}
                    </p>
                </div>
            </div>
        ))}
        </div>
        )}
        </div>
        </>
    )
}

export default Productlist