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
  fromCard: DndItemDataType | null;
  setFromCard: Dispatch<SetStateAction<DndItemDataType | null>>;
  fromCardNode: MutableRefObject<HTMLDivElement | null>;
  fromCardNodeRect: MutableRefObject<DOMRect | null>;
  fromCursorStartPosition: MutableRefObject<number | null>;
  fromItems: DndItemDataType[] | null;
  toItems: DndItemDataType[] | null;
  setFromItems: Dispatch<SetStateAction<DndItemDataType[] | null>>;
  setToItems: Dispatch<SetStateAction<DndItemDataType[] | null>>;
  dropNode: MutableRefObject<HTMLDivElement | null>;
  dropCard: MutableRefObject<DndItemDataType | null>;
  isNextPosition: boolean | null;
  setNextPosition: Dispatch<SetStateAction<boolean | null>>;
  fromSharedClass: MutableRefObject<string | null>;
  toSharedClass: MutableRefObject<string | null>;
  overNode: MutableRefObject<HTMLDivElement | null>;
  lastOverCard: DndItemDataType | null;
  setLastOverCard: Dispatch<SetStateAction<DndItemDataType | null>>;
  isDragStart: boolean;
  setDragStart: Dispatch<SetStateAction<boolean>>;
  isTransition: boolean;
  setTransition: Dispatch<SetStateAction<boolean>>;
  isTargetContainer: boolean;
  setTargetContainer: Dispatch<SetStateAction<boolean>>;
  fromWrapperId: MutableRefObject<string | null>;
};

export const DndContext = createContext({} as DndContextProviderType);

const DndContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [fromCard, setFromCard] = useState<null | DndItemDataType>(null);
  const fromCardNode = useRef<null | HTMLDivElement>(null);
  const fromCardNodeRect = useRef<null | DOMRect>(null);
  const fromCursorStartPosition = useRef<null | number>(null);
  const dropNode = useRef<null | HTMLDivElement>(null);
  const dropCard = useRef<null | DndItemDataType>(null);
  const overNode = useRef<null | HTMLDivElement>(null);
  const [lastOverCard, setLastOverCard] = useState<DndItemDataType | null>(
    null
  );
  const fromSharedClass = useRef<null | string>(null);
  const toSharedClass = useRef<null | string>(null);
  const [fromItems, setFromItems] = useState<DndItemDataType[] | null>(null);
  const [toItems, setToItems] = useState<DndItemDataType[] | null>(null);
  const [isNextPosition, setNextPosition] = useState<boolean | null>(false);
  const [isTargetContainer, setTargetContainer] = useState<boolean>(false);
  const fromWrapperId = useRef<null | string>(null);
  const [isDragStart, setDragStart] = useState<boolean>(false);
  const [isTransition, setTransition] = useState<boolean>(true);

  return (
    <DndContext.Provider
      value={{
        isTransition,
        setTransition,
        isDragStart,
        setDragStart,
        fromCursorStartPosition,
        fromWrapperId,
        isTargetContainer,
        setTargetContainer,
        overNode,
        setLastOverCard,
        lastOverCard,
        fromSharedClass,
        toSharedClass,
        isNextPosition,
        setNextPosition,
        dropCard,
        fromCard,
        setFromCard,
        fromCardNode,
        fromItems,
        toItems,
        setFromItems,
        setToItems,
        dropNode,
        fromCardNodeRect,
      }}
    >
      {children}
    </DndContext.Provider>
  );
};

export default DndContextProvider;
