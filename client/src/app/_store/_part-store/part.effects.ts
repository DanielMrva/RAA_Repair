import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as PartActions from "./part.actions";
import { Router } from "@angular/router";
import { PartService } from "@app/services/part/part.service";
import { ToastService } from "@app/services/toast/toast.service";
import { of, from } from "rxjs";
import { switchMap, map, catchError, mergeMap, tap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";

@Injectable()
export class PartEffects {
    constructor(
        private actions$: Actions,
        private partService: PartService,
        private toastService: ToastService,
        private router: Router,
        private store: Store<AppState>
    ) { }

    loadOnePart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PartActions.loadOnePart),
            mergeMap(({ partId }) => {
                console.log('Dispatched loadOnePart action with ID: ', partId);
                return this.partService.querySinglePart(partId).valueChanges.pipe(
                    map(({ data }) => {
                        // console.log('Loaded onePart data: ', data.part);
                        return PartActions.loadOnePartSuccess({ part: data.part });
                    }),
                    catchError((error) => {
                        console.error('Error loading onePart: ', error);
                        return of(PartActions.loadOnePartFailure({ error }));
                    })
                );
            })
        )
    );

    loadPartsByPnPd$ = createEffect(() => 
        this.actions$.pipe(
            ofType(PartActions.loadPartsByPnPd),
            mergeMap(({ partNumber, partDescription}) => 
                from(this.partService.queryLikePartPnPd(partNumber, partDescription).valueChanges).pipe(
                    map(({ data }) => PartActions.loadPartsByPnPdSuccess({
                        partByNumDesc: data.partByNumDesc
                    })),

                    catchError((error) => of(PartActions.loadPartsByPnPdFailure({ error})))
                )
            )
        )
    );


    loadAllParts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PartActions.loadAllParts),
            switchMap(() =>
                from(this.partService.allParts().valueChanges).pipe(
                    map(({ data }) => PartActions.loadAllPartsSuccess({ parts: data.allParts })),

                    catchError((error) => of(PartActions.loadAllPartsFailure({ error })))

                )
            )
        )
    );

    addPart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PartActions.addPart),
            switchMap(({ addPartFields }) =>
                from(this.partService.addPart(
                    addPartFields
                )).pipe(
                    map(({ data }) => PartActions.addPartSuccess({ part: data?.addPart })),

                    catchError((error) => of(PartActions.addPartFailure({ error })))
                )
            )
        )
    );

    addPartSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PartActions.addPartSuccess),
            tap(({ part}) => {
                this.toastService.show(`Part: ${part?.partNumber} - ${part?.description} added successfully!`, { delay: 3000 });
            }),
            switchMap(() => [
                PartActions.loadAllParts(),
            ])
        ),
        { dispatch: true }
    );

    addPartFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PartActions.addPartFailure),
            map(({ error }) => {
                this.toastService.show('Failed to submit part. Please try again', {
                    classname: 'bg-danger light-text',
                    delay: 3000
                }),
                    console.error(error)
            })
        ),
        { dispatch: false }
    );

    editPart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PartActions.editPart),
            switchMap(({ id, updates }) =>
                from(this.partService.editPart(id, updates)).pipe(
                    map(({ data }) =>
                        PartActions.editPartSuccess({ part: data?.editPart })),

                    catchError((error) => of(PartActions.editPartFailure({ error })))
                )

            )
        )
    );

    editPartSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PartActions.editPartSuccess),
            map(({ part }) => {
                this.toastService.show('Part edited successfully!', {
                    delay: 3000
                })
                    // this.router.navigate(['one-part', part?._id])
            })
        ),
        { dispatch: false }
    );

    editPartFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PartActions.editPartFailure),
            map(({ error }) => {
                this.toastService.show(`Failed to edit Part. Please try again`, {
                    classname: 'bg-danger light-text',
                    delay: 3000
                }),
                    console.error(error)
            })
        ),
        { dispatch: false }
    );
    
    deletePart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PartActions.deletePart),
            switchMap(({ id }) =>
                from(this.partService.deletePart(id)).pipe(
                    map(({ data }) =>
                        PartActions.deletePartSuccess({ part: data?.deletePart })),

                    catchError((error) => of(PartActions.deletePartFailure({ error })))
                )
            )
        )
    );

    deletePartSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PartActions.deletePartSuccess),
            map(({ part }) => {
                this.toastService.show('Part deleted successfully!', { delay: 3000 });
                if (part) {
                    // TODO: Figure out what to do here?  Proably dispatch an action that updates parts?...
                }
            })
        ),
        { dispatch: false }
    );

    deletePartFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PartActions.deletePartFailure),
            map(({ error }) => {
                this.toastService.show(`Part deletion failed: ${error}`, {
                    classname: 'bg-danger light-text',
                    delay: 3000
                }),
                    console.error(error)
            })
        ),
        { dispatch: false }
    );
} 
