import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import ProductDetail from './pages/ProductDetail';
import OurProduct from './pages/Product';
import BlogDetail from './pages/BlogDetail'; 

const SlugPage = () => {
  const { slugs } = useParams();
  
  const [slugType, setSlugType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch slugs from the backend
  const fetchSlugs = async () => {
    try {
      const response = await axios.get('/api/product/slugs');
      const { productSlugs, productCategorySlugs, newsSlugs } = response.data;

      // Extract slug strings from objects
      const productSlugList = productSlugs.map(item => item.slug);
      const productCategorySlugList = productCategorySlugs.map(item => item.slug);
      const newsSlugList = newsSlugs.map(item => item.slug);

      // Determine the type of slug and set the correct type for routing
      if (productSlugList.includes(slugs)) {
        setSlugType('product');
      } else if (productCategorySlugList.includes(slugs)) {
        setSlugType('productCategory');
      } else if (newsSlugList.includes(slugs)) {
        setSlugType('news');
      } else {
        setError('Slug not found');
      }

      setLoading(false);
    } catch (err) {
      console.error('Error fetching slugs:', err);
      setError('Error fetching slugs');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlugs();
  }, [slugs]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Render the correct component based on the slug type
  switch (slugType) {
    case 'product':
      return <ProductDetail slugs={slugs} />;
    case 'productCategory':
      return <OurProduct slugs={slugs} />;
    case 'news':
      return <BlogDetail slugs={slugs} />;
    default:
      return <div>Unknown slug type</div>;
  }
};

export default SlugPage;
