import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { updateStudentFromAPI } from "@/app/services/dataproviders/students.provider";
import { toast } from "react-toastify";
import {
  ErrorResponse,
  Student,
  SuccessResponse,
  UpdateStudent,
} from "@/utils/types";
import classnames from "classnames";

interface Props {
  student: Student | null;
  updateStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  closeEditModal: () => void;
  updateStudent: React.Dispatch<React.SetStateAction<Student | null>>;
  modalOpen: boolean;
}

type Inputs = {
  phone: string;
  address: string;
};

export default function EditStudentModal({
  student,
  updateStudents,
  closeEditModal,
  updateStudent,
  modalOpen,
}: Props) {
  const modalClass = classnames("modal modal-bottom sm:modal-middle", {
    "modal-open": modalOpen,
  });

  const mutation = useMutation<SuccessResponse, ErrorResponse, UpdateStudent>(
    updateStudentFromAPI,
    {
      onSuccess: (data) => {
        // add stundets to prev list
        updateStudents((prev) => {
          const index = prev.findIndex((s) => s.id === student?.id);
          prev[index] = { ...prev[index], ...data.data[0] };
          return prev;
        });
        toastId.current &&
          toast.update(toastId.current, {
            render: data.message,
            type: "success",
            isLoading: false,
            autoClose: 4000,
          });
        closeEditModal();
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>({
    values: {
      phone: student?.phone ? student?.phone : "",
      address: student?.address ? student?.address : "",
    },
  });
  const toastId = React.useRef<string | number | null>(null); // Set the initial value of toastId to null

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const currentValues = watch();

    if (
      currentValues.phone === student?.phone &&
      currentValues.address === student?.address
    ) {
      toastId.current = toast("No changes detected", {
        type: "info",
        isLoading: false,
        autoClose: 4000,
      });
      closeEditModal();
      return;
    }

    toastId.current = toast("Loading", {
      type: "info",
      isLoading: true,
    });
    const payload = student?.id
      ? { ...data, id: student?.id }
      : { ...data, id: 0 };
    mutation.mutate(payload);
  };

  if (!student) return;

  const handleModalClose = () => {
    updateStudent(null); // Reset the student state to null
    closeEditModal();
  };

  return (
    <dialog id="edit_student_modal" className={modalClass}>
      <form
        method="dialog"
        className="modal-box"
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit(onSubmit)();
          }
        }}
      >
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={handleModalClose}
        >
          ✕
        </button>
        <h3 className="font-bold text-lg">Edit {student.name} Details</h3>
        <p className="py-4">Press ESC key or click the button below to close</p>

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

        <div className="modal-action">
          {/* if there is a button in form, it will close the modal */}
          <div className="form-control mt-6">
            <button className="btn btn-secondary" disabled={mutation.isLoading}>
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
        </div>
      </form>
    </dialog>
  );
}
