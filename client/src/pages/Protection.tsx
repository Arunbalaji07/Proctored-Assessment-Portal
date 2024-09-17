import React, { useState } from 'react'
import axios from 'axios'

const Protection: React.FC = () => {
  const [status, setStatus] = useState('AI Protection: OFF')
  const [isRunning, setIsRunning] = useState(false)

  const startProtection = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/start_protection'
      )
      setStatus('AI Protection: ON')
      setIsRunning(true)
    } catch (error) {
      console.error('Error starting protection:', error)
    }
  }

  const stopProtection = async () => {
    try {
      const response = await axios.post('http://localhost:5000/stop_protection')
      setStatus('AI Protection: OFF')
      setIsRunning(false)
    } catch (error) {
      console.error('Error stopping protection:', error)
    }
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>AI Protection System</h1>
      <p>{status}</p>
      <button
        onClick={startProtection}
        disabled={isRunning}
        style={{ padding: '10px 20px', fontSize: '16px', marginRight: '10px' }}
      >
        Start Protection
      </button>
      <button
        onClick={stopProtection}
        disabled={!isRunning}
        style={{ padding: '10px 20px', fontSize: '16px' }}
      >
        Stop Protection
      </button>
    </div>
  )
}

export default Protection
