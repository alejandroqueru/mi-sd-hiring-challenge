export function convertDate(time) {
  return time * 1000;
}

export function isValidZipCode(zipCode) {
  return /^\d{5}$/.test(String(zipCode).trim());
}

export function getTodayDateString() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();

  return `${month}/${day}/${year}`;
}