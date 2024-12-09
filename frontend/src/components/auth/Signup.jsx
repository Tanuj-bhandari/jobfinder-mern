import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import Footer from "../Footer";
import { USER_API_END_POINT } from "@/utils/constant";

function Signup() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading,user } = useSelector((store) => store.auth);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_END_POINT}/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
        setInput({
          fullname: "",
          email: "",
          phoneNumber: "",
          password: "",
          role: "",
          file: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(()=>{
    if(user){
        navigate("/");
    }
},[])
  return (
    <div>
    <Navbar />
    <div className="flex sm:items-center sm:justify-center max-w-7xl mx-auto">
      <form
        className="w-full sm:w-1/2 border-2 border-gray-300 rounded-md p-4 my-10"
        onSubmit={submitHandler}
      >
        <h1 className="font-bold text-xl mb-5">Sign Up</h1>
  
        <div className="my-2">
          <Label>Full Name</Label>
          <Input
            type="text"
            value={input.fullname}
            name="fullname"
            onChange={changeEventHandler}
            placeholder="Enter your Full Name"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
  
        <div className="my-2">
          <Label>Email</Label>
          <Input
            type="email"
            value={input.email}
            name="email"
            onChange={changeEventHandler}
            placeholder="Enter your Email Id"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
  
        <div className="my-2">
          <Label>Contact Number</Label>
          <Input
            type="number"
            value={input.phoneNumber}
            name="phoneNumber"
            onChange={changeEventHandler}
            placeholder="+91"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
  
        <div className="my-2">
          <Label>Password</Label>
          <Input
            type="password"
            value={input.password}
            name="password"
            onChange={changeEventHandler}
            placeholder="***********"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
  
        <div className="flex items-center justify-between">
          <RadioGroup className="flex items-center gap-4 my-5">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="student"
                checked={input.role === "student"}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label>Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label>Recruiter</Label>
            </div>
          </RadioGroup>
  
          <div className="flex items-center gap-2">
            <Label>Profile</Label>
            <Input
              accept="image/*"
              type="file"
              onChange={changeFileHandler}
              className="cursor-pointer"
            />
          </div>
        </div>
  
        {loading ? (
          <Button className="w-full bg-blue-500 my-4">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-full bg-blue-500 my-4"
          >
            Sign Up
          </Button>
        )}
        
        <span>
          Already have an account?{" "}
          <Link className="text-blue-600" to="/login">
            Log In
          </Link>
        </span>
      </form>
    </div>
    <Footer />
  </div>
  
  
  );
}

export default Signup;
