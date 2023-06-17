import React, { FormEvent, useState } from "react";
import { register } from "../utils/apiUtils";
import { Link, navigate } from "raviger";

type RegistrationData = {
  username: string;
  email: string;
  password1: string;
  password2: string;
};

function Registration() {
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  const handleRegistration = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await register(registrationData);
      if (data.detail === "Verification e-mail sent.") {
        navigate("/login");
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log("The error is from Registration.tsx Line 30.");
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl text-gray-700 font-semibold text-center my-2">
        Registration
      </h1>
      <form onSubmit={handleRegistration}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
              className="border-2 border-gray-200 rounded-md p-2"
              type="text"
              name="username"
              id="username"
              onChange={(e) => {
                setRegistrationData({
                  ...registrationData,
                  username: e.target.value,
                });
              }}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              className="border-2 border-gray-200 rounded-md p-2"
              type="email"
              name="email"
              id="email"
              onChange={(e) => {
                setRegistrationData({
                  ...registrationData,
                  email: e.target.value,
                });
              }}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password1">Password</label>
            <input
              className="border-2 border-gray-200 rounded-md p-2"
              type="password"
              name="password1"
              id="password1"
              onChange={(e) => {
                setRegistrationData({
                  ...registrationData,
                  password1: e.target.value,
                });
              }}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password2">Confirm Password</label>
            <input
              className="border-2 border-gray-200 rounded-md p-2"
              type="password"
              name="password2"
              id="password2"
              onChange={(e) => {
                setRegistrationData({
                  ...registrationData,
                  password2: e.target.value,
                });
              }}
            />
          </div>
          <div className="flex justify-center">
            <button
              className=" bg-blue-500 text-white px-4 py-2 rounded-md"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
      <div className="flex gap-2 mt-4">
        <p className="text-gray-700">Already have an account?</p>
        <Link href="/login">Login</Link>
      </div>
    </div>
  );
}

export default Registration;
