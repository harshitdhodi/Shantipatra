import React, { useState, useEffect } from 'react';
import Plantimg from "../assets/plantimg.png";
import { FiArrowUpRight } from "react-icons/fi";
import axios from 'axios';
import ReactQuill from 'react-quill';
import SVG from "../assets/circle.svg";
import { Link } from 'react-router-dom';

function Homecarousel() {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/banner/getBannersBySectionHome', { withCredentials: true });
            setBanners(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext(); // Change image every 3 seconds (default sliding from left to right)
        }, 3000);

        return () => clearInterval(interval); // Clean up interval on unmount
    }, [currentSlide, currentImageIndex]);

    const handleNext = () => {
        // Slide to the next image, moving left to right
        if (currentImageIndex < banners[currentSlide].photo.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        } else {
            setCurrentImageIndex(0); // Loop back to the first image of the current slide
            setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length);
        }
    };

    const handlePrev = () => {
        // Slide to the previous image, moving right to left
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        } else {
            setCurrentImageIndex(banners[currentSlide].photo.length - 1); // Go to last image of the current slide
            setCurrentSlide((prevSlide) => (prevSlide - 1 + banners.length) % banners.length);
        }
    };

    return (
        <div className="relative lg:h-[90vh] xl:h-[90vh ]  h-[30vh] group w-full mb-16">
            <div className="relative h-full">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    banners.map((slide, slideIndex) => (
                        <div
                            key={slideIndex}
                            className={`absolute w-full lg:h-[90vh] h-[40vh] duration-500 ${slideIndex === currentSlide ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            <img
                                src={`/api/image/download/${slide.photo[currentImageIndex]}`}
                                alt={`${slide.alt[currentImageIndex]}`}
                                title={`${slide.imgTitle[currentImageIndex]}`}
                                className="h-full w-full object-cover filter brightness-100 contrast-110"
                            />

                            {/* Centralized content container */}
                            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/45">
                                <h1
                                    className="lg:text-[60px] text-[26px] text-white sm:mb-16  mb-7 sm:-mt-8 -mt-32 md:mb-8 font-cursive text-center font-bold animate-slideUpFadeIn"
                                    dangerouslySetInnerHTML={{ __html: slide.details }}  // Render HTML content safely
                                ></h1>


                                {/* <h3 className="text-white opacity-80 text-center mb-12 font-extrabold animate-slideUpFadeIn">
                                    <ReactQuill
                                        readOnly={true}
                                        value={slide.details}
                                        modules={{ toolbar: false }}
                                        theme="bubble"
                                        className="quill text-white text-4xl md:text-6xl xl:text-7xl"  // Adjust font size for different breakpoints
                                    />
                                </h3> */}

                                <Link
                                    to="/aboutus"
                                    className="animate-slideUpFadeIn rounded-md sm:text-xl md:text-lg md:px-4 md:py-2 shadow-xl bg-[#fab700] hover:bg-yellow-600 text-white text-center px-2 py-2 sm:px-8 sm:py-4 cursor-pointer"
                                >
                                    Discover More
                                </Link>
                            </div>
                        </div>
                    ))
                )}

                {/* Default show arrows */}
                <button
                    onClick={handlePrev}
                    className="absolute sm:left-4 left-2 top-[60%] xl:top-[53%] lg:top-[52%] sm:top-[58%] transform -translate-y-[60%] lg:-translate-y-1/2 bg-transparent text-white  sm:p-2  rounded-full sm:h-16 sm:w-16 w-8 h-8 border border-white z-10"
                >
                    &#10094;
                </button>
                <button
                    onClick={handleNext}
                    className="absolute sm:right-4 md:top-[51%] right-2 top-[60%] sm:top-1/2 transform -translate-y-[60%] lg:-translate-y-1/2 bg-transparent text-white sm:p-2 rounded-full sm:h-16 sm:w-16 w-8 h-8 border border-white z-10"
                >
                    &#10095;
                </button>
            </div>
        </div>

    );
}

export default Homecarousel;
