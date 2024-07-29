import type { ChangeEvent, FC, InputHTMLAttributes } from "react";

export type InputComponentType = FC<InputProps & InptutProp>;

export type InputProps = {
  className?: string;
  stateBorder?: "valid" | "invalid" | "novalid";
};

type InptutProp = InputHTMLAttributes<HTMLInputElement>;
