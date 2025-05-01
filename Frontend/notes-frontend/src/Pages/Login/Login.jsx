import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../component/Navbar";
import PasswordInp from "../../component/Input/PasswordInp";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // for redirection

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const HandleForm = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!password) {
            setError("Please enter a password");
            return;
        }

        setError("");

        try {
            const res = await fetch("http://localhost:8082/app/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok || data.error) {
                setError(data.message || "Login failed");
                return;
            }

            // ✅ Save JWT and email to localStorage
            localStorage.setItem("token", data.accessToken);
            localStorage.setItem("email", data.email);
            localStorage.setItem("fullName", data.fullName);

            // ✅ Redirect to dashboard or notes page
            navigate("/dashboard"); // make sure this route exists

        } catch (err) {
            console.error("Login error:", err);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <>
            <Navbar />

            <div className="flex items-center justify-center mt-28">
                <div className="w-96 border rounded bg-white px-7 py-10">
                    <form onSubmit={HandleForm}>
                        <h4 className="text-2xl mb-7">Login</h4>

                        <input 
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="input-box"
                        />

                        <PasswordInp 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {error && <p className="text-red-500 text-sm pb-1">{error}</p>}

                        <button 
                            type="submit"
                            className="btn-primary"
                        >
                            Login
                        </button>

                        <p className="text-sm text-center mt-4">
                            Not registered yet?{" "}
                            <Link to="/signup" className="font-medium text-primary underline">
                                Create an Account
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
