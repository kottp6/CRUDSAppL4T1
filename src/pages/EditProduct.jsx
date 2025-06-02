import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then(res => res.json())
      .then(data => setInitialValues(data));
  }, [id]);

  const handleSubmit = async (product) => {
    await fetch(`http://localhost:3000/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    navigate('/products');
  };

  return initialValues ? (
    <ProductForm initialValues={initialValues} onSubmit={handleSubmit} />
  ) : (
    <p>Loading...</p>
  );
}
