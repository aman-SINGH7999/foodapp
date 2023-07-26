import {React,useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Login() {
  const navigate = useNavigate();
  const [info, setInfo] = useState({email:"", password:""});

  const handleform = async (e)=>{
    e.preventDefault();
      const response = await fetch('http://127.0.0.1:5000/api/loginuser',
      {
        method:'POST',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify({email:info.email, password:info.password})
      })


      console.log("my response :----------------------",response)
      const json = await response.json();
      console.log("my response data :----------------------",json)
      if(!json.success){
        alert('Please enter valid information!')
      }else{
        
        localStorage.setItem('userEmail',info.email)
        localStorage.setItem('authToken',json.authToken)
        console.log(localStorage.getItem('authToken'));
        navigate('/');
      }
  }

  const handlevalue = (e)=>{
      setInfo({...info,[e.target.name]:e.target.value});
  }

  return (
    <div>
        <div> <Navbar/> </div>
        <div className="container mt-3"> 
            <form onSubmit={handleform}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" value={info.email} name="email" onChange={handlevalue} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" value={info.password} name="password" onChange={handlevalue} />
                </div>
          
                <button type="submit" className="btn btn-success m-3">Submit</button>
                <Link to="/signup" className='btn btn-danger m-3'>Signup</Link>
            </form>
        </div>
        <div> <Footer/> </div>
    </div>
    
  )
}
