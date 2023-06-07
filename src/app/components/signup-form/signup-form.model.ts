export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserResponse extends User {
  id: string;
}
