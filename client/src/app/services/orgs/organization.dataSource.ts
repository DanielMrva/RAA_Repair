import { DataSource } from "@angular/cdk/collections";
import { Injectable } from "@angular/core";
import { Sort } from "@angular/material/sort";
import { BehaviorSubject, Observable } from "rxjs";
import { Organization } from "@app/graphql/schemas/typeInterfaces";
import { OrganizationService } from "./organization.service";

@Injectable()
export class OrganizationDataSource extends DataSource<Organization> {
    organization$ = new BehaviorSubject<Organization[]>([]);
    isLoading$ = new BehaviorSubject<boolean>(false);

    constructor(private orgService: OrganizationService) {
        super();
    }

    connect(): Observable<Organization[]> {
        return this.organization$.asObservable();
    }

    disconnect(): void {
        this.organization$.complete();
    }

    loadOneOrg(orgName: string): void {
        this.isLoading$.next(true);
        this.orgService.querySingleOrg(orgName).subscribe(( {data} ) => {
            const oneOrgArray: Organization[] = [data.org] 
            this.organization$.next(oneOrgArray);
            this.isLoading$.next(false);
        })
    }

    loadAllOrgs(): void {
        this.isLoading$.next(true);
        this.orgService.allOrgs().subscribe(( {data} ) => {
            this.organization$.next(data.allOrgs);
            this.isLoading$.next(false);
        })
    }
}