import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-little-tag',
  templateUrl: './little-tag.component.html',
  styleUrls: ['./little-tag.component.css']
})
export class LittleTagComponent {

  @Input() tagName: string = '';

}
