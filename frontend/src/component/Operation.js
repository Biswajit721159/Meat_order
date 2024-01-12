import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import swal from 'sweetalert'

const Operation=()=>{
    const url="http://127.0.0.1:8000/"
    const [data,setdata]=useState([])

    const [product_id,setproduct_id]=useState("")
    const [product_name,setproduct_name]=useState("")
    const [price,setprice]=useState("")
    const [offer,setoffer]=useState("")
    const [product_type,setproduct_type]=useState("")
    const [rating,setrating]=useState("")
    const [numberOfPeopleGiven,setnumberOfPeopleGiven]=useState("")
    const [actualprice,setactualprice]=useState("")
    const [product,setproduct]=useState([])

    function search_product_id()
    {
        if(product_id.length==0)
        {
            setdata([...product])
            return;
        }
        let arr=[]
        for(let i=0;i<product.length;i++)
        {
            if(product[i].id==product_id)
            {
                arr.push(product[i])
            }
        }
        setdata([...arr])
    }

    function search_product_name()
    {
        if(product_name.length==0)
        {
            setdata([...product])
            return;
        }
        let arr=[]
        for(let i=0;i<product.length;i++)
        {
            let x=product[i].product_name.toLocaleLowerCase()
            let y=product_name.toLocaleLowerCase()
            if(x==y || KMP(x,y))
            {
               arr.push(product[i])
            }
        }
        setdata([...arr])
    }
        
    function search_price()
    {
        if(price.length==0)
        {
            setdata([...product])
            return;
        }
        let arr=[]
        for(let i=0;i<product.length;i++)
        {
            if(product[i].price==price)
            {
               arr.push(product[i])
            }
        }
        setdata([...arr])
    }

    function search_offer()
    {
        if(offer.length==0)
        {
            setdata([...product])
            return;
        }
        let arr=[]
        for(let i=0;i<product.length;i++)
        {
            if(product[i].offer==offer)
            {
              arr.push(product[i])
            }
        }
        setdata([...arr])
    }

    function search_product_type()
    {
        if(product_type.length==0)
        {
            setdata([...product])
            return;
        }
        let arr=[]
        for(let i=0;i<product.length;i++)
        {
            if(product[i].product_type.toLocaleLowerCase()==product_type.toLocaleLowerCase() || KMP(product[i].product_type.toLocaleLowerCase(),product_type.toLocaleLowerCase()))
            {
              arr.push(product[i])
            }
        }
        setdata([...arr])
    }

    function search_numberOfPeopleGiven()
    {
        if(numberOfPeopleGiven.length==0)
        {
            setdata([...product])
            return;
        }
        let arr=[]
        for(let i=0;i<product.length;i++)
        {
            if(product[i].numberOfPeopleGiven==numberOfPeopleGiven)
            {
                arr.push(product[i])
            }
        }
        setdata([...arr])
        
    }

    function search_rating()
    {
        if(rating.length==0)
        {
            setdata([...product])
            return;
        }
        let arr=[]
        for(let i=0;i<product.length;i++)
        {
            if(product[i].rating==rating)
            {
                arr.push(product[i])
            }
        }
        setdata([...arr])
    }
    
    function search_actualprice()
    {
        if(actualprice.length==0)
        {
            setdata([...product])
            return;
        }
        let arr=[]
        for(let i=0;i<product.length;i++)
        {
            let x=(product[i].price-(product[i].price*product[i].offer/100)).toFixed(2);
            if(x==actualprice || KMP(x,actualprice))
            {
                arr.push(product[i])
            }
        }
        setdata([...arr])
    }

    function loadproduct()
    {
        fetch(url).then(responce=>responce.json()).then((res)=>{
            if(res!=undefined)
            {
                setdata(res)
                setproduct(res)
            }
        },(error)=>{
            console.log("")
        })
    }

    function Delete(id)
    {
        swal({
            title: "Are you sure?",
            text: "Are you sure to Delete the product ?",
            icon: "warning",
            dangerMode: true,
          })
          .then(willDelete => {
            if (willDelete) 
            {
                fetch(url,{
                        method:"DELETE",
                        headers:{
                            'Accept':'application/json',
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({
                            id:id
                        })
                    }).then(responce=>responce.json()).then((res)=>{
                        if (res!=undefined)
                        {
                            swal("Deleted!", "SuccessFully Deleted", "success");
                            loadproduct()
                        }
                    },(error)=>{
                        history('/')
                })
            }    
        });

    }

    function KMP(original,patt)
    {
        let n=patt.length;
        for(let i=0;i<original.length-n+1;i++)
        {
            let generate=original.substring(i,i+n);
            if(generate===patt) return true;
        }
        return false;
    }

    const history=useNavigate()

    useEffect(()=>{
        loadproduct()
    },[])

    return(
        <div className='container'>
            <button className='btn btn-secondary btn-sm mt-4' onClick={loadproduct}>Clear Search</button>
                <table class="table table-bordered border-primary mt-3">
                    <thead>
                        <tr>
                            <th className='text-center' scope="col">ID</th>
                            <th  className='text-center'scope="col">Product</th>
                            <th className='text-center' scope="col">Price</th>
                            <th className='text-center' scope="col">Offer</th>
                            <th className='text-center' scope="col">Actual Price</th>
                            <th className='text-center' scope="col">Product Type</th>
                            <th className='text-center' scope="col">Rating</th>
                            <th className='text-center' scope="col">TotalRating</th>
                            <th className='text-center' scope="col">Action1</th>
                            <th className='text-center' scope="col">Action2</th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                           <td>
                               <div className='row mx-0'>
                                    <div className='col-md-11 px-0'><input  value={product_id} onChange={(e)=>setproduct_id(e.target.value)}  className="form-control" placeholder="id"   /></div>
                                    <div className='col mt-1 mx-1 px-0'>
                                        <button className='btn btn-primary btn-sm' onClick={search_product_id}>GO</button>
                                    </div>
                                </div>
                            </td>
                            <td>
                              <div className='row mx-0'>
                                <div className='col-md-11 px-0'><input value={product_name} onChange={(e)=>setproduct_name(e.target.value)}  className="form-control" placeholder="Name" aria-label="Search"  /></div>
                                <div className='col mt-1 mx-1 px-0'>
                                    <button className='btn btn-primary btn-sm' onClick={search_product_name}>GO</button>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className='row mx-0'>
                                <div className='col-md-11 px-0'><input value={price} onChange={(e)=>setprice(e.target.value)}  className="form-control" placeholder="Price" aria-label="Search"  /></div>
                                <div className='col mt-1 mx-1 px-0'>
                                    <button className='btn btn-primary btn-sm' onClick={search_price}>GO</button>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className='row mx-0'>
                                <div className='col-md-11 px-0'><input value={offer} onChange={(e)=>setoffer(e.target.value)}  className="form-control" placeholder="Offer" aria-label="Search"  /></div>
                                <div className='col mt-1 mx-1 px-0'>
                                    <button className='btn btn-primary btn-sm' onClick={search_offer}>GO</button>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className='row mx-0'>
                                <div className='col-md-11 px-0'><input value={actualprice} onChange={(e)=>setactualprice(e.target.value)} className="form-control" placeholder="price" aria-label="Search"  /></div>
                                <div className='col mt-1 mx-1 px-0'>
                                    <button className='btn btn-primary btn-sm' onClick={search_actualprice}>GO</button>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className='row mx-0'>
                                <div className='col-md-11 px-0'><input value={product_type} onChange={(e)=>setproduct_type(e.target.value)} className="form-control" placeholder="Type" aria-label="Search"  /></div>
                                <div className='col mt-1 mx-1 px-0'>
                                    <button className='btn btn-primary btn-sm' onClick={search_product_type}>GO</button>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className='row mx-0'>
                                <div className='col-md-11 px-0'><input value={rating} onChange={(e)=>setrating(e.target.value)} className="form-control" placeholder="Rating" aria-label="Search"  /></div>
                                <div className='col mt-1 mx-1 px-0'>
                                    <button className='btn btn-primary btn-sm' onClick={search_rating}>GO</button>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className='row mx-0'>
                                <div className='col-md-11 px-0'><input value={numberOfPeopleGiven} onChange={(e)=>setnumberOfPeopleGiven(e.target.value)} className="form-control" placeholder="Type" aria-label="Search"  /></div>
                                <div className='col mt-1 mx-1 px-0'>
                                    <button className='btn btn-primary btn-sm' onClick={search_numberOfPeopleGiven}>GO</button>
                                </div>
                              </div>
                            </td>
                            <td scope="col-2"></td>
                            <td scope="col-2"></td>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length!=0 ?
                            data.map((item,ind)=>(
                                <tr key={ind}>
                                    <th className='text-center' scope="row">{item.id}</th>
                                    <td className='text-center'>{item.product_name}</td>
                                    <td className='text-center'><>₹{item.price}</></td>
                                    <td className='text-center'>{item.offer}%</td>
                                    <td className='text-center'>₹{(item.price-item.price*item.offer/100).toFixed(2)}</td>
                                    <td className='text-center'>{item.product_type}</td>
                                    <td className='text-center'>{item.rating}</td>
                                    <td className='text-center'>{item.numberOfPeopleGiven}</td>
                                    <td className='text-center'><Link to={`/Edit/${item.id}`}><button className='btn btn-primary btn-sm'>Update</button></Link></td>
                                    <td className='text-center'><button className='btn btn-danger btn-sm' onClick={()=>Delete(item.id)}>Delete</button></td>
                                </tr>
                            ))
                            :
                               <tr >
                                    <th className='text-center' scope="row">Na</th>
                                    <td className='text-center'>Na</td>
                                    <td className='text-center'>NA</td>
                                    <td className='text-center'>NA</td>
                                    <td className='text-center'>NA</td>
                                    <td className='text-center'>NA</td>
                                    <td className='text-center'>NA</td>
                                    <td className='text-center'>NA</td>
                                    <td className='text-center'>Na</td>
                                    <td className='text-center'>Na</td>
                                </tr>
                        }
                    </tbody>
                </table>
        </div>
    )
}

export default Operation