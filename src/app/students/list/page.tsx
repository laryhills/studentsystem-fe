"use client";

import { useEffect, useState } from "react";
import { StudentsTable } from "@/app/components/students/StudentsTable";
import { useQuery } from "react-query";
import { fetchAllStudentFromAPI } from "@/utils/dataproviders/students";
import { Student, SuccessResponse } from "@/utils/types";

export default function Page() {
  const { data, isLoading, isError, error, status } = useQuery<
    SuccessResponse,
    Error
  >("students", fetchAllStudentFromAPI);

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
      <StudentsTable data={data?.data} headers={headers} />
    </>
  );
}
