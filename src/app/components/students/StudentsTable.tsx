import React from "react";
import { Student } from "@/utils/types";

interface Props {
  data: Student[] | [] | undefined;
  headers: string[];
  onStudentClick: Function;
  openEditModal: () => void; // Function to open the modal
  openDeleteModal: () => void; // Function to open the modal
}

export function StudentsTable({
  data,
  headers,
  onStudentClick,
  openEditModal,
  openDeleteModal,
}: Props) {
  const handleEdit = (student: Student) => {};

  return (
    <div className="overflow-x-auto mt-4">
      <table className="table table-zebra table-lg">
        {/* head */}
        <thead>
          <tr>
            <th>ID</th>
            {headers.map((header: string, _id: number) => (
              <th key={_id + 1}>{header}</th>
            ))}
            <th colSpan={2}></th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((student: any, _id: number) => (
              <tr key={_id + 1}>
                <td>{_id + 1}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.address}</td>
                <td>{student.sex}</td>
                <td>{student.dob}</td>
                <td>{student.age}</td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      onStudentClick(student);
                      openEditModal();
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-error"
                    onClick={() => {
                      onStudentClick(student);
                      openDeleteModal();
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
