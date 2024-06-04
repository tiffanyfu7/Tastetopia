import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([{ role: "system", content: "Imagine you are a chat bot named Sue designed to assist users on a Recipe-finding platform, and a user is about to interact with you for the first time. From now on, you will be in conversation with the user." }]);

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
		<div>
			<h1>My Chatbot</h1>
			<div>
				{messages.map((msg, index) => (
					<div key={index}>
						{msg.role === "user" ? <h3>You: </h3> : <h3>Assistant: </h3>}
						<p className="message-content">{msg.content}</p>
					</div>
				))}
			</div>
			<form onSubmit={submitForm}>
				<label htmlFor="message">Enter message:</label>
				<input id="message" type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
				<button type="submit">Submit!</button>
			</form>
		</div>
	);
};

export default Chatbot;