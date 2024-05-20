import React, { useState } from "react";
import { router, usePage, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

const Edit = ({ todo }) => {
    const [newTodo, setNewTodo] = useState(todo.name);
    const { flash, errors } = usePage().props;

    const { data, setData, post } = useForm({
        name: todo.name,
    });
    const [processing, setProcessing] = useState(false);
    const handleUpdate = (e) => {
        setProcessing(true);
        e.preventDefault();
        router.post(`/todo/edit/${todo.id}`, {
            _method: "patch",
            name: data.name,
        });
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl flex flex-col gap-4 mx-auto">
                <h2 className="font-semibold text-4xl my-8 text-center">
                    Edit Todo : {todo.name}
                </h2>
                {flash.message && (
                    <div className="py-2 px-4 rounded-lg bg-green-300 text-center">
                        {flash.message}
                    </div>
                )}
                <form onSubmit={handleUpdate}>
                    <div className="flex gap-4 items-center">
                        <input
                            type="text"
                            placeholder="Enter todo"
                            className="py-2 px-4 rounded-lg grow"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        <button className="py-2 px-4 rounded-lg bg-indigo-500 text-white">
                            {processing ? "processing ..." : "Update"}
                        </button>
                    </div>
                    {errors.name && (
                        <p className="text-red-700 text-sm mt-2">
                            {errors.name}
                        </p>
                    )}
                </form>

                {/* <div className="flex justify-between items-center py-3 px-6 bg-green-100 rounded-lg">
                    <h3>Lorem ipsum dolor</h3>
                    <div className="flex justify-center items-center gap-2">
                        <FaEdit size={25} /> | <RiDeleteBin2Fill size={25} />
                    </div>
                </div>
                <div className="flex justify-between items-center py-3 px-6 bg-red-100 rounded-lg">
                    <h3>Lorem ipsum dolor</h3>
                    <div className="flex justify-center items-center gap-2">
                        <FaCheckCircle size={22} /> |
                        <RiDeleteBin2Fill size={25} />
                    </div>
                </div> */}
            </div>
        </AdminLayout>
    );
};

export default Edit;
