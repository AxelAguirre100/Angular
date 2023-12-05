import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State, authFeaturekey } from "./auth.reducer";

export const selectedAuthState = createFeatureSelector<State>(authFeaturekey)

export const selectAuthUser = createSelector(selectedAuthState, (state) => {
    console.log('Estado actual:', state);
    return state && state.authUser;
});