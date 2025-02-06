import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";
console.log("hello");

export const getUsers = async (page) => {
  const response = await axios.get(API_URL, {
    params: {
      _page: page,
      _limit: 5, // Limit to 5 users per page
    },
  });

  return response;
};

export const getUserById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response;
};
//adding user

export const addUser = async (user) => {
try {
    
  await axios.post(API_URL, user);
    
} catch (error) {
    console.error("Error adding user",error);
    throw error;
}
};

//update user
export const updateUser = async (id, user) => {
  await axios.put(`${API_URL}/${id}`, user);
};

//delete user
export const deleteUser = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};