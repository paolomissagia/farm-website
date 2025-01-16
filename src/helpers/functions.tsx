export const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export const validatePhone = (phone: string) => {
  // Simple regex to validate phone number (adjust as needed)
  const regex = /^[0-9]{10,15}$/;
  return regex.test(phone);
};
