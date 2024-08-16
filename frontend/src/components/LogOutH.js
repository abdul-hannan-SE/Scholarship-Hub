import { useContext } from "react";
import { AuthContext } from "./hook/HuzAuthProvider";
import { useNavigate, useNavigation } from "react-router-dom";

const LogOutH=()=>{
    const navigate = useNavigate();
    const ctx = useContext(AuthContext);

    const handleLogout=()=>{
      localStorage.removeItem("loggedInUser");
      ctx.setUser(null);
        navigate("/");
    }
    return (
      <button className="logbtn" onClick={handleLogout}>Logout</button>
    )
};

export default LogOutH;