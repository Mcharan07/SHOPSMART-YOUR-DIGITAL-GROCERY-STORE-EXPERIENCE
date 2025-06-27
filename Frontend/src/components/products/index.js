
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductItem from '../ProductItem';
import Header from '../Header';

const ProductsContainer = styled.div`
  margin-top: 10vh;
  padding: 20px;
  text-align: start;
`;

const Heading = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  margin-top: 40px;
`;

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 20px;
  max-width: 270px;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const CategoryFilter = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-top: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Products = () => {
  const api = 'http://localhost:5100/products';
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(api);
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };
    fetchProducts();
  }, []);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.productname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      searchQuery.trim() === '';

    const categoryValue =
      typeof product.category === 'string'
        ? product.category
        : product.category?.category;

    if (selectedCategory === 'all') return matchesSearch;
    return (
      matchesSearch &&
      categoryValue?.toLowerCase() === selectedCategory.toLowerCase()
    );
  });

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const categories = [
    'all',
    ...new Set(
      products
        .map((p) => {
          if (!p.category) return null;
          if (typeof p.category === 'string') return p.category.toLowerCase();
          if (typeof p.category === 'object')
            return p.category.category?.toLowerCase();
          return null;
        })
        .filter(Boolean)
    )
  ];

  return (
    <div>
      <Header />
      <ProductsContainer>
        {/* Carousel */}
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active" />
            <li data-target="#carouselExampleIndicators" data-slide-to="1" />
            <li data-target="#carouselExampleIndicators" data-slide-to="2" />
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active" />
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="https://img.freepik.com/free-vector/beautiful-banner-floral-leaves-template_21799-2812.jpg"
                alt="Slide 2"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="https://img.freepik.com/free-psd/spring-sale-social-media-cover-template_47987-15231.jpg"
                alt="Slide 3"
              />
            </div>
          </div>
          <button className="carousel-control-prev" data-slide="prev" aria-label="Previous">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </button>
          <button className="carousel-control-next" data-slide="next" aria-label="Next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </button>
        </div>

        {/* Filters */}
        <FiltersContainer>
          <div className="w-100">
            <h3>Search By Product Name</h3>
            <SearchBar
              type="text"
              placeholder="Search by product name"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="w-100">
            <h3>Filter By Category</h3>
            <CategoryFilter onChange={handleCategoryChange} value={selectedCategory}>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {capitalize(cat)}
                </option>
              ))}
            </CategoryFilter>
          </div>
        </FiltersContainer>

        <Heading>Products</Heading>
        {filteredProducts.length === 0 ? (
          <p>No products found matching your criteria.</p>
        ) : (
          <StyledList>
            {filteredProducts.map((product) => (
              <ListItem key={product._id}>
                <ProductItem
                  id={product._id}
                  img={product.image}
                  name={product.productname}
                  description={product.description}
                  price={product.price}
                />
              </ListItem>
            ))}
          </StyledList>
        )}
      </ProductsContainer>
    </div>
  );
};

export default Products;