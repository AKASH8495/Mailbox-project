import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import SlideComponent from '../Components/SlideComponent';
import Inbox from '../Components/Inbox';
import SentMail from '../Components/SentMail';
import Drafts from '../Components/Drafts';
import Spam from '../Components/Spam';
import Deleted from '../Components/Deleted';
import { getDatabase, ref, onValue } from 'firebase/database'

const Home = () => {
  const [selectedOption, setSelectedOption] = useState('home');
  const [userEmail, setUserEmail] = useState('');

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const database = getDatabase();
        const userRef = ref(database, 'users/currentUserId/email'); 
        onValue(userRef, (snapshot) => {
          const email = snapshot.val();
          setUserEmail(email);
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);


  return (
    <div className=''>
      <Navbar />
      <div className='flex'>
        <SlideComponent onSelectOption={handleSelectOption} userEmail={userEmail}/>
        <div className=''>
          {selectedOption === 'inbox' && <Inbox />}
          {selectedOption === 'sentmail' && <SentMail />}
          {selectedOption === 'drafts' && <Drafts />}
          {selectedOption === 'spam' && <Spam />}
          {selectedOption === 'deleted' && <Deleted />}
        </div>
      </div>
     
    </div>
  );
};

export default Home;
