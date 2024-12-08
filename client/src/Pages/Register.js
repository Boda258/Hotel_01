import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import validator from "validator";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const navigate = useNavigate();

  async function register() {
    // Validate email
    if (!validator.isEmail(email)) {
      alert("Invalid email format");
      return;
    }
    // Validate password strength
    if (!validator.isStrongPassword(password, { minLength: 8, minSymbols: 1 })) {
      alert("Password must be at least 8 characters long and include at least one symbol.");
      return;
    }
    if (password !== confirmpassword) {
      alert("Passwords do not match");
      return;
    }
    const user = {
      username,
      email,
      password,
      confirmpassword,
    };

    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000"; // Fallback to localhost
      const result = await axios.post(`${apiUrl}/api/users/register`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(result.data);
      alert("Registered Successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error.response ? error.response.data : error.message);

      // Provide specific feedback based on the backend response
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message || "Invalid registration details.");
      } else if (error.response && error.response.status === 500) {
        alert("Server error. Please try again later.");
      } else {
        alert("Registration failed. Please check your network connection.");
      }
    }
  }
  return (
    <div>
      <div className="row justify-content-center align-items-center mt-5">
        <div className="col-md-5 mt-5">
          <div className="bs">
            <h2>Register</h2>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={confirmpassword}
              onChange={(e) => setconfirmpassword(e.target.value)}
            />
            <button className="btn btn-primary w-100 mt-3" onClick={register}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
