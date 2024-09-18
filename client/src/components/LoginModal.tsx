import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(''); 

    if (!email || !password || !role) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:7777/login/${role}`, {
        email,
        password
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem(`${role}`, token);

        switch (role) {
          case 'admin':
            navigate('/admin');
            break;
          case 'student':
            navigate('/student');
            break;
          case 'educator':
            navigate('/educator');
            break;
          default:
            setError('Unknown role');
            break;
        }
      } else {
        setError('Token not received');
      }

    } catch (error: any) {
      console.error('Login failed:', error.response?.data || error.message);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="absolute p-6 rounded-lg shadow-lg max-w-md bg-white">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-semibold">Login</DialogTitle>
          <Separator className="bg-black my-4" />
          <DialogDescription>Login to your account</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4 w-full">
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
            />
          </div>
          <div>
            <Label>Select Role</Label>
            <select 
              className="w-full border rounded-lg p-2 mt-1"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select your role</option>
              <option value="student">Student</option>
              <option value="educator">Educator</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="mt-4 text-red-600 text-center">
            {error}
          </div>
        )}

        <div className="mt-6 w-full">
          <Button 
            className="w-full bg-black text-white hover:bg-gray-800"
            onClick={handleLogin}
          >
            Continue
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
            First time using Portal?{" "}
            <span className="text-black hover:cursor-pointer">Create an account</span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
