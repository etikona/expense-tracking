"use client";
import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(formData);
  };

  const handleLogin = async (formData) => {
    try {
      // *Fetch user data from the backend filtered by email
      const response = await axios.get(
        `https://expense-back-f70o.onrender.com/api/register?email=${formData.email}`
      );

      const users = response.data;
      if (users.length === 0) {
        toast.error("User not found");
        return;
      }
      const user = users[0];
      if (user.password === formData.password) {
        toast.success("You have successfully Logged in");
        router.push("/settings");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Server error");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };
  return (
    <div className="login-container">
      <div className="login-background">
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="form-title">Login</h2>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
