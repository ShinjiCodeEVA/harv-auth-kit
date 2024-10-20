import { useState } from "react";
import { LoginSchema } from "../libs/auth";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../libs/auth";

export const LoginForm = () => {
  const [userData, setUserData] = useState<LoginSchema>({} as LoginSchema);
  const navigate = useNavigate();
  const { mutate: login } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    login(userData, {
        onSuccess: () => {
            navigate("/")
        },
        onError: () => {
            alert("Invalid login credentials")
        }
    });

   
        
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        type="text"
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        name="password"
        type="text"
        placeholder="Password"
        onChange={handleChange}
      />
      <button>Submit</button>
    </form>
  );
};
