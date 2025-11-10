import { useState } from "react";
import logo from "../assets/img/logo_techflow.png";
import { useCart } from "../hooks/useCart";
import CartModal from "./CartModal";
import "./NavApp.css";

export default function NavApp() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { totalItems } = useCart();

    const handleCartClick = () => {
        setIsCartOpen(true);
    };

    const handleCloseCart = () => {
        setIsCartOpen(false);
    };

    return (
        <>
            <header className="navbar">
                <div className="navbar-container">
                    {/* Sección Izquierda: Logo y Enlaces de Navegación */}
                    <div className="navbar-left">
                        <div className="logo-container">
                            <img src={logo} alt="TechFlow - Tienda de Tecnología" className="logo-img" />
                            <span className="logo-text">TechFlow</span>
                        </div>
                        <nav className="nav-links" aria-label="Navegación principal">
                            <a href="#destacados" className="nav-link">Destacados</a>
                            <a href="#categorias" className="nav-link">Categorías</a>
                            <a href="#ofertas" className="nav-link">Ofertas</a>
                            <a href="#novedades" className="nav-link">Novedades</a>
                        </nav>
                    </div>

                    {/* Sección Derecha: Búsqueda, Iconos y Perfil */}
                    <div className="navbar-right">
                        <div className="search-container">
                            <label htmlFor="search-input" className="visually-hidden">
                                Buscar productos
                            </label>
                            <svg
                                className="search-icon"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                aria-hidden="true"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                            </svg>
                            <input
                                id="search-input"
                                type="search"
                                placeholder="Buscar productos..."
                                className="search-input"
                                aria-label="Buscar productos"
                            />
                        </div>

                        <div className="icon-buttons">
                            <button className="icon-button" aria-label="Lista de deseos">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    aria-hidden="true"
                                >
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                                <span className="visually-hidden">Lista de deseos</span>
                            </button>
                            <button
                                className="icon-button cart-button"
                                aria-label={`Carrito de compras (${totalItems} artículos)`}
                                onClick={handleCartClick}
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    aria-hidden="true"
                                >
                                    <circle cx="9" cy="21" r="1"></circle>
                                    <circle cx="20" cy="21" r="1"></circle>
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                </svg>
                                <span className={`cart-badge ${totalItems > 0 ? 'has-items' : ''}`}>
                                    {totalItems}
                                </span>
                            </button>
                        </div>

                        <button className="user-profile" aria-label="Perfil de usuario">
                            <div className="profile-picture">
                                <svg
                                    width="40"
                                    height="40"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    aria-hidden="true"
                                >
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <span className="visually-hidden">Mi perfil</span>
                        </button>
                    </div>
                </div>
                <div className="navbar-divider"></div>
            </header>

            <CartModal isOpen={isCartOpen} onClose={handleCloseCart} />
        </>
    );
}