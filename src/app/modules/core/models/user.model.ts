export interface UserLoginData {
  username: string;
  password: string;
}

export interface GetUserResponse {
  id: number;
  email: string;
  username: string;
  password: string;
}

export type PostUser = Omit<GetUserResponse, 'id'>;

export type PostUserResponse = GetUserResponse;

export class User {
  constructor(
    public email: string,
    public username: string,
  ) {}
}
