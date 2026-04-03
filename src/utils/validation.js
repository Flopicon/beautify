export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password) => {
  // At least 6 characters
  return password.length >= 6
}

export const validateName = (name) => {
  return name.trim().length > 0
}

export const validateForm = (formData, formType = 'login') => {
  const errors = {}

  if (formType === 'signup' && !validateName(formData.name)) {
    errors.name = 'Name is required'
  }

  if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email'
  }

  if (!validatePassword(formData.password)) {
    errors.password = 'Password must be at least 6 characters'
  }

  return errors
}
