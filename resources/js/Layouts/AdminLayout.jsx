import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { Toaster } from "react-hot-toast";

const AdminLayout = ({ children }) => {
    const { component } = usePage();
    const { auth } = usePage().props;
    return (
        <>
            <div>
                <Toaster />
            </div>
            <header className="bg-black text-white py-8">
                <div className="container mx-auto px-10 flex justify-between items-center">
                    <h2 className="font-bold text-2xl">Todo</h2>
                    <nav className="flex justify-between items-center grow ml-36">
                        <div className="flex gap-6 items-center justify-start">
                            <Link
                                href="/dashboard"
                                className={`${
                                    component === "Dashboard"
                                        ? "text-blue-500"
                                        : "text-gray-400"
                                }`}
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/todo"
                                className={`${
                                    component === "Todo"
                                        ? "text-blue-500"
                                        : "text-gray-400"
                                }`}
                            >
                                Todo
                            </Link>
                        </div>
                        <div>{auth.user.name}</div>
                    </nav>
                </div>
            </header>
            <main className="mt-10">
                <div className="container mx-auto px-10">{children}</div>
            </main>
        </>
    );
};

export default AdminLayout;
