"use client";
import axios from "axios";
// pages/signup.js
import Link from "next/link";
import { useState } from "react";

const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const onChangeInput = (e: any, felidName: string) => {
    setUserDetails({ ...userDetails, [felidName]: e.target.value });
  };

  const onClickSubmit = async () => {
    const res = await axios.post("/api/auth", userDetails);
    console.log(res);
    return true;
  };
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            Create an account
          </h2>
        </div>
        <form
          onSubmit={onClickSubmit}
          className="mt-8 space-y-6"
          action="#"
          method="POST"
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={userDetails.userName}
                onChange={(e) => onChangeInput(e, "userName")}
                autoComplete="name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 bg-slate-100 placeholder-gray-500 text-gray-900 rounded-t-md my-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Name"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                value={userDetails.email}
                onChange={(e) => onChangeInput(e, "email")}
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 bg-slate-100 placeholder-gray-500 text-gray-900 rounded-b-md my-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={userDetails.password}
                onChange={(e) => onChangeInput(e, "password")}
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 bg-slate-100 placeholder-gray-500 text-gray-900 rounded-b-md my-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
          </div>
        </form>

        <div className="text-sm">
          <p className="text-gray-600">Already have an account?</p>
          <Link href="/login">
            <span className="font-medium text-indigo-600 hover:text-indigo-500">
              Log in
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
