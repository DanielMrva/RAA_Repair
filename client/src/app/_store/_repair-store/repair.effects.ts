import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as RadioActions from "@app/_store/_radio-store/radio.actions"
import * as RepairActions from "./repair.actions";
import { loadOneRadio, loadLikeSerialRadio } from "../_radio-store/radio.actions";
import { loadLocationByName } from "../_location-store/location.actions";
import { Router } from "@angular/router";
import { RepairService } from "@app/services/repairs/repair.service";
import { ToastService } from "@app/services/toast/toast.service";
import { of, from } from "rxjs";
import { switchMap, map, catchError, mergeMap, delay } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";

@Injectable()
export class RepairEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private repairService: RepairService,
        private toastService: ToastService,
        private router: Router
    ) { }

    loadOneRepair$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RepairActions.loadOneRepair),
            switchMap(({ repairID }) =>
                this.repairService.querySingleRepair(repairID).pipe(
                    switchMap(({ data }) => {
                        return [
                            RepairActions.loadOneRepairSuccess({ repair: data.repair }),
                            ...(data.repair.radioID ? [loadOneRadio({ radioID: data.repair.radioID })] : []),
                            ...(data.repair.radioLocation ? [loadLocationByName({ orgName: data.repair.radioOrg, locationName: data.repair.radioLocation })] : [])
                        ];
                    }),
                    catchError((error) => of(RepairActions.loadOneRepairFailure({ error })))
                )
            )
        )
    );

    loadOrgRepairs$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RepairActions.loadOrgRepairs),
            switchMap(({ orgName }) => 
                from(this.repairService.orgRepairs(orgName)).pipe(
                    map(({ data }) => RepairActions.loadOrgRepairsSuccess({ repairs: data.orgRepairs })),

                    catchError((error) => of(RepairActions.loadOrgRepairsFailure({ error })))
                )
            )
        )
    );

    loadOrgLocRepairs$ = createEffect(() => 
        this.actions$.pipe(
            ofType(RepairActions.loadOrgLocRepairs),
            switchMap(({ orgName, locationName }) => 
                from(this.repairService.orgLocRepairs(orgName, locationName)).pipe(
                    map(({ data }) => RepairActions.loadOrgLocRepairsSuccess({ repairs: data.orgLocRepairs })),

                    catchError((error) => of(RepairActions.loadOrgLocRepairsFailure({ error})))
                )
            )
        )
    );

    loadAllRepairs$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RepairActions.loadAllRepairs),
            switchMap(() =>
                from(this.repairService.allRepairs()).pipe(
                    map(({ data }) => RepairActions.loadAllRepairsSuccess({ repairs: data.allRepairs })),

                    catchError((error) => of(RepairActions.loadAllRepairsFailure({ error })))

                )
            )
        )
    );


    loadRepairByTag$ = createEffect(() => this.actions$.pipe(
        ofType(RepairActions.loadRepairByTag),
        mergeMap(action =>
            this.repairService.repairByTag(action.startTag, action.endTag).pipe(
                map(result => RepairActions.loadRepairByTagSuccess({ repairs: result.data.repairByTag })),
                catchError(error => of(RepairActions.loadRepairByTagFailure({ error })))
            )
        )
    ));

    addRepair$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RepairActions.addRepair),
            switchMap(({ submittedRepair }) =>
                from(this.repairService.addRepair(
                    submittedRepair
                )).pipe(
                    map(({ data }) => RepairActions.addRepairSuccess({ repair: data?.addRepair })),

                    catchError((error) => of(RepairActions.addRepairFailure({ error })))
                )
            )
        )
    );

    addRepairSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RepairActions.addRepairSuccess),
            map(({ repair }) => {
                this.toastService.show('Repair added successfully!', { delay: 3000 });
                this.router.navigate(['one-repair', repair?._id]);

                // Check if repair.radioID exists before dispatching the action
                if (repair?.radioID) {
                    return RadioActions.loadOneRadio({ radioID: repair.radioID });
                } else {
                    // Return a no-op action if repair.radioID is undefined
                    return { type: 'NO_OP' };
                }
            })
        )
    );

    addRepairFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RepairActions.addRepairFailure),
            map(({ error }) => {
                this.toastService.show('Failed to submit Repair. Please try again', {
                    classname: 'bg-danger light-text',
                    delay: 3000
                }),
                    console.error(error)
            })
        ),
        { dispatch: false }
    );

    editRepair$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RepairActions.editRepair),
            switchMap(({ id, updates }) =>
                from(this.repairService.editRepair(id, updates)).pipe(
                    map(({ data }) =>
                        RepairActions.editRepairSuccess({ repair: data?.editRepair })),

                    catchError((error) => of(RepairActions.editRepairFailure({ error })))
                )
            )
        )
    );

    editRepairSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RepairActions.editRepairSuccess),
            map(({ repair }) => {
                this.toastService.show('Repair edited successfully!', {
                    delay: 3000
                }),
                    this.router.navigate(['one-repair', repair?._id])
            })
        ),
        { dispatch: false }
    );

    editRepairFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RepairActions.editRepairFailure),
            map(({ error }) => {
                this.toastService.show('Failed to edit Repair. Please try again', {
                    classname: 'bg-danger light-text',
                    delay: 3000
                }),
                    console.error(error)
            })
        ),
        { dispatch: false }
    );

    deleteRepair$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RepairActions.deleteRepair),
            switchMap(({ id }) =>
                from(this.repairService.deleteRepair(id)).pipe(
                    map(({ data }) =>
                        RepairActions.deleteRepairSuccess({ repair: data?.deleteRepair })),

                    catchError((error) => of(RepairActions.deleteRepairFailure({ error })))
                )
            )
        )
    );

    deleteRepairSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RepairActions.deleteRepairSuccess),
            map(({ repair }) => {
                this.toastService.show('Repair deleted successfully!', { delay: 3000 });
                if (repair) {
                    this.store.dispatch(loadOneRadio({ radioID: repair?.radioID }));
                    this.router.navigateByUrl(`/one-radio/${repair?.radioID}`);
                }
            })
        ),
        { dispatch: false }
    );

    deleteRepairFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RepairActions.deleteRepairFailure),
            map(({ error }) => {
                this.toastService.show(`Repair deletion failed: ${error}`, {
                    classname: 'bg-danger light-text',
                    delay: 3000
                }),
                    console.error(error)
            })
        ),
        { dispatch: false }
    );
}