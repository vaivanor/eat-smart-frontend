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

export const validateCommentFields = ({ evaluation, comment }) => {
  const errors = {};

  const numericEvaluation = Number(evaluation);
  if (!evaluation?.toString().trim()) {
    errors.evaluation = "*Evaluation is required.";
  } else if (
    isNaN(numericEvaluation) ||
    numericEvaluation < 1 ||
    numericEvaluation > 5
  ) {
    errors.evaluation = "Evaluation must be a number between 1 and 5.";
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

// export const validateFields = (fields) => {
//   const errors = {};

//   const phoneRegex = /^\+?[1-9]\d{7,14}$/;
//   const nameRegex = /^[A-Za-zÀ-ž\s'-]+$/;
//   const emailRegex = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

//   if (fields.name !== undefined) {
//     if (!fields.name?.trim()) {
//       errors.name = "*Name is required.";
//     } else if (!nameRegex.test(fields.name.trim())) {
//       errors.name = "Name must be valid.";
//     }
//   }

//   if (fields.surname !== undefined) {
//     if (!fields.surname?.trim()) {
//       errors.surname = "*Last name is required.";
//     } else if (!nameRegex.test(fields.surname.trim())) {
//       errors.surname = "Last name must be valid.";
//     }
//   }

//   if (fields.email !== undefined) {
//     if (!fields.email?.trim()) {
//       errors.email = "*Email is required.";
//     } else if (!emailRegex.test(fields.email.trim())) {
//       errors.email = "Email must be valid.";
//     }
//   }

//   if (fields.phone !== undefined) {
//     if (!fields.phone?.trim()) {
//       errors.phone = "*Phone is required.";
//     } else if (!phoneRegex.test(fields.phone.trim())) {
//       errors.phone =
//         "Phone number must be in international format, e.g. +37061234567";
//     }
//   }

//   if (fields.password !== undefined) {
//     if (!fields.password?.trim()) {
//       errors.password = "*Password is required.";
//     }
//   }

//   if (fields.newPassword !== undefined) {
//     if (!fields.newPassword?.trim()) {
//       errors.newPassword = "*Password is required.";
//     } else {
//       if (fields.newPassword.length < 8) {
//         errors.newPassword = "Password must be at least 8 characters long.";
//       } else if (fields.newPassword.length > 64) {
//         errors.newPassword = "Password must be at most 64 characters long.";
//       } else {
//         if (!/(?=.*[a-z])/.test(fields.newPassword)) {
//           errors.newPassword =
//             "Password must contain at least one lowercase letter.";
//         }
//         if (!/(?=.*[A-Z])/.test(fields.newPassword)) {
//           errors.newPassword =
//             "Password must contain at least one uppercase letter.";
//         }
//         if (!/(?=.*[0-9])/.test(fields.newPassword)) {
//           errors.newPassword = "Password must contain at least one number.";
//         }
//         if (!/(?=.*[!@#$%^&*])/.test(fields.newPassword)) {
//           errors.newPassword =
//             "Password must contain at least one special symbol.";
//         }
//       }
//     }
//   }

//   if (fields.repeatPassword !== undefined) {
//     if (!fields.repeatPassword?.trim()) {
//       errors.repeatPassword = "*Repeat password is required.";
//     } else if (fields.newPassword?.trim() && fields.repeatPassword.trim()) {
//       if (fields.newPassword !== fields.repeatPassword) {
//         errors.repeatPassword = "Repeat password must coincide with password.";
//       }
//     }
//   }

//   if (fields.evaluation !== undefined) {
//     if (fields.evaluation < 1 || fields.evaluation > 5) {
//       errors.evaluation = "Evaluation must be a number between 1 and 5.";
//     }
//   }

//   if (fields.updatePassword?.trim()) {
//     if (fields.updatePassword.length < 8) {
//       errors.updatePassword = "Password must be at least 8 characters long.";
//     } else if (fields.updatePassword.length > 64) {
//       errors.updatePassword = "Password must be at most 64 characters long.";
//     } else {
//       if (!/(?=.*[a-z])/.test(fields.updatePassword)) {
//         errors.updatePassword =
//           "Password must contain at least one lowercase letter.";
//       }
//       if (!/(?=.*[A-Z])/.test(fields.updatePassword)) {
//         errors.updatePassword =
//           "Password must contain at least one uppercase letter.";
//       }
//       if (!/(?=.*[0-9])/.test(fields.updatePassword)) {
//         errors.updatePassword = "Password must contain at least one number.";
//       }
//       if (!/(?=.*[!@#$%^&*])/.test(fields.updatePassword)) {
//         errors.updatePassword =
//           "Password must contain at least one special symbol.";
//       }
//     }
//     if (
//       fields.repeatPassword?.trim() &&
//       fields.repeatPassword !== fields.updatePassword
//     ) {
//       errors.repeatPassword = "Passwords do not match.";
//     }
//   } else {
//     if (fields.repeatPassword?.trim()) {
//       errors.repeatPassword = "Enter a new password before repeating.";
//     }
//   }

//   return errors;
// };
