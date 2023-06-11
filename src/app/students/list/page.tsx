"use client";

import { use, useEffect, useState } from "react";
import { StudentsTable } from "@/app/components/students/StudentsTable";
import { useQuery } from "react-query";
import { fetchAllStudentFromAPI } from "@/utils/dataproviders/students";
import { Student, SuccessResponse } from "@/utils/types";
import EditStudentModal from "@/app/components/students/EditStudentModal";
import { toast } from "react-toastify";
import DeleteStudentModal from "@/app/components/students/DeleteStudentModal";

export default function Page() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
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
        onStudentClick={setSelectedStudent}
        openEditModal={() => setOpenEditModal(true)}
        openDeleteModal={() => setOpenDeleteModal(true)}
      />
      <EditStudentModal
        student={selectedStudent}
        updateStudents={setStudents}
        closeEditModal={() => setOpenEditModal(false)}
        updateStudent={setSelectedStudent}
        modalOpen={openEditModal}
      />
      <DeleteStudentModal
        student={selectedStudent}
        updateStudents={setStudents}
        closeDeleteModal={() => setOpenDeleteModal(false)}
        updateStudent={setSelectedStudent}
        modalOpen={openDeleteModal}
      />
    </>
  );
}
