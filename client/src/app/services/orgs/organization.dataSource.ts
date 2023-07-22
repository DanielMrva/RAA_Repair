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

    loadOrgs(): void {
        this.isLoading$.next(true);
        // TODO: Implement methods on OrgService.  It is currently incomplete
        // this.orgService.
    }
}