import type { FC, ReactNode } from "react";

export type AuthFormComponentType = FC<AuthFormProps>;

export type AuthFormProps = {
  SendButton: ReactNode;
  Inputs: ReactNode;
};
