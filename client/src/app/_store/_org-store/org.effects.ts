import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
    loadAllOrgs,
    loadAllOrgsSuccess,
    loadAllOrgsFailure,
    loadOneOrg,
    loadOneOrgSuccess,
    loadOneOrgFailure,
    editOrg,
    editOrgSuccess,
    editOrgFailure,
    addOrg,
    addOrgSuccess,
    addOrgFailure,
    loadOrgNames,
    loadOrgNamesSuccess,
    loadOrgNamesFailure
} from "./org.actions";
import { OrganizationService } from "@app/services/orgs/organization.service";
import { of, from } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";

@Injectable()

export class OrgEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private orgService: OrganizationService
    ) {}

    loadAllOrgs$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadAllOrgs),
            switchMap(() => 
                from(this.orgService.allOrgs()).pipe(
                    map(( { data }) => loadAllOrgsSuccess({ organizations: data.allOrgs})),

                    catchError((error) => of(loadAllOrgsFailure({ error })))
                )
            )
        )
    );

    loadOneOrg$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadOneOrg),
            switchMap(( {orgId} ) => 
                from(this.orgService.querySingleOrg(orgId)).pipe(
                    map(( { data }) => loadOneOrgSuccess({ organization: data.org })),

                    catchError((error) => of(loadOneOrgFailure({ error })))
                )
            )
        )
    );

    editOrg$ = createEffect(() => 
        this.actions$.pipe(
            ofType(editOrg),
            switchMap(( { id, updates }) => 
                this.orgService.editOrg(id, updates).pipe(
                    map(( { data }) => editOrgSuccess({ organization: data?.editOrg})),

                    catchError((error) => of(editOrgFailure({ error })))
                )
            )
        )
    );

    addOrg$ = createEffect(() => 
        this.actions$.pipe(
            ofType(addOrg),
            switchMap(( { orgName }) => 
                this.orgService.addOrg( orgName ).pipe(
                    map(( { data }) => addOrgSuccess({ organization: data?.addOrg })),

                    catchError((error) => of(addOrgFailure({ error })))
                )
            )

        )
    )

    loadOrgNames$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadOrgNames),
            switchMap(() => 
                from(this.orgService.orgNames()).pipe(
                    map(( {data} ) => loadOrgNamesSuccess({ organizations: data.orgNames })),

                    catchError((error) => of(loadOrgNamesFailure({ error })))
                )
            )

        )
    )
}