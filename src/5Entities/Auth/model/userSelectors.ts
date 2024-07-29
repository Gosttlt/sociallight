import { RootState } from "@/1Config/Store";
import { createSelector } from "@reduxjs/toolkit";

// import { IBookPreviewState } from "./types";

export const selectUser = (state: RootState) => state.user;

// export const selectCategoryPreviewBooks = createSelector(selectBase, (state: IBookPreviewState) => state.books);
// export const selectCategoryPreviewLoading = createSelector(selectBase, (state: IBookPreviewState) => state.loading);
// export const selectCategoryPreviewError = createSelector(selectBase, (state: IBookPreviewState) => state.error);
