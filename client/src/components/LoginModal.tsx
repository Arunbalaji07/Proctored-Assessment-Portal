import { FcGoogle } from "react-icons/fc";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

interface LoginModalProps {
  toggleSignIn: () => void; 
}

const LoginModal: React.FC<LoginModalProps> = ({ toggleSignIn }) => {
  return (
    <Dialog open={true} onOpenChange={toggleSignIn}>
      <DialogContent className="absolute p-6 rounded-lg shadow-lg max-w-md bg-white">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-semibold">Login</DialogTitle>
          <Separator className="bg-black my-4" />
          <DialogDescription>Login to your account</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4 w-full">
          <div>
            <Label>Email Address</Label>
            <Input type="email" placeholder="Enter your email" />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" placeholder="Enter your password" />
          </div>
          <div>
            <Label>Select Role</Label>
            <select className="w-full border rounded-lg p-2 mt-1">
              <option value="">Select your role</option>
              <option value="student">Student</option>
              <option value="educator">Educator</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <div className="mt-6 w-full">
          <Button className="w-full bg-black text-white hover:bg-gray-800">
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
