
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from '../Header';

const FormContainer = styled.div`
  text-align: start;
  width: 600px;
  margin: 12vh auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const FormHeader = styled.h2`
  font-size: 1.5rem;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    quantity: '',
    paymentMethod: 'cod',
    address: '',
  });

  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    console.log('Product ID from URL:', id);
    axios.get(`http://localhost:5100/products/${id}`)
      .then((response) => {
        const data = response.data;
        console.log('Fetched product data:', data);
        setProductDetails({
          productName: data.productname,
          price: data.price
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch product:', err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = Cookies.get('userId');
    const { productName, price } = productDetails;

    if (!productName || !price) {
      alert('Product details are still loading. Please try again.');
      return;
    }

    const payload = {
      ...formData,
      user: userId,
      productId: id,
      productName,
      price
    };
    console.log('Debug -> productName:', productName);
    console.log('Debug -> price:', price);
    try {
      const res = await axios.post('http://localhost:5100/orders', payload);
      alert(`Order placed! Order ID: ${res.data._id}`);
      setFormData({
        firstname: '',
        lastname: '',
        phone: '',
        quantity: '',
        paymentMethod: 'cod',
        address: ''
      });
    } catch (err) {
      console.error('Error placing order:', err);
    }
  };

  return (
    <div>
      <Header />
      <FormContainer>
        <FormHeader>Order Details</FormHeader>
        {loading ? (
          <p>Loading product info...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>First Name:</Label>
              <Input
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Last Name:</Label>
              <Input
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Phone:</Label>
              <Input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Quantity:</Label>
              <Input
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Address:</Label>
              <textarea
                name="address"
                rows={4}
                value={formData.address}
                onChange={handleChange}
                style={{ width: '100%', border: '1px solid gray' }}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Payment Method:</Label>
              <Select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                required
              >
                <option value="cod">Cash on Delivery</option>
                <option value="credit">Credit Card</option>
                <option value="debit">Debit Card</option>
              </Select>
            </FormGroup>
            <Button type="submit" disabled={loading}>
              Submit
            </Button>
          </form>
        )}
      </FormContainer>
    </div>
  );
};

export default Checkout;