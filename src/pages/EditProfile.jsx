import { PageWrapper } from "../components/PageWrapper/PageWrapper.jsx";
import { BackgroundWrapper } from "../components/BackgroundWrapper/BackgroundWrapper.jsx";
import { GridWrapper } from "../components/GridWrapper/GridWrapper.jsx";
import { ImageButton } from "../components/ImageButton/ImageButton.jsx";
import backArrow from "../assets/icons/arrow.svg";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button/Button.jsx";
import { Input } from "../components/Input/Input.jsx";
import { useState } from "react";
import { validateProfileUpdateFields } from "../utils/validateFields.js";
import { useModal } from "../utils/useModal.js";
import { Modal } from "../components/Modal/Modal.jsx";
import { fetchData } from "../utils/fetchData.js";
import { Form } from "../components/Form/Form.jsx";
import { useAppContext } from "../store/AppContext.jsx";
import bg from "../assets/background/bg-2.jpeg";

export const EditProfile = () => {
  const { currentUser, setCurrentUser } = useAppContext();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [name, setName] = useState(currentUser.name || "");
  const [surname, setSurname] = useState(currentUser.surname || "");
  const [phone, setPhone] = useState(currentUser.phone || "");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const { isOpen, modalProps, showModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateProfileUpdateFields({
      name,
      surname,
      phone,
      password,
      repeatPassword,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    showModal({
      text: "Are you sure you want to update the profile?",
      confirmText: "Yes",
      cancelText: "Cancel",
      onConfirm: () => {
        fetchData({
          endpoint: "/profile",
          method: "PUT",
          body: {
            name,
            surname,
            phone,
            ...(password?.trim() ? { password } : {}),
          },
          requireAuth: true,

          onSuccess: (result) => {
            if (result.success) {
              setCurrentUser((prev) => ({
                ...prev,
                name,
                surname,
                phone,
              }));

              showModal({
                text: "Profile successfully updated!",
                confirmText: "Ok",
                onConfirm: () => navigate(-1),
              });
            } else {
              showModal({
                text: result.message || "Something went wrong.",
                confirmText: "Try Again",
              });
            }
          },

          onError: (error) => {
            showModal({
              text: error.message || "Unexpected error occurred.",
              confirmText: "Try Again",
            });
          },
        });
      },
      onCancel: () => {},
    });
  };

  return (
    <PageWrapper>
      <GridWrapper>
        <ImageButton
          src={backArrow}
          alt="Back arrow icon."
          onClick={() => navigate(-1)}
        />
      </GridWrapper>
      <BackgroundWrapper src={bg}>
        <div>
          <h1>Edit Profile</h1>
        </div>
      </BackgroundWrapper>
      <Form>
        <GridWrapper columns={1}>
          <Input
            id="nameUpdate"
            label="Name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
            }}
            error={errors.name}
          />
          <Input
            id="surnameUpdate"
            label="Last name"
            type="text"
            value={surname}
            onChange={(e) => {
              setSurname(e.target.value);
              if (errors.surname)
                setErrors((prev) => ({ ...prev, surname: "" }));
            }}
            error={errors.surname}
          />
          <Input
            id="phoneUpdate"
            label="Phone"
            details="(e.g. +37061234567)"
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
            }}
            error={errors.phone}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password)
                setErrors((prev) => ({ ...prev, password: "" }));
            }}
            error={errors.password}
          />
          <Input
            id="repeatPassword"
            label="Repeat password"
            type="password"
            value={repeatPassword}
            onChange={(e) => {
              setRepeatPassword(e.target.value);
              if (errors.repeatPassword)
                setErrors((prev) => ({ ...prev, repeatPassword: "" }));
            }}
            error={errors.repeatPassword}
          />
        </GridWrapper>

        <GridWrapper columns={1} type="center">
          <div>
            <Button text="Confirm" type="primary" onClick={handleSubmit} />
          </div>
        </GridWrapper>
      </Form>
      <Modal isOpen={isOpen} {...modalProps} />
    </PageWrapper>
  );
};
