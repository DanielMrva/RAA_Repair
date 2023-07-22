import { DataSource } from "@angular/cdk/collections";
import { Injectable } from "@angular/core";
import { Sort } from "@angular/material/sort";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "@app/graphql/schemas/typeInterfaces";
import { UserService } from "./user.service";

@Injectable()
export class UserDataSource extends DataSource<User> {
    users$ = new BehaviorSubject<User[]>([]);
    isLoading$ = new BehaviorSubject<boolean>(false);

    constructor(private userService: UserService) {
        super();
    }

    connect(): Observable<User[]> {
        return this.users$.asObservable();
    }

    disconnect(): void {
        this.users$.complete();
    }

    loadUsers(): void {
        this.isLoading$.next(true);
    }
}