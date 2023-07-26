import {React, useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {Link, useNavigate} from "react-router-dom"

export default function Signup() {
    const navigate = useNavigate();
    const [info, setInfo] = useState({name:"",email:"",password:"",address:""});

    
    const handleform = async (e)=>{
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:5000/api/createuser',{
            method: 'POST',
            headers : {
                'content-type':'application/json'
            },
            body:JSON.stringify({name:info.name, email:info.email, password:info.password, location:info.address})
        })

        const json = await response.json();
        console.log(info)
        console.log(json)
        if(!json.success){
            alert("Enter valid information!")
        }else{
            navigate('/login')
        }
    }
    
    const handlevalue = (e)=>{
        setInfo({...info,[e.target.name]:e.target.value})
    }

  return (
    <div>
        <div> <Navbar/> </div>
        <div className="container mt-3"> 
            <form onSubmit={handleform}>
            <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" value={info.name} name="name" onChange={handlevalue} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" value={info.email} name="email" onChange={handlevalue} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" value={info.password} name="password" onChange={handlevalue} />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" className="form-control" id="address" value={info.address} name="address" onChange={handlevalue} />
                </div>
                
                <button type="submit" className="btn btn-success m-3">Submit</button>
                <Link to="/login" className='btn btn-danger m-3'>Login</Link>
            </form>
        </div>
        <div> <Footer/> </div>
    </div>
  )
}
