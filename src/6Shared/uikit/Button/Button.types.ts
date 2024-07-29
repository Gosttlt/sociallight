import type { FC, MouseEvent, ReactNode } from 'react';

export type ButtonComponentType = FC<ButtonProps>;

export type ButtonProps = {
  children: string | ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};
