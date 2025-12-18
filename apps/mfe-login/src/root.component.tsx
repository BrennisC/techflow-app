import { BrowserRouter } from "react-router-dom";
import Login from "./components/LoginForm";
export default function Root(props) {
  return (
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
}
