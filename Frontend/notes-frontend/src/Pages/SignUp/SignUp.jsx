import React, { useState } from "react";
import Navbar from "../../component/Navbar";
import PasswordInp from "../../component/Input/PasswordInp";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const SignUp = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const HandleForm = async (e) => {
        e.preventDefault();

        if (!name) {
            setError("Please enter your full name.");
            return;
        }
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!password) {
            setError("Please enter a password.");
            return;
        }

        setError("");

        try {
            const response = await axios.post("http://localhost:8082/app/create-account", {
                fullName: name,
                email,
                password
            });

            const { token, user } = response.data;

            // Store token and name in localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("fullName", user.fullName);

            navigate("/dashboard"); // Or wherever your app dashboard is

        } catch (err) {
            const msg = err?.response?.data?.message || "Something went wrong";
            setError(msg);
        }
    };

    return (
        <>
            <Navbar />

            <div className="flex items-center justify-center mt-28">
                <div className="w-96 border rounded bg-white px-7 py-10">
                    <form onSubmit={HandleForm}>
                        <h4 className="text-2xl mb-7">Create an Account</h4>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Full Name"
                            className="input-box"
                        />
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

                        <button type="submit" className="btn-primary">Sign Up</button>

                        <p className="text-sm text-center mt-4">
                            Already have an account?{" "}
                            <Link to="/" className="font-medium text-primary underline">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUp;
