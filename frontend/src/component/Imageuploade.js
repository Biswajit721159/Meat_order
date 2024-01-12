import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


let Imageuploade=()=>{
    // const url="http://127.0.0.1:8000/"

    // const url="https://backend-chicken.vercel.app/uploads"

    const url="https://backend-chicken.vercel.app"
    
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

    let [ProductType,setProductType]=useState("")
    let [errorProductType,seterrorProductType]=useState(false)
    let [messageProductType,setmessageProductType]=useState("")

    let [postImage,setPostImage]=useState([])
    let [errorpostImage,seterrorpostImage]=useState(false)
    let [messagepostImage,setmessagepostImage]=useState("")


    let handleFileUpload = async (e) => {
        let file = e.target.files[0];
        let base64 = await convertToBase64(file);
        let length=(file.size/1024)
        seterrorpostImage(false)
        setmessagepostImage("")
        postImage=[]
        if(length<=100)
        {
            postImage.push(base64)
            setPostImage([...postImage]);
        }
        else
        {
            seterrorpostImage(true)
            setmessagepostImage("File Size Must be under 200kb")
        }
    }
    
    function convertToBase64(file){
        return new Promise((resolve, reject) => {
          let fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve(fileReader.result)
          };
          fileReader.onerror = (error) => {
            reject(error)
          }
        })
    }

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
        else if(productName.length>=15)
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
        if(quen!="gm" && quen!="kg" && quen!="pc")
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
    
    const [product_url,setproduct_url]=useState("")

    function submit()
    {
        let x=errorHandleProductName()
        x=x&errorHandleQuantity()
        x=x&errorHandleprice()
        x=x&errorHandleOffer()
        x=x&errorHandlerating()
        x=x&errorHandleProductType()
        if(x==true && errorpostImage==false)
        {
            fetch(`${url}/uploads`,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    product_url:product_url,
                    product_name:productName,
                    quantity:quantity,
                    price:price,
                    offer:offer,
                    product_type:ProductType,
                    rating:rating,
                })
            }).then(responce=>responce.json()).then((res)=>{
                // history('/')
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
                        {errorpostImage==true?<label for="exampleFormControlInput1" style={{color:"red"}} className="form-label mx-5">{messagepostImage}</label>:""}
                    </div> */}
                    <div className="col mt-2">
                        <input type="text" className="form-control" placeholder="Enter Product url" value={product_url} onChange={(e)=>setproduct_url(e.target.value)} required/>
                       
                    </div>
                    <div className="col mt-2">
                        <input type="text" className="form-control" placeholder="Enter Product Name ex. Chicken" value={productName} onChange={(e)=>setproductName(e.target.value)} required/>
                        {errorProductName==true?<label for="exampleFormControlInput1" style={{color:"red"}} className="form-label mx-5">{messageProductName}</label>:""}
                    </div>
                    <div className="col mt-2">
                        <input type="text" className="form-control" placeholder="Product Quantity ex. 3.5 gm , 2.5 kg , 5kg" value={quantity} onChange={(e)=>setquantity(e.target.value)} required/>
                        {errorquantity==true?<label for="exampleFormControlInput1" style={{color:"red"}} className="form-label mx-5">{messagequantity}</label>:""}
                    </div>
                    <div className="col mt-2">
                        <input type="number" name="price" className="form-control mt-2" value={price} onChange={(e)=>{setprice(e.target.value)}} placeholder="Enter Price  ,Price Between 30 to 2000"  required/>
                        {errorprice==true?<label for="exampleFormControlInput1" style={{color:"red"}} className="form-label mx-5">{messageprice}</label>:""}
                    </div>
                    <div className="col mt-2">
                        <input type="number" name="offer" className="form-control mt-2" value={offer} onChange={(e)=>{setoffer(e.target.value)}} placeholder="Enter Offer , Do Not Use %"  required/>
                        {erroroffer==true?<label for="exampleFormControlInput1" style={{color:"red"}} className="form-label mx-5">{messageoffer}</label>:""}
                    </div>
                    <div className="col mt-2">
                        <input type="number" name="offer" className="form-control mt-2" value={rating} onChange={(e)=>{setrating(e.target.value)}} placeholder="Enter Rating ,Rating Must Be 1 to 5"  required/>
                        {errorrating==true?<label for="exampleFormControlInput1" style={{color:"red"}} className="form-label mx-5">{messagerating}</label>:""}
                    </div>
                    <div className="col mt-2">
                        <select className="form-select" aria-label="Default select example" onChange={(e)=>{setProductType(e.target.value)}}>
                            <option defaultValue>Product Type</option>
                            <option >Chicken</option>
                            <option >Mutton</option>
                            <option >Egg</option>
                            <option >Fish</option>
                            <option>Prawns</option>
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
export default Imageuploade