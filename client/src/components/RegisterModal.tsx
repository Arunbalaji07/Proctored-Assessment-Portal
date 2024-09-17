import React, { useState } from 'react';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [success, setSuccess] = useState(false); // Success state to manage the popup

  const navigate = useNavigate(); // Hook for navigation

  const validatePassword = (password: string) => {
    const lengthCheck = password.length >= 8;
    const upperCaseCheck = /[A-Z]/.test(password);
    const lowerCaseCheck = /[a-z]/.test(password);
    const numberCheck = /\d/.test(password);
    const specialCharCheck = /[!@#$%^&*]/.test(password);

    if (!lengthCheck || !upperCaseCheck || !lowerCaseCheck || !numberCheck || !specialCharCheck) {
      setPasswordError('Password must be at least 8 characters long, contain upper and lowercase letters, a number, and a special character.');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const confirmPasswords = () => {
    if (password && confirmPassword && password !== confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  const handleRegister = async () => {
    setError('');
    setPasswordError('');

    if (!validatePassword(password)) {
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:7777/signup`, {
        fullName,
        email,
        password
      });

      if (response.status >= 200 && response.status < 300) {
        setSuccess(true);
        navigate('/');
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="absolute p-6 rounded-lg shadow-lg max-w-md bg-white">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-semibold">Create an Account</DialogTitle>
          <Separator className="bg-black my-4" />
          <DialogDescription>Sign up for a new account</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4 w-full">
          <div>
            <Label>Full Name</Label>
            <Input 
              type="text" 
              placeholder="Enter your full name" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div>
            <Label>Email Address</Label>
            <Input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input 
              type="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => validatePassword(password)}
            />
          </div>
          <div>
            <Label>Confirm Password</Label>
            <Input 
              type="password" 
              placeholder="Confirm your password" 
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                confirmPasswords();
              }}
            />
          </div>
        </div>

        {error && (
          <div className="mt-4 text-red-600 text-center">
            {error}
          </div>
        )}

        {passwordError && (
          <div className="mt-4 text-red-600 text-center">
            {passwordError}
          </div>
        )}

        {success && (
          <div className="mt-4 text-green-600 text-center">
            Registration successful!
          </div>
        )}

        <div className="mt-6 w-full">
          <Button 
            className="w-full bg-black text-white hover:bg-gray-800"
            onClick={handleRegister}
          >
            Sign Up
          </Button>
        </div>

        <Separator className="bg-black mt-4 w-full" />

        <div className="mt-4 w-full">
          <Button
            variant="outline"
            className="w-full border border-black hover:bg-black hover:text-white relative"
          >
            <FcGoogle className="w-5 h-5 absolute left-10" />
            <span className="ml-2">Continue with Google</span>
          </Button>
        </div>

        <div className="flex items-center justify-center mt-4 w-full">
          <p className="text-gray-400 text-sm">
            Already have an account?{" "}
            <span className="text-black hover:cursor-pointer" onClick={() => navigate('/login')}>Login</span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
