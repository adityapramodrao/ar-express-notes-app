import React, { useState } from "react";
import Navbar from "../../component/Navbar";
import { Link } from "react-router-dom";
import PasswordInp from "../../component/Input/PasswordInp";

export const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    

    const HandleForm = (e) => {
       e.preventDefault();

       if(!validateEmail(email)){
        setError("please enter a valid email address.");
        return;
       }
       if(!password){
        setError("please enter a password");
        return;
       }

       setError("")
    }
    return (
        <>
            <Navbar />

            {/* Login card */}

            <div className="flex items-center justify-center mt-28">
                <div className="w-96 border rounded bg-white px-7 py-10">
                    <form onSubmit={HandleForm}>
                        <h4 className="text-2xl mb-7">Login</h4>
                        <input 
                           type="text" 
                           value={email} 
                           onChange={(e) => setEmail(e.target.value)} 
                           placeholder="Email" 
                           className="input-box" />
                        <PasswordInp 
                           value={password} 
                           onChange={(e) => setPassword(e.target.value)} />
                        {error && <p className="text-red-500 text-sm pb-1">{error}</p>}
                        <button 
                           type="submit" 
                           className="btn-primary">Login</button>

                        <p className="text-sm text-center mt-4">
                            Not registered yet? {" "}
                            <Link to="/signup" className="font-medium text-primary underline">
                                Create an Account
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;