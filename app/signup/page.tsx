"use client";

import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../../utils/schema";
import { toast } from "react-toastify";

type Input = {
  name: string;
  email: string;
  password: string;
};

const Signup = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({
    // resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = useCallback(async (d) => {
    // axios
    //   .post("/api/greet", d)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // try {
    //   const res = await axios.post("/api/greet", d);
    //   if (res) {
    //     toast.success("Signed up successfully");
    //   } else {
    //     toast.error("Something went wrong");
    //   }
    // } catch (error) {
    //   toast.error("Something went wrong");
    // }

    // await axios.post(
    //   "/api/register",
    //   {
    //     name: d.name,
    //     email: d.email,
    //     password: d.password,
    //   },
    //   {
    //     withCredentials: true,
    //   }
    // );
    // alert("You've created a new account successfully");
    // router.push("/signin");

    try {
      const res = await axios.post("http://localhost:8080/signup", d);
      if (res.data.isValid === false) {
        toast.error("Email already exists");
        return;
      }
      if (res) {
        toast.success("Signed up successfully"); // TODO: Put in inside a setTimeout function
      } else {
        toast.error("Something went wrong");
      }
      const token = res.headers["authorization"]?.replace("Bearer ", "");
      const refreshToken = res.data.refreshToken;
      if (token && refreshToken) {
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
      }
      router.push("/");
    } catch (error) {
      toast.error("Something went wrong");
    }
  });
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="text-center text-2xl font-bold">
          <span className="text-indigo-600 bg-indigo-100">ryde</span> with us.
        </div>
        <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create a new account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                {...register("name")}
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {/* {errors.name && <p>{errors.name.message}</p>} */}
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                {...register("email")}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {/* {errors.email && <p>{errors.email.message}</p>} */}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                {...register("password")}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {/* {errors.password && <p>{errors.password.message}</p>} */}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
          </div>
        </form>

        <div className="mt-4">
          <div className="text-center">Or continue with</div>
          <div className="mt-4 flex items-center justify-center gap-2">
            <button className="w-1/2 px-6 sm:px-8 py-2 border-[2px] rounded-lg flex items-center justify-center gap-2">
              <FcGoogle size={18} />
              Google
            </button>
            <button className="w-1/2 px-6 sm:px-8 py-2 border-[2px] rounded-lg flex items-center justify-center gap-2">
              <AiFillGithub size={18} />
              GitHub
            </button>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?{" "}
          <a
            href="#"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
