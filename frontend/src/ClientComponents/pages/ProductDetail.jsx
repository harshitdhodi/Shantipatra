import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import axios from 'axios';
import InquiryForm from "./InquiryForm";
import WhatsAppButton from '../Whatsapp';
import SplashScreen from './Splashscreen';
import ProductSecondProduct from '../ProductSecondProduct';
import OurStrength from '../OurStrength';

function ProductDetail() {
    const { slugs } = useParams();
    const [productData, setProductData] = useState(null);
    const [productDetailData, setProductDetailData] = useState([]); // Ensure this is an array
    const [selectedImage, setSelectedImage] = useState(null);
    const [sliderRef, setSliderRef] = useState(null);
    const [description, setDescription] = useState(true);
    const [information, setInformation] = useState(false);
    const [review, setReview] = useState(false);
    const [showInquiryForm, setShowInquiryForm] = useState(false);
    const [isSplashVisible, setIsSplashVisible] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/product/getDataBySlug?slugs=${slugs}`);
                const { productData, productDetailData } = response.data;
                setProductData(productData);
                setProductDetailData(productDetailData || []); // Set as an empty array if undefined
                setSelectedImage(productData?.photo[0]);
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };
        fetchData();
    }, [slugs]);

    const handleThumbnailClick = (img) => {
        setSelectedImage(img);
        const index = productData?.photo.indexOf(img);
        if (sliderRef) {
            sliderRef.slickGoTo(index);
        }
    };

    const hasBopp = window.location.href.includes('bopp');
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        beforeChange: (current, next) => {
            if (sliderRef) {
                setSelectedImage(productData?.photo[next]);
            }
        },
        nextArrow: <IoIosArrowForward size={25} />,
        prevArrow: <IoIosArrowBack size={25} />,
    };

    const formattedProduct = slugs
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return (
        <div className='overflow-x-hidden'>
            <SplashScreen
                onTransitionEnd={() => setIsSplashVisible(false)}
                isVisible={isSplashVisible}
            />
          
            {showInquiryForm && (
                <InquiryForm
                    productName={formattedProduct}
                    onClose={() => setShowInquiryForm(false)}
                />
            )}
            <div
                className='relative flex justify-center items-center bg-cover bg-fixed h-[70vh] mb-10'
                style={{
                    backgroundImage: `url(/api/image/download/${selectedImage})`
                }}
            >
                <h1 className='font-bold text-white z-10 sm:text-5xl text-center text-3xl'>{formattedProduct}</h1>
                <div className='bg-[#0b0b0b] absolute inset-0 opacity-40'></div>
            </div>
            <div className='flex flex-col lg:flex-row gap-10 items-center justify-center w-full'>
                <div className='w-full lg:w-1/2'>
                    <Slider {...settings} ref={setSliderRef} className='mb-4'>
                        {productData?.photo.map((img, index) => (
                            <div key={index}>
                                <img
                                    src={`/api/image/download/${img}`}
                                    alt={`Product Image ${index + 1}`}
                                    className='w-full h-[10cm] object-cover'
                                />
                            </div>
                        ))}
                    </Slider>
                    <div className='flex gap-4'>
                        {productData?.photo.map((img, index) => (
                            <div
                                key={index}
                                className={`border-2 cursor-pointer ${selectedImage === img ? 'border-blue-500' : 'border-gray-400'}`}
                                onClick={() => handleThumbnailClick(img)}
                            >
                                <img
                                    src={`/api/image/download/${img}`}
                                    alt={`Thumbnail ${index + 1}`}
                                    className='w-[4cm] h-[3cm] object-cover'
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='w-full lg:w-1/3 text-center px-2 lg:text-left'>
                    <h1 className='text-3xl font-bold text-[#384b98] mb-4'>{productData?.title}</h1>
                    <div
                        className="prose custom-bullets text-justify pl-3 pr-2  prose-li:m-1 max-w-none"
                        dangerouslySetInnerHTML={{ __html: productData?.details || "" }}
                    />
                    <button
                        onClick={() => setShowInquiryForm(true)}
                        className='border-2 border-blue-950 hover:border-none hover:bg-[#384b98] hover:text-white  bg-white text-blue-950 rounded-full text-xl py-2 px-5 my-5 transition duration-200'
                    >
                        Inquiry Now
                    </button>
                </div>
            </div>

            <OurStrength />

            <div className='flex flex-col lg:flex-row gap-8 justify-center items-center border-b-2 border-gray-300 py-4 mb-8'>
                <div
                    className={`cursor-pointer py-2 px-4 text-center font-bold ${description ? 'text-yellow-500 border-b-4 border-yellow-500' : ''}`}
                    onClick={() => { setDescription(true); setInformation(false); setReview(false); }}
                >
                    Description
                </div>
                <div
                    className={`cursor-pointer py-2 px-4 text-center font-bold ${information ? 'text-yellow-500 border-b-4 border-yellow-500' : ''}`}
                    onClick={() => { setInformation(true); setReview(false); setDescription(false); }}
                >
                    Additional Information
                </div>
            </div>

            {description && (
                <div className="overflow-x-auto p-8">
                    <table className="table-auto w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                {hasBopp ? (
                                    <>
                                        <th className="border border-gray-300 p-2">Film Thickness (mm)</th>
                                        <th className="border border-gray-300 p-2">Tape Thickness (mm)</th>
                                        <th className="border border-gray-300 p-2">Adhesion Strength (gms/inch)</th>
                                        <th className="border border-gray-300 p-2">Break Point of Elongation</th>
                                        <th className="border border-gray-300 p-2">Tensile Strength (kg/inch)</th>
                                    </>
                                ) : (
                                    <>
                                        <th className="border border-gray-300 p-2">Code Plain/Printed</th>
                                        <th className="border border-gray-300 p-2">Width (mm)</th>
                                        <th className="border border-gray-300 p-2">Thickness (mm)</th>
                                        <th className="border border-gray-300 p-2">Average Net Weight (kg)</th>
                                        <th className="border border-gray-300 p-2">Average Strength (kg)</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {productDetailData.map((detail) => (
                                <tr key={detail._id}>
                                    <td className="border border-gray-300 p-2">{detail.productCode} micron</td>
                                    <td className="border border-gray-300 p-2">{detail.variants}</td>
                                    <td className="border border-gray-300 p-2">{detail.size} (Min.)</td>
                                    <td className="border border-gray-300 p-2">{detail.pcs}</td>
                                    <td className="border border-gray-300 p-2">{detail.moq} (Min.)</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {information && (
                <div className='p-4'>
                    <ProductSecondProduct />
                </div>
            )}
        </div>
    );
}

export default ProductDetail;
