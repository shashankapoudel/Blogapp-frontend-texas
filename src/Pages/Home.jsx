import React, { useEffect, useState } from 'react';
import BASE_URL from '../config/api';
import { useNavigate } from 'react-router-dom';
import BlogModal from '../Components/BlogModal';

const Home = ({ refetchSignal }) => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem("userInfo"));
    const token = user?.token;

    const fetchBlogs = async () => {
        try {
            const res = await fetch(`${BASE_URL}/blogs/get-blogs`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to fetch blogs");
            }

            setBlogs(data.data);
        } catch (error) {
            console.error("Error fetching blogs:", error.message);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, [refetchSignal]);

    return (
        <div>
            <div className="grid gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {
                    blogs.map((blog) => (
                        <div
                            key={blog._id}
                            onClick={() => navigate(`/blogs/${blog._id}`)}
                            className="flex flex-col rounded-lg p-4 items-start cursor-pointer bg-white shadow-lg hover:text-[#bb2821] relative"
                        >
                            <img
                                src={blog.images?.[0] || "/fallback.jpg"}
                                alt={blog.title}
                                className="w-full rounded-md object-cover transition-transform duration-300 transform hover:scale-105 h-48"
                                loading="lazy"
                            />
                            <div className="mt-3 p-2">
                                <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-[#bb2821]">
                                    {blog.title}
                                </h3>
                                <p>{blog.content.slice(0, 100)}...</p>
                                <span className="underline text-sm text-[#bb2821] absolute bottom-2 right-2">Read more</span>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    );
};

export default Home;
