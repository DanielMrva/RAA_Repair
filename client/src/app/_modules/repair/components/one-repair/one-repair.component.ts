import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepairService } from '@app/services/repairs/repair.service';
import { Repair } from '@app/graphql/schemas/typeInterfaces';

@Component({
  selector: 'app-one-repair',
  templateUrl: './one-repair.component.html',
  styleUrls: ['./one-repair.component.css']
})
export class OneRepairComponent implements OnInit{
  repair: Repair | undefined;

  constructor(
    private route: ActivatedRoute,
    private repairService: RepairService
  ) {}

  ngOnInit(): void {
      this.route.params.subscribe((params) => {
        const repairId = params['id'];
        this.loadRepair(repairId)
      });
  }

  loadRepair(repairId: string): void {
    this.repairService.querySingleRepair(repairId)
    .subscribe(({ data }) => {
      this.repair = data.repair;
    });
  }
}

