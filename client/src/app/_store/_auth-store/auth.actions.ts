import { createAction, props } from "@ngrx/store";
import { User, accessLevels, AuthInfo } from "@app/graphql/schemas/typeInterfaces";


export interface AuthInfoPayload {
    username: string;
    orgName: string;
    accessLevel: string;
}
  

export const setAuthInfo = createAction(
    '[Auth] Set Auth Info',
    props<AuthInfo>()
);

export const clearAuthInfo = createAction('[Auth] Clear Auth Info');

export const autoLogin = createAction('[Auth] Auto Log-In');