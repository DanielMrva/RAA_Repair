import { DataSource } from "@angular/cdk/collections";
import { Injectable } from "@angular/core";
import { Sort } from "@angular/material/sort";
import { BehaviorSubject, Observable } from "rxjs";
import { Repair } from "@app/graphql/schemas/typeInterfaces";
import { RepairService } from "./repair.service";

@Injectable()
export class RepairDataSource extends DataSource<Repair> {
    repairs$ = new BehaviorSubject<Repair[]>([]);
    isLoading$ = new BehaviorSubject<boolean>(false);

    constructor(private repairService: RepairService) {
        super();
    }

    connect(): Observable<Repair[]> {
        return this.repairs$.asObservable();
    }

    disconnect(): void {
        this.repairs$.complete();
    }

    loadAllRepairss(): void {
        this.isLoading$.next(true);
        this.repairService.allRepairs().subscribe(( { data }) => {
            this.repairs$.next(data.allRepairs);
            this.isLoading$.next(false);
        })
    }
}