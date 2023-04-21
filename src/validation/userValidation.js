function validateSignUpForm(formData) {
  const { username, email, password } = formData;
  const newErrors = {};

  if (username.length < 6) {
    newErrors.username = 'is too weak';
  }

  if (!email.includes('.')) {
    newErrors.email = 'Invalid Pattern';
  }

  if (password.length < 8) {
    newErrors.password = 'is too weak';
  }

  return newErrors;
}

function validateSignInForm(formData) {
  const { email, password } = formData;

  if (!email.includes('.')) {
    newErrors.email = 'Invalid Pattern';
  }

  if (password.length < 8) {
    newErrors.password = 'is too weak';
  }

  return newErrors;
}

export { validateSignUpForm, validateSignUpForm };
