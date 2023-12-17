import React, { useState, useEffect } from "react";
import { currentUser } from "../Firebase/Firebase";
import { CgProfile } from "react-icons/cg";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsReply, BsReplyAll } from "react-icons/bs";
import { ImForward } from "react-icons/im";
import toast from "react-hot-toast";

const Inbox = () => {
  const [inboxData, setInboxData] = useState([]);
  const [inboxSelectMail, setInboxSelectMail] = useState(null);

  useEffect(() => {
    const fetchInboxData = async () => {
      try {
        const response = await fetch(
          "https://mailbox-client-project-default-rtdb.firebaseio.com/inboxData.json"
        );

        if (response.ok) {
          const data = await response.json();
          // Convert the received object into an array of emails
          const inboxArray = Object.keys(data)
            .map((key) => ({ id: key, ...data[key], isRead: false  }))
            .filter((mail) => mail.receiverAddress === currentUser.email); // Filter only the relevant emails
          setInboxData(inboxArray);
        } else {
          console.error("Failed to fetch inbox data");
        }
      } catch (error) {
        console.error("Error fetching inbox data:", error);
      }
    };

    fetchInboxData();
  }, []);

  const handleDeleteMail = async () => {
    if (!inboxSelectMail) {
      console.error("No selected mail to delete");
      return;
    }

    try {
      // Make a DELETE request to remove the selected mail
      const response = await fetch(
        `https://mailbox-client-project-default-rtdb.firebaseio.com/inboxData/${inboxSelectMail.id}.json`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("Mail deleted successfully");
        // Remove the deleted mail from the state
        setInboxData((prevData) =>
          prevData.filter((mail) => mail.id !== inboxSelectMail.id)
        );
        setInboxSelectMail(null); // Clear the selected mail
      } else {
        console.error("Failed to delete mail");
      }
    } catch (error) {
      console.error("Error deleting mail:", error);
    }
  };

  const handleMailClick = (mail) => {
    if (!mail.isRead) {
      // If the mail is unread, mark it as read
      const updatedInboxData = inboxData.map((m) =>
        m.id === mail.id ? { ...m, isRead: true } : m
      );
      setInboxData(updatedInboxData);
    }
    setInboxSelectMail(mail);
  };

  return (
    <div className="flex h-screen">
      {inboxData.length > 0 && (
        <div className="flex flex-col bg-slate-400 p-4 rounded-sm w-[280px] overflow-y-auto scrollbar">
          <ul className="grid grid-cols-1 gap-4">
            {inboxData.map((mail) => (
              <li key={mail.id}>
                <div
                  className="flex flex-row cursor-pointer rounded-lg p-4 bg-slate-300 shadow-md"
                  onClick={() => handleMailClick(mail)}
                >
                  {/* Circular element to represent unread status */}
                  {!mail.isRead && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-4 mt-2" />
                  )}
                  <div className="w-full">
                    <div className="mb-2 text-gray-800">
                      <strong>From:</strong> {mail.senderAddress}
                    </div>
                    <div className="mb-2 text-gray-800">
                      <strong>Sub</strong> {mail.subject}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex-grow p-3">
        {inboxSelectMail ? (
          <div className="bg-gray-200 rounded-md p-4 shadow-md w-[800px] h-[600px]">
            <div className="mb-4 flex">
              <div className="bg-gray-400 rounded-full w-12 h-12 flex items-center justify-center mr-4 ml-2 mt-2">
                <CgProfile className="text-5xl text-white" />
              </div>
              <div className="text-gray-600 mt-2 flex flex-col">
                <div className="flex items-center mb-1">
                  <span className="mr-1 font-semibold">From:</span>
                  <span className="truncate">
                    {inboxSelectMail.senderAddress}
                  </span>
                </div>
                <div className="mb-2 text-gray-600">
                  <span className="mr-1 font-semibold">To:</span>{currentUser.email}
                </div>
              </div>

              <div className="flex ml-[200px] leading-tight mt-1 gap-3 text-[14px] text-gray-600 items-center">
                <BsReply />
                Reply
                <BsReplyAll />
                Reply All
                <ImForward />
                Forward
                <div
                  onClick={handleDeleteMail}
                  className="cursor-pointer items-center flex duration-200 hover:text-red-600"
                >
                  <AiTwotoneDelete className="hover:text-red-600 text-[20px]" />
                  Delete
                </div>
              </div>
            </div>

            <div className="mb-5 mt-10 ml-4 text-[30px]">
              <span className="text-2xl font-semibold"></span>{" "}
              {inboxSelectMail.subject}
            </div>
            <div className="mb-4 mt-10 ml-5 w-[500px] text-[17px]">
              <span className="text-2xl font-semibold"></span>{" "}
              {inboxSelectMail.body}
            </div>
          </div>
        ) : (
          <p className="ml-[400px] mt-[250px] font-bold text-2xl">
           {inboxData.length > 0 ? '' : ' Your inbox is empty!'}
          </p>
        )}
      </div>
    </div>
  );
};

export default Inbox;
