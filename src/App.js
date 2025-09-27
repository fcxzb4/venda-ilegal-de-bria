import React from 'react';
import ProductCard from './components/ProductCard';
import { PRODUCTS } from './data/productsData';
import './styles.css'; // O CSS principal também é importante aqui

function App() {
  return (
    // 'product-grid' é a classe que define a estrutura de grade (grid ou flexbox)
    <main className="product-grid"> 
      {PRODUCTS.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </main>
  );
}

export default App;