"use client";

import { use, useEffect, useState } from "react";
import { StudentsTable } from "@/app/components/students/StudentsTable";
import { useQuery } from "react-query";
import { fetchAllStudentFromAPI } from "@/utils/dataproviders/students";
import { Student, SuccessResponse } from "@/utils/types";
import EditStudentModal from "@/app/components/students/EditStudentModal";
import { toast } from "react-toastify";

export default function Page() {
  const [students, setStudents] = useState<Student[]>([]);
  const [student, setStudent] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const { data, isLoading, isError, error, status } = useQuery<
    SuccessResponse,
    Error
  >("students", fetchAllStudentFromAPI, {
    onSuccess: (data) => {
      setStudents(data.data);
      toast.success(data.message);
    },
    enabled: students.length === 0, // Fetch only if students array is empty
  });

  const headers = [
    "NAME",
    "EMAIL",
    "PHONE",
    "ADDRESS",
    "SEX",
    "DATE OF BIRTH",
    "AGE",
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-24 h-full">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <h1 className="text-center p-4 font-bold uppercase">List of students</h1>
      <StudentsTable
        data={students}
        headers={headers}
        onEditClick={setStudent}
        openEditModal={() => setOpenEditModal(true)}
      />
      <EditStudentModal
        student={student}
        updateStudents={setStudents}
        closeEditModal={() => setOpenEditModal(false)}
        setStudent={setStudent}
        modalOpen={openEditModal}
      />

      {/* Open the modal using ID.showModal() method */}
      {/* <button className="btn" onClick={() => window.my_modal_1.showModal()}>
        open modal
      </button>
      <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog> */}
    </>
  );
}
