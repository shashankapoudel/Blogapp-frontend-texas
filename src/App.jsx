import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import Blog from "./Pages/Blog";

function App() {
  const [user, setUser] = useState(null);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Header user={user} setUser={setUser} triggerRefetch={() => setShouldRefetch(prev => !prev)} />
        <Routes>
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login user={user} setUser={setUser} />}
          />
          <Route
            path="/"
            element={user ? <Home refetchSignal={shouldRefetch} /> : <Navigate to="/register" />}
          />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route
            path="*"
            element={
              <div className="text-center text-xl mt-10 font-semibold">
                404 - Page Not Found
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

