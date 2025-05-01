import React, { useState, useEffect } from "react";
import Profile from "./Profile";
import Searchbar from "./SearchBar/Searchbar";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const onLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("fullName");
        navigate("/");
    };

    const handleSearch = () => {
        // implement search logic
    };

    const onClearSearch = () => {
        setSearchQuery("");
    };

    return (
        <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
            <h2 className="text-xl font-medium text-black py-2">Notes</h2>

            {isLoggedIn && (
                <>
                    <Searchbar
                        value={searchQuery}
                        onChange={({ target }) => setSearchQuery(target.value)}
                        handleSearch={handleSearch}
                        onClearSearch={onClearSearch}
                    />
                    <Profile onLogout={onLogout} />
                </>
            )}
        </div>
    );
};

export default Navbar;
