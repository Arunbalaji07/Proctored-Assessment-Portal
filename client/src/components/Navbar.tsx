import {useState} from 'react';
import {Link, NavLink} from 'react-router-dom'
import {RxHamburgerMenu,} from "react-icons/rx";
import {RiCloseLargeLine} from "react-icons/ri";

import {Button} from "./ui/button.tsx";
import LoginModal from "./LoginModal.tsx";
import RegisterModal from "./RegisterModal.tsx";

const navLinks = [
    {name: "Home", path: "/"},
    {name: "About Us", path: '/about'},
    {name: "Contact Us", path: "/contact"}
]

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <nav className={`bg-blue-800 w-full h-14 flex justify-between items-center `}>
            <div className={`container mx-auto justify-between flex lg:inline-flex`}>
                <div>
                    <Link to='/'>
                        <p className={`text-white text-lg px-4`}><span className={`text-amber-400`}>ASSESSMENT </span>PORTAL
                        </p>
                    </Link>
                </div>
                <div className={`hidden md:flex space-x-6 items-center`}>
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({isActive}) => `${isActive ? 'text-amber-400' : 'text-white hover:text-green-400'} `}
                        >
                            {link.name.toUpperCase()}
                        </NavLink>
                    ))}
                </div>
                <div className={`hidden md:flex space-x-6`}>
                    {/*<Button className={`bg-yellow-400 text-black hover:bg-white`}>Login</Button>*/}
                    <LoginModal />
                    {/*<Button className={`bg-yellow-400 text-black hover:bg-white`}>Signup</Button>*/}
                    <RegisterModal />
                </div>
                <div className={`md:hidden flex flex-end`}>
                    {!isOpen ? (
                            <RxHamburgerMenu
                                className={`mx-2 mt-1 w-5 h-5 text-white relative`}
                                onClick={() => setIsOpen(!isOpen)}
                            />
                        ) :
                        <RiCloseLargeLine
                            className={`mx-2 mt-1 w-5 h-5 z-[51] text-white`}
                            onClick={() => setIsOpen(!isOpen)}
                        />
                    }
                </div>
            </div>
            {isOpen && (
                <div className="fixed inset-0 z-50 bg-blue-800 pt-14 md:hidden">
                    <div className="flex flex-col space-y-4 p-4">
                        {navLinks.map((link) => (
                            <div key={link.path}
                                 className={`bg-yellow-400 flex justify-center items-center h-9 text-black rounded-md `}>
                                <Link

                                    to={link.path}
                                    className="text-black text-lg hover:text-green-400"
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    {link.name}
                                </Link>
                            </div>

                        ))}
                        {/*<Button className="bg-yellow-400 text-black hover:bg-white w-full md:w-44 ">Login</Button>*/}
                        <LoginModal />
                        <Button className="bg-yellow-400 text-black hover:bg-white w-full">Signup</Button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;