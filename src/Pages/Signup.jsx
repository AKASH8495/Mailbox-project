import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';

// Import auth from your Firebase configuration file
import { auth } from '../Firebase/Firebase'
import { Link,  useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';




const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [error, setError] = useState('');
 
  const navigate = useNavigate();

  

  const handleSignUp = async (e) => {
    e.preventDefault();

    if ( email === '' || password  === '' || confirmPassword  === '') {
      setError('All fields are mandatory');
      // toast.error('All fields are mandatory')
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth,email, password);
      console.log('User has successfully signed up');
      toast.success('Registration successfull')
      setError('');

      

    //   Redirect to home page after successfully signup
        navigate('home')

    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-lime-500 to-purple-600">
      <div className="bg-gray-300 p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">SignUp</h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
            <input
              className="border border-gray-500 rounded w-full py-2 px-3"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
            <input
              className="border border-gray-500 rounded w-full py-2 px-3"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
            <input
              className="border border-gray-500 rounded w-full py-2 px-3"
              type="password"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
          </div>
          <button className="bg-blue-600 text-white py-2 px-4 w-full rounded" type="submit">
            Sign up
          </button>
          {error && <p className="text-red-500 mt-2 mb-4">{error}</p>}

          <Link to='login'>
          <div className='mt-6'>Already have an account? <span className='text-blue-600 font-bold mt-4 text-[17px]'>Login</span> </div>
          </Link>
        </form>
       
      </div>

      
    </div>
  );
  
};

export default Signup;
