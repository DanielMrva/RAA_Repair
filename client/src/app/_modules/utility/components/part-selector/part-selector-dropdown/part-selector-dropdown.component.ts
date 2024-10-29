import { Component, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, startWith, switchMap, takeUntil, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { loadAllParts } from '@app/_store/_part-store/part.actions';



@Component({
  selector: 'app-part-selector-dropdown',
  templateUrl: './part-selector-dropdown.component.html',
  styleUrls: ['./part-selector-dropdown.component.css']
})
export class PartSelectorDropdownComponent {

}
