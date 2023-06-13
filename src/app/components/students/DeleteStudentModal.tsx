import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { deleteStudentFromAPI } from "@/app/services/dataproviders/students.provider";
import { toast } from "react-toastify";
import { ErrorResponse, Student, SuccessResponse } from "@/utils/types";
import classnames from "classnames";

interface Props {
  student: Student | null;
  updateStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  closeDeleteModal: () => void;
  updateStudent: React.Dispatch<React.SetStateAction<Student | null>>;
  modalOpen: boolean;
}

export default function DeleteStudentModal({
  student,
  updateStudents,
  closeDeleteModal,
  updateStudent,
  modalOpen,
}: Props) {
  const modalClass = classnames("modal modal-bottom sm:modal-middle", {
    "modal-open": modalOpen,
  });

  const mutation = useMutation<SuccessResponse, ErrorResponse, number>(
    deleteStudentFromAPI,
    {
      onSuccess: (data) => {
        // remove stundets from prev list
        updateStudents((prev) => {
          const index = prev.findIndex((s) => s.id === student?.id);
          prev.splice(index, 1);
          return prev;
        });
        toastId.current &&
          toast.update(toastId.current, {
            render: data.message,
            type: "success",
            isLoading: false,
            autoClose: 4000,
          });
        closeDeleteModal();
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
  const { handleSubmit } = useForm({
    values: {
      phone: student?.phone ? student?.phone : "",
      address: student?.address ? student?.address : "",
    },
  });
  const toastId = React.useRef<string | number | null>(null); // Set the initial value of toastId to null

  const handleDelete = () => {
    toastId.current = toast("Loading", {
      type: "info",
      isLoading: true,
    });
    const payload = student?.id ? student?.id : 0;
    mutation.mutate(payload);
  };

  if (!student) return;

  const handleModalClose = () => {
    updateStudent(null); // Reset the student state to null
    closeDeleteModal();
  };

  return (
    <dialog id="delete_student_modal" className={modalClass}>
      <form
        method="dialog"
        className="modal-box"
        onSubmit={handleSubmit(handleDelete)}
      >
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={handleModalClose}
        >
          ✕
        </button>
        <h3 className="font-bold text-lg">Delete {student.name} Details</h3>

        <div className="modal-action">
          {/* if there is a button in form, it will close the modal */}
          <div className="form-control mt-6">
            <button className="btn btn-error" disabled={mutation.isLoading}>
              {mutation.isLoading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Loading
                </>
              ) : (
                "Delete"
              )}
            </button>
          </div>

          <div className="form-control mt-6">
            <button
              className="btn"
              disabled={mutation.isLoading}
              onClick={handleModalClose}
            >
              Close
            </button>
          </div>
        </div>
      </form>
    </dialog>
  );
}
