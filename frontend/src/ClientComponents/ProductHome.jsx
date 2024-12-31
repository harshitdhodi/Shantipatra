import React, { useEffect, useState } from 'react';
import img1 from "../images/banner1.jpg"; // Example fallback image
import img2 from "../images/banner4.jpg"; // Example fallback image

const ProductHome = () => {
  const [products, setProducts] = useState([]);

  // Fetch the latest products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/product/getLatestProducts');
        const data = await response.json();

        // Transform data to match the structure you need for display
        const formattedProducts = data.data.map((product) => ({
          id: product._id,
          image: product.photo.length > 0 ? `/api/image/download/${product.photo[0]}` : img1, // Use the first image from the array or a fallback
          title: product.title,
          slug: `/${product.slug}`,
          homeDetail: product.homeDetail // Store the product homeDetail
        }));

        setProducts(formattedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="relative w-full min-h-[400px] overflow-hidden">
      {/* Background pattern */}
      {/* Uncomment this if you want to use the background pattern */}
      {/* <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50m-40 0a40,40 0 1,0 80,0a40,40 0 1,0 -80,0' fill='none' stroke='%23333' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}
      ></div> */}

      <div className="container lg:w-[80%] xl:w-[75%] lg:-mt-10 sm:pl-10 mx-auto px-4 py-8">
      <h2 className='text-[#384b98] hidden lg:block sm:text-5xl text-3xl text-center font-bold py-5'>Our Products</h2>
          
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Text Content */}
          <div className="lg:w-[50%] mb-2 ">
            <h2 className='text-[#384b98] lg:hidden block sm:text-5xl text-3xl text-center font-bold py-5'>Our Products</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              
              {/* Display the homeDetail of the first product if available */}
              {products.map((product) => (
                <div dangerouslySetInnerHTML={{ __html: product.homeDetail }}  className='text-justify'/>
              ))}
            </p>
          </div>

          {/* Product Images */}
          <div className="flex flex-col md:flex-row gap-6 lg:-mt-8 xl:mt-8 lg:w-2/3">
            {products.map((product) => (
              <div className="flex-1" key={product.id}>
                <div className="relative bg-white rounded-3xl shadow-lg lg:p-3 xl:p-5 p-6 overflow-hidden cursor-pointer" onClick={() => window.location.href = product.slug}>
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#df950d]"></div>
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full sm:h-[30vh] lg:h-[20vh] lg:object-fill  object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 text-white sm:text-lg text-sm opacity-0 hover:opacity-100 transition-opacity duration-300">
                   <p className='lg:w-[200px] text-center font-bold '> {product.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHome;
