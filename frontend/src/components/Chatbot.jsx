import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Chatbot.css";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  // const [userSent, setUserSent] = useState(false);
  const [ready, setReady] = useState(true);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const sendFirstMessage = async(message) => {
      let first = [];
      first.push({ role: 'user', content: message });
      const response = await axios.post('http://localhost:8000/openai/chat', {
        messages: first,
        model: 'gpt-3.5-turbo',
      });
      const assistantResponse = response.data;
      setMessages((prevMessage) => [...prevMessage, assistantResponse]);
      setReady(false);
    }
    if (ready) {
      sendFirstMessage("Imagine you are a chat bot named Sue designed to assist users on a Recipe-finding platform called 'Tastetopia' , and a user is about to interact with you for the first time. From now on, you will be in conversation with the user. Welcome them to Tastetopia");
    }
  }, [ready]);

  const sendMessage = async (message) => {
    const newMessage = { role: "user", content: message };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);

    const response = await axios.post("http://localhost:8000/openai/chat", {
      messages: updatedMessages,
      model: "gpt-3.5-turbo",
    });
    const assistantResponse = response.data;
    setMessages((prevMessage) => [...prevMessage, assistantResponse]);
  };

  const submitForm = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  };

  return (
    <div className="inboxBackground">
      <div className="messageArea">
        {messages.map((msg, index) => (
          <div key={index} className={(msg.role === "user") ? "yourMsg" : "botMsg"}>
            {msg.role === "user" ? <h3 className="sender">You: </h3> : <h3 className="sender">Sue: </h3>}
            <p className="message-content">{msg.content}</p>
          </div>
        ))}
      </div>
      
		<div className="bottomBar">
        <form onSubmit={submitForm}>
          <label htmlFor="message"></label>
          <input
            id="message"
			className="inputField"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Submit!</button>

        </form>
		</div>
    </div>
  );
};

export default Chatbot;
