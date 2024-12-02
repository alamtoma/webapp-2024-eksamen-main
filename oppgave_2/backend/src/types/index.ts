
export interface User {
  id: number;
  name: string;
  email: string;
  password: string; // This will store the hashed password
}

export type Success<T> = {
  success: true;
  data: T;
};

export type Failure = {
  success: false;
  error: {
    code: string;
    message: string;
  };
};

export type Result<T> = Success<T> | Failure;
