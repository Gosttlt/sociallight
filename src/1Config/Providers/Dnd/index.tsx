import { DndItemDataType } from "@/6Shared/uikit/Dnd/ui/DndItem/DndItem.types";
import {
  createContext,
  Dispatch,
  FC,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  useRef,
  useState,
} from "react";

export type DndContextProviderType = {
  currentCard: DndItemDataType | null;
  setCurrentCard: Dispatch<SetStateAction<DndItemDataType | null>>;
  currentCardNode: MutableRefObject<HTMLDivElement | null>;
  fromItems: DndItemDataType[] | null;
  toItems: DndItemDataType[] | null;
  setFromItems: Dispatch<SetStateAction<DndItemDataType[] | null>>;
  setToItems: Dispatch<SetStateAction<DndItemDataType[] | null>>;
  dropNode: MutableRefObject<HTMLDivElement | null>;
  dropCard: MutableRefObject<DndItemDataType | null>;
  nextPosition: boolean;
  setPosition: Dispatch<SetStateAction<boolean>>;
  fromSharedClass: MutableRefObject<string | null>;
  toSharedClass: MutableRefObject<string | null>;
};

export const DndContext = createContext({} as DndContextProviderType);

const DndContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentCard, setCurrentCard] = useState<null | DndItemDataType>(null);
  const currentCardNode = useRef<null | HTMLDivElement>(null);
  const dropNode = useRef<null | HTMLDivElement>(null);
  const dropCard = useRef<null | DndItemDataType>(null);
  const fromSharedClass = useRef<null | string>(null);
  const toSharedClass = useRef<null | string>(null);
  const [fromItems, setFromItems] = useState<DndItemDataType[] | null>(null);
  const [toItems, setToItems] = useState<DndItemDataType[] | null>(null);
  const [nextPosition, setPosition] = useState<boolean>(false);

  return (
    <DndContext.Provider
      value={{
        fromSharedClass,
        toSharedClass,
        nextPosition,
        setPosition,
        dropCard,
        currentCard,
        setCurrentCard,
        currentCardNode,
        fromItems,
        toItems,
        setFromItems,
        setToItems,
        dropNode,
      }}
    >
      {children}
    </DndContext.Provider>
  );
};

export default DndContextProvider;
