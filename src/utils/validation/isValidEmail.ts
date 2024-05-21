const emailRegex = new RegExp(
  /^[a-zA-Z0-9. _-]+@[a-zA-Z0-9. -]+\.[a-zA-Z]{2,4}$/
);

const isValidEmail = (email: string): boolean => {
  return emailRegex.test(email);
};

export default isValidEmail;
