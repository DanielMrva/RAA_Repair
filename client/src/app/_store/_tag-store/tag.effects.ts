import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as TagActions from "./tag.actions";
import { TagService } from "@app/services/tag/tag.service";
import { ToastService } from "@app/services/toast/toast.service";
import { of, from } from "rxjs";
import { switchMap, map, catchError, mergeMap, tap } from "rxjs/operators";


@Injectable()
export class TagEffects {
    constructor(
        private actions$: Actions,
        private tagService: TagService,
        private toastService: ToastService,
    ) { }

    loadOneTag$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TagActions.loadOneTag),
            mergeMap(({ tagId }) => {
                console.log('Dispatched loadOneTag action with ID: ', tagId);
                return this.tagService.querySingleTag(tagId).valueChanges.pipe(
                    map(({ data }) => {
                        return TagActions.loadOneTagSuccess({ tag: data.tag });
                    }),
                    catchError((error) => {
                        console.error('Error loading oneTag: ', error);
                        return of(TagActions.loadOneTagFailure({ error }));
                    })
                );
            })
        )
    );

    loadAllTags$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TagActions.loadAllTags),
            switchMap(() =>
                from(this.tagService.allTags().valueChanges).pipe(
                    map(({ data }) => TagActions.loadAllTagsSuccess({ tags: data.allTags })),

                    catchError((error) => of(TagActions.loadAllTagsFailure({ error })))

                )
            )
        )
    );

    addTag$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TagActions.addTag),
            switchMap(({ tagName }) =>
                from(this.tagService.addTag(
                    tagName
                )).pipe(
                    map(({ data }) => TagActions.addTagSuccess({ tag: data?.addTag })),

                    catchError((error) => of(TagActions.addTagFailure({ error })))
                )
            )
        )
    );

    addTagSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TagActions.addTagSuccess),
            tap(({ tag }) => {
                this.toastService.show(`Tag: ${tag?.tagName} added successfully!`, { delay: 3000 });
            }),
            switchMap(() => [
                TagActions.loadAllTags(),
            ])
        ),
        { dispatch: true }
    );

    addTagFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TagActions.addTagFailure),
            map(({ error }) => {
                this.toastService.show('Failed to submit tag. Please try again', {
                    classname: 'bg-danger light-text',
                    delay: 3000
                }),
                    console.error(error)
            })
        ),
        { dispatch: false }
    );

    editTag$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TagActions.editTag),
            switchMap(({ id, updates }) =>
                from(this.tagService.editTag(id, updates)).pipe(
                    map(({ data }) =>
                        TagActions.editTagSuccess({ tag: data?.editTag })),

                    catchError((error) => of(TagActions.editTagFailure({ error })))
                )

            )
        )
    );

    editTagSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TagActions.editTagSuccess),
            tap(({ tag }) => {
                this.toastService.show(`Tag: ${tag?.tagName} edited successfully!`, { delay: 3000 });
            }),
            switchMap(() => [
                TagActions.loadAllTags(),
            ])
        ),
    );

    editTagFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TagActions.editTagFailure),
            map(({ error }) => {
                this.toastService.show(`Failed to edit Tag. Please try again`, {
                    classname: 'bg-danger light-text',
                    delay: 3000
                }),
                    console.error(error)
            })
        ),
        { dispatch: false }
    );

    deleteTag$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TagActions.deleteTag),
            switchMap(({ id }) =>
                from(this.tagService.deleteTag(id)).pipe(
                    map(({ data }) =>
                        TagActions.deleteTagSuccess({ tag: data?.deleteTag })),

                    catchError((error) => of(TagActions.deleteTagFailure({ error })))
                )
            )
        )
    );

    deleteTagSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TagActions.deleteTagSuccess),
            tap(({ tag }) => {
                this.toastService.show(`Tag: ${tag?.tagName} deleted successfully!`, { delay: 3000 });
            }),
            switchMap(() => [
                TagActions.loadAllTags(),
            ])
        ),

    );

    deleteTagFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TagActions.deleteTagFailure),
            map(({ error }) => {
                this.toastService.show(`Tag deletion failed: ${error}`, {
                    classname: 'bg-danger light-text',
                    delay: 3000
                }),
                    console.error(error)
            })
        ),
        { dispatch: false }
    );
} 
