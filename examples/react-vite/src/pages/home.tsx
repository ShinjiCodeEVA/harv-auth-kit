import { useUser } from "../libs/auth";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const { data, isLoading } = useUser();
  const navigate = useNavigate();  

  if (isLoading) 
    return <div>Loading...</div>

  if (!data) 
    navigate("/auth")

  return (
    <div>
        <h1>Welcome</h1>
        <p>{data?.user.email}</p>
    </div>
  )
};
