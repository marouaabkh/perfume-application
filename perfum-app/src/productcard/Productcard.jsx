import { useRef, useState } from "react"

function Productcard({addproduct, setaddproduct, products, setproduct}){

    const nameinput = useRef(null)
    const descinput = useRef(null)
    const priceinput = useRef(null)
    const imageinput = useRef(null)
    const [sameperfume, setsameperfume] = useState(false)
    const [negativeprice, setnegativeprice] = useState(false)
    const [emptyname, setemptyname] = useState(false)
    const [emptydesc, setemptydesc] = useState(false)
    const [emptyprice, setemptyprice] = useState(false)
    const [emptyimage, setemptyimage] = useState(false)
    

    function Addperfume(e){
        e.preventDefault()
        const namevalue = nameinput.current.value
        const descvalue = descinput.current.value
        const pricevalue = priceinput.current.value
        const imagevalue = imageinput.current.files[0]

        let showerror = false

        if(namevalue === ""){
            setemptyname(true);
            showerror = true
        }

        if(descvalue === ""){
            setemptydesc(true);
            showerror = true
        }

        if(pricevalue === ""){
            setemptyprice(true)
            showerror = true
        }else if(pricevalue <= 0){
            setnegativeprice(true);
            showerror = true
        }

        if(!imagevalue){
            setemptyimage(true);
            showerror = true
        }

        const isduplicate = products.some(product =>
            product.perfumename.toLowerCase() === namevalue.toLowerCase()
        )

        if(isduplicate){
            setsameperfume(true);
            showerror = true
        }

        if(showerror) return

        const newperfume = {
            perfumename : namevalue,
            description : descvalue,
            perfumeprice : pricevalue,
            perfumeimage : imagevalue,
        }

        const formdata = new FormData()
        formdata.append('perfumename', namevalue)
        formdata.append('description', descvalue)
        formdata.append('perfumeprice', pricevalue)
        formdata.append('perfumeimage', imagevalue)
        fetch('http://localhost:3000/products', {
            method: 'POST',
            body: formdata
        })
        .then(res => res.json())
        .then(() => {
            setproduct([...products,newperfume])
            nameinput.current.value = ""
            descinput.current.value = ""
            priceinput.current.value = ""
            imageinput.current.value = null
            setsameperfume(false)
            setaddproduct(false)
        })
        .catch(err => console.log(err))
    }

    function handleperfumename(){
        if(sameperfume){
            setsameperfume(false)
        }
         if(emptyname){
            setemptyname(false)
        }
    }

    function handleprice(){
        if(negativeprice){
            setnegativeprice(false)
        }
        if(emptyprice){
            setemptyprice(false)
        }
    }

    function handleimage(){
        if(emptyimage){
            setemptyimage(false)
        }
    }


    return(
        <>
        {addproduct ? (
        <div className="modeloverlay">
            <div className="productcard">
                <div className="cardheader">
                    <p className="titles">Full a perfume information</p>
                    <button className="reject" onClick={()=>{setaddproduct(false) }}>x</button>
                </div>
                <form className="form" onSubmit={Addperfume}>
                    <div className="blocks">
                        <p className="titles">Perfume name</p>
                        <input ref={nameinput} className="inputs" type="text" placeholder="Enter a product name"  style={{ borderColor: sameperfume || emptyname ? 'red' : '' }} onChange={handleperfumename}></input>
                        {sameperfume && <p style={{color: 'red', fontSize:'9px'}}>You already have this perfume!</p>}
                        {emptyname && <p style={{color: 'red', fontSize:'9px'}}>Perfume name is required!</p>}
                    </div>
                    <div className="blocks">
                        <p className="titles">Perfume description</p>
                        <input ref={descinput} className="inputs" type="text" placeholder="Enter a product description" 
                        style={{ borderColor: emptydesc ? 'red' : '' }}
                        onChange={() => { if(emptydesc) setemptydesc(false) }}></input>
                        {emptydesc && <p style={{color: 'red', fontSize:'9px'}}>Description is required!</p>}
                    </div>
                    <div className="blocks">
                        <p className="titles">Perfume price</p>
                        <input ref={priceinput} className="inputs" type="number" placeholder="Enter a product price"
                        min={0}
                        style={{ borderColor: negativeprice ||emptyprice ? 'red' : '' }}
                        onChange={handleprice}></input>
                        {negativeprice && <p style={{color: 'red', fontSize:'9px'}}>Price must be positive!</p>}
                        {emptyprice && <p style={{color: 'red', fontSize:'9px'}}>Price is required!</p>}
                    </div>
                    <div className="blocks">
                        <p className="titles">Perfume image</p>
                        <input ref={imageinput} className="input" type="file" accept="image/*"
                        onChange={handleimage}></input>
                        {emptyimage && <p style={{color: 'red', fontSize:'9px'}}>Image is required!</p>}
                    </div>
                    <button className="submit">Add a perfume</button>
                </form>
            </div>
        </div>
        ) : null}
        </>
    )
}

export default Productcard