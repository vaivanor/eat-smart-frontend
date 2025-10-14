import { useState } from "react";
import { Button } from "../components/Button/Button.jsx";
import { PageWrapper } from "../components/PageWrapper/PageWrapper.jsx";
import { fetchData } from "../utils/fetchData.js";
import { useAppContext } from "../store/AppContext.jsx";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoading } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await fetchData({
      endpoint: "/login",
      method: "POST",
      body: { email, password },
      setIsLoading,
      onSuccess: (result) => {
        if (result.success) {
          localStorage.setItem("accessToken", result.accessToken);
          alert("Ok");
        } else {
          alert(result.message);
        }
      },
      onError: (error) => {
        console.error("Login error:", error);
        alert("Error");
      },
    });
  };

  return (
    <PageWrapper>
      <form onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button text="Submit" type="primary" />
      </form>
    </PageWrapper>
  );
};
