import React, { useState, useEffect } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbarimg from "../assets/Navbarimg.png";
import Footer from "./Footer";
import Header from './Header';
import { AiOutlineMenu } from "react-icons/ai";
import axios from 'axios';
import InquiryForm from './pages/InquiryForm';
import InquiryButtonForm from './pages/InquiryButtonForm';
import Catalog from './Catalog';
import Catalogue from './Catalog';

function MainNavbar() {
    const [menuListings, setMenuListings] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isSticky, setIsSticky] = useState(false);
    const [categories, setCategories] = useState([]);
    const location = useLocation();
    const [colorlogo, setColorLogo] = useState([]);
    const [whitelogo, setWhiteLogo] = useState([]);
    const [error, setError] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHeaderColorLogo = async () => {
            try {
                const response = await axios.get('/api/logo/headercolor');
                setColorLogo(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : err.message);
            }
        };

        fetchHeaderColorLogo();
    }, []);

    useEffect(() => {
        const fetchHeaderWhiteLogo = async () => {
            try {
                const response = await axios.get('/api/logo/headerwhite');
                setWhiteLogo(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : err.message);
            }
        };

        fetchHeaderWhiteLogo();
    }, []);


    // JSON data for paths
    const menuPaths = {
        about: "/aboutus",
        blog: "/blog",
        product: "/products",
        contact: "/contact",
        home: "/",
        Manufacture: "/manufacture",
        ourclient: "/our-clients",
        globalpresence: "/global",
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/product/getCategoryAndPhoto');
                setCategories(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchMenuListings = async () => {
            try {
                const response = await axios.get('/api/menulisting/getMenulisting', { withCredentials: true });
                setMenuListings(response.data.menuListings);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMenuListings();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > window.innerHeight / 2);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
    }, [location.pathname]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setOpenDropdown(null);
    };

    const toggleDropdown = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };



    const handleOpenModal = () => {
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false);
    };

    // Prepare menu items
    const menuItems = menuListings
    .filter(item => item.pagename.toLowerCase() !== 'calculator') // Exclude Calculator
    .map(item => {
      const pagenameLower = item.pagename.toLowerCase();
      let path = item.path;
  
      if (pagenameLower.includes('about')) {
        path = menuPaths.about;
      } else if (pagenameLower.includes('blog')) {
        path = menuPaths.blog;
      } else if (pagenameLower.includes('product')) {
        path = menuPaths.product;
      } else if (pagenameLower.includes('contact')) {
        path = menuPaths.contact;
      } else if (pagenameLower === 'home') {
        path = menuPaths.home;
      } else if (pagenameLower.includes('manufacture')) {
        path = menuPaths.Manufacture;
      } else if (pagenameLower.includes('our')) {
        path = menuPaths.ourclient;
      } else if (pagenameLower.includes('global')) {
        path = menuPaths.globalpresence;
      }
  
      if ((item.pagename === 'Product' || item.pagename === 'Products') && categories.length > 0) {
        return {
          ...item,
          path,
          subItems: categories.map(category => ({
            title: category.category,
            path: `/${category.slug}`
          }))
        };
      }
  
      return {
        ...item,
        path
      };
    });
  

    return (
        <>
            <Header />
            <div className={` ${isSticky ? 'fixed top-0 z-50 bg-white shadow-lg' : ''} w-full`}>
                {/* Mobile Menu */}
                <div className='flex items-center justify-between px-6 md:px-8 lg:px-6 lg:py-4 w-full lg:hidden'>
                    <div onClick={toggleMenu}>
                        <AiOutlineMenu size={25} className={`${isMenuOpen ? 'hidden' : 'block'}`} />
                    </div>
                    <div className='mt-1'>
                        <img src={`/api/logo/download/${colorlogo.photo}`} alt={colorlogo.alt} title={colorlogo.imgTitle} className='w-[3.5cm] h-[1cm] object-contain' />
                    </div>

                    {isMenuOpen && (
                        <div className='fixed top-0 left-0 lg:w-1/2 xl:w-2/5 w-full md:w-1/2 h-full bg-[#fff9ebfd] z-50 flex flex-col overflow-y-auto'>
                            <div
                                className="absolute inset-0 z-0 opacity-5" // Set z-index to 0
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50m-40 0a40,40 0 1,0 80,0a40,40 0 1,0 -80,0' fill='none' stroke='%23333' stroke-width='1'/%3E%3C/svg%3E")`,
                                    backgroundSize: '100px 100px'
                                }}
                            ></div>
                            <div className='flex justify-between p-4 z-10'> {/* Set z-index to 10 for content */}
                                <img src={`/api/logo/download/${whitelogo.photo}`} alt={whitelogo.alt} title={whitelogo.imgTitle} className='w-[6cm] h-[3cm] object-contain' />
                                <IoClose size={32} style={{ color: 'black' }} onClick={toggleMenu} />
                            </div>
                            <ul className='flex flex-col w-full z-10'> {/* Set z-index to 10 for the list */}
                                {menuItems.map((item, index) => (
                                    <li key={index} className='flex flex-col items-center border-b border-gray-700 w-full p-2'>
                                        <div className='flex justify-between items-center text-black w-full uppercase' onClick={() => toggleDropdown(index)}>
                                            {item.subItems ? <span>{item.pagename}</span> : <Link to={item.path}>{item.pagename}</Link>}
                                            {item.subItems && (openDropdown === index ? <IoIosArrowUp /> : <IoIosArrowDown />)}
                                        </div>
                                        {item.subItems && openDropdown === index && (
                                            <ul className='flex flex-col text-black items-center space-y-2 w-full'>
                                                {item.subItems.map((subItem, subIndex) => (
                                                    <li key={subIndex} className='border-b border-gray-700 w-full py-2 px-5'>
                                                        <Link to={subItem.path}>{subItem.title}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                </div>

                {/* Desktop Menu */}
                <div className='hidden lg:block'>
                    <div className='flex items-center mt-3 justify-between xl:px-16 px-10 w-full pt-4 bg-white font-normal'>
                        <img
                            src={`/api/logo/download/${colorlogo.photo}`}
                            alt={colorlogo.alt}
                            title={colorlogo.imgTitle}
                            className='w-[15%] object-cover mb-5 -mt-2 hidden cursor-pointer xl:block '
                            onClick={() => navigate('/')} // Navigate without reloading
                        />
                        <div className='flex gap-2 items-center space-x-3 lg:space-x-4'>
                            {menuItems.map((item, index) => (
                                <div key={index} className='relative -mt-8 cursor-pointer flex items-center   font-montserrat group'>
                                    <Link
                                        to={item.subItems ? '#' : item.path}
                                        className={`xl:text-[16px]  text-[14px]  font-bold ${location.pathname === item.path ? 'text-yellow-500' : 'text-black'} hover:text-[#df950d] transition-all`}
                                    >
                                        {item.pagename}
                                    </Link>
                                    {item.subItems && (
                                        <span className='ml-1'>
                                            <IoIosArrowDown />
                                        </span>
                                    )}
                                    {item.subItems && (
                                        <ul className='absolute top-4 mt-2 left-0 bg-white shadow-md rounded w-48 group-hover:z-50 border-b-4 border-b-blue-950 hidden group-hover:block group-hover:translate-y-0 transform translate-y-8 transition duration-200 ease-in-out'>
                                            {item.subItems.map((subItem, subIndex) => (
                                                <li key={subIndex} className='px-4 py-3 hover:bg-gray-200 hover:text-blue-950'>
                                                    <Link to={subItem.path}>{subItem.title}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}

                            <div className='space-y-4 py-3 -mt-8 text-center'>
                                <button
                                    onClick={handleOpenModal}
                                    className="w-full px-4 py-2 bg-[#fab700] text-black rounded-md 
                    hover:bg-yellow-600 transition-colors duration-200 
                    focus:outline-none focus:ring-2 focus:ring-yellow-500 
                    focus:ring-offset-2"
                                >
                                    Inquiry
                                </button>

                                {modalIsOpen && (
                                    <InquiryButtonForm
                                        onClose={handleCloseModal}
                                    />
                                )}
                            </div>
                            <div className='space-y-4 -mt-8 py-3 text-center'>
                                {/* <Catalogue /> */}
                                <button
                                    className="w-full px-4 py-2 bg-[#fab700] text-black rounded-md 
             hover:bg-yellow-600 transition-colors duration-200 
             focus:outline-none focus:ring-2 focus:ring-yellow-500 
             focus:ring-offset-2"
                                    onClick={() => window.open('/api/image/view/shantipatra.pdf', '_blank')}
                                >
                                    Catalogue
                                </button>

                            </div>
                        </div>
                    </div>
                </div>

                {/* <img src={Navbarimg} alt="Navbar" title='navbar' className='w-full absolute z-40' /> */}
            </div>
            <Outlet />
            <Footer />
        </>
    );
}

export default MainNavbar;
