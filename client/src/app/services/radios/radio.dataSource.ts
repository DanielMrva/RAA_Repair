import { DataSource } from "@angular/cdk/collections";
import { Injectable } from "@angular/core";
import { Sort } from "@angular/material/sort";
import { BehaviorSubject, Observable } from "rxjs";
import { Radio } from "@app/graphql/schemas/typeInterfaces";
import { RadioService } from "@app/services/radios/radio.service";

@Injectable()
export class RadioDataSource extends DataSource<Radio> {
    radios$ = new BehaviorSubject<Radio[]>([]);
    isLoading$ = new BehaviorSubject<boolean>(false);

    constructor(private radioService: RadioService) {
        super();
    }

    connect(): Observable<Radio[]> {
        return this.radios$.asObservable();
    }

    disconnect(): void {
        this.radios$.complete();
    }

    loadOrgRadios(orgName: string): void {
        this.isLoading$.next(true);
        this.radioService.orgRadios(orgName).subscribe(( {data} ) => {
            this.radios$.next(data.orgRadios);
            this.isLoading$.next(false);
        });
    }

    loadAllRadios(): void {
        this.isLoading$.next(true);
        this.radioService.allRadios().subscribe(( {data} ) => {
            this.radios$.next(data.radios);
            this.isLoading$.next(false);
        });
    }

    
}