import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsReply } from "react-icons/bs";
import { BsReplyAll } from "react-icons/bs";
import { ImForward } from "react-icons/im";
import { HiOutlineMail } from "react-icons/hi";
import toast from "react-hot-toast";
import { currentUser } from "../Firebase/Firebase";

const SentMail = () => {
  const [sentMailData, setSentMailData] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);

  useEffect(() => {
    const fetchSentMailData = async () => {
      try {
        const response = await fetch(
          "https://mailbox-client-project-default-rtdb.firebaseio.com/sentMailData.json"
        );

        if (response.ok) {
          const data = await response.json();
          // Convert the received object into an array of sent mails
          const sentMailArray = Object.keys(data)
            .map((key) => ({ id: key, ...data[key] }))
            .filter((mail) => mail.senderAddress === currentUser.email); // Filter only the sent mails of the currently logged-in user
          setSentMailData(sentMailArray);
        }  else {
          console.error("Failed to fetch sent mail data");
        }
      } catch (error) {
        console.error("Error fetching sent mail data:", error);
      }
    };

    fetchSentMailData();
  }, []);

  const handleViewDetails = (mail) => {
    setSelectedMail(mail);
  };


  

  const handleDeleteMail = async () => {
    if (!selectedMail) {
      console.error("No selected mail to delete");
      return;
    }

    try {
      // Make a DELETE request to remove the selected mail
      const response = await fetch(
        `https://mailbox-client-project-default-rtdb.firebaseio.com/sentMailData/${selectedMail.id}.json`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("Mail deleted successfully");
        // Remove the deleted mail from the state

        setSentMailData((prevData) =>
          prevData.filter((mail) => mail.id !== selectedMail.id)
        );
        setSelectedMail(null); // Clear the selected mail
      } else {
        console.error("Failed to delete mail");
      }
    } catch (error) {
      console.error("Error deleting mail:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {sentMailData.length > 0 && (
        <div className=" flex flex-col  bg-slate-400 p-4 rounded-sm w-[280px] overflow-y-auto scrollbar ">
          <ul className="grid grid-cols-1 gap-4">
            {sentMailData.map((mail) => (
              <li key={mail.id}>
                <div
                  className={`flex flex-row bg-slate-300 cursor-pointer rounded-lg p-4 shadow-md ${
                    selectedMail?.id === mail.id ? "bg-blue-200" : ""
                  }`}
                  onClick={() => handleViewDetails(mail)}
                >
                  <div className="rounded-full w-12 h-12 flex items-center justify-center mr-3  mt-2">
                    <HiOutlineMail className="text-5xl text-blue-600" />
                  </div>
                  <div>
                    <div className="mb-2">
                      <strong>To:</strong> {mail.receiverAddress}
                    </div>
                    <div className="mb-2">
                      <strong>Sub:</strong> {mail.subject}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex-grow p-3">
        {selectedMail ? (
          <div className="bg-gray-200 rounded-md p-4 shadow-md w-[800px] h-[600px]">
            <div className="mb-4 flex">
              <div className="bg-gray-400 rounded-full w-12 h-12 flex items-center justify-center mr-4 ml-2 mt-2">
                <CgProfile className="text-5xl text-white" />
              </div>
              <div className="text-gray-600 mt-2 flex flex-col">
                <div className="flex items-center mb-1">
                  <span className="mr-1 font-semibold">To:</span>
                  <span className="truncate">{selectedMail.receiverAddress}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-1 font-semibold">From:</span>
                  <span className="truncate">
                  {currentUser.email}
                  </span>
                </div>
              </div>

              <div className=" flex ml-[200px] leading-tight mt-1 gap-3 text-[14px] text-gray-600 items-center">
                <BsReply />
                Reply
                <BsReplyAll />
                Reply All
                <ImForward />
                Forward
                <div
                  onClick={() => handleDeleteMail(selectedMail.id)}
                  className=" cursor-pointer items-center flex duration-200 hover:text-red-600"
                >
                  <AiTwotoneDelete className="hover:text-red-600 text-[20px]" />
                  Delete
                </div>
              </div>
            </div>

            <div className="mb-5 mt-10 ml-4 text-[30px]">
              <span className="text-2xl font-semibold"></span>{" "}
              {selectedMail.subject}
            </div>
            <div className="mb-4 mt-10 ml-5 w-[500px] text-[17px]">
              <span className="text-2xl font-semibold"></span>{" "}
              {selectedMail.body}
            </div>
          </div>
        ) : (
          <p className=" ml-[400px] mt-[250px] font-bold text-2xl">
            {sentMailData.length > 0 ? "" : "No emails sent yet."}
          </p>
        )}
      </div>
    </div>
  );
};

export default SentMail;
