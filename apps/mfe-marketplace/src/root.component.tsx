import { BrowserRouter } from "react-router-dom";
import Marketplace from './components/Marketplace';
import './services/cartService'; // Initialize cart service

interface RootProps {
  name?: string;
}

export default function Root(props: RootProps) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <BrowserRouter basename="tienda">
        <Marketplace />
      </BrowserRouter>
    </div>
  );
}
