import React, { useEffect, useState } from "react"
import {Link} from 'react-router-dom'
import {AiFillStar } from "react-icons/ai";
import loader from "../images/loader.gif"
import { GrFormNext ,GrFormPrevious} from 'react-icons/gr';
import { BiFilter } from "react-icons/bi";
import NotFoundPage from "./NotFoundPage";

const CommonHome=(props)=>{
    let [data,setdata]=useState([])
    let [product,setproduct]=useState([])

    const url="http://127.0.0.1:8000/"

    const [networkerror,setnetworkerror]=useState(false)
    let [page,setpage]=useState(0)
    let [nextpage,setnextpage]=useState(false)
    let [prevpage,setprevpage]=useState(false)
    const [load,setload]=useState(true)
    const [name,setname]=useState("");

    useEffect(()=>{
        loadproduct(0)
    },[props.type])

    useEffect(() => {
        searchproduct();
    },[name]);

    function solve1(s)
    {
        let res="";
        for(let i=0;i<s.length;i++)
        {
            if(s[i]>='a' && s[i]<='z')
            {
                res+=s[i];
            }
        }
        return res;
    } 

    function solve2(s)
    {
        let res="";
        for(let i=0;i<s.length;i++)
        {
            if(s[i]>='a' && s[i]<='z')
            {
              res+=s[i];
            }
        }
        return res;
    }

    function check_All_Charcter(searchproduct,product_name){
        let s=product_name;
        let patt=searchproduct;
        let i=0;
        let j=0;
        let n=s.length;
        let m=patt.length;
        while(i<n && j<m)
        {
          if(patt[j]==s[i])
          {
            i++;j++;
          }
          else
          {
            i++;
          }
        }
        if(j==m)
        {
          return true;
        }
        return false;
    }

    function KMP(searchproduct,product_name)
    {
        let patt=solve1(searchproduct);
        let original=solve2(product_name);
        let n=patt.length;
        for(let i=0;i<original.length-n+1;i++)
        {
            let generate=original.substring(i,i+n);
            if(generate===patt) return true;
        }
        return false;
    }

    function searchproduct()
    {
        if(name.length===0)
        {
            setdata(product)
        }
        else
        {
            setname(name.toLowerCase());
            let n=name.length;
            let newproduct=[];
            for(let i=0;i<product.length;i++)
            {
                let s=product[i].product_name;
                s=s.toLowerCase();
                if (KMP(name,s)===true || check_All_Charcter(name,s)) 
                {
                    newproduct.push(product[i]);
                }
            }
            setdata([...newproduct]);
        }
    }

    function loadproduct(page)
    {
        setload(true)
        fetch(`${url}/type`,{
            method:"PATCH",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                type:props.type,
                page:page
            })
        }).then(responce=>responce.json()).then((res)=>{
            if(res!=undefined)
            {
                setdata(res[0].data)
                setprevpage(res[1].pagination.prev)
                setnextpage(res[1].pagination.next)
                setload(false)
                setproduct(res[0].data)
                setdropdown("Filter")
            }
        },(error)=>{
            setload(false)
            setnetworkerror(true)
        })
    }

    function next()
    {
        setpage(page+1)
        loadproduct(page+1)
    }

    function prev()
    {
        setpage(page-1)
        loadproduct(page-1)
    }

    const [dropdown,setdropdown]=useState("Filter")

    function PriceLowToHigh()
    {
        setdropdown("Price Low To High")
        data.sort((a, b) => {
            let fa = parseInt(a.price-((a.price*a.offer)/100))
            let fb = parseInt(b.price-((b.price*b.offer)/100))
        
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        });
        setdata([...data])
    }
    
    function clearallfilter()
    {
        setdropdown("Search In Catagory")
        loadproduct(0)
    }
    
    function PriceHighToLow()
    {
        setdropdown("Price High To Low")
        data.sort((a, b) => {
            let fa = parseInt(a.price-((a.price*a.offer)/100))
            let fb = parseInt(b.price-((b.price*b.offer)/100))
        
            if (fa > fb) {
                return -1;
            }
            if (fa < fb) {
                return 1;
            }
            return 0;
        });
        setdata([...data])
    }
    
    function SortOnRating()
    {
        setdropdown("Sort On Rating")
        data.sort((a, b) => {
            let fa = parseFloat(a.rating),
                fb = parseFloat(b.rating);
        
            if (fa > fb) {
                return -1;
            }
            if (fa < fb) {
                return 1;
            }
            return 0;
        });
        setdata([...data])
    }
    
    function SortOnOffer()
    {
        setdropdown("Sort On Offer")
        data.sort((a, b) => {
            let fa = parseInt(a.offer),
                fb = parseInt(b.offer);
        
            if (fa > fb) {
                return -1;
            }
            if (fa < fb) {
                return 1;
            }
            return 0;
        });
        setdata([...data])
    }

    return(
        <>
        {
            load==false?
                <div className="container">
                    <div className="d-flex justify-content-end my-4">
                        <div className="d-flex">
                            <input className="form-control me-2" type="search"  value={name} onChange={(e)=>setname(e.target.value)} autoComplete='off' aria-label="Search"  placeholder="Search Food"/>
                        </div>
                        <div className="dropdown">
                            <button className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                {dropdown} <BiFilter/>
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><Link className="dropdown-item" onClick={PriceLowToHigh}>Price Low To high</Link></li>
                                <li><Link className="dropdown-item" onClick={PriceHighToLow}>Price High To Low</Link></li>
                                <li><Link className="dropdown-item" onClick={SortOnRating}>Sort On Rating</Link></li>
                                <li><Link className="dropdown-item" onClick={SortOnOffer}>Sort On Offer</Link></li>
                                <li><Link className="dropdown-item" onClick={clearallfilter}>Clear Filter</Link></li>
                            </ul>
                        </div>
                    </div>
                    {
                        data.length!=0?
                        <div className="row">
                            {
                                data.map((item,ind)=>(
                                    <div className="card mx-3 mt-1" style={{width: "14rem"}} key={ind}>
                                        <img src={item.product_url} style={{height:"180px", width:"200px", marginTop:"10px"}} className="card-img-top" alt="Error Loading.."/>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">
                                                    <h6 className="card-title">{item.product_name} ({item.quantity})</h6>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                   <strike className="card-text">₹{item.price}</strike>
                                                </div>
                                                <div className="col">
                                                    <h5 className="card-text" style={{color:"green"}}>{item.offer}%OFF</h5>
                                                </div>
                                                <div className="col">
                                                     <h5 className="card-text">₹{(item.price-item.price*item.offer/100).toFixed(2)}</h5>
                                                </div>
                                                <div className="col">
                                                    <button className="btn btn-primary btn-sm">{item.rating}<AiFillStar/></button>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                   <Link to={`/${item.id}/order`} className="btn btn-outline-success btn-sm mt-2">order now</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            <div class="d-flex justify-content-between my-5">
                                <button className="btn btn-secondary" disabled={!prevpage} onClick={prev}><GrFormPrevious/> Previous</button>
                                <button className="btn btn-secondary" disabled={!nextpage} onClick={next}>Next <GrFormNext /> </button>
                            </div>
                        </div>
                        :
                        networkerror==true?
                        <NotFoundPage/>
                        :
                        <NotFoundPage/>
                    }
                </div>
            :<div className='loader-container'><img src={loader} /></div>
        }
        </>
    )
}

export default CommonHome