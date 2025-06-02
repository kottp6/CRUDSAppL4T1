import { useState } from 'react';

export default function ProductForm({ initialValues, onSubmit }) {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🛡️ Basic validation
    if (formData.name.length < 3 || formData.price < 0) {
      alert('Please enter valid name (min 3 chars) and non-negative price.');
      return;
    }
    // 🔥 Submit to parent
    onSubmit(formData);
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          type='text'
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>
          <input
            name="inStock"
            type="checkbox"
            checked={formData.inStock}
            onChange={handleChange}
          />
          In Stock
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
