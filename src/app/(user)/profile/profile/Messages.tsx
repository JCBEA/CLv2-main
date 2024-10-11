"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getMessageId, getSession, getUserName } from "@/services/authservice";
import { jwtVerify } from "jose";


const JWT_SECRET = process.env.JWT_SECRET || 'your-secret';
const messageId = getMessageId();
interface Message {
  id: string;
  first_name: string;
  created_at: string;
  message: string;
  for: string;
}

interface UserDetail {
  detailsid: string;
  first_name: string;
}

export const Messages = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [userDetails, setUserDetails] = useState<UserDetail[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState<string>(""); // State for new message input

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch messages and user details
  useEffect(() => {
    const fetchMessages = async () => {
      const token = getSession();
      if (token) {
        try {
          const messageId = getMessageId();
          const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
          const userIdFromToken = payload.id as string;
          const userNameFromToken = payload.username as string;
          setUserId(userIdFromToken);
  
          const response = await fetch('/api/chat', {
            method: 'GET',
            headers: {
              'Authorization': userIdFromToken,
              'Append': userNameFromToken,
            },
          });
  
          if (!response.ok) {
            throw new Error('Failed to fetch messages');
          }
  
          const data = await response.json();
          setMessages(data.messages || []);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setError('No session token found');
      }
    };
  
    fetchMessages();
  }, []);
  

  // Function to handle sending a new message
  const handleSendMessage = async () => {
    const token = getSession();
    if (!newMessage || !token) return; // Prevent sending empty messages
    try {
      // Verify JWT token to extract user details
      const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
      const userIdFromToken = payload.id as string;
      const getUser = getUserName();
      const messageId = getMessageId();
      // Prepare the message data
      const messageData = {
        message: newMessage,
        forId: messageId, // Assuming messageId is the recipient or thread ID
        created_at: new Date().toISOString(),
        first_name: getUser
      };

      // Send the message data to the server
      const response = await fetch("/api/chat", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": userIdFromToken, // Passing user ID in the Authorization header
        },
        body: JSON.stringify(messageData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      // After successfully sending the message, update the chatMessages and reset input
      const sentMessage = await response.json();
      setChatMessages((prevMessages) => [...prevMessages, sentMessage]);
      setNewMessage(""); // Clear the message input after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };


  const handleUserClick = async (userId: string, messageId: string, msgFor:string) => {
    localStorage.removeItem("user");
    setLoading(true);
    setChatMessages([]); // Clear previous chat messages before loading new ones
    const token = getSession();
    if (!token) return;
    try{
      const messageId = getMessageId();
      const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
      const userIdFromToken = payload.id as string;
      const userNameFromToken = payload.username as string;
      setUserId(userIdFromToken);

      const response = await fetch('/api/chat', {
        method: 'GET',
        headers: {
          'Authorization': userIdFromToken,
          'Append': userNameFromToken,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      setMessages(data.messages || []);
      setUserDetails(data.userDetails || []);
          // Store first_name from userDetails in localStorage
          if (data.userDetails && Array.isArray(data.userDetails)) {
            data.userDetails.forEach((userDetail: UserDetail) => {
              const first_name = userDetail.first_name
              localStorage.setItem("user", first_name);
            });
          }
        }catch (err: any) {
            setError(err.message);
          }
    try {
      localStorage.setItem("messageId", messageId);
      const getMessageToken = getMessageId();
      console.log("Token ID"+getMessageToken);
      // Get messages for the selected user
      const someoneMessage = messages.filter((msg) => msg.id === messageId);
      // Get messages for the current user
      const yourMessage = messages.filter((msg) => (msg.id === userId && msg.for ==messageId));

      // Combine both messages
      const combinedMessages = [...someoneMessage, ...yourMessage];

      // Sort combined messages from past to latest based on created_at
      const sortedMessages = combinedMessages.sort((a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );

      // Set the sorted messages to state
      setChatMessages(sortedMessages);
      // Open chat window after setting messages
      setIsChatOpen(true);
    } catch (err) {
      console.error("Error fetching chat messages:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredMessages = messages.filter((message) => message.id !== userId);

  const latestMessages = filteredMessages.reduce<Record<string, Message>>((acc, message) => {
    if (!acc[message.id] || new Date(message.created_at) > new Date(acc[message.id].created_at)) {
      acc[message.id] = message; // Update to latest message
    }
    return acc;
  }, {});

  // Convert the latestMessages object back to an array
  const latestMessagesArray = Object.values(latestMessages);

  return (
    <div className="w-full md:px-6 md:py-4 bg-shade-1 rounded-b-xl">
      <div className="w-full flex flex-col gap-6 p-4 rounded-lg">
        {/* Search Bar */}
        <div className="w-full flex items-center gap-4 p-2 px-4 rounded-full border border-primary-2">
          <Icon icon="lets-icons:search-light" width="35" height="35" />
          <input
            className="w-full bg-transparent placeholder:text-secondary-2 outline-none"
            type="text"
            placeholder="Search Direct Messages"
          />
        </div>

        {/* Main Content */}
        <div className="w-full h-[70dvh] flex bg-primary-1 text-primary-2 rounded-xl overflow-hidden">
          {/* Messages List */}
          {(!isChatOpen || !isMobile) && (
            <div className="w-full h-full lg:max-w-sm p-4 border border-primary-3 rounded-l-xl overflow-y-auto custom-scrollbar">
              {loading ? (
                <p>Loading messages...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : (
                <div className="w-full flex flex-col gap-4">
                  {latestMessagesArray.map((message) => (
                    <div
                      key={`${message.id}-${message.created_at}`} // Ensure uniqueness
                      className="w-full flex items-center gap-2 cursor-pointer"
                      onClick={() => userId && handleUserClick(userId, message.id, message.for)} // Pass both IDs
                    >
                      <div className="w-full flex flex-col">
                        <div className="w-full flex justify-between items-center">
                          <p className="text-sm font-semibold">{message.first_name}</p>
                          <p className="text-xs font-semibold opacity-80">
                            {new Date(message.created_at).toLocaleString()} {/* Formatting the date */}
                          </p>
                        </div>
                        <p className={`text-base font-bold ${message.message.length > 10 ? "line-clamp-1" : ""}`}>
                          {message.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Chat Window */}
          {(!isMobile || isChatOpen) && (
            <div className="w-full h-full border border-primary-3 rounded-r-xl flex flex-col overflow-y-auto custom-scrollbar relative">
              {isMobile && (
                <button
                  className="p-2 m-2 text-secondary-1 absolute -top-3 -right-3"
                  onClick={() => setIsChatOpen(false)}
                >
                  <Icon icon="eva:arrow-back-outline" width="35" height="35" />
                </button>
              )}

              <div className="w-full h-full">
                {loading ? (
                  <p>Loading messages...</p> // Replace with a spinner component if needed
                ) : (
                  chatMessages.length > 0 ? (
                    chatMessages.map((msg) => (
                      <div key={msg.id} className="p-2">
                        <p><strong>{msg.first_name || 'Unknown'}:</strong> {msg.message}</p>
                        <p className="text-xs">{new Date(msg.created_at).toLocaleString()}</p>
                      </div>
                    ))
                  ) : (
                    <p>No messages to display.</p>
                  )
                )}
              </div>

              {/* Message Input */}
              <div className="w-full h-fit p-4">
                <div className="w-full flex gap-2 justify-between items-center text-primary-2 bg-shade-8 rounded-full px-4">
                  <input
                    className="w-full p-3 outline-none ring-0 placeholder:text-primary-2 bg-transparent"
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                  />

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-primary-2 font-bold"
                    onClick={handleSendMessage}
                  >
                    <Icon

                      className="rotate-[-36deg] cursor-pointer -mt-1"
                      type="submit"
                      icon="proicons:send"
                      width="35"
                      height="35"
                    />
                  </motion.button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
