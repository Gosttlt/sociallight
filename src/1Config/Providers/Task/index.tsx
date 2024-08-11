import {
  Context,
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export type TaskContextProviderType = {
  focusId: string | null;
  activeId: string | null;
  setFocusId: Dispatch<SetStateAction<string | null>>;
  setActiveId: Dispatch<SetStateAction<string | null>>;
};

export const TaskContext = createContext({} as TaskContextProviderType);

const TaskContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [focusId, setFocusId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <TaskContext.Provider
      value={{ activeId, setActiveId, focusId, setFocusId }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
