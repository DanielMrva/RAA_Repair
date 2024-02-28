import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as RepairActions from "./repair.actions";
import { Router } from "@angular/router";
import { RepairService } from "@app/services/repairs/repair.service";
import { ToastService } from "@app/services/toast/toast.service";
import { of, from } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";
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
                from(this.repairService.querySingleRepair(repairID)).pipe(
                    map(({ data }) => RepairActions.loadOneRepairSuccess({ repair: data.repair })),

                    catchError((error) => of(RepairActions.loadOneRepairFailure({ error })))
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

    addRepair$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RepairActions.addRepair),
            switchMap(({
                radioID,
                radioMake,
                radioSerial,
                radioLocation,
                dateReceived,
                endUserPO,
                raaPO,
                dateSentTech,
                dateRecTech,
                dateSentEU,
                techInvNum,
                raaInvNum,
                symptoms,
                testFreq,
                incRxSens,
                incFreqErr,
                incMod,
                incPowerOut,
                outRxSens,
                outFreqErr,
                outMod,
                outPowerOut,
                accessories,
                workPerformed,
                repHours,
                partsUsed,
                remarks
            }) =>
                from(this.repairService.addRepair(
                    radioID,
                    radioMake,
                    radioSerial,
                    radioLocation,
                    dateReceived,
                    endUserPO,
                    raaPO,
                    dateSentTech,
                    dateRecTech,
                    dateSentEU,
                    techInvNum,
                    raaInvNum,
                    symptoms,
                    testFreq,
                    incRxSens,
                    incFreqErr,
                    incMod,
                    incPowerOut,
                    outRxSens,
                    outFreqErr,
                    outMod,
                    outPowerOut,
                    accessories,
                    workPerformed,
                    repHours,
                    partsUsed,
                    remarks
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
                this.toastService.show('Repair added succesfully!', {
                    delay: 3000
                }),
                    this.router.navigate(['one-repair', repair?._id])
            })
        ),
        { dispatch: false }
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
}