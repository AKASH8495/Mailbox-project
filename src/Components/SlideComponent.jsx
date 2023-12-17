import React, {  useState } from "react";
// import { CgProfile } from "react-icons/cg";
import { HiInboxArrowDown } from "react-icons/hi2";
import { AiTwotoneDelete } from "react-icons/ai";
import { RiSpam2Line } from "react-icons/ri";
import { MdOutlineDrafts } from "react-icons/md";
import { LuSendHorizonal } from "react-icons/lu";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import { currentUser } from "../Firebase/Firebase";
import profileImg from "../user.png";
import { IoSendOutline } from "react-icons/io5";


Modal.setAppElement("#root");

const SlideComponent = ({ onSelectOption }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const [receiverAddress, setReceiverAddress] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  



  const openComposeModal = () => {
    setModalOpen(true);
  };

  const closeComposeModal = () => {
    setModalOpen(false);
  };

  const handleNavigation = (option) => {
    onSelectOption(option);
    
  };

  //   Make a POST request to store data in Firebase
  const handleMessage = async (e) => {
    e.preventDefault();

    if (receiverAddress === "" || subject === "" || body === "") {
      setError("All fields are mandatory");
      toast.error("all fields are mandatory");
      return;
    }

    // Check if the sent's email is the same as the current user's email
    if (receiverAddress.toLowerCase() === currentUser.email.toLowerCase()) {
      setError("You cannot send an email to yourself");
      toast.error("You cannot send an email to yourself");
      return;
    }

    try {
      // Make a POST request to store data in Firebase for sent mail
      const sentMailResponse = await fetch(
        "https://mailbox-client-project-default-rtdb.firebaseio.com/sentMailData.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderAddress: currentUser.email,
            receiverAddress,
            subject,
            body,
          }),
        }
      );
  
      // Make a POST request to store data in Firebase for inbox mail
      const inboxMailResponse = await fetch(
        "https://mailbox-client-project-default-rtdb.firebaseio.com/inboxData.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderAddress: currentUser.email,
            receiverAddress,
            subject,
            body,
           
          }),
        }
      );
  
      // Check if both requests were successful before showing success message
      if (sentMailResponse.ok && inboxMailResponse.ok) {
        toast.success("Mail sent successfully!");
        // Clear the input fields by resetting the state
        setReceiverAddress("");
        setSubject("");
        setBody("");
        
      } else {
        toast.error("Failed to send mail. Please try again.");
      }
    } catch (error) {
      console.error("Error sending mail:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex-col  bg-slate-300 w-[260px] h-screen justify-start rounded-sm  items-center ">
      <div className=" p-4 flex flex-row items-center justify-between mt-7">
        <div className="flex items-center">
          <div className="bg-gray-400 rounded-full w-12 h-12 flex items-center justify-center mr-8">
            <img src={profileImg} alt="profileImg" />
          </div>
          <div className="flex flex-col -ml-4 max-w-[200px] overflow-hidden">
            <h1>Hi,</h1>
            {/* here name should change dynamic */}
            <p className="text-gray-600 text-[17px] font-semibold overflow-ellipsis overflow-hidden">
              {currentUser ? currentUser.email : "Name"}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-500 hover:bg-blue-600 duration-200 text-white rounded-full mt-3 py-2 px-4 text-center w-[60%] flex items-center justify-center ml-4 mb-10 ">
        <button onClick={openComposeModal}>compose mail</button>
      </div>

      <div
        onClick={() => handleNavigation("inbox")}
        className="flex mb-4 items-center hover:text-blue-600 cursor-pointer duration-300 gap-3 ml-4 mt-5 text-2xl text-gray-600 font-semibold "
      >
        <HiInboxArrowDown className="text-2xl" /> Inbox
        
      </div>

      <div className="w-full px-4 border border-gray-200"></div>

      <div
        onClick={() => handleNavigation("sentmail")}
        className="flex mb-4 items-center hover:text-blue-600 cursor-pointer duration-300 gap-3 ml-4 mt-5 text-2xl text-gray-600 font-semibold "
      >
        <LuSendHorizonal className="text-2xl" /> sent mail
      </div>
      <div className="w-full border border-gray-200"></div>

      <div
        onClick={() => handleNavigation("drafts")}
        className="flex mb-4 items-center hover:text-blue-600 cursor-pointer duration-300 gap-3 ml-4 mt-5 text-2xl text-gray-600 font-semibold "
      >
        <MdOutlineDrafts className="text-2xl" /> drafts
      </div>
      <div className="w-full border border-gray-200"></div>

      <div
        onClick={() => handleNavigation("spam")}
        className="flex mb-4 items-center hover:text-blue-600 cursor-pointer duration-300 gap-3 ml-4 mt-5 text-2xl text-gray-600 font-semibold "
      >
        <RiSpam2Line className="text-2xl" /> spam
      </div>
      <div className="w-full border border-gray-200"></div>

      <div
        onClick={() => handleNavigation("deleted")}
        className="flex mb-4 items-center hover:text-blue-600 cursor-pointer duration-300 gap-3 ml-4 mt-5 text-2xl text-gray-600 font-semibold "
      >
        <AiTwotoneDelete className="text-2xl" /> deleted
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeComposeModal}
        contentLabel="Compose Mail"
        className="Modal"
        overlayClassName=""
        shouldCloseOnOverlayClick={true}
        style={{
          content: {
            width: "900px",
            height: "500px",
            margin: "auto",
            marginTop: "20px",
            backgroundColor: "lightgray",
            borderRadius: "8px",
          },
        }}
      >
        {/* Close icon */}
        <div
          className="absolute top-8 translate-x-[850px] cursor-pointer"
          onClick={closeComposeModal}
        >
          <AiOutlineClose size={24} color="#333" />
        </div>

        <div className="flex flex-col items-center mx-auto">
          <h1 className="text-2xl font-bold mb-4 mt-7">Compose Mail</h1>
          <input
            type="email"
            placeholder="Recipients"
            value={receiverAddress}
            required
            onChange={(e) => setReceiverAddress(e.target.value)}
            className="border border-blue-500 rounded-md p-2 mb-8 w-[90%]"
          />

          <input
            type="text"
            placeholder="Subject"
            value={subject}
            required
            onChange={(e) => setSubject(e.target.value)}
            className="border border-blue-500 rounded-md p-2 mb-8 w-[90%]"
          />
          <textarea
            placeholder="Your message..."
            value={body}
            cols={7}
            rows={4}
            onChange={(e) => setBody(e.target.value)}
            className="border border-blue-500 rounded-md p-2 mb-8 w-[90%]"
          ></textarea>

          <div className="flex items-center">
        
            <button
              className="bg-gradient-to-br from-green-600 to-blue-600 shadow-md text-white rounded-full py-2 px-6 flex items-center"
              onClick={handleMessage}
            >
              <IoSendOutline className="mr-2" />
              
              <span>Send</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SlideComponent;
