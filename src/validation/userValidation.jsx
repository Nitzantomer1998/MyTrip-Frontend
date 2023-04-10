const validateLoginForm = (formData, setErrors) => {
  let valid = true;
  const newErrors = { email: '', password: '' };

  if (!formData.email.trim()) {
    newErrors.email = 'Email is required';
    valid = false;
  } else if (!formData.email.includes('@')) {
    newErrors.email = 'Email must contain @';
    valid = false;
  } else if (!formData.email.includes('.')) {
    newErrors.email = 'Email must contain .';
    valid = false;
  }

  if (!formData.password.trim()) {
    newErrors.password = 'Password is required';
    valid = false;
  } else if (formData.password.length < 8) {
    newErrors.password = 'Password must be at least 8 characters long';
    valid = false;
  }

  setErrors(newErrors);
  return valid;
};

export { validateLoginForm };
