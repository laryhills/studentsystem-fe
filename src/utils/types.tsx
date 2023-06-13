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

export type CreateUser = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type LoginUser = {
  username: string;
  password: string;
};

export type SuccessResponse = {
  data: any[] | [];
  message: string;
  status: string;
  token: string;
};

// error message with unknown fields
export type ErrorResponse = {
  data?: {
    message: string;
    errors: any;
    status: string;
  };
};

export type UserDetails = {
  id: number;
  username: string;
  email: string;
  roles: string[];
};
