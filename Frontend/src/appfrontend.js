import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Link } from "react-router-dom";

import "./styles.css";

function App() {
  const Register = () => {
    // define hooks
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });

    // Function to add input in formData HOOK using operator ...
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    // Function to fetch backend for POST - it sends data in BODY
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(e.target.value);

      fetch("http://127.0.0.1:4000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (response.status != 200) {
            return response.json().then((errData) => {
              throw new Error(
                `POST response was not ok :\n Status:${response.status}. \n Error: ${errData.error}`
              );
            });
          }
          return response.json();
        })

        .then((data) => {
          console.log(data);
          alert("User added successfully!");
          navigate("/"); // Redirect to home page after successful registration
        })

        .catch((error) => {
          console.error("Error adding User:", error);
          alert("Error adding User:" + error.message); // Display alert if there's an error
        });
    };

    // return
    return (
      <div>
        {/* Form to input data */}
        <form onSubmit={handleSubmit} class="login-form">
          <h1>Register</h1>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            class="login-input"
          />{" "}
          <br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            class="login-input"
          />{" "}
          <br />
          <div class="form-footer">
            <p class="form-paragraph">Already have an account? </p>
            <Link to="/login" class="register-link">
              Login
            </Link>{" "}
            <br />
          </div>
          <button type="submit" class="login-button">
            Register
          </button>
        </form>
      </div>
    );
  };

  const Login = () => {
    // define hooks
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });

    // Function to add input in formData HOOK using operator ...
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    // Function to fetch backend for POST - it sends data in BODY
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(e.target.value);

      fetch("http://127.0.0.1:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (response.status != 200) {
            return response.json().then((errData) => {
              throw new Error(
                `POST response was not ok :\n Status:${response.status}. \n Error: ${errData.error}`
              );
            });
          }
          return response.json();
        })

        .then((data) => {
          console.log(data);
          alert("User logged in successfully!");
          navigate("/"); // Redirect to home page after successful login
        })

        .catch((error) => {
          console.error("Error logging in:", error);
          alert("Error logging in:" + error.message); // Display alert if there's an error
        });
    };

    // return
    return (
      <div>
        {/* Form to input data */}
        <form onSubmit={handleSubmit} class="login-form">
          <h1>Login</h1>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            class="login-input"
          />{" "}
          <br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            class="login-input"
          />{" "}
          <br />
          <div class="form-footer">
            <p class="form-paragraph">Don't have an account? </p>
            <Link to="/register" class="register-link">
              Register
            </Link>{" "}
            <br />
          </div>
          <button type="submit" class="login-button">
            Login
          </button>
        </form>
      </div>
    );
  };

  const MainPage = () => {
    const navigate = useNavigate();

    return <div></div>;
  };

  return (
    <Router>
      <div>
        <nav id="navbar">
          <button class="navButton">
            <Link to="/">Home</Link>
          </button>
          <button class="navButton">
            <Link to="/Login">Login</Link>
          </button>
          <button class="navButton">
            <Link to="/Register">Register</Link>
          </button>
          <button class="navButton">
            <Link to="/about">ABOUT THE TEAM</Link>
          </button>
        </nav>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
} // App end

export default App;
