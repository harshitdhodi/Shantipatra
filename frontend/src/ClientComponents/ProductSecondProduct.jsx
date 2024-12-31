import React from 'react';
import Points from './ProductTablePoints';
import ProductSecondTable from './ProductSecondTable';
import { useParams } from 'react-router-dom';

const ProductSecondProduct = () => {
    const { slugs } = useParams(); // Extract slug from params

    return (
        <div className="max-w-[110rem] mx-auto ">
            {/* Check if slugs include "bopp" before rendering components */}
            {slugs && slugs.includes("bopp") ? (
                <>
                    {/* Pass slug as a prop to Points component */}
                    <Points slug={slugs} />
                    <ProductSecondTable slug={slugs} />
                </>
            ) : (
                <><Points slug={slugs} />
                {/* <p className="text-black">No Data Available </p> */}
                </>
            )}
        </div>
    );
};  

export default ProductSecondProduct;
