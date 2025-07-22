import { useState } from "react";
import BASE_URL from "../config/api";
import { toast, ToastContainer } from 'react-toastify';

const BlogModal = ({ onClose, triggerRefetch }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [images, setImages] = useState([]);
    const [fileName, setFileName] = useState("No file chosen");
    const [isLoading, setIsLoading] = useState(false);

    const user = JSON.parse(localStorage.getItem("userInfo"));
    const token = user?.token;

    const handleImageChange = (e) => {
        const newFiles = Array.from(e.target.files);


        setImages(prevImages => [...prevImages, ...newFiles]);


        setFileName(prevNames => {
            const newNames = newFiles.map(file => file.name);
            return prevNames === "No file chosen"
                ? newNames.join(", ")
                : prevNames + ", " + newNames.join(", ");
        });

        e.target.value = null;
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        if (!title || !content || !author || images.length === 0) {
            alert("Please fill all fields and upload at least one image");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("author", author);

        images.forEach(imageFile => {
            formData.append("images", imageFile);
        });

        setIsLoading(true);
        try {
            const res = await fetch(`${BASE_URL}/blogs/create`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`

                },
                body: formData
            });

            const data = await res.json();
            console.log(data);
            toast.success("Blog created successfully");
            triggerRefetch();
            onClose();
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to create blog");
        } finally {
            setIsLoading(false);
        }
    };


    const handleRemoveImage = (index) => {
        setImages(prev => {
            const newArr = [...prev];
            newArr.splice(index, 1);
            return newArr;
        });
        setFileName(prevNames => {
            const namesArray = prevNames.split(", ").filter((_, i) => i !== index);
            return namesArray.length > 0 ? namesArray.join(", ") : "No file chosen";
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
            <div className="bg-white rounded-lg shadow-lg w-full lg:w-1/3 p-6 relative text-[#323232]">
                <h3 className="text-xl font-bold mb-4">Create Blog</h3>
                <div className="flex flex-col gap-4">

                    <div className="flex flex-col">
                        <label>Title</label>
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label>Author</label>
                        <input
                            type="text"
                            placeholder="Author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>


                    <div className="flex flex-col">
                        <label>Content</label>
                        <textarea
                            placeholder="Content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>


                    <div className="flex flex-col gap-2">
                        <label className="font-semibold">Upload Images</label>
                        <div className="flex items-center gap-3">
                            <label
                                htmlFor="imageUpload"
                                className="px-4 py-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300 transition"
                            >
                                Choose Files
                            </label>
                            <span className="text-sm text-gray-600 truncate">{fileName}</span>
                            <input
                                id="imageUpload"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>


                        {images.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                                {images.map((img, idx) => (
                                    <div key={idx} className="relative">
                                        <img
                                            src={URL.createObjectURL(img)}
                                            alt={`selected ${idx}`}
                                            className="h-16 w-16 object-cover rounded"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(idx)}
                                            className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-1 hover:bg-red-800"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleCreate}
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                            {isLoading ? (
                                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                </svg>
                            ) : "Save"}
                        </button>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default BlogModal;
