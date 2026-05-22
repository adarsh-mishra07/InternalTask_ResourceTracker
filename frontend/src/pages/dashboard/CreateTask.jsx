import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../../services/taskApi";

const CreateTask = () => {

    const navigate = useNavigate();

    // 🔥 STATE
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });

    // 🔥 INPUT CHANGE
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // 🔥 SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await createTask(formData);

            console.log(res);

            alert("Task Created Successfully 🚀");

            // 🔥 CLEAR FORM
            setFormData({
                title: "",
                description: "",
            });

            // 🔥 REDIRECT
            navigate("/dashboard");

        } catch (error) {

            console.log(error);

            alert("Error Creating Task ❌");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">

            <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">

                {/* HEADING */}
                <h1 className="text-3xl font-bold text-white mb-6 text-center">
                    Create Task 🚀
                </h1>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* TITLE */}
                    <div>
                        <label className="block text-gray-300 mb-2">
                            Task Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            placeholder="Enter task title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* DESCRIPTION */}
                    <div>
                        <label className="block text-gray-300 mb-2">
                            Description
                        </label>

                        <textarea
                            name="description"
                            placeholder="Enter task description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="5"
                            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none"
                        />
                    </div>

                    {/* BUTTONS */}
                    <div className="flex gap-3">

                        <button
                            type="button"
                            onClick={() => navigate("/dashboard")}
                            className="w-1/2 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-semibold transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="w-1/2 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold transition shadow-lg shadow-blue-500/20"
                        >
                            Create
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default CreateTask;