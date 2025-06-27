
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
import {
  ProductContainer,
  ProductName,
  ProductPrice,
  ProductDescription,
  ProductImage,
  Button,
  ButtonContainer,
} from "./styledComponents";

const ProductItem = ({ id, name, description, price, img }) => {
  const handleAddToCart = async () => {
    const userId = Cookies.get("userId");

    try {
      await axios.post("http://localhost:5100/add-to-cart", {
        userId,
        productId: id,
        quantity: 1
      });

      alert('Product added to cart!');
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert('Failed to add product to cart');
    }
  };

  return (
    <ProductContainer>
      <ProductImage src={img} alt={name} />
      <ProductName>{name}</ProductName>
      <ProductPrice>${price}</ProductPrice>
      <ProductDescription>{description}</ProductDescription>
      <ButtonContainer>
        <Link to={`/order-details/${id}`} className="btn btn-primary" style={{ borderRadius: '0' }}>
          Buy Now
        </Link>
        <Button onClick={handleAddToCart}>Add to Cart</Button>
      </ButtonContainer>
    </ProductContainer>
  );
};

export default ProductItem;