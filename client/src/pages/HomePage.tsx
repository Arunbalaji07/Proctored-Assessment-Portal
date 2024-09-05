import Navbar from "../components/Navbar.tsx";
import LoginModal from "../components/LoginModal.tsx";

const HomePage = () => {
    return (
        <div className="grid grid-rows-2">
            <Navbar />
            <div>Main</div>
        </div>
    );
};

export default HomePage;