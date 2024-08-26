import { DndItemDataType } from "@/6Shared/uikit/Dnd/ui/DndItem/DndItem.types";
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export type DndContextProviderType = {
  externalCurrentTarget: HTMLDivElement | null;
  setExternalCurrentTarget: Dispatch<SetStateAction<HTMLDivElement | null>>;
  fromItems: DndItemDataType[] | null;
  toItems: DndItemDataType[] | null;
  setFromItems: Dispatch<SetStateAction<DndItemDataType[] | null>>;
  setToItems: Dispatch<SetStateAction<DndItemDataType[] | null>>;
};

export const DndContext = createContext({} as DndContextProviderType);

const DndContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [externalCurrentTarget, setExternalCurrentTarget] =
    useState<HTMLDivElement | null>(null);
  const [fromItems, setFromItems] = useState<DndItemDataType[] | null>(null);
  const [toItems, setToItems] = useState<DndItemDataType[] | null>(null);

  return (
    <DndContext.Provider
      value={{
        externalCurrentTarget,
        setExternalCurrentTarget,
        fromItems,
        setFromItems,
        setToItems,
        toItems,
      }}
    >
      {children}
    </DndContext.Provider>
  );
};

export default DndContextProvider;
