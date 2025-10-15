export const validateFields = (fields) => {
  const errors = {};

  if (!fields.email) {
    errors.email = "Email is required.";
  } else if (
    !/^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(fields.email)
  ) {
    errors.email = "Email must be valid.";
  }

  if (!fields.password) {
    errors.password = "Password is required.";
  }

  return errors;
};
