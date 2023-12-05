import { ActionReducerMap } from "@ngrx/store";
import { authFeaturekey, reducer as authReducer, State as AuthState} from "./auth/auth.reducer";

export interface AppState {
    [authFeaturekey]: AuthState
}

export const appReducer: ActionReducerMap<AppState> = {
    [authFeaturekey]: authReducer
}