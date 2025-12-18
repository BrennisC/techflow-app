import { useEffect, useState } from "react";
import logo from "../assets/img/logo_techflow.png";
import { useCart } from "../hooks/useCart";
import { useSearch } from "../hooks/useSearch";
import CartModal from "./CartModal";
import "./NavApp.css";

interface UserData {
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string;
    emailVerified: boolean;
    token?: string;
}

export default function NavApp() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const { totalItems } = useCart();
    const { searchTerm, handleSearchChange, clearSearch } = useSearch();

    const handleCartClick = () => {
        setIsCartOpen(true);
    };

    const handleCloseCart = () => {
        setIsCartOpen(false);
    };

    const handleLoginClick = () => {
        navigateTo("/login")
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.dispatchEvent(new CustomEvent("auth-changed", {
            detail: { email: null, uid: null, token: null, user: null }
        }));
        window.history.pushState({}, "", "/tienda");
    };

    const navigateTo = (path: string) => {
        window.history.pushState({}, "", path);
        // Dispara el evento de popstate para que single-spa se entere del cambio
        window.dispatchEvent(new PopStateEvent("popstate"));
    };

    // Recuperar usuario del localStorage al montar
    useEffect(() => {
        try {
            const savedToken = localStorage.getItem("auth-user-token");
            const savedTokenParsed = savedToken ? JSON.parse(savedToken) : null;
            console.log("Token parseado:", savedTokenParsed);
            const user = savedTokenParsed["user"];
            console.log("Usuario recuperado del token:", user);
            const savedUser = localStorage.getItem("user");

            if (user) {
                // Extrae los datos correctamente del objeto de Firebase
                const userData: UserData = {
                    uid: user.uid || "",
                    email: user.email || "",
                    displayName: user.displayName || "Usuario",
                    photoURL: user.photoURL,
                    emailVerified: user.emailVerified || false,
                    token: savedToken,
                };

                if (userData.uid && userData.email) {
                    setUser(userData);
                }
            }
        } catch (error) {
            console.error("Error recuperando usuario del localStorage:", error);
            localStorage.removeItem("user");
        }
        setLoading(false);
    }, []);

    // Escuchar eventos de autenticación desde otras micro frontends
    useEffect(() => {
        const handler = (e: CustomEvent) => {
            console.log("Auth event recibido en navbar:", e.detail);

            const { email, uid, token, user: userData } = e.detail;

            if (email && uid && token) {
                const userToSave: UserData = {
                    uid,
                    email,
                    displayName: userData?.displayName || "Usuario",
                    photoURL: userData?.photoURL,
                    emailVerified: userData?.emailVerified || false,
                    token,
                };

                setUser(userToSave);

                // Guardar en localStorage para persistencia
                localStorage.setItem("user", JSON.stringify(userToSave));
                localStorage.setItem("token", token);

                // Redirige a dashboard después de login exitoso
                setTimeout(() => {
                    window.history.pushState({}, "", "/dashboard");
                }, 300);
            } else {
                setUser(null);
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        };

        window.addEventListener("auth-changed", handler as EventListener);
        return () => window.removeEventListener("auth-changed", handler as EventListener);
    }, []);

    const getInitials = (name?: string) => {
        if (!name) return "U";
        return name
            .split(" ")
            .map(word => word[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);
    };

    return (
        <>
            <header className="navbar">
                <div className="navbar-container">
                    {/* Sección Izquierda: Logo y Enlaces de Navegación */}
                    <div className="navbar-left">
                        <div
                            className="logo-container"
                            onClick={() => window.history.pushState({}, "", "/")}
                            style={{ cursor: "pointer" }}
                        >
                            <img src={logo} alt="TechFlow - Tienda de Tecnología" className="logo-img" />
                            <span className="logo-text">TechFlow</span>
                        </div>
                        <nav className="nav-links" aria-label="Navegación principal">
                            <a href="/tienda" className="nav-link" onClick={(e) => { e.preventDefault(); window.history.pushState({}, "", "/tienda"); }}>Destacados</a>
                            <a href="/ofertas" className="nav-link" onClick={(e) => { e.preventDefault(); window.history.pushState({}, "", "/ofertas"); }}>Ofertas</a>
                            <a href="/novedades" className="nav-link" onClick={(e) => { e.preventDefault(); window.history.pushState({}, "", "/novedades"); }}>Novedades</a>
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
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            {searchTerm && (
                                <button
                                    className="search-clear-btn"
                                    onClick={clearSearch}
                                    aria-label="Limpiar búsqueda"
                                    type="button"
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            )}
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

                        {/* Mostrar botón de Login o perfil del usuario */}
                        {!loading && (
                            user ? (
                                <div className="user-menu">
                                    <button className="user-profile" aria-label="Perfil de usuario">
                                        <div className="profile-picture">
                                            {user.photoURL ? (
                                                <img
                                                    src={user.photoURL}
                                                    alt={user.displayName}
                                                    className="profile-image"
                                                />
                                            ) : (
                                                <span className="profile-initials">
                                                    {getInitials(user.displayName)}
                                                </span>
                                            )}
                                        </div>
                                        <span className="visually-hidden">Mi perfil</span>
                                    </button>
                                    <div className="user-dropdown">
                                        <div className="user-info">
                                            <p className="user-name">{user.displayName}</p>
                                            <p className="user-email">{user.email}</p>
                                            {user.emailVerified && (
                                                <span className="verified-badge">✓ Verificado</span>
                                            )}
                                        </div>
                                        <div className="dropdown-divider"></div>
                                        <button
                                            className="dropdown-link"
                                            onClick={() => window.history.pushState({}, "", "/profile")}
                                        >
                                            Mi Perfil
                                        </button>
                                        <button
                                            className="dropdown-link"
                                            onClick={() => window.history.pushState({}, "", "/orders")}
                                        >
                                            Mis Pedidos
                                        </button>
                                        <button
                                            className="dropdown-link"
                                            onClick={() => window.history.pushState({}, "", "/settings")}
                                        >
                                            Configuración
                                        </button>
                                        <div className="dropdown-divider"></div>
                                        <button className="logout-btn" onClick={handleLogout}>
                                            Cerrar sesión
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    className="login-button"
                                    onClick={handleLoginClick}
                                    aria-label="Iniciar sesión"
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
                                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                                        <polyline points="10 17 15 12 10 7"></polyline>
                                        <line x1="15" y1="12" x2="3" y2="12"></line>
                                    </svg>
                                    Iniciar sesión
                                </button>
                            )
                        )}
                    </div>
                </div>
                <div className="navbar-divider"></div>
            </header>

            <CartModal isOpen={isCartOpen} onClose={handleCloseCart} />
        </>
    );
}