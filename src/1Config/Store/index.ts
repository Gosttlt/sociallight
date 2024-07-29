import userSlice from "@/5Entities/Auth/model/userSlice";
import { configureStore } from "@reduxjs/toolkit";
// ...
export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
