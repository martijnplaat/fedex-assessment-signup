export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

export interface UserResponse extends User {
  id: string;
}
