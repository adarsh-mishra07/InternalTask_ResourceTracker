import API from "./API";

// GET ALL TASKS
export const getTasks = async () => {
    const response = await API.get("/tasks");
    return response.data;
};

// CREATE TASK
export const createTask = async (data) => {
    const response = await API.post("/tasks", data);
    return response.data;
};

//update task assignment
export const updateTaskStatus = async (data) => {
    const response = await API.put("/tasks/status", data);
    return response.data;
};

// Assign a task
export const assignTask = async (data) => {
    const response = await API.put("/tasks/assign", data);
    return response.data;
};

// ✏️ EDIT TASK
export const editTask = async (id, data) => {
    const response = await API.put(`/tasks/edit/${id}`, data);
    return response.data;
};

// 🗑️ DELETE TASK
export const deleteTask = async (id) => {
    const response = await API.delete(`/tasks/delete/${id}`);
    return response.data;
};