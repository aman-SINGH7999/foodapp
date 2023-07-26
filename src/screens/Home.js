import {React, useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
// import Carousel from '../components/Carousel'

export default function Home() {
  const [search,setSearch] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const [foodCat, setFoodCat] = useState([]);

  const loadData = async ()=>{
    const response = await fetch('http://localhost:5000/api/fooddata',{
      method : 'POST',
      headers : {
        'content-type':'application/json'
      }
    });

    const myresponse = await response.json();
    setFoodItems(myresponse[0]);
    setFoodCat(myresponse[1]);
  }

  useEffect(()=>{
    loadData()
  },[]);

  return (
    <div>
        <div> <Navbar /> </div>
        <div>
          <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner" id="carousel">
                <div className="carousel-item active">
                <img src="https://picsum.photos/1800/500?burger" className="d-block w-100" style={{filter:"brightness(40%)"}} alt="..."/>
    
                <div className="carousel-caption d-none d-md-block">
                    <div className="d-flex justify-content-center" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=> setSearch(e.target.value)} />
                        {/* <button className="btn btn-outline-success " type="submit">Search</button> */}
                    </div>
                </div>
                </div>
                <div className="carousel-item">
                <img src="https://picsum.photos/1800/500?pizza" className="d-block w-100" style={{filter:"brightness(40%)"}} alt="..."/>
                <div className="carousel-caption d-none d-md-block">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
                </div>
                <div className="carousel-item">
                <img src="https://picsum.photos/1800/500?momos" className="d-block w-100" style={{filter:"brightness(40%)"}} alt="..."/>
                <div className="carousel-caption d-none d-md-block">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
                </div>
                
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className='container'> 
        {
           foodCat !== []
           ? foodCat.map((data)=>{
              return (
                <div className='row mb-3'>
                  <div key={data._id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr/>
                  {
                    foodItems !== []
                    ? foodItems.filter((item)=>
                       (item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                    ).map((filteritems)=>{
                      return (
                        // <div>
                          <div key={filteritems._id} className='col-12 col-md-6 col-lg-3'>
                                <Card 
                                fooditem = {filteritems}
                                options = {filteritems.options[0]}
                                 /> 
                          </div>
                        // </div>
                      )
                    })
                    : <div>No such data</div>
                  }
                </div>
              )
           })
           : <div>No Data</div>
        }
        </div>
        <div> <Footer/> </div>
    </div>
    
  )
}
