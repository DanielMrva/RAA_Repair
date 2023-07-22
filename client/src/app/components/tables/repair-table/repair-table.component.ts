import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { RepairDataSource } from '@app/services/repairs/repair.dataSource';
import { RepairService } from '@app/services/repairs/repair.service';

@Component({
  selector: 'app-repair-table',
  templateUrl: './repair-table.component.html',
  styleUrls: ['./repair-table.component.css']
})
export class RepairTableComponent implements OnInit {


  ngOnInit(): void {
      
  }
}
