import React, { useState } from 'react'
import Navbar from '../components/Navbar'

const ContactPage: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [queryType, setQueryType] = useState('')
  const [subQueryType, setSubQueryType] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', {
      name,
      email,
      message,
      queryType,
      subQueryType,
    })
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar
        toggleSignIn={() => {
          /* logic for sign-in modal toggle */
        }}
      />

      <div className="container mx-auto mt-10 px-4">
        <h2 className="text-4xl font-bold mb-8 text-center">Contact Us</h2>

        <div className="flex flex-col lg:flex-row justify-center items-start space-y-8 lg:space-y-0 lg:space-x-8">
          {/* Left Side - Quote and Contact Information */}
          <div className="lg:w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-3xl font-semibold mb-6">Let's Get In Touch.</h3>
            <p className="text-xl italic mb-6">
              "Stay secure, stay informed—reach out to our team for all your
              questions and unlock the full potential of our AI-powered
              platform!"
            </p>

            {/* Contact Information */}
            <div className="mt-8 space-y-4">
              <h2 className="text-3xl font-semibold mb-6">
                Connect with Our Team.
              </h2>
              <p className="text-lg">
                <strong>Email:</strong> studysenses24X7@gmail.com
              </p>
              <p className="text-lg">
                <strong>Phone:</strong> +91-6379020873 (India)
              </p>
            </div>
            <div className="mt-8 space-y-4">
              <h2 className="text-3xl font-semibold mb-6">Where to Find Us.</h2>
              <p className="text-lg">
                Camp Road
                <br />
                Selaiyur Junction
                <br />
                Chennai - 73
              </p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-6">
              Your Feedback Matters.
            </h2>
            <p>Fill out the form below, and we'll get back to you soon!</p>
            <br />
            <form onSubmit={handleSubmit}>
              

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-300 font-bold mb-2"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="queryType"
                  className="block text-gray-300 font-bold mb-2"
                >
                  Select Query:
                </label>
                <select
                  id="queryType"
                  value={queryType}
                  onChange={(e) => {
                    setQueryType(e.target.value)
                    setSubQueryType('')
                  }}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="">Select an option</option>
                  <option value="Technical">Technical Issue</option>
                  <option value="Billing">Billing Question</option>
                  <option value="General">General Inquiry</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {queryType !== 'Others' && queryType !== '' && (
                <div className="mb-4">
                  <label
                    htmlFor="subQueryType"
                    className="block text-gray-300 font-bold mb-2"
                  >
                    Specific Details:
                  </label>
                  <select
                    id="subQueryType"
                    value={subQueryType}
                    onChange={(e) => setSubQueryType(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    <option value="">Select detail</option>
                    {queryType === 'Technical' && (
                      <>
                        <option value="Glitch">Glitch</option>
                        <option value="Server Error">Server Error</option>
                        <option value="Feature Request">Feature Request</option>
                      </>
                    )}
                    {queryType === 'Billing' && (
                      <>
                        <option value="Payment Issue">Payment Issue</option>
                        <option value="Invoice Query">Invoice Query</option>
                        <option value="Refund Request">Refund Request</option>
                      </>
                    )}
                    {queryType === 'General' && (
                      <>
                        <option value="Feedback">Feedback</option>
                        <option value="Suggestion">Suggestion</option>
                        <option value="General Question">
                          General Question
                        </option>
                      </>
                    )}
                  </select>
                </div>
              )}

              {queryType === 'Others' && (
                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block text-gray-300 font-bold mb-2"
                  >
                    Type your query:
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    rows={5}
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-yellow-500 text-black py-2 rounded-lg shadow-md hover:bg-yellow-600"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
