import axios from "axios";

export const listUser = async (authtoken) => {
  return await axios.get("http://localhost:5000/users", {
    headers: {
      authtoken,
    },
  });
};

export const changeStatus = async (authtoken, id, value) => {
  return await axios.put("http://localhost:5000/users/change-status/" + id, value, {
    headers: {
      authtoken,
    },
  });
};

export const changeRole = async (authtoken, id, value) => {
  return await axios.put("http://localhost:5000/users/change-role/" + id, value, {
    headers: {
      authtoken,
    },
  });
};

export const removeUser = async (authtoken, id) => {
  return await axios.delete("http://localhost:5000/users/" + id, {
    headers: {
      authtoken,
    },
  });
};

export const resetPassword = async (authtoken, id, values) => {
  return await axios.put("http://localhost:5000/users/change-pass/" + id, values, {
    headers: {
      authtoken,
    },
  });
};

export const searchUser = async (search) => 
   await axios.post("http://localhost:5000/users/search/",{username:search});
