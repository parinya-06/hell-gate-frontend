import axios from "axios";

export const register = async (value) =>
  await axios.post("http://localhost:5000/users/register", value);

export const login = async (value) =>
  await axios.post('http://localhost:5000/auth/login', value);

export const currentUser = async (authtoken) => {
  // return await axios.post(process.env.REACT_APP_API + "/current-user",
  return await axios.post('http://localhost:5000/users/current-user',{authtoken:authtoken})
}

export const currentAdmin = async (username) => {
  console.log('username=',);
  // return await axios.post(process.env.REACT_APP_API + "/current-admin",
  return await axios.post('http://localhost:5000/users/current-admin',{username:username});
}
