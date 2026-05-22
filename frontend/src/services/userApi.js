import API from "./API";

// 🔥 GET ALL USERS
export const getUsers = async () => {
    const response = await API.get("/users");
    return response.data;
};