import { AfterViewInit, Component, OnChanges, SimpleChanges, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Tag } from '@app/graphql/schemas';

@Component({
  selector: 'app-dashboard-tag-table',
  templateUrl: './dashboard-tag-table.component.html',
  styleUrls: ['./dashboard-tag-table.component.css']
})
export class DashboardTagTableComponent implements OnChanges, AfterViewInit {

  @Input() tags: Tag[] | null = [];

  displayedColumns: string[] = ['tagName', 'navigationColumn', 'editColumn'];

  dataSource: MatTableDataSource<Tag> = new MatTableDataSource<Tag>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['tags'] && changes['tags'].currentValue?.length > 0) {
        this.dataSource.data = this.tags || [];
      }
  };

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  };

}
