import React, { useState, useRef, useEffect } from "react";
import { httpsCallable } from "firebase/functions";
import { functions, auth, db } from "../firebase";
import { collection, addDoc, query, orderBy, getDocs } from "firebase/firestore";

const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef(null);
  const chat = httpsCallable(functions, "chatbot");

  const user = auth.currentUser;

  // 🔥 LOAD CHAT HISTORY ON MOUNT
  useEffect(() => {
    if (!user) return;

    const loadMessages = async () => {
      const q = query(
        collection(db, "users", user.uid, "chats"),
        orderBy("createdAt", "asc")
      );

      const snapshot = await getDocs(q);
      const loadedMessages = snapshot.docs.map(doc => doc.data());

      setMessages(loadedMessages);
    };

    loadMessages();
  }, [user]);

  // 🔄 Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const saveMessage = async (message) => {
    await addDoc(
      collection(db, "users", user.uid, "chats"),
      {
        ...message,
        createdAt: new Date()
      }
    );
  };

  const sendMessage = async () => {
    if (!input.trim() || !user) return;

    const userMessage = {
      sender: "user",
      text: input
    };

    setMessages(prev => [...prev, userMessage]);
    await saveMessage(userMessage);

    setInput("");
    setIsTyping(true);

    try {
      const response = await chat({ message: input });

      setIsTyping(false);

      const botMessage = {
        sender: "bot",
        text: response.data.reply
      };

      setMessages(prev => [...prev, botMessage]);
      await saveMessage(botMessage);

    } catch (error) {
      console.error(error);
      setIsTyping(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Student Support Chat</h2>

      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={
              msg.sender === "user"
                ? styles.userContainer
                : styles.botContainer
            }
          >
            <div
              style={
                msg.sender === "user"
                  ? styles.userBubble
                  : styles.botBubble
              }
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={styles.botContainer}>
            <div style={styles.botBubble}>Typing...</div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div style={styles.inputContainer}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type message..."
          style={styles.input}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "700px",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    height: "90vh"
  },
  chatBox: {
    flex: 1,
    overflowY: "auto",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    marginBottom: "10px",
    backgroundColor: "#f9f9f9"
  },
  userContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "8px"
  },
  botContainer: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: "8px"
  },
  userBubble: {
    backgroundColor: "#4a90e2",
    color: "white",
    padding: "10px 15px",
    borderRadius: "20px",
    maxWidth: "70%"
  },
  botBubble: {
    backgroundColor: "#e5e5ea",
    padding: "10px 15px",
    borderRadius: "20px",
    maxWidth: "70%"
  },
  inputContainer: {
    display: "flex"
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "20px",
    border: "1px solid #ccc"
  },
  button: {
    marginLeft: "10px",
    padding: "10px 20px",
    borderRadius: "20px",
    border: "none",
    backgroundColor: "#4a90e2",
    color: "white",
    cursor: "pointer"
  }
};

export default Chat;