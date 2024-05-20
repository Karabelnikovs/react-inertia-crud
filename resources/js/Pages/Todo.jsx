import AdminLayout from "@/Layouts/AdminLayout";
import Pagination from "@/Components/Pagination";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import PopupTodo from "@/Components/PopupTodo";

const Todo = ({ todos }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [todoProps, setTodoProps] = useState({
        id: "",
        name: "",
    });
    const { flash, errors } = usePage().props;
    console.log(todos);
    const { data, setData, reset } = useForm({
        name: "",
    });

    const storeTodo = (e) => {
        e.preventDefault();
        router.post("/todo", data, {
            onSuccess: reset(),
        });
    };
    const handleShowConfirmation = (id, name) => {
        setShowConfirm(true);
        setTodoProps({ id: id, name: name });
    };
    useEffect(() => {
        flash.message && toast.success(flash.message);
    }, [flash]);

    const handleComplete = (id, name, isCompleted) => {
        let title = document.getElementById(id);
        title.innerText = "Processing...";
        router.patch(
            `todo/complete/${id}`,
            {
                is_completed: !isCompleted,
            },
            {
                onSuccess: () => {
                    title.innerText = name;
                },
            }
        );
    };

    return (
        <>
            {/* <Head title="TODO" /> */}
            <AdminLayout>
                <div className="max-w-4xl flex flex-col gap-4 mx-auto">
                    <h2 className="font-semibold text-4xl my-8 text-center">
                        Todo app
                    </h2>

                    <form onSubmit={storeTodo}>
                        <div className="flex gap-4 items-center">
                            <input
                                type="text"
                                placeholder="Enter todo"
                                className="py-2 px-4 rounded-lg grow"
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                value={data.name}
                            />
                            <button className="py-2 px-4 rounded-lg bg-indigo-500 text-white">
                                Save
                            </button>
                        </div>
                        {errors.name && (
                            <p className="text-red-700 text-sm mt-2">
                                {errors.name}
                            </p>
                        )}
                    </form>
                    {todos.data.map((todo, i) => {
                        return (
                            <div
                                key={i}
                                className={` flex justify-between items-center py-3 px-6 ${
                                    todo.is_completed
                                        ? "bg-green-100"
                                        : "bg-red-100"
                                } rounded-lg `}
                            >
                                <h3 id={todo.id}>{todo.name}</h3>

                                <div className="flex justify-center items-center gap-2">
                                    {todo.is_completed ? (
                                        <FaCircleXmark
                                            className="cursor-pointer text-red-600"
                                            size={22}
                                            onClick={() =>
                                                handleComplete(
                                                    todo.id,
                                                    todo.name,
                                                    todo.is_completed
                                                )
                                            }
                                        />
                                    ) : (
                                        <FaCheckCircle
                                            className="cursor-pointer"
                                            size={22}
                                            onClick={() =>
                                                handleComplete(
                                                    todo.id,
                                                    todo.name,
                                                    todo.is_completed
                                                )
                                            }
                                        />
                                    )}{" "}
                                    |
                                    <Link href={`todo/edit/${todo.id}`}>
                                        <FaEdit size={22} />
                                    </Link>
                                    |{" "}
                                    <RiDeleteBin2Fill
                                        size={25}
                                        className="cursor-pointer"
                                        onClick={() =>
                                            handleShowConfirmation(
                                                todo.id,
                                                todo.name
                                            )
                                        }
                                    />
                                    {showConfirm && (
                                        <PopupTodo
                                            todoProps={todoProps}
                                            setShowConfirm={setShowConfirm}
                                        />
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    <div className="mt-8 flex justify-end items-center">
                        <Pagination todos={todos} />
                    </div>
                </div>
            </AdminLayout>
        </>
    );
};

export default Todo;
