import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/Input";
import axios from "axios";
import handleAxiosError from "../../utils/handleAxiosErroe";
import Button from "../../components/Button";
function Login() {
  const [data, setData] = useState({ emailId: "", password: "" });


  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    if (!data.emailId.trim() || !data.password.trim()) {
      return alert("Please fill all the fields"); // ✅ Ye alert aayega
    }
    try {
      const res = await axios.post("http://localhost:8080/auth/login", data);
      localStorage.setItem("token", res.data.token);
      alert(res.data.message); //  success message from backend
      // 🔹 Redirect to home page
      window.location.href = "/";
    } catch (error) {
      alert(handleAxiosError(error)); //Reusable error handler
    }

  };
  const isFormFilled =
    data.emailId.trim() && data.password.trim();



  return (
    <div className="flex flex-col justify-between min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Centered Card */}
      <div className="flex items-center justify-center flex-grow">
        <div className="bg-white rounded-2xl p-8 w-full shadow-none md:shadow-lg max-w-sm">
          {/* Title & Subtitle */}
          <h2 className="text-[32px] leading-tight font-bold text-gray-800 mb-1 ">
            Sign in to your Account
          </h2>
          <p className="text-[14px] text-gray-500 mb-6">
            Enter your email and password to log in
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <Input
              type="email"
              name="emailId"
              value={data.emailId}
              onChange={handleChange}
              placeholder="Enter Email ID"
            />

            {/* Password */}
            <Input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Password"
            />

            <div className="text-center">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot Password ?
              </Link>
            </div>

            {/* Login Button */}
            {/* Button me isActive pass karo */}
            <Button type="submit" isActive={isFormFilled}>
              Login
            </Button>
            {/* <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Login
            </button> */}
          </form>
        </div>
      </div>

      {/* Bottom Signup */}
      <p className="text-center text-sm text-gray-600 mb-4">
        Don’t have an account?{" "}
        <Link
          to="/signup"
          className="text-blue-500 font-medium hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default Login;
