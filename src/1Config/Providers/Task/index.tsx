import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type TaskContextProviderType = {
  focusId: string | null;
  activeId: string | null;
  setFocusId: Dispatch<SetStateAction<string | null>> | null;
  setActiveId: Dispatch<SetStateAction<string | null>> | null;
};

export const TaskContext = createContext<TaskContextProviderType>({
  activeId: null,
  focusId: null,
  setActiveId: null,
  setFocusId: null,
});

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
