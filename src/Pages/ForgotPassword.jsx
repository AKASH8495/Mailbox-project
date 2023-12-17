import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

   const handleForgotPassword = ((e) => {
    e.preventDefault();
    toast.success('Email set successfully')

    //   navigate('/login');
   })

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-gray-300 p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
        <form onSubmit={handleForgotPassword}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
            <input
              className="border border-gray-500 rounded w-full py-2 px-3"
              type="email"
              value={email}
              required
              placeholder='Enter Register Email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        
          <button className="bg-blue-600 text-white py-2 px-4 w-full mt-5 rounded" type="submit">
            Reset
          </button>
          {/* Back to login button */}
        <div className="mt-4 text-center">
          <button className="text-blue-600 underline" onClick={() => navigate('/login')}>
            Back to Login
          </button>
        </div>
         
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword