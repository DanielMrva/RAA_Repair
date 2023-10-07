import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as RepairActions from "./repair.actions";
import { RepairService } from "@app/services/repairs/repair.service";
import { of, from } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";

@Injectable()
export class RepairEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private repairService: RepairService
    ) {}

    loadOneRepair$ = createEffect(() => 
        this.actions$.pipe(
            ofType(RepairActions.loadOneRepair),
            switchMap(( { repairId } ) => 
                from(this.repairService.querySingleRepair(repairId)).pipe(
                    map(( { data }) => RepairActions.loadOneRepairSuccess({ repair: data.repair })),

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
                    map(( { data }) => RepairActions.loadAllRepairsSuccess({ repairs: data.allRepairs})),

                    catchError((error) => of(RepairActions.loadAllRepairsFailure({ error })))

                )
            )
        )
    );
    
    addRepair$ = createEffect(() => 
    this.actions$.pipe(
        ofType(RepairActions.addRepair),
        switchMap(( {   
                radioSerial,
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
                                                radioSerial,
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
                                                    map(( { data }) => RepairActions.addRepairSuccess({ repair: data?.addRepair})),

                                                    catchError((error) => of(RepairActions.addRepairFailure({ error })))
                        )
                    )
        )
    );

    editRepair$ = createEffect(() => 
        this.actions$.pipe(
            ofType(RepairActions.editRepair),
            switchMap(( { id, updates}) => 
                from(this.repairService.editRepair(id, updates)).pipe(
                    map(( { data }) => 
                        RepairActions.editRepairSuccess({ repair: data?.editRepair})),

                    catchError((error) => of(RepairActions.editRepairFailure({ error })))
                )
            )
        )
    )
}