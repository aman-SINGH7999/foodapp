import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options);
    const [qty,setQty] = useState(1);
    const [size,setSize] = useState("")

    const handleAddtoCart = async ()=>{
        alert("Your Cart is Added Successfully!")
        let food = []
        for(const item of data){
            if(item.id === props.fooditem._id){
                food = item;
                break;
            }
        }
        if(food !== []){
            if(food.size === size){
                await dispatch({type : "UPDATE", id : props.fooditem._id, price : finalPrice, qty : qty})
                return;
            }else if(food.size !== size){
                await dispatch({type : "ADD", id : props.fooditem._id, name : props.fooditem.name, price : finalPrice, qty : qty, size : size, img : props.fooditem.img})
                return;
            }
            return;
        }

        await dispatch({
            type : "ADD",
            id : props.fooditem._id,
            name : props.fooditem.name,
            price : finalPrice,
            qty : qty,
            size : size,
            img : props.fooditem.img
        })
        // await console.log(data)
    }

    let finalPrice = qty * parseInt(options[size]);
    useEffect(()=>{
        setSize(priceRef.current.value)
    },[])

  return (
    <div className="m-3" >
        <div className="card" style={{"width": "18rem", "maxHeight":"360px"}}>
        <img src={props.fooditem.img} className="card-img-top" alt="..." style={{height:"150px", objectFit:"fill"}} />
        <div className="card-body">
            <h5 className="card-title">{props.fooditem.name}</h5>
            <p className="card-text">This is discription!</p>
            <div className='w-100'>
            <select className='m-2 h-100 bg-success rounded' onChange={(e)=> setQty(e.target.value)}>
                {
                Array.from(Array(6),(e,i)=>{
                    return(
                    <option key={i+1} value={i+1}> {i+1} </option>
                    )
                })
                }
            </select>
            <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e)=> setSize(e.target.value)}>
                {
                    priceOptions.map((val)=>{
                        return <option key={val} value={val}>{val}</option>
                    })
                }
            </select>
            <div className='d-inline fs-5 h-100'>RS.{finalPrice}/-</div>
            </div>
            <hr></hr>
            <button className='btn btn-success justify-center ms-2' onClick={handleAddtoCart} >Add to Cart</button>
        </div>
        </div>
    </div>
  )
}
