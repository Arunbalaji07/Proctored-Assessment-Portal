import {useNavigate} from "react-router-dom";

const checkAuth = (tokenType: 'admin' | 'student' | 'educator') => {
    const navigate = useNavigate()
    const token = localStorage.getItem(tokenType)

    if (!token) {
        navigate('/');
        return false
    }
    return true
}

export default checkAuth