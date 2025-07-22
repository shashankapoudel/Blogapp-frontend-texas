// const BASE_URL = "http://localhost:8000/api";

// export default BASE_URL;




const BASE_URL =
    import.meta.env.MODE === "development"
        ? "http://localhost:8000/api"
        : "https://blogapp-backend-texas.onrender.com/";

export default BASE_URL;