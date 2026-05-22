import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getTasks,
    createTask,
    updateTaskStatus,
    assignTask,
    editTask,
    deleteTask,
} from "../../services/taskApi";

import { getUsers } from "../../services/userApi";

const Dashboard = () => {

    const navigate = useNavigate();

    // 🔥 STATES
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });

    // 🔥 FETCH TASKS
    const fetchTasks = async () => {
        try {

            const res = await getTasks();

            console.log(res);

            setTasks(res.data || []);

        } catch (error) {

            console.log(error);
        }
    };

    // 🔥 FETCH USERS
    const fetchUsers = async () => {
        try {

            const res = await getUsers();

            setUsers(res.data || []);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {
        fetchTasks();
        fetchUsers();
    }, []);

    // 🔥 LOGOUT
    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/login");
    };

    // 🔥 INPUT HANDLE
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // 🔥 CREATE TASK
    const handleCreateTask = async (e) => {

        e.preventDefault();

        try {

            const res = await createTask(formData);

            setTasks([res.data, ...tasks]);

            setShowModal(false);

            setFormData({
                title: "",
                description: "",
            });

        } catch (error) {

            console.log(error);
        }
    };

    // 🔥 COMPLETE TASK
    const handleComplete = async (taskId) => {

        try {

            await updateTaskStatus({
                taskId,
                status: "completed",
            });

            setTasks(
                tasks.map(task =>
                    task.id === taskId
                        ? { ...task, status: "completed" }
                        : task
                )
            );

        } catch (error) {

            console.log(error);
        }
    };

    // 🔥 ASSIGN TASK
    const handleAssign = async (taskId, userId) => {

        if (!userId) {
            return alert("Select user first");
        }

        try {

            await assignTask({
                taskId,
                userId,
            });

            alert("Task Assigned ✅");

        } catch (error) {

            console.log(error);
        }
    };

    // 🔥 DELETE TASK
    const handleDelete = async (id) => {

        try {

            await deleteTask(id);

            setTasks(tasks.filter(task => task.id !== id));

        } catch (error) {

            console.log(error);
        }
    };

    // 🔥 EDIT TASK
    const handleEdit = async (task) => {

        const newTitle = prompt(
            "Enter new title",
            task.title
        );

        const newDescription = prompt(
            "Enter new description",
            task.description
        );

        if (!newTitle || !newDescription) return;

        try {

            const res = await editTask(task.id, {
                title: newTitle,
                description: newDescription,
            });

            setTasks(
                tasks.map(t =>
                    t.id === task.id ? res.data : t
                )
            );

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">

            {/* 🔥 HEADER */}
            <div className="flex justify-between items-center mb-8">

                <div>
                    <h1 className="text-4xl font-bold">
                        Dashboard 🚀
                    </h1>

                    <p className="text-gray-400 mt-1">
                        Manage your tasks professionally
                    </p>
                </div>

                <div className="flex gap-3">

                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl font-bold transition"
                    >
                        + Create Task
                    </button>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-400 px-5 py-3 rounded-xl font-bold transition"
                    >
                        Logout
                    </button>

                </div>
            </div>

            {/* 🔥 STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">

                <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-6 rounded-2xl">
                    <p className="text-gray-400">
                        Total Tasks
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                        {tasks.length}
                    </h2>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-2xl">
                    <p className="text-green-300">
                        Completed
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                        {
                            tasks.filter(
                                t => t.status === "completed"
                            ).length
                        }
                    </h2>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 p-6 rounded-2xl">
                    <p className="text-yellow-300">
                        Pending
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                        {
                            tasks.filter(
                                t => t.status !== "completed"
                            ).length
                        }
                    </h2>
                </div>

            </div>

            {/* 🔥 TASK LIST */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {tasks.length === 0 ? (

                    <div className="col-span-full text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                        <p className="text-gray-400 text-lg">
                            No Tasks Found
                        </p>
                    </div>

                ) : (

                    tasks.map((task) => (

                        <div
                            key={task.id}
                            className="bg-white/10 backdrop-blur-lg border border-white/10 p-6 rounded-3xl hover:scale-[1.02] transition-all duration-300"
                        >

                            {/* TITLE */}
                            <div className="flex justify-between items-start">

                                <h2 className="text-2xl font-bold">
                                    {task.title}
                                </h2>

                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-bold ${task.status === "completed"
                                            ? "bg-green-500/20 text-green-300"
                                            : "bg-yellow-500/20 text-yellow-300"
                                        }`}
                                >
                                    {task.status}
                                </span>

                            </div>

                            {/* DESCRIPTION */}
                            <p className="text-gray-300 mt-4">
                                {task.description}
                            </p>

                            {/* ASSIGNED */}
                            <p className="text-sm text-gray-400 mt-3">
                                Assigned To:{" "}
                                {task.assigned_to || "Not Assigned"}
                            </p>

                            {/* USER DROPDOWN */}
                            <select
                                onChange={(e) =>
                                    handleAssign(task.id, e.target.value)
                                }
                                className="w-full mt-4 bg-gray-800 border border-white/10 p-3 rounded-xl text-white"
                            >
                                <option value="">
                                    Assign User
                                </option>

                                {users.map((user) => (

                                    <option
                                        key={user.id}
                                        value={user.id}
                                    >
                                        {user.name}
                                    </option>

                                ))}
                            </select>

                            {/* BUTTONS */}
                            <div className="flex gap-2 mt-5">

                                <button
                                    onClick={() =>
                                        handleComplete(task.id)
                                    }
                                    className="flex-1 bg-green-500 hover:bg-green-400 py-2 rounded-xl font-bold transition"
                                >
                                    Complete
                                </button>

                                <button
                                    onClick={() =>
                                        handleEdit(task)
                                    }
                                    className="flex-1 bg-yellow-500 hover:bg-yellow-400 py-2 rounded-xl font-bold transition"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(task.id)
                                    }
                                    className="flex-1 bg-red-500 hover:bg-red-400 py-2 rounded-xl font-bold transition"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>
                    ))
                )}
            </div>

            {/* 🔥 MODAL */}
            {showModal && (

                <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">

                    <div className="bg-gray-900 border border-white/10 p-8 rounded-3xl w-full max-w-md">

                        <h2 className="text-3xl font-bold mb-6">
                            Create Task
                        </h2>

                        <form
                            onSubmit={handleCreateTask}
                            className="space-y-4"
                        >

                            <input
                                type="text"
                                name="title"
                                placeholder="Task Title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white"
                            />

                            <textarea
                                name="description"
                                placeholder="Task Description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows="5"
                                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white resize-none"
                            />

                            <div className="flex gap-3">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowModal(false)
                                    }
                                    className="flex-1 bg-gray-700 hover:bg-gray-600 py-3 rounded-xl font-bold"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold"
                                >
                                    Create
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

        </div>
    );
};

export default Dashboard;