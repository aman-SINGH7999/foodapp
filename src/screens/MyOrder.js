import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function MyOrder() {
    const [orderedData, setOrderedData] = useState([])

    const fatchMyOrder = async ()=>{
        const responce = await fetch('http://127.0.0.1:5000/api/myOrder',{
            method : 'POST',
            headers : {
                'Content-Type' : "application/json"
            },
            body : JSON.stringify({
                email : localStorage.getItem('userEmail')
            })
        })
        const result = await responce.json();
        console.log("---------------------",result.orderData)
        
        setOrderedData(result.orderData)
    }
useEffect(()=>{
    fatchMyOrder();
},[])

  return (
    <div>
        <div><Navbar/></div>
        <div className='container mt-3 row'>
            {
                orderedData.map((val)=>{
                    return (
                    <div className='col-sm-3'>
                        <div className='mt-3 d-flex justify-content'>
                            <div className="card" style={{'width':'28rem', overflow : "scroll"}}>
                            <div className="card-body">
                                {
                                    val.map((data,index)=>{
                                        return( 
                                            <div>
                                                {
                                                    index === 0 
                                                    ? <><h5 className="card-title">{data}</h5> <hr></hr></>
                                                    : <div>
                                                        <h6 className="card-subtitle mb-2 text-muted">{data[0]}</h6>
                                                        <p className="card-text fs-8">Quantity: {data[2]}</p>
                                                        <p className="card-text">Size:  {data[3]}</p>
                                                        <p className="card-text">Price:  {data[1]}</p>
                                                        <hr></hr>
                                                    </div>
                                                }
                                            </div>
                                        )
                                    })
                                }
                                
                            </div>
                            </div>
                        </div>
                    </div>
                    )
                })
            }
        </div>
        <div><Footer/></div>
    </div>
    
  )
}
