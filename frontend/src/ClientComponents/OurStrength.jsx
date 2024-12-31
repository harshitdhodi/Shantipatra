import React, { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import axios from 'axios';

const OurStrength = () => {
  const [strengths, setStrengths] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStrengthPoints = async () => {
      try {
        const response = await axios.get('/api/strengthPoint/getstrengthPoint');
        setStrengths(Array.isArray(response.data.data) ? response.data.data : []); // Access data array within response
      } catch (error) {
        console.error('Error fetching strength points:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStrengthPoints();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading message or spinner
  }

  return (
    <div className="w-full bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-[#384b98] mb-8">OUR STRENGTH:</h2>
        
        <div className="grid md:grid-cols-3 gap-6 ">
          {strengths.map((strength) => (
            <div key={strength._id} className="flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
              <span className="text-gray-700">{strength.points}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurStrength;
