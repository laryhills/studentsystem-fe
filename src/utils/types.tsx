export type Student = {
  id?: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  dob: string;
  age: number;
  sex: string;
};

export type UpdateStudent = {
  id: number;
  phone: string;
  address: string;
};

export type SuccessResponse = {
  data: Student[] | [];
  message: string;
  status: string;
};

// error message with unknown fields
export type ErrorResponse = {
  data?: {
    message: string;
    errors: any;
    status: string;
  };
};
