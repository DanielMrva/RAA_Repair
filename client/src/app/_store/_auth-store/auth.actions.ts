import { createAction, props } from "@ngrx/store";
import { User, accessLevels } from "@app/graphql/schemas/typeInterfaces";


export interface AuthInfoPayload {
    username: string;
    orgName: string;
    accessLevel: string;
}
  

export const setAuthInfo = createAction(
    '[Auth] Set Auth Info',
    props<{ 
            username: string, 
            orgName: string, 
            accessLevel: string, 
        }>()
);

export const clearAuthInfo = createAction('[Auth] Clear Auth Info');