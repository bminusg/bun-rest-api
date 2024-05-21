const passwordRegex = new RegExp(
  /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/
);

const isPasswordValid = (email: string): boolean => {
  return passwordRegex.test(email);
};

export default isPasswordValid;
