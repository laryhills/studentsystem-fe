import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { ErrorResponse, LoginUser, SuccessResponse } from "@/utils/types";
import { loginUserAPI } from "../services/dataproviders/auth.providers";
import { useRouter } from "next/navigation";

type Inputs = {
  username: string;
  password: string;
};

export const Login = () => {
  const router = useRouter();
  const mutation = useMutation<SuccessResponse, ErrorResponse, LoginUser>(
    loginUserAPI,
    {
      onSuccess: (data) => {
        const token = data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("user_details", JSON.stringify(data.data[0]));
        toastId.current &&
          toast.update(toastId.current, {
            render: data.message,
            type: "success",
            isLoading: false,
            autoClose: 4000,
          });
        window.location.href = "/";
      },
      onError: ({ data }) => {
        toastId.current &&
          toast.update(toastId.current, {
            render: data?.message,
            type: "error",
            isLoading: false,
            autoClose: 4000,
          });
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
    <div className="hero min-h-screen w-full bg-base-200 text-neutral">
      <div className="hero-content w-full ">
        <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                {...register("username", { required: true })}
                type="text"
                placeholder="username"
                className={`input input-bordered ${
                  errors.username ? "input-error" : ""
                }`}
              />
              {errors.username && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    Username is required
                  </span>
                </label>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="password"
                className={`input input-bordered ${
                  errors.password ? "input-error" : ""
                }`}
              />
              {errors.password && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    Password is required
                  </span>
                </label>
              )}

              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-secondary">
                {mutation.isLoading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Loading
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
