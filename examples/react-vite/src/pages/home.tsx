import { useLogout, useUser } from "../libs/auth";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const { data, isLoading } = useUser();
  const { mutate: logout } = useLogout();
  const navigate = useNavigate();  

  if (isLoading) 
    return <div>Loading...</div>

  if (!data) 
    navigate("/auth")

  const handleLogout = () => {
    logout({}, {
      onSuccess: () => {
        alert("Successfully logout")
        navigate("/auth")
      }
    });
  }

  return (
    <div>
        <h1>Welcome</h1>
        <p>{data?.user.email}</p>
        {data?.user &&
        <div>
          <button onClick={handleLogout} >logout</button>
        </div> }
    </div>
  )
};
