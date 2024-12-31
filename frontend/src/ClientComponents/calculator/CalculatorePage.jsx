import React from 'react';
import calc1 from "../../assets/wightCalc.jpg";
import calc2 from "../../assets/outerDiaCalc.jpg";
import { Link } from 'react-router-dom';

const CalculatorPage = () => {
    return (
        <div className="bg-gray-100 py-12 relative z-10">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Calculator</h1>
                <p className="text-lg text-gray-600">
                    Calculate the Outer Diameter and the Weight of the product through these calculators.
                    The value derived from it should be used for estimates and not for exact measurements.
                </p>
            </div>

            <div className="flex justify-center mt-12 space-x-10 relative z-20">
                {/* Weight Calculator Card */}
                <Link to="/weight-calc" className="cursor-pointer">
                    <div className="bg-white rounded-lg shadow-md p-6 max-w-sm relative">
                        <img
                            src={calc1}
                            alt="Weight Calculator"
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <h2 className="text-xl font-semibold mt-4 text-center">Weight Calculator</h2>
                    </div>
                </Link>

                {/* Outer Diameter Calculator Card */}
                <Link to="/outer-dia-calc">
                    <div className="bg-white cursor-pointer rounded-lg shadow-md p-6 max-w-sm relative">
                        <img
                            src={calc2}
                            alt="Outer Diameter Calculator"
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <h2 className="text-xl font-semibold mt-4 text-center">Outer Dia Calculator</h2>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default CalculatorPage;
