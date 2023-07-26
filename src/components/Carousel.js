import React from 'react'

export default function Carousel() {
  return (
    <div>
        <div id="carouselExampleCaptions" className="carousel slide">
            
        <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner" id="carousel">
            <div className="carousel-item active">
            <img src="https://picsum.photos/1800/500?burger" className="d-block w-100" style={{filter:"brightness(40%)"}} alt="..."/>

            <div className="carousel-caption d-none d-md-block">
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success " type="submit">Search</button>
                </form>
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
  )
}
