const emailRegex = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
const phoneRegex = /^\+?[1-9]\d{7,14}$/;
const nameRegex = /^[A-Za-zÀ-ž\s'-]+$/;

export const validateSignInFields = ({ email, password }) => {
  const errors = {};

  if (!email?.trim()) {
    errors.email = "*Email is required.";
  } else if (!emailRegex.test(email.trim())) {
    errors.email = "Email must be valid.";
  }

  if (!password?.trim()) {
    errors.password = "*Password is required.";
  }

  return errors;
};

export const validateSignUpFields = ({
  name,
  surname,
  email,
  phone,
  password,
  repeatPassword,
}) => {
  const errors = {};

  if (!name?.trim()) {
    errors.name = "*Name is required.";
  } else if (!nameRegex.test(name.trim())) {
    errors.name = "Name must be valid.";
  }

  if (!surname?.trim()) {
    errors.surname = "*Last name is required.";
  } else if (!nameRegex.test(surname.trim())) {
    errors.surname = "Last name must be valid.";
  }

  if (!email?.trim()) {
    errors.email = "*Email is required.";
  } else if (!emailRegex.test(email.trim())) {
    errors.email = "Email must be valid.";
  }

  if (!phone?.trim()) {
    errors.phone = "*Phone is required.";
  } else if (!phoneRegex.test(phone.trim())) {
    errors.phone =
      "Phone number must be in international format, e.g. +37061234567";
  }

  if (!password?.trim()) {
    errors.password = "*Password is required.";
  } else {
    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    } else if (password.length > 64) {
      errors.password = "Password must be at most 64 characters long.";
    } else {
      if (!/(?=.*[a-z])/.test(password)) {
        errors.password =
          "Password must contain at least one lowercase letter.";
      }
      if (!/(?=.*[A-Z])/.test(password)) {
        errors.password =
          "Password must contain at least one uppercase letter.";
      }
      if (!/(?=.*[0-9])/.test(password)) {
        errors.password = "Password must contain at least one number.";
      }
      if (!/(?=.*[!@#$%^&*])/.test(password)) {
        errors.password = "Password must contain at least one special symbol.";
      }
    }
  }

  if (!repeatPassword?.trim()) {
    errors.repeatPassword = "*Repeat password is required.";
  } else if (password !== repeatPassword) {
    errors.repeatPassword = "Passwords do not match.";
  }

  return errors;
};

export const validateCommentFields = ({ evaluation }) => {
  const errors = {};

  if (evaluation === "" || evaluation === null || isNaN(evaluation)) {
    errors.evaluation = "*Evaluation is required.";
  } else if (evaluation < 1 || evaluation > 5) {
    errors.evaluation = "Evaluation must be between 1 and 5.";
  }

  return errors;
};

export const validateProfileUpdateFields = ({
  name,
  surname,
  email,
  phone,
  password,
  repeatPassword,
}) => {
  const errors = {};

  if (name !== undefined && !name.trim()) {
    errors.name = "*Name is required.";
  } else if (name && !nameRegex.test(name.trim())) {
    errors.name = "Name must be valid.";
  }

  if (surname !== undefined && !surname.trim()) {
    errors.surname = "*Last name is required.";
  } else if (surname && !nameRegex.test(surname.trim())) {
    errors.surname = "Last name must be valid.";
  }

  if (email !== undefined && !email.trim()) {
    errors.email = "*Email is required.";
  } else if (email && !emailRegex.test(email.trim())) {
    errors.email = "Email must be valid.";
  }

  if (phone !== undefined && !phone.trim()) {
    errors.phone = "*Phone is required.";
  } else if (phone && !phoneRegex.test(phone.trim())) {
    errors.phone =
      "Phone number must be in international format, e.g. +37061234567";
  }

  if (password?.trim()) {
    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    } else if (password.length > 64) {
      errors.password = "Password must be at most 64 characters long.";
    } else {
      if (!/(?=.*[a-z])/.test(password)) {
        errors.password =
          "Password must contain at least one lowercase letter.";
      }
      if (!/(?=.*[A-Z])/.test(password)) {
        errors.password =
          "Password must contain at least one uppercase letter.";
      }
      if (!/(?=.*[0-9])/.test(password)) {
        errors.password = "Password must contain at least one number.";
      }
      if (!/(?=.*[!@#$%^&*])/.test(password)) {
        errors.password = "Password must contain at least one special symbol.";
      }
    }

    if (!repeatPassword?.trim()) {
      errors.repeatPassword = "*Repeat password is required.";
    } else if (password !== repeatPassword) {
      errors.repeatPassword = "Passwords do not match.";
    }
  } else {
    if (repeatPassword?.trim()) {
      errors.repeatPassword = "Enter a new password before repeating.";
    }
  }

  return errors;
};

export const validateReservationFields = ({ seats, time, date }) => {
  const errors = {};

  if (seats === "" || seats === null || isNaN(seats)) {
    errors.seats = "*Number of People is required.";
  } else if (seats < 1) {
    errors.seats = "Number of people must be at least 1.";
  }

  if (!time?.trim()) {
    errors.time = "*Select a time from available options.";
  }

  if (!date) {
    errors.date = "*Date is required.";
  }

  return errors;
};
