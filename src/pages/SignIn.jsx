import { useState } from "react";
import { Button } from "../components/Button/Button.jsx";
import { PageWrapper } from "../components/PageWrapper/PageWrapper.jsx";
import { fetchData } from "../utils/fetchData.js";
import { useAppContext } from "../store/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import { useModal } from "../utils/useModal.js";
import { Modal } from "../components/Modal/Modal.jsx";
import { Form } from "../components/Form/Form.jsx";
import { GridWrapper } from "../components/GridWrapper/GridWrapper.jsx";
import bg from "../assets/background/bg.jpeg";
import { Input } from "../components/Input/Input.jsx";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  color: #feb161;
  &:hover {
    color: #e2944d;
  }
`;

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
    <PageWrapper backgroundSrc={bg}>
      <Form>
        <GridWrapper columns={1}>
          <h2>Sign In</h2>
        </GridWrapper>
        <GridWrapper columns={1}>
          <Input
            id="emailSignIn"
            label="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            id="passwordSignIn"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </GridWrapper>

        <GridWrapper columns={1} type="center">
          <div>
            <Button text="Sign In" type="primary" onClick={handleSubmit} />
          </div>
          <p style={{ textAlign: "center" }}>
            Don't have an account?{" "}
            <StyledLink to="/sign-up">Sign Up</StyledLink>
          </p>
        </GridWrapper>
      </Form>

      <Modal isOpen={isOpen} {...modalProps} />
    </PageWrapper>
  );
};
