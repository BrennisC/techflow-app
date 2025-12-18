import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { auth, googleProvider } from "../shared/firebase";

export const useLoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            console.log("Login email-pass:", result.user);

            window.location.href = "/tienda";
        } catch (err: any) {
            setError("Error al iniciar sesión.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const loginWithGoogle = async () => {
        setError("");
        setLoading(true);

        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log("Login con Google:", result.user);

            const token = await result.user.getIdToken();
            console.log("Token de ID de usuario:", token);


            localStorage.setItem("auth-user-token",

                JSON.stringify({ user: result.user, email: result.user.email })
            );

            window.dispatchEvent(new CustomEvent("auth-changed", {
                detail: { user: result.user, email: result.user.email },
            }));

            // Redirigir
            window.location.href = "/tienda";


        } catch (err: any) {
            setError("Error al iniciar sesión con Google.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        email,
        password,
        handleChange,
        handleSubmit,
        loginWithGoogle,
        error,
        loading,
    };
};
