import { useContext } from "react";
import { AuthContext } from "./hook/HuzAuthProvider";
import { useNavigate } from "react-router-dom";

function Adminlogout() {

    const navigate = useNavigate();
    const ctx = useContext(AuthContext);

    const handleLogout=()=>{
      localStorage.removeItem("loggedInUser");
      ctx.setUser(null);
        navigate("/");
    }
    return (
      <button className="adminlog" onClick={handleLogout}>Logout</button>
    )
}

export default Adminlogout