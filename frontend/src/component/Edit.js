import React, { useEffect,useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'

let Edit=()=>{
    let id=useParams().id
    let url="http://127.0.0.1:8000/"
    
    let history=useNavigate()
    let [productName,setproductName]=useState("")
    let [errorProductName,seterrorProductName]=useState(false)
    let [messageProductName,setmessageProductName]=useState("")

    let [quantity,setquantity]=useState("")
    let [errorquantity,seterrorquantity]=useState(false)
    let [messagequantity,setmessagequantity]=useState("")

    let [price,setprice]=useState()
    let [errorprice,seterrorprice]=useState(false)
    let [messageprice,setmessageprice]=useState("")

    let [offer,setoffer]=useState()
    let [erroroffer,seterroroffer]=useState(false)
    let [messageoffer,setmessageoffer]=useState("")

    let [rating,setrating]=useState()
    let [errorrating,seterrorrating]=useState(false)
    let [messagerating,setmessagerating]=useState("")

    let [ProductType,setProductType]=useState()
    let [errorProductType,seterrorProductType]=useState(false)
    let [messageProductType,setmessageProductType]=useState("")


    let [postImage,setPostImage]=useState([])
    let [product_url,setproduct_url]=useState([])

    useEffect(()=>{
        fetch(url,{
            method:"PATCH",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:id
            })
        }).then(responce=>responce.json()).then((res)=>{
           if(res!=undefined)
           {
               setproductName(res[0].product_name)
               setquantity(res[0].quantity)
               setprice(res[0].price)
               setoffer(res[0].offer)
               setrating(res[0].rating)
               setProductType(res[0].product_type)
               setproduct_url(res[0].product_url)
           }
        },(error)=>{
            console.log(error)
        })
    },[])

    
    function errorHandleProductName()
    {
        seterrorProductName(false)
        setmessageProductName("")
       
        let number="";
        let str="";
        for(let i=0;i<productName.length;i++)
        {
            if(productName[i]>='0' && productName[i]<='9')
            {
                number+=productName[i];
            }
            else
            {
                str+=productName[i];
            }
        }
        
        if(number.length>=str.length)
        {
            seterrorProductName(true)
            setmessageProductName("Invalid Product Name")
            return false;
        }

        if(productName.length<3)
        {
            seterrorProductName(true)
            setmessageProductName("Product Name is Vary Less")
            return false;
        }
        else if(productName.length>=25)
        {
            seterrorProductName(true)
            setmessageProductName("Product Name is Vary Big")
            return false;
        }
        else
        {
            return true;
        }
    }
    
    function errorHandleQuantity()
    {
        seterrorquantity(false)
        setmessagequantity("")
        quantity=quantity.replace(/ /g,'')
        setquantity(quantity)
        if(quantity.length>5)
        {
            seterrorquantity(true)
            setmessagequantity("Invalid Quantity")
            return false;
        }
        let value=""
        let quen=""
        for(let i=0;i<quantity.length;i++)
        {
            if((quantity[i]>='a' && quantity[i]<='z') || (quantity[i]>='A' && quantity[i]<='Z'))
            {
                quen+=quantity[i];
            }
            else if(quen.length==0)
            {
                value+=quantity[i];
            } 
        }
        quen=quen.toLocaleLowerCase()
        if(quen!="gm" && quen!="kg")
        {
            seterrorquantity(true)
            setmessagequantity("Invalid Quantity")
            return false;
        }
        else if(value.length>3)
        {
            seterrorquantity(true)
            setmessagequantity("Invalid Quantity")
            return false;
        }
        else if(value.length!=0)
        {
            return true;
        }
        else
        {
            seterrorquantity(true)
            setmessagequantity("Invalid Quantity")
            return false;
        }
    }

    function errorHandleprice()
    {
        seterrorprice(false)
        setmessageprice("")
        if(price<30 || price>2000)
        {
            seterrorprice(true)
            setmessageprice("Invalid Price")
            return false
        }
        return true;
    }

    function errorHandleOffer()
    {
        seterroroffer(false)
        setmessageoffer("")
        if(offer<0 || offer>99)
        {
            seterroroffer(true)
            setmessageoffer("Invalid Offer")
            return false
        }
        return true;
    }

    function errorHandlerating()
    {
        seterrorrating(false)
        setmessagerating("")
        if(rating<0 || rating>5)
        {
            seterrorrating(true)
            setmessagerating("Invalid Rating")
            return false
        }
        return true;
    }

    function errorHandleProductType()
    {
        seterrorProductType(false)
        setmessageProductType("")
        if(ProductType=="Product Type" || ProductType.length==0)
        {
            seterrorProductType(true)
            setmessageProductType("Invalid Product Type")
            return false
        }
        return true;
    }


    function submit()
    {
        let x=errorHandleProductName()
        x=x&errorHandleQuantity()
        x=x&errorHandleprice()
        x=x&errorHandleOffer()
        x=x&errorHandlerating()
        x=x&errorHandleProductType()
        if(x==true){
            fetch(url,{
                method:"PUT",
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    id:id,
                    product_url:product_url,
                    product_name:productName,
                    quantity:quantity,
                    price:price,
                    offer:offer,
                    rating:rating,
                    product_type:ProductType,
                })
            }).then(responce=>responce.json()).then((res)=>{
                history('/Operation')
            },(error)=>{
                console.log(error)
            })
        }
    }

    return(
        <div className="d-flex align-items-center justify-content-center">
        <div>
            <form onSubmit={(e)=>{ e.preventDefault();submit()}}>
                {/* <div className="col mt-3">
                    <input type="file" className="form-control"  name="myFile"  accept='.jpeg, .png, .jpg' required onChange={(e) => handleFileUpload(e)} />
                </div> */}
                <div className="col mt-1">
                    <label>Product Name</label>
                    <input type="text" className="form-control" placeholder="Enter Product Name" value={productName} onChange={(e)=>setproductName(e.target.value)} required/>
                    {errorProductName==true?<label for="exampleFormControlInput1" style={{color:"red"}} className="form-label mx-5">{messageProductName}</label>:""}
                </div>
                <div className="col mt-1">
                <label>Quentity</label>
                    <input type="text" className="form-control" placeholder="Enter Product Quantity" value={quantity} onChange={(e)=>setquantity(e.target.value)} required/>
                    {errorquantity==true?<label for="exampleFormControlInput1" style={{color:"red"}} className="form-label mx-5">{messagequantity}</label>:""}
                </div>
                <div className="col mt-1">
                    <label>Price</label>
                    <input type="number" name="price" className="form-control mt-2" value={price} onChange={(e)=>{setprice(e.target.value)}} placeholder="Enter Price"  required/>
                    {errorprice==true?<label for="exampleFormControlInput1" style={{color:"red"}} className="form-label mx-5">{messageprice}</label>:""}
                </div>
                <div className="col mt-1">
                    <label>Offer</label>
                    <input type="number" name="offer" className="form-control mt-2" value={offer} onChange={(e)=>{setoffer(e.target.value)}} placeholder="Enter Offer"  required/>
                    {erroroffer==true?<label for="exampleFormControlInput1" style={{color:"red"}} className="form-label mx-5">{messageoffer}</label>:""}
                </div>
                <div className="col mt-1">
                    <label>Rating</label>
                    <input type="number" name="offer" className="form-control mt-2" value={rating} onChange={(e)=>{setrating(e.target.value)}} placeholder="Enter Rating"  required/>
                    {errorrating==true?<label for="exampleFormControlInput1" style={{color:"red"}} className="form-label mx-5">{messagerating}</label>:""}
                </div>
                <div className="col mt-1">
                    <label>Product Type</label>
                    <select className="form-select" value={ProductType} aria-label="Default select example" onChange={(e)=>{setProductType(e.target.value)}}>
                        <option  >Product Type</option>
                        <option  >Chicken</option>
                        <option  >Mutton</option>
                        <option  >Egg</option>
                        <option  >Fish</option>
                        <option  >Prawns</option>
                    </select>
                    {errorProductType==true?<label for="exampleFormControlInput1" style={{color:"red"}} className="form-label mx-5">{messageProductType}</label>:""}
                </div>
                <div className="col mt-2">
                    <button className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
     </div>
    )
}
export default Edit