import React, { useEffect, useState } from "react"
import {useNavigate, useParams} from 'react-router-dom'
import loader from "../images/loader.gif"
import { Link } from "react-router-dom"
import swal from "sweetalert"
const Order=()=>{

    const url="http://127.0.0.1:8000/"

    const product_id=useParams().product_id
    const [data,setdata]=useState([])
    const [load,setload]=useState(true)
    let [count,setcount]=useState(1)
    let history=useNavigate()

    function loadproduct()
    {
        setload(false)
        fetch(url,{
            method:"PATCH",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:product_id
            })
        }).then(responce=>responce.json()).then((res)=>{
           if(res!=undefined)
           {
               setdata(res)
               setload(false)
               setcost(res[0].price-(res[0].price*res[0].offer/100))
           }
        },(error)=>{
            console.log(error)
        })
    }


    function addtoplus()
    {
        if(count<5){
            findcost(count+1)
            setcount(count+1)
        }
        
    }

    function addtominus()
    {
        if(count>1)
        {
            findcost(count-1)
            setcount(count-1)
        }
    }

    function findcost(count)
    {
        setcost((count)*(data[0].price-(data[0].price * data[0].offer/100)))
    }


    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    function Find_errorName(s)
    {
        seterrorname(false)
        setmesserrorname("")
        var regex = /^[a-zA-Z ]{2,30}$/;
        let a= regex.test(s);
        if(a==false)
        {
            seterrorname(true)
            setmesserrorname("*Name must be only string and should not contain symbols or numbers")
        }
        return a;
    }

    function Find_errorPhone(phone)
    {
        seterrorphone(false)
        setmesserrorphone("")
        if( phone==undefined|| phone.length!=10)
        {
            seterrorphone(true)
            setmesserrorphone("*Phone must be 10 digit")
            return false
        }
        
        return true;
    }

    function checkaddress(s)
    {
        seterroraddress(false)
        setmesserroraddress("")
        if(s.length>10)
        {
           return true;
        }
        seterroraddress(true)
        setmesserroraddress("*Invalid Address  Please Enter Valid address")
        return false;
    }



    function submit()
    {
        let res=Find_errorName(name)
        let b=Find_errorPhone(phone)
        let c=checkaddress(address)
        if(res==true && b==true)
        {
            fetch(`${url}/order`,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    name:name,
                    mobile:phone,
                    product_id:product_id,
                    price:cost,
                    number_product:count,
                    date:today
                })
            }).then(responce=>responce.json()).then((res)=>{
                swal("Good job!", "Your Order is successfull !", "success");
                history('/')
            },(error)=>{
                console.log(error)
            })
        }
    }

    useEffect(()=>{
        loadproduct()
    },[])

    const[name,setname]=useState("")
    const [errorname,seterrorname]=useState(false);
    const [messerrorname,setmesserrorname]=useState("");

    const [cost,setcost]=useState(0)
    const [errorcost,seterrorcost]=useState(false);
    const [messerrorcost,setmesserrorcost]=useState("");

    const [phone,setphone]=useState()
    const [errorphone,seterrorphone]=useState(false);
    const [messerrorphone,setmesserrorphone]=useState("");

    const [address,setaddress]=useState("")
    const [erroraddress,seterroraddress]=useState(false);
    const [messerroraddress,setmesserroraddress]=useState("");


    return(
        <div className="container">
        {
            load==false?
            <>
            {
                data.length!=0?
                <>
                <div class="card mt-3" style={{width: "18rem"}}>
                    <img class="card-img-top" src={data[0].product_url} alt="Card image cap"/>
                    <div class="card-body">
                        <h5 class="card-title">{data[0].product_name} ({data[0].quantity})</h5>
                        <div className="row">
                            <div className="col">
                            <strike className="card-text">₹{data[0].price}</strike>
                            </div>
                            <div className="col">
                            <h5 className="card-text" style={{color:"green"}}>{data[0].offer}%OFF</h5>
                            </div>
                            <div className="col">
                            <h5 className="card-text">₹{(data[0].price-data[0].price*data[0].offer/100).toFixed(2)}</h5>
                            </div>
                        </div>
                        <Link className="mt-5" style={{textDecoration:"none"}}>
                            <button className="btn btn-secondary btn-sm" onClick={addtoplus}>Add</button>
                            <button className="btn btn-info btn-sm mx-5" disabled>{count}</button>
                            <button className="btn btn-secondary btn-sm mx-3" onClick={addtominus}>Cut</button>
                        </Link>
                    </div>
               </div>
                <section className="order mt-5" id="order">
                    <form>
                        <div className="inputBox">
                            <div className="input">
                                <span>your name</span>
                                <input type="text"  onChange={(e)=>setname(e.target.value)} placeholder="enter your name"/>
                                {errorname==true?<label style={{color:"red",marginLeft:"10px"}}>{messerrorname}</label>:""}
                            </div>
                            <div className="input">
                                <span>your phone number</span>
                                <input type="number" onChange={(e)=>setphone(e.target.value)} placeholder="enter your number"/>
                                {errorphone==true?<label style={{color:"red",marginLeft:"10px"}}>{messerrorphone}</label>:""}
                            </div>
                        </div>
                        <div className="inputBox">
                            <div className="input">
                                <span>your order</span>
                                <input type="text" value={data[0].product_name} disabled placeholder="enter food name"/>
                            </div>
                            <div className="input">
                                <span>total number</span>
                                <input type="test" value={count} disabled placeholder="total number"/>
                            </div>
                        </div>
                        <div className="inputBox">
                            <div className="input">
                                <span>total money</span>
                                <input type="number" disabled value={cost}  placeholder="total money"/>
                            </div>
                            <div className="input">
                                <span>your address</span>
                                <textarea name="" value={address} onChange={(e)=>{setaddress(e.target.value)}} placeholder="enter your address" id="" cols="10" rows="10"></textarea>
                                {erroraddress==true?<label style={{color:"red",marginLeft:"10px"}}>{messerroraddress}</label>:""}
                            </div>
                        </div>
                    </form>
                    <input type="submit" value="order now"  onClick={submit} className="btn btn-success my-3"/>
                </section>
            </>
            :""
        }
        </>
        :<div className='loader-container'><img src={loader} /></div>
        }
    </div>
    )
}
export default Order