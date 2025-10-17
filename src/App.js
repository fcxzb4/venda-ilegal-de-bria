import ProductCard from "./components/container/ProductCard";
import { useEffect, useState } from "react";
import "./styles.css"; // O CSS principal também é importante aqui

function App() {
 const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  // 🚨 NOVO ESTADO: Usado para forçar a recarga da lista após um POST
  const [refreshKey, setRefreshKey] = useState(0); 

const forceRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  
  // --- Função para buscar os produtos (GET) ---
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3001/card'); 
        const data = await response.json();
        setProducts(data); 

      } catch (error) {
        console.error("Houve um erro na requisição:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts();
  }, [refreshKey]); // <--- Roda quando o refreshKey muda

  // --- Função para Adicionar um Novo Produto (POST) ---
  const handleAddCard = async () => {
    // 1. Dados de exemplo para o novo produto
    const newProductData = {
      title: "adicione novo Bria",
      description: `Parabens voce criou um novo produto#${products.length + 1}.`,
      price: "adicione",
      image: "https://via.placeholder.com/300x200?text=Novo+Cartao" 
    };

    try {
      const response = await fetch('http://localhost:3001/card', {
        method: 'POST', // Método POST para criar o recurso
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProductData),
      });

      if (response.ok) {
        
        // 2. Força a atualização do useEffect para carregar o novo produto
        setRefreshKey(prevKey => prevKey + 1); 

      } else {
        alert('Erro ao criar o cartão. Verifique o servidor.');
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
      alert('Erro de rede ao tentar criar o cartão.');
    }
  };

   if (loading) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>Carregando cartões...</div>;
  }
  
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        {/* BOTÃO DE ADICIONAR CARTÃO (Função handleAddCard) */}
        <button 
          onClick={handleAddCard} 
          style={{ 
            padding: '12px 25px', 
            fontSize: '1em', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          + Adicionar Novo Cartão de Produto
        </button>
      </div>

      <main className="product-grid"> 
        {/* 🚨 CORREÇÃO AQUI: MAPEAR APENAS UMA VEZ! */}
        {products.map(product => (
          // Você precisa passar o onUpdate para que o DELETE e o PUT funcionem
          <ProductCard 
            key={product.id} 
            product={product} 
            onUpdate={forceRefresh} 
            // O atributo className estava incorreto aqui
          />
        ))}
        {/* ❌ REMOVIDO: O segundo products.map() que estava aqui */}
      </main>
      
    </>
  );
}


export default App;