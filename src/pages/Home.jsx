import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-button-container">
      <button onClick={() => navigate('/products')}>View Products</button>
    </div>
  );
}

