import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BASE_URL from '../config/api'
import { toast, ToastContainer } from 'react-toastify';

const Blog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([])

    const [text, setText] = useState("")

    const user = JSON.parse(localStorage.getItem("userInfo"));
    const token = user?.token;

    const fetchBlog = async () => {
        try {
            const res = await fetch(`${BASE_URL}/blogs/get-blog/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await res.json();
            setBlog(data.data);
        } catch (error) {
            console.error("Error fetching blog:", error);
        } finally {
            setLoading(false);
        }
    };





    const getComments = async () => {

        const res = await fetch(`${BASE_URL}/comments/getcomment/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await res.json()
        console.log(data)
        setComments(data.data)
    }

    useEffect(() => {
        fetchBlog();
        getComments()

    }, [id]);

    if (loading) return <div>Loading...</div>;

    if (!blog) return <div>Blog not found.</div>;


    const handleComment = async () => {

        try {

            const res = await fetch(`${BASE_URL}/comments/create/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ text })
            })
            toast.success("Comment sent successfully")
            setText("")
            getComments()
        } catch (error) {
            console.log("error")
        }


    }


    return (
        <div className='w-full min-h-screen flex justify-center p-8'>

            <div className='w-full lg:w-1/2 mt-2 lg:mt-8'>
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
                    <p>{blog.content}</p>
                </div>

                <h3 className="font-bold">Comments</h3>
                {comments.map((c) => (
                    <div key={c._id} className="border-t py-2">
                        <p className="text-sm text-gray-600">
                            <span className="font-semibold">{c.user?.name || "Unknown"}</span> says:
                        </p>
                        <p>{c.text}</p>
                    </div>
                ))}

                {user && (
                    <div className="mt-4">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Write a comment"
                            className="border p-2 w-full"
                        ></textarea>
                        <button className="border text-white bg-blue-500 p-2" onClick={handleComment}>
                            Add Comment
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Blog;
