import axios from "axios";

var api = axios.create({
  baseURL: process.env.REACT_APP_API,
});
export const checkEmailValid = (email) => {
  var filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
  if (!filter.test(email)) {
    return false;
  }
  return true;
};

export const signUp = (username, password, fullname, email) => {
  return api.post("/create-user", {
    username: username,
    password: password,
    fullname: fullname,
    email: email,
  });
};

export const signIn = (username, password) => {
  return api.post("/login", {
    username: username,
    password: password,
  });
};

export const contact = (email, message) => {
  return api.post("/contact", {
    email: email,
    message: message,
  });
};
export const submitEmail = (email, action, message) => {
  const dataForm = new FormData();
  dataForm.append("Email", email);
  dataForm.append("Action", action);
  dataForm.append("Message", message);
  return axios.post(
    "https://script.google.com/macros/s/AKfycbz6WFv3srtjjdLdC4SFkq1n-PL0WPh3lEQdCuNqSPfVD6AUWl9NQCpT16LIhlw-VceeOA/exec",
    dataForm
  );
};

export const requestADemo = (
  fullName,
  email,
  dateOfBirth,
  gender,
  jobTitle
) => {
  const dataForm = new FormData();
  dataForm.append("FullName", fullName);
  dataForm.append("Email", email);
  dataForm.append("DateOfBirth", dateOfBirth);
  dataForm.append("Gender", gender);
  dataForm.append("JobTitle", jobTitle);
  return axios.post(
    "https://script.google.com/macros/s/AKfycbzR_AUpl-Avzus5NMcdcHNVnSWoWJAq7gw6uZfNVE6LuPY4k8_T9GT4D-DZ5aSCp8E/exec",
    dataForm
  );
};

export const getUser = (token) => {
  return api.get("get-current-user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
