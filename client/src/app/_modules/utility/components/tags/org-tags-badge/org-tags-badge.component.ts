import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Tag } from '@app/graphql/schemas';

@Component({
  selector: 'app-org-tags-badge',
  templateUrl: './org-tags-badge.component.html',
  styleUrls: ['./org-tags-badge.component.css']
})
export class OrgTagsBadgeComponent implements OnChanges {

  @Input() tags: Tag[] = []

  tooltipText = ''

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['tags'] && this.tags) {
      this.tooltipText = this.tags.map(tag => tag.tagName).join(', ');
    }
      
  }

}
