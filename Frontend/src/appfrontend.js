// Author: Jacob Frencher
// ISU Netid : jacoblf@iastate.edu
// Date :  April 27, 2024

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

function App() {

    const Signup = () => {
        // define hooks
        const navigate = useNavigate();
        const [formData, setFormData] = useState({
            email: "",
            password: ""
        });

        // Function to add input in formData HOOK using operator ...
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        };

        // Function to fetch backend for POST - it sends data in BODY
        const handleSubmit = (e) => {
            e.preventDefault();
            console.log(e.target.value);

            fetch("http://127.0.0.1:4000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            .then(response => {
                if (response.status != 200){
                    return response.json()
                    .then(errData =>{
                        throw new Error(`POST response was not ok :\n Status:${response.status}. \n Error: ${errData.error}`);
                    })
                }
                return response.json();})

            .then(data => {
                console.log(data);
                alert("User added successfully!");
            })

            .catch(error => {
                console.error('Error adding User:', error);
                alert('Error adding User:'+error.message); // Display alert if there's an error
            });
        }

        // return
        return (<div>
            {/* Form to input data */}
            <form onSubmit={handleSubmit}>
                <h1>Signup</h1>
                <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required /> <br />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required /> <br />
                <button type="submit">Submit</button>
            </form>
        </div>);
    }

    const Login = () => {
        // define hooks
        const navigate = useNavigate();
        const [formData, setFormData] = useState({
            email: "",
            password: ""
        });

    // Function to add input in formData HOOK using operator ...
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Function to fetch backend for POST - it sends data in BODY
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.value);

        fetch("http://127.0.0.1:4000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })

        .then(response => {
            if (response.status != 200){
                return response.json()
                .then(errData =>{
                    throw new Error(`POST response was not ok :\n Status:${response.status}. \n Error: ${errData.error}`);
                })
            }
            return response.json();})

        .then(data => {
            console.log(data);
            alert("User logged in successfully!");
        })

        .catch(error => {
            console.error('Error logging in:', error);
            alert('Error logging in:'+error.message); // Display alert if there's an error
        });
    }

    // return
    return (<div>
        {/* Form to input data */}
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required /> <br />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required /> <br />
            <button type="submit">Submit</button>
        </form>
    </div>);
}

    return (
    <Router>
        <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </Router>
    );
} // App end


export default App;