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
import bg from "../assets/background/bg-3.jpeg";
import { Input } from "../components/Input/Input.jsx";
import { validateFields } from "../utils/validateFields.js";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [errors, setErrors] = useState({});
  const { setIsLoading } = useAppContext();
  const navigate = useNavigate();
  const { isOpen, modalProps, showModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateFields({
      name,
      surname,
      email,
      phone,
      newPassword,
      repeatPassword,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const result = await fetchData({
      endpoint: "/register",
      method: "POST",
      body: { name, surname, phone, email, password: newPassword },
      setIsLoading,
      onSuccess: (result) => {
        if (result.success) {
          navigate("/sign-in");
        } else {
          if (result.message === "User with this email already exists.") {
            setErrors({ email: result.message });
          }
        }
      },
      onError: (error) => {
        showModal({
          text: error,
          confirmText: "Try Again",
          onConfirm: () => {
            navigate("/sign-up");
          },
        });
      },
    });
  };

  return (
    <PageWrapper backgroundSrc={bg}>
      <SignForm>
        <GridWrapper columns={1}>
          <h2>Sign Up</h2>
        </GridWrapper>
        <GridWrapper columns={1}>
          <Input
            id="nameSignUp"
            label="Name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) {
                setErrors((prev) => ({ ...prev, name: "" }));
              }
            }}
            error={errors.name}
          />
          <Input
            id="surnameSignUp"
            label="Last name"
            type="text"
            value={surname}
            onChange={(e) => {
              setSurname(e.target.value);
              if (errors.surname) {
                setErrors((prev) => ({ ...prev, surname: "" }));
              }
            }}
            error={errors.surname}
          />
          <Input
            id="emailSignUp"
            label="Email"
            type="email"
            value={email}
            placeholder="email@example.com"
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) {
                setErrors((prev) => ({ ...prev, email: "" }));
              }
            }}
            error={errors.email}
          />
          <Input
            id="phoneSignUp"
            label="Phone"
            type="phone"
            value={phone}
            placeholder="e.g. +370XXXXXXXX"
            onChange={(e) => {
              setPhone(e.target.value);
              if (errors.phone) {
                setErrors((prev) => ({ ...prev, phone: "" }));
              }
            }}
            error={errors.phone}
          />
          <Input
            id="passwordSignUp"
            label="Password"
            type="password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              if (errors.newPassword) {
                setErrors((prev) => ({ ...prev, newPassword: "" }));
              }
            }}
            error={errors.newPassword}
          />
          <Input
            id="repeatPasswordSignUp"
            label="Repeat password"
            type="password"
            value={repeatPassword}
            onChange={(e) => {
              setRepeatPassword(e.target.value);
              if (errors.repeatPassword) {
                setErrors((prev) => ({ ...prev, repeatPassword: "" }));
              }
            }}
            error={errors.repeatPassword}
          />
        </GridWrapper>

        <GridWrapper columns={1} type="center">
          <div>
            <Button text="Sign Up" type="primary" onClick={handleSubmit} />
          </div>
        </GridWrapper>
      </SignForm>

      <Modal isOpen={isOpen} {...modalProps} />
    </PageWrapper>
  );
};
