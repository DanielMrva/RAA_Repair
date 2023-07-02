import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { QUERY_SINGLEREPAIR } from '@app/graphql/schemas';
import { Repair } from '@app/graphql/schemas/typeInterfaces';

@Component({
  selector: 'app-one-repair',
  templateUrl: './one-repair.component.html',
  styleUrls: ['./one-repair.component.css']
})
export class OneRepairComponent implements OnInit {
  repair: Repair | undefined;

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
      this.route.params.subscribe((params) => {
        const repairId = params['id'];
        this.loadRepair(repairId)
      });
  }

  loadRepair(repairId: string): void {
    this.apollo.query<{ repair: Repair }>({
      query: QUERY_SINGLEREPAIR,
      variables: {
        repairId
      }
    })
    .subscribe(({ data }) => {
      this.repair = data.repair;
    });
  }
}
