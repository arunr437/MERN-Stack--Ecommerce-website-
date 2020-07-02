import React from 'react';
import img1 from './2.png';
import img2 from './3.png';
import img3 from './4.png';

    function Carousel(){

        return(
            
            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                    <img src={img3} class="d-block w-100" alt=""/>
                    </div>
                    <div class="carousel-item">
                    <img src={img2} class="d-block w-100" alt=""/>
                    </div>
                    <div class="carousel-item">
                    <img src={img1} class="d-block w-100" alt=""/>
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        );
    }
    export default Carousel;