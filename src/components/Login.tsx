import React, { useState, FormEvent } from "react";
import { login } from "../utils/apiUtils";
import { Link, navigate } from "raviger";

type credentialsData = {
  username: string;
  password: string;
};

function Login() {
  const [credentialsData, setCredentialsData] = useState<credentialsData>({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await login(credentialsData);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      console.log("The error is from Login.tsx Line 23.");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl text-gray-700 font-semibold text-center my-2">
        Login
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
              className="border-2 border-gray-200 rounded-md p-2"
              type="text"
              name="username"
              id="username"
              onChange={(e) => {
                // setUsername(e.target.value);
                setCredentialsData({
                  ...credentialsData,
                  username: e.target.value,
                });
              }}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              className="border-2 border-gray-200 rounded-md p-2"
              type="password"
              name="password"
              id="password"
              onChange={(e) => {
                // setPassword(e.target.value);
                setCredentialsData({
                  ...credentialsData,
                  password: e.target.value,
                });
              }}
            />
          </div>
          <div className="flex justify-center">
            <button
              className=" bg-blue-500 text-white px-4 py-2 rounded-md"
              type="submit"
            >
              Login
            </button>
          </div>
        </div>
      </form>
      <div className="flex gap-2 mt-4">
        <p className="text-gray-700">Don't have an account?</p>
        <Link href="/registration">Register</Link>
      </div>
    </div>
  );
}

export default Login;
