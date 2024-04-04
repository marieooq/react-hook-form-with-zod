import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = { email: string; password: string };

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          {...register("email", {
            required: "Email is required",
            validate: (value: string) => {
              if (!value.includes("@")) {
                return "Email must include @.";
              } else {
                return true;
              }
            },
          })}
          type="email"
          id="email"
          className="border-solid border-2 border-indigo-600"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          type="password"
          id="password"
          className="border-solid border-2 border-indigo-600"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>
      <button
        type="submit"
        className="text-white border-solid border-2 border-indigo-600 bg-indigo-600 p-2 rounded-md mt-2"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default Form;
