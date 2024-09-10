import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Button } from './ui/button.tsx';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog.tsx';
import { Input } from './ui/input.tsx';
import { Label } from './ui/label.tsx';
import { Separator } from './ui/separator.tsx';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center">Register</DialogTitle>
          <Separator className="bg-black" />
          <DialogHeader className="md:text-lg">Welcome to Assessment Portal</DialogHeader>
          <DialogDescription>Create an account</DialogDescription>
        </DialogHeader>
        <div>
          <div>
            <Label>Email Address</Label>
            <Input type="email" />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" />
          </div>
        </div>
        <div>
          <Button onClick={() => {}} className="w-full">Continue</Button>
        </div>
        <Separator className="bg-black" />
        <div>
          <Button variant="outline" className="w-full border border-black hover:bg-black hover:text-white">
            <FcGoogle className="w-5 h-5 absolute left-10" />
            <p>Continue with Google</p>
          </Button>
        </div>
        <div className="flex items-center justify-center">
          <p className="text-gray-400 text-sm">Already have an account? <span className="text-black hover:cursor-pointer">Login</span></p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
