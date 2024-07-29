export type authDTOType = {
  email: string;
  password: string;
  fingerprint: number;
};

export type logoutDTOType = {
  userId: string;
  fingerprint: number;
};

export type authFieldsType = { prop: "login" | "password"; value: string };
