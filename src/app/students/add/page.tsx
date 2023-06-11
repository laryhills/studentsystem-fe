"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { createStudentFromAPI } from "@/utils/dataproviders/students";
import { toast } from "react-toastify";
import { ErrorResponse, Student, SuccessResponse } from "@/utils/types";

type Inputs = {
  name: string;
  email: string;
  phone: string;
  address: string;
  dob: string;
  age: number;
  sex: string;
};

export default function Page() {
  const mutation = useMutation<SuccessResponse, ErrorResponse, Student>(
    createStudentFromAPI,
    {
      onSuccess: (data) => {
        setTimeout(() => {
          toastId.current &&
            toast.update(toastId.current, {
              render: data.message,
              type: "success",
              isLoading: false,
              autoClose: 4000,
            });
          reset();
        }, 1000);
      },
      onError: ({ data }) => {
        setTimeout(() => {
          toastId.current &&
            toast.update(toastId.current, {
              render: data?.message,
              type: "error",
              isLoading: false,
              autoClose: 4000,
            });
        }, 1000);
      },
    }
  );

  const toastId = React.useRef<string | number | null>(null); // Set the initial value of toastId to null

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    toastId.current = toast("Loading", {
      type: "info",
      isLoading: true,
    });
    mutation.mutate(data);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-center p-4 font-bold uppercase">Add student</h1>
      {mutation.isError && (
        <div className="alert alert-error my-2 w-full max-w-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{mutation.error.data?.message}</span>
        </div>
      )}
      <div className="card flex-shrink-0 w-full max-w-lg card-bordered shadow-2xl bg-base-100">
        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              id="name"
              {...register("name", { required: true, maxLength: 80 })}
              type="text"
              placeholder="name"
              className={`input input-bordered ${
                errors.name ? "input-error" : ""
              }`}
            />
            {errors.name && (
              <label className="label">
                <span className="label-text-alt text-error">
                  Name is required
                </span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              type="email"
              placeholder="email"
              className={`input input-bordered ${
                errors.email ? "input-error" : ""
              }`}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone</span>
            </label>
            <input
              {...register("phone", {
                required: true,
                minLength: 11,
                maxLength: 11,
              })}
              type="text"
              placeholder="phone"
              className={`input input-bordered ${
                errors.phone ? "input-error" : ""
              }`}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <textarea
              {...register("address", { required: true })}
              className={`textarea textarea-bordered h-24 ${
                errors.address ? "textarea-error" : ""
              }`}
              placeholder="Address"
            ></textarea>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Sex</span>
            </label>
            <select
              className="select select-bordered w-full max-w-xs"
              defaultValue=""
              {...register("sex", { required: true })}
            >
              <option disabled value="">
                Select an option
              </option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>

          {/* date must be at least 17 yrs old */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Date of Birth</span>
            </label>
            <input
              {...register("dob", { required: true })}
              type="date"
              className={`input input-bordered ${
                errors.dob ? "input-error" : ""
              }`}
              max={
                new Date(new Date().setFullYear(new Date().getFullYear() - 17))
                  .toISOString()
                  .split("T")[0]
              }
            />
          </div>

          {/* errors will return when field validation fails  */}
          {/* {errors.exampleRequired && (
            <div className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>This field is required</span>
            </div>
          )} */}

          <div className="form-control mt-6">
            <button className="btn btn-secondary">
              {mutation.isLoading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Loading
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
