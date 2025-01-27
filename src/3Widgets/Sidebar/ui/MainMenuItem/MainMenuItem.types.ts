import type { FC, ReactNode } from "react";

export type MainMenuItemComponentType = FC<MainMenuItemProps>;

export type MainMenuItemProps = {
  text: string;
  onClick: () => void;
  isOpenCollapse: boolean;
};
