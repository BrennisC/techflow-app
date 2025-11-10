import ProductList from './components/ProductList';
import './services/cartService'; // Initialize cart service

interface RootProps {
  name?: string;
}

export default function Root(props: RootProps) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <ProductList />
    </div>
  );
}
