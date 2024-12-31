import React, { useEffect, useState } from 'react';
import { TiTick } from "react-icons/ti";

const Points = ({ slug }) => {
    const [data, setData] = useState(null); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchStrappingPoint = async () => {
            try {
                const response = await fetch(`/api/strappingPoint/getStrappingPointBySlug?slug=${slug}`);
                const result = await response.json();
                setData(result[0]); 
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStrappingPoint();
    }, [slug]); 

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>No data found</div>;
    }

    const colors = data.color ? data.color.split('/').map(color => color.trim()) : [];
    const lengthInfo = data.length || "Length information not available";

    return (
        <div className="grid max-w-7xl lg:ml-7 grid-cols-1 sm:grid-cols-2 p-5 gap-20 mb-8">
            <div className='flex flex-col gap-3'>
                {data.paperCore && (
                    <div>
                        <div className='flex items-center gap-2'>
                            <div className='border bg-yellow-500 text-white rounded-full'>
                                <TiTick />  
                            </div>
                            <h3 className="text-lg font-semibold mb-1">Paper Core:</h3>
                        </div>
                        <p className='ml-5'>{data.paperCore}</p>
                    </div>
                )}
                
                {colors.length > 0 && (
                    <div>
                        <div className='flex items-center gap-2'>
                            <div className='border bg-yellow-500 text-white rounded-full'>
                                <TiTick />
                            </div>
                            <h3 className="text-lg font-semibold mb-1">Color:</h3>
                        </div>
                        <p className='ml-5'>{colors.join(", ")}</p>
                    </div>
                )}

                {data.qty && (
                    <div>
                        <div className='flex items-center gap-2'>
                            <div className='border bg-yellow-500 text-white rounded-full'>
                                <TiTick />
                            </div>
                            <h3 className="text-lg font-semibold mb-1">Quantity:</h3>
                        </div>
                        <p className='ml-5'>{data.qty}</p>
                    </div>
                )}
                  <div className='lg:hidden block '>
                {data.packing && (
                    <div>
                        <div className='flex items-center gap-2'>
                            <div className='border bg-yellow-500 text-white rounded-full'>
                                <TiTick />
                            </div>
                            <h3 className="text-lg font-semibold mb-1">Packing:</h3>
                        </div>
                        <p className='ml-5'>{data.packing}</p>
                    </div>
                )}

                {data.length && (
                    <div>
                        <div className='flex items-center gap-2'>
                            <div className='border bg-yellow-500 text-white rounded-full'>
                                <TiTick />
                            </div>
                            <h3 className="text-lg font-semibold mb-1">Length:</h3>
                        </div>
                        <p className='ml-5'>{lengthInfo}</p>
                    </div>
                )}
            </div>
            </div>
            <div className='sm:block hidden '>
                {data.packing && (
                    <div>
                        <div className='flex items-center gap-2'>
                            <div className='border bg-yellow-500 text-white rounded-full'>
                                <TiTick />
                            </div>
                            <h3 className="text-lg font-semibold mb-1">Packing:</h3>
                        </div>
                        <p className='ml-5'>{data.packing}</p>
                    </div>
                )}

                {data.length && (
                    <div>
                        <div className='flex items-center gap-2'>
                            <div className='border bg-yellow-500 text-white rounded-full'>
                                <TiTick />
                            </div>
                            <h3 className="text-lg font-semibold mb-1">Length:</h3>
                        </div>
                        <p className='ml-5'>{lengthInfo}</p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Points;
