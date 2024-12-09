import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { setUser } from "@/redux/authSlice"; 
import { Loader2 } from "lucide-react";
import Footer from "../Footer";
import { USER_API_END_POINT } from "@/utils/constant";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading,user } = useSelector((store) => store.auth);
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("email", input.email);

    formData.append("password", input.password);
    formData.append("role", input.role);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        navigate("/");
        toast.success(res.data.message);
        setInput({email: "",
          password: "",
          role: ""
        })
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setInput({email: "",
        password: "",
        role: ""
      })
    } finally {
      dispatch(setLoading(false));
      setInput({email: "",
        password: "",
        role: ""
      })
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
  <div className="flex items-center justify-center min-h-screen">
    <form
      className="w-full sm:w-1/2 lg:w-1/3 border-2 border-gray-300 rounded-lg shadow-lg p-6 bg-white"
      onSubmit={submitHandler}
    >
      <h1 className="text-2xl font-bold text-center mb-6 border-b-2 border-gray-300 pb-2">
        Login
      </h1>

      <div className="mb-4">
        <Label>Email</Label>
        <Input
          type="email"
          value={input.email}
          name="email"
          onChange={changeEventHandler}
          placeholder="Enter your Email Id"
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <Label>Password</Label>
        <Input
          type="password"
          value={input.password}
          name="password"
          onChange={changeEventHandler}
          placeholder="***********"
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <RadioGroup className="flex justify-between my-5">
          <div className="flex items-center">
            <Input
              type="radio"
              name="role"
              value="student"
              checked={input.role === "student"}
              onChange={changeEventHandler}
              className="cursor-pointer"
            />
            <Label className="ml-2">Student</Label>
          </div>
          <div className="flex items-center">
            <Input
              type="radio"
              name="role"
              value="recruiter"
              checked={input.role === "recruiter"}
              onChange={changeEventHandler}
              className="cursor-pointer"
            />
            <Label className="ml-2">Recruiter</Label>
          </div>
        </RadioGroup>
      </div>

      {loading ? (
        <Button className="w-full bg-[#6A38C2] py-3 text-white flex justify-center items-center rounded-md">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-white font-semibold rounded-md border border-gray-300"
        >
          Login
        </Button>
      )}

      <div className="mt-6 text-center">
        <span>
          Don't have an account?{" "}
          <Link className="text-blue-600 hover:underline" to="/signup">
            Sign Up
          </Link>
        </span>
      </div>
    </form>
  </div>
  <Footer />
</div>

  );
}

export default Login;
