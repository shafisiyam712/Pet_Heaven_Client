import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
const Banner = () => {
    return (
        <Carousel 
        showArrows={true}
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
        className="carousel-wrapper"
        >
            <div>
                <img className='w-full h-[450px] object-cover' src="https://i.ibb.co.com/YhyfyxQ/Pet-Adoption-Tips850.jpg" />
            </div>
            <div>
                <img className='w-full h-[450px] object-cover' src="https://i.ibb.co.com/DfsQXCt/how-you-can-help-adoptions-tips-main-image-dog.jpg" />
            </div>
            <div>
                <img className='w-full h-[450px] object-cover' src="https://i.ibb.co.com/y63JkFw/ab35c4bd8b748bbda4050a0e122d1b16.jpg" />
            </div>
            <div>
                <img className='w-full h-[450px] object-cover' src="https://i.ibb.co.com/vsnDGpZ/change-pets-life-day-dt-1.webp" />
            </div>
            <div>
                <img className='w-full h-[450px] object-cover' src="https://i.ibb.co.com/zsYGCb0/download.jpg" />
            </div>
        </Carousel>
    );
};

export default Banner;