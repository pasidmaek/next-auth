// components/FakeDataComponent.tsx

import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const FakeDataComponent: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch the fake data from the API route
    fetch("/api/fakeData")
      .then((response) => response.json())
      .then((data: Product[]) => setProducts(data))
      .catch((error) => console.error("Error fetching fake data:", error));
  }, []);

  if (products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Fake Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            <p>Price: ${product.price}</p>
            <p>{product.description}</p>
            <p>Category: {product.category}</p>
            <img
              src={product.image}
              alt={product.title}
              style={{ maxWidth: "200px" }}
            />
            <p>
              Rating: {product.rating.rate} (Count: {product.rating.count})
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FakeDataComponent;
