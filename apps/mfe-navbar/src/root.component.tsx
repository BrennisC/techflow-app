import { BrowserRouter } from "react-router-dom";
import NavApp from "./components/NavApp";
import './services/cartService'; // Initialize cart service

interface RootProps {
  name?: string;
}

export default function Root(props: RootProps) {
  return (
    <BrowserRouter>
      <NavApp />
    </BrowserRouter>
  )
}
