import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as OrgActions from "./org.actions";
import { OrganizationService } from "@app/services/orgs/organization.service";
import { of, from } from "rxjs";
import { switchMap, map, catchError, tap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { ToastService } from "@app/services/toast/toast.service";
import { Router } from "@angular/router";

@Injectable()
export class OrgEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private orgService: OrganizationService,
        private toastService: ToastService,
        private router: Router
    ) { }

    loadAllOrgs$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrgActions.loadAllOrgs),
            switchMap(() =>
                from(this.orgService.allOrgs().valueChanges).pipe(
                    map(({ data }) => OrgActions.loadAllOrgsSuccess({ organizations: data.allOrgs })),
                    catchError((error) => of(OrgActions.loadAllOrgsFailure({ error })))
                )
            )
        )
    );

    loadOneOrg$ = createEffect(() => 
        this.actions$.pipe(
            ofType(OrgActions.loadOneOrg),
            switchMap(({ orgId }) => 
                from(this.orgService.querySingleOrg(orgId).valueChanges).pipe(
                    map(({ data }) => OrgActions.loadOneOrgSuccess({ organization: data.org })),
                    catchError((error) => of(OrgActions.loadOneOrgFailure({ error })))
                )
            )
        )
    );

    loadLikeOrgs$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrgActions.loadLikeOrgs),
            switchMap(({ orgName }) =>
                from(this.orgService.queryLikeOrg(orgName).valueChanges).pipe(
                    map(({ data }) => OrgActions.loadLikeOrgsSuccess({ organizations: data.likeOrg })),
                    catchError((error) => of(OrgActions.loadLikeOrgsFailure({ error })))
                )
            )
        )
    );

    editOrg$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrgActions.editOrg),
            switchMap(({ id, updates }) =>
                this.orgService.editOrg(id, updates).pipe(
                    map(({ data }) => OrgActions.editOrgSuccess({ organization: data?.editOrg })),
                    catchError((error) => of(OrgActions.editOrgFailure({ error })))
                )
            )
        )
    );

    editOrgSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrgActions.editOrgSuccess),
            tap(({ organization }) => {
                this.toastService.show('Organization edited successfully!', { delay: 3000 });
                this.router.navigate(['one-org', organization?._id]);
            }),
            switchMap(() => [
                OrgActions.loadAllOrgs(),  // Refetch all orgs to ensure data freshness
            ])
        ),
        { dispatch: true }
    );

    editOrgFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrgActions.editOrgFailure),
            map(({ error }) => {
                this.toastService.show('Failed to edit organization. Please try again', {
                    classname: 'bg-danger light-text',
                    delay: 3000
                }),
                    console.error(error)
            })
        ),
        { dispatch: false }
    );

    addOrg$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrgActions.addOrg),
            switchMap(({ orgName }) =>
                this.orgService.addOrg(orgName).pipe(
                    map(({ data }) => OrgActions.addOrgSuccess({ organization: data?.addOrg })),

                    catchError((error) => of(OrgActions.addOrgFailure({ error })))
                )
            )

        )
    );

    addOrgSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrgActions.addOrgSuccess),
            tap(({ organization }) => {
                this.toastService.show('Organization added successfully!', { delay: 3000 });
                this.router.navigate(['one-org', organization?._id]);
            }),
            switchMap(() => [
                OrgActions.loadAllOrgs(),  // Refetch all orgs to ensure data freshness
            ])
        ),
        { dispatch: true }
    );

    addOrgFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrgActions.addOrgFailure),
            map(({ error }) => {
                this.toastService.show('Failed to submit organization. Please try again', {
                    classname: 'bg-danger light-text',
                    delay: 3000
                }),
                    console.error(error)
            })
        ),
        { dispatch: false }
    );

    loadOrgNames$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrgActions.loadOrgNames),
            switchMap(() =>
                from(this.orgService.orgNames().valueChanges).pipe(
                    map(({ data }) => OrgActions.loadOrgNamesSuccess({ organizations: data.orgNames })),

                    catchError((error) => of(OrgActions.loadOrgNamesFailure({ error })))
                )
            )

        )
    );

    deleteOrg$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrgActions.deleteOrganization),
            switchMap(({ id }) =>
                from(this.orgService.deleteOrganization(id)).pipe(
                    map(({ data }) =>
                        OrgActions.deleteOrganizationSuccess({ organization: data?.deleteOrganization })),

                    catchError((error) => of(OrgActions.deleteOrganizationFailure({ error })))
                )
            )
        )
    );

    deleteOrgSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrgActions.deleteOrganizationSuccess),
            map(({ organization }) => {
                this.toastService.show('Org deleted successfully!', { delay: 3000 });
                if (organization) {
                    this.store.dispatch(OrgActions.loadLikeOrgs({ orgName: organization?.orgName }))

                }
                this.router.navigateByUrl(`/org-results/${organization?.orgName}`);
            })
        ),
        { dispatch: false }
    );

    deleteOrgFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrgActions.deleteOrganizationFailure),
            map(({ error }) => {
                this.toastService.show(`Org deletion failed: ${error}`, {
                    classname: 'bg-danger light-text',
                    delay: 3000
                }),
                    console.error(error)
            })
        ),
        { dispatch: false }
    );

}