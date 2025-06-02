import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';

export default function CreateProduct() {
  const navigate = useNavigate();

  const handleSubmit = async (product) => {
    const res = await fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (res.ok) {
      navigate('/products');
    } else {
      const error = await res.text();
      alert('Failed to create product: ' + error);
    }
  };

  return (
    <div>
      <h2>Create Product</h2>
      <ProductForm
        initialValues={{ name: '', price: 0, inStock: false }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
