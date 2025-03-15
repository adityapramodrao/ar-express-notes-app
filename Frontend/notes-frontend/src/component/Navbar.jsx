import React, { useState } from "react";
import Profile from "./Profile";
import Searchbar from "./SearchBar/Searchbar";
import { useNavigate } from "react-router-dom"

export const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const onLogout = () => {
        navigate("/");
    }

    const handleSearch = () => {};

    const onClearSearch = () =>{
        setSearchQuery("");
    }
    return (
        <>
           <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
               <h2 className="text-xl font-medium text-black py-2">Notes</h2>

               <Searchbar
                   value={searchQuery}
                   onChange={({target}) => {
                    setSearchQuery(target.value)
                   }} 
                   handleSearch={handleSearch}
                   onClearSearch={onClearSearch}
                   
                />
               <Profile onLogout={onLogout}/>
           </div>
        </>
    )
}

export default Navbar;