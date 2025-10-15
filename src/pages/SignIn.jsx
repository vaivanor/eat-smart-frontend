import { useState } from "react";
import { Button } from "../components/Button/Button.jsx";
import { PageWrapper } from "../components/PageWrapper/PageWrapper.jsx";
import { fetchData } from "../utils/fetchData.js";
import { useAppContext } from "../store/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import { useModal } from "../utils/useModal.js";
import { Modal } from "../components/Modal/Modal.jsx";
import { SignForm } from "../components/SignForm/SignForm.jsx";
import { GridWrapper } from "../components/GridWrapper/GridWrapper.jsx";
import bg from "../assets/background/bg-2.jpeg";
import { Input } from "../components/Input/Input.jsx";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { validateFields } from "../utils/validateFields.js";

const StyledLink = styled(Link)`
  color: #feb161;
  &:hover {
    color: #e2944d;
  }
`;

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { setIsLoading, handleLogin } = useAppContext();
  const navigate = useNavigate();
  const { isOpen, modalProps, showModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateFields({ email, password });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

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
          if (result.message === "Incorrect email or password.") {
            setErrors({ password: result.message, email: result.message });
          }
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
      <SignForm>
        <GridWrapper columns={1}>
          <h2>Sign In</h2>
        </GridWrapper>
        <GridWrapper columns={1}>
          <Input
            id="emailSignIn"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) {
                setErrors((prev) => ({ ...prev, email: "" }));
              }
            }}
            error={errors.email}
          />
          <Input
            id="passwordSignIn"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) {
                setErrors((prev) => ({ ...prev, password: "" }));
              }
            }}
            error={errors.password}
          />
        </GridWrapper>

        <GridWrapper columns={1} type="center">
          <div>
            <Button text="Sign In" type="primary" onClick={handleSubmit} />
          </div>
          <p style={{ textAlign: "center", margin: "0.5rem" }}>
            Don't have an account?{" "}
            <StyledLink to="/sign-up">Sign Up</StyledLink>
          </p>
        </GridWrapper>
      </SignForm>

      <Modal isOpen={isOpen} {...modalProps} />
    </PageWrapper>
  );
};
