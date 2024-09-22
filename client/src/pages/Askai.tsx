import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

interface ChatMessage {
  user: ChatUser
  createdAt: Date
  text: string
}

interface ChatUser {
  id: string
  firstName: string
}

const ChatBot: React.FC = () => {
  const muself: ChatUser = { id: '1', firstName: 'KISHORE' }
  const bot: ChatUser = { id: '2', firstName: 'Ask AI' }
  const [allMessages, setAllMessages] = useState<ChatMessage[]>([])
  const [typing, setTyping] = useState<ChatUser[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const ourUrl =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAMDOAjn9XsEMHS89ZRgv7bQwFBqnKd8Bo'
  const header = { 'Content-Type': 'application/json' }

  const getData = async (message: ChatMessage) => {
    setTyping([bot])
    setAllMessages((prevMessages) => [...prevMessages, message]) // Append message at the end

    const data = {
      contents: [
        {
          parts: [{ text: message.text }],
        },
      ],
    }

    try {
      const response = await axios.post(ourUrl, data, { headers: header })

      if (
        response.status === 200 &&
        response.data &&
        response.data.candidates &&
        response.data.candidates.length > 0
      ) {
        const botResponse = response.data.candidates[0].content.parts[0].text
        const botMessage: ChatMessage = {
          user: bot,
          createdAt: new Date(),
          text: botResponse,
        }
        setAllMessages((prevMessages) => [...prevMessages, botMessage]) // Append bot message at the end
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error)
    } finally {
      setTyping([])
    }
  }

  const handleSendMessage = (text: string) => {
    const userMessage: ChatMessage = {
      user: muself,
      createdAt: new Date(),
      text,
    }
    getData(userMessage)
  }

  // Scroll to the bottom of the chat when a new message arrives
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [allMessages])

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="w-full max-w-lg h-4/5 border border-gray-700 rounded-lg flex flex-col bg-gray-800 shadow-lg p-6 overflow-hidden">
        <div className="bg-gray-700 text-gray-100 py-4 text-center rounded-lg text-lg font-bold uppercase shadow-md">
          ChatBot 🤖
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto py-4 border-t border-b border-gray-700 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          <div className="flex flex-col gap-4">
            {allMessages.map((msg, index) => (
              <div
                key={index}
                className={`${
                  msg.user.id === muself.id
                    ? 'bg-teal-700 text-white self-end'
                    : 'bg-gray-700 text-white self-start'
                } p-4 rounded-lg shadow-md max-w-[75%]`}
              >
                <strong>{msg.user.firstName}: </strong>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          {typing.length > 0 && <div>Ask AI is typing...</div>}
        </div>
        <div className="mt-4 flex items-center bg-gray-700 p-3 rounded-lg border border-gray-600">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-4 bg-gray-800 text-gray-100 rounded-lg mr-3 focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-500"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && (e.target as HTMLInputElement).value) {
                handleSendMessage((e.target as HTMLInputElement).value)
                ;(e.target as HTMLInputElement).value = ''
              }
            }}
          />
          <button
            onClick={() =>
              handleSendMessage(
                (document.querySelector('input') as HTMLInputElement).value
              )
            }
            className="p-3 bg-teal-600 text-white rounded-lg hover:bg-teal-600 focus:ring-2 focus:ring-teal-400 focus:outline-none"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatBot
