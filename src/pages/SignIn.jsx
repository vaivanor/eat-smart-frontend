import { useState } from "react";
import { Button } from "../components/Button/Button.jsx";
import { PageWrapper } from "../components/PageWrapper/PageWrapper.jsx";
import { fetchData } from "../utils/fetchData.js";
import { useAppContext } from "../store/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import { useModal } from "../utils/useModal.js";
import { Modal } from "../components/Modal/Modal.jsx";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoading, handleLogin } = useAppContext();
  const navigate = useNavigate();
  const { isOpen, modalProps, showModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await fetchData({
      endpoint: "/login",
      method: "POST",
      body: { email, password },
      setIsLoading,
      onSuccess: (result) => {
        if (result.success) {
          handleLogin(result.accessToken);
          navigate("/");
          // showModal({
          //   text: "Prisijungimas sėkmingas!",
          //   confirmText: "Tęsti",
          //   cancelText: "Cancel",
          //   onConfirm: () => {
          //     handleLogin(result.accessToken);
          //     navigate("/");
          //   },
          //   onCancel: () => {
          //     console.log("cancel");
          //   },
          // });
        } else {
          //klaidu tikrinimas
          console.log(result.message);
        }
      },
      onError: (error) => {
        showModal({
          text: error,
          confirmText: "Try Again",
          onConfirm: () => {
            navigate("/sign-in");
          },
        });
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

      <Modal isOpen={isOpen} {...modalProps} />
    </PageWrapper>
  );
};
