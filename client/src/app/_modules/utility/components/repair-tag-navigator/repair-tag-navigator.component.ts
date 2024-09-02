import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-repair-tag-navigator',
  templateUrl: './repair-tag-navigator.component.html',
  styleUrls: ['./repair-tag-navigator.component.css']
})
export class RepairTagNavigatorComponent {
  
  repairByTagForm = new FormGroup({
    startTag: new FormControl<string>('', { nonNullable: true }),
    endTag: new FormControl<string>('')
  });

  constructor(private router: Router) {}

  navigateToRepairByTag() {
    if (this.repairByTagForm.valid) {
      const startTag = this.repairByTagForm.value.startTag;
      const endTag = this.repairByTagForm.value.endTag;

      const queryParams: any = { startTag };
      if (endTag) {
        queryParams.endTag = endTag;
      }

      this.router.navigate(['/repair-results'], { queryParams });
    }
  }


}
