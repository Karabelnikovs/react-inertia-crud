import React from "react";
import { Link } from "@inertiajs/react";

const Pagination = ({ todos }) => {
    const links = todos.links;
    const currentPage = todos.current_page;
    const lastPage = todos.last_page;

    return (
        <>
            <nav aria-label="Page navigation example">
                <ul className="flex items-center -space-x-px h-8 text-sm">
                    {links.map((link, i) => {
                        return (
                            <li key={i}>
                                <Link
                                    href={link.url}
                                    className={` ${
                                        link.active
                                            ? "dark:bg-green-300"
                                            : "dark:bg-red-300"
                                    } flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700  dark:border-gray-700  dark:hover:bg-gray-700 dark:hover:text-white ${
                                        i == 0 && "rounded-s-md"
                                    } ${
                                        i == links.length - 1 && "rounded-e-md"
                                    } ${
                                        i == 0 && currentPage == 1 && "hidden"
                                    } ${
                                        lastPage == currentPage &&
                                        i == links.length - 1 &&
                                        "hidden"
                                    }`}
                                >
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    );
};

export default Pagination;
