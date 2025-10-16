export const validateFields = (fields) => {
  const errors = {};

  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  const nameRegex = /^[A-Za-zÀ-ž\s'-]+$/;
  const emailRegex = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

  if (fields.name !== undefined) {
    if (!fields.name?.trim()) {
      errors.name = "*Name is required.";
    } else if (!nameRegex.test(fields.name.trim())) {
      errors.name = "Name must be valid.";
    }
  }

  if (fields.surname !== undefined) {
    if (!fields.surname?.trim()) {
      errors.surname = "*Last name is required.";
    } else if (!nameRegex.test(fields.surname.trim())) {
      errors.surname = "Last name must be valid.";
    }
  }

  if (fields.email !== undefined) {
    if (!fields.email?.trim()) {
      errors.email = "*Email is required.";
    } else if (!emailRegex.test(fields.email.trim())) {
      errors.email = "Email must be valid.";
    }
  }

  if (fields.phone !== undefined) {
    if (!fields.phone?.trim()) {
      errors.phone = "*Phone is required.";
    } else if (!phoneRegex.test(fields.phone.trim())) {
      errors.phone =
        "Phone number must be in international format, e.g. +37061234567";
    }
  }

  if (fields.password !== undefined) {
    if (!fields.password?.trim()) {
      errors.password = "*Password is required.";
    }
  }

  if (fields.newPassword !== undefined) {
    if (!fields.newPassword?.trim()) {
      errors.newPassword = "*Password is required.";
    } else {
      if (fields.newPassword.length < 8) {
        errors.newPassword = "Password must be at least 8 characters long.";
      } else if (fields.newPassword.length > 64) {
        errors.newPassword = "Password must be at most 64 characters long.";
      } else {
        if (!/(?=.*[a-z])/.test(fields.newPassword)) {
          errors.newPassword =
            "Password must contain at least one lowercase letter.";
        }
        if (!/(?=.*[A-Z])/.test(fields.newPassword)) {
          errors.newPassword =
            "Password must contain at least one uppercase letter.";
        }
        if (!/(?=.*[0-9])/.test(fields.newPassword)) {
          errors.newPassword = "Password must contain at least one number.";
        }
        if (!/(?=.*[!@#$%^&*])/.test(fields.newPassword)) {
          errors.newPassword =
            "Password must contain at least one special symbol.";
        }
      }
    }
  }

  if (fields.repeatPassword !== undefined) {
    if (!fields.repeatPassword?.trim()) {
      errors.repeatPassword = "*Repeat password is required.";
    } else if (fields.newPassword?.trim() && fields.repeatPassword.trim()) {
      if (fields.newPassword !== fields.repeatPassword) {
        errors.repeatPassword = "Repeat password must coincide with password.";
      }
    }
  }

  if (fields.evaluation !== undefined) {
    if (fields.evaluation < 1 || fields.evaluation > 5) {
      errors.evaluation = "Evaluation must be a number between 1 and 5.";
    }
  }

  return errors;
};
