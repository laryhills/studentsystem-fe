import React from "react";
import { Student } from "@/utils/types";

interface Props {
  data: Student[] | [] | undefined;
  headers: string[];
}

export function StudentsTable({ data, headers }: Props) {
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
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
