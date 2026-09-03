import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({children}) => {
    const navigate = useNavigate
    const user = localStorage.getItem('user');

    if(!user){
        return navigate('/login')
    }

    return children
};

// import { Navigate } from 'react-router-dom';

// export const ProtectedRoute = ({ children }) => {
//   const user = localStorage.getItem('user');

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// };