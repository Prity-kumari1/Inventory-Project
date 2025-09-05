import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/Input";
import axios from "axios";
import handleAxiosError from "../../utils/handleAxiosErroe";
import Button from "../../components/Button";
function Signup() {
  const [data, setData] = useState({ emailId: "", password: "", confirmpassword: "" });


  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });


  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    if (!data.emailId.trim() || !data.password.trim()) {
      return alert("Please fill all the fields");
    }
    // Confirm password check
    if (data.password !== data.confirmpassword) {
      return alert("Passwords do not match");

    }
    try {
      const res = await axios.post("http://localhost:8080/auth/signup", data);
      alert(res.data.message); //   success msg from backend

    } catch (error) {
      alert(handleAxiosError(error)); //  Reusable error handler
    }
  };

  const isFormFilled =
    data.emailId.trim() && data.password.trim() && data.confirmpassword.trim();
  return (
    <div className="flex flex-col justify-between min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Centered Card */}
      <div className="flex items-center justify-center flex-grow">
        <div className="bg-white rounded-2xl p-8 w-full shadow-none md:shadow-lg max-w-sm">
          {/* Title & Subtitle */}
          <h2 className="text-[32px] leading-tight font-bold text-gray-800 mb-1 ">
            Sign Up
          </h2>
          <p className="text-[14px] text-gray-500 mb-6">
            Create an account to continue!           </p>

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
            <Input
              type="password"
              name="confirmpassword"
              value={data.confirmpassword}
              onChange={handleChange}
              placeholder="Confirm password"
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
            <Button type="submit" isActive={!!isFormFilled}>
              Signup
            </Button>
          
          </form>
        </div>
      </div>

      <p className="text-center text-sm text-gray-600 mb-4">
        have an account?{" "}
        <Link
          to="/login"
          className="text-blue-500 font-medium hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default Signup;
