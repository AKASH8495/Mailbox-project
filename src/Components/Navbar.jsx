import React from "react";

import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();
  return (
    <div className="bg-blue-500 shadow-lg h-14 items-center flex">
      <div className="flex justify-between items-center w-[1300px] mx-auto lg:px-0 px-4">
        <h1 className="text-slate-200 text-3xl font-bold">Mailbox</h1>


        <button className="bg-gray-300 text-black py-1 hover:bg-gray-200 duration-200 px-2 rounded-md" onClick={() => navigate('/login')}>
            Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
