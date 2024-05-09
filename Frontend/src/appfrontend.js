import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Link } from "react-router-dom";
import "./styles.css";

import './styles.css';

const secretKey = process.env.JWT_SECRET_KEY;

function App() {

    var signedInUser = null;

    const Register = () => {
        // define hooks
        const navigate = useNavigate();
        const [formData, setFormData] = useState({
            email: "",
            password: ""
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
                signedInUser = formData.email;
                navigate("/"); // Redirect to home page after successful registration
            })

            .catch(error => {
                console.error('Error adding User:', error);
                alert('Error adding User:'+error.message); // Display alert if there's an error
            });
        }

        // return
        return (<div>
                    <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand">RateMyApartment</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation"></button>
                        <div className="collapse navbar-collapse" id="navbarColor01">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <button className="nav-link " aria-current="page" onClick={() => navigate('/')}>Home</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={() => navigate('/login')}>Login</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={() => navigate('/register')}>Register</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            {/* Form to input data */}
            <form onSubmit={handleSubmit} className="login-form">
                <h1>Register</h1>
                <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="login-input" /> <br />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="login-input"/> <br />
                <div className="form-footer">
                    <p className="form-paragraph">Already have an account?  </p>
                    <Link to="/login" className="register-link">Login</Link> <br />
                </div>
                <button type="submit" className="login-button">Register</button>
            </form>
        </div>);
    }

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

        .then(data => {
            console.log(data);
            alert("User logged in successfully!:" + data.user);
            signedInUser = data.user;
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
                <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand">RateMyApartment</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation"></button>
                        <div className="collapse navbar-collapse" id="navbarColor01">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <button className="nav-link " aria-current="page" onClick={() => navigate('/')}>Home</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={() => navigate('/login')}>Login</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={() => navigate('/register')}>Register</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
        {/* Form to input data */}
        <form onSubmit={handleSubmit} className="login-form">
            <h1>Login</h1>
            <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="login-input" /> <br />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="login-input" /> <br />
            <div className="form-footer">
                <p className="form-paragraph">Don't have an account?  </p>
                <Link to="/register" className="register-link">Register</Link> <br />
            </div>
            <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    );
  };


  const MainPage = () => {
    const navigate = useNavigate();
    const [oneProduct, setOneProduct] = useState([]);
    const [id, setId] = useState("");

    useEffect(() => {
        if (id) {
        fetch(`http://127.0.0.1:4000/apartment/${id}`)
        .then((response) => response.json())
        .then((data) => {
        console.log("Show one apartment :", data);
        setOneProduct(data);
        });
        }
        }, [id]);


    return(
    <div>
        <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand">RateMyApartment</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation"></button>
                        <div className="collapse navbar-collapse" id="navbarColor01">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <button className="nav-link " aria-current="page" onClick={() => navigate('/')}>Home</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={() => navigate('/login')}>Login</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={() => navigate('/register')}>Register</button>
                                </li>
                            </ul>
                        </div>
            </div>
        </nav>
        <div className="search">
            <div className="searchInput">
                <input type="text" placeholder="Enter apartment" onChange={(e) => setId(e.target.value)} />
                <div className="searchIcon"> 
                </div>
            </div>
            <div className="searchResults">
            {oneProduct.map((el) => (
                <div key={el.id}>
                  <button className ="searchAptBtn"onClick={() => navigate(`/apartment/${el.id}`)}>{el.name}</button>
                </div>
                ))}
            </div>
        </div>
        <div className="addReview">
            <button className="addReviewBtn" type="button" onClick={() => navigate('/addapartment')}>Add a Review</button>
        </div>
    </div>);
  };

  const AddApartment = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      aptName: "",
      facilities: "",
      happiness: "",
      safety: "",
      internet: "",
      location: "",
      management: "",
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(e.target.value);

      fetch("http://127.0.0.1:4000/addapartment", {
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

    .then(data => {
        console.log(data);
        alert("Review added successfully!");
        navigate("/"); // Redirect to home page after successful review add
    })

    .catch((error) => {
      console.error("Error logging in:", error);
      alert("Error logging in:" + error.message); // Display alert if there's an error
    });
  };

  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand">RateMyApartment</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation"></button>
                        <div className="collapse navbar-collapse" id="navbarColor01">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <button className="nav-link " aria-current="page" onClick={() => navigate('/')}>Home</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={() => navigate('/login')}>Login</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={() => navigate('/register')}>Register</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

        {/* Form to input data */}
        <form onSubmit={handleSubmit} className="login-form" style={{marginTop: '400px', backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px'}}>
            <h1 style={{textAlign: 'center', color: '#6c757d'}}>Add an Apartment</h1>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                <h2 style={{marginRight: '10px'}}>Apartment: </h2>
                <input type="text" name="aptName" value={formData.aptName} onChange={handleChange} required className="login-input" />
            </div>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                      <h4>Facilities:</h4>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', border: 'none'}}>
                      <input type="range" id="facilities" name="facilities" min="0" max="5" value={formData.facilities} onChange={handleChange} required className="login-input" />
                      <input type="text" readOnly value={formData.facilities} style={{marginLeft: '10px', width: '50px', border: 'none'}}/>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                      <h4>Happiness:</h4>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', border: 'none'}}>
                      <input type="range" id="happiness" name="happiness" min="0" max="5" value={formData.happiness} onChange={handleChange} required className="login-input" />
                      <input type="text" readOnly value={formData.happiness} style={{marginLeft: '10px', width: '50px', border: 'none'}}/>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                      <h4>Safety:</h4>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', border: 'none'}}>
                      <input type="range" id="safety" name="safety" min="0" max="5" value={formData.safety} onChange={handleChange} required className="login-input" />
                      <input type="text" readOnly value={formData.safety} style={{marginLeft: '10px', width: '50px', border: 'none'}}/>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                      <h4>Internet:</h4>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', border: 'none'}}>
                      <input type="range" id="internet" name="internet" min="0" max="5" value={formData.internet} onChange={handleChange} required className="login-input" />
                      <input type="text" readOnly value={formData.internet} style={{marginLeft: '10px', width: '50px', border: 'none'}}/>
                  </div>
                  <div style= {{display: 'flex', alignItems: 'center'}}>
                      <h4>Location:</h4>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', border: 'none'}}>
                      <input type="range" id="location" name="location" min="0" max="5" value={formData.location} onChange={handleChange} required className="login-input" />
                      <input type="text" readOnly value={formData.location} style={{marginLeft: '10px', width: '50px', border: 'none'}}/>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                      <h4>Management:</h4>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', border: 'none'}}>
                      <input type="range" id="management" name="management" min="0" max="5" value={formData.management} onChange={handleChange} required className="login-input" />
                      <input type="text" readOnly value={formData.management} style={{marginLeft: '10px', width: '50px', border: 'none'}}/>
                  </div>
                <button type="submit" className="login-button" style={{backgroundColor: '#6c757d', color: 'white', padding: '10px 20px', borderRadius: '5px', marginTop: '20px'}}>Submit</button>
        </form>
    </div>
  );
};

  const Apartment = () => {
    const navigate = useNavigate();
    return(
    <div>
        <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand">RateMyApartment</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation"></button>
                        <div className="collapse navbar-collapse" id="navbarColor01">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <button className="nav-link " aria-current="page" onClick={() => navigate('/')}>Home</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={() => navigate('/login')}>Login</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={() => navigate('/register')}>Register</button>
                                </li>
                            </ul>
                        </div>
            </div>
        </nav>
    </div>)
  }

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addapartment" element={<AddApartment />} />
          <Route path="/apartment/:id" element={<Apartment />} />
        </Routes>
      </div>
    </Router>
  );
} // App end

export default App;
