import {FcGoogle} from "react-icons/fc";

import { Button } from "./ui/button.tsx";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog.tsx";
import { Input } from "./ui/input.tsx"
import { Label } from "./ui/label.tsx"
import {Separator} from "./ui/separator.tsx";

const LoginModal = () => {
    return (

        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-yellow-400 text-black hover:bg-white ">Login</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className={`flex items-center justify-center `}>Login</DialogTitle>
                    <Separator className={`bg-black`} />
                    <DialogHeader className={`md:text-lg`} >Welcome back!!!</DialogHeader>
                    <DialogDescription>
                        Login to your account
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <div>
                        <Label>Email Address</Label>
                        <Input type="email" />
                    </div>
                    <div>
                        <Label>Password</Label>
                        <Input type="email" />
                    </div>
                </div>
                <div>
                    <Button onClick={() => {}} className={`w-full`}>Continue</Button>
                </div>
                <Separator className={`bg-black`} />
                <div>
                    <Button variant="outline" className={`w-full border border-black hover:bg-black hover:text-white`} >
                        <FcGoogle className={`w-5 h-5 absolute left-10`} />
                        <p>Continue with Google</p>
                    </Button>
                </div>

                    <div className={`flex items-center justify-center`}>
                        <p className={`text-gray-400 text-sm`}>First time using Portal? <span className={`text-black hover:cursor-pointer`}>Create an account</span></p>
                    </div>
            </DialogContent>
        </Dialog>
    );
};

export default LoginModal;