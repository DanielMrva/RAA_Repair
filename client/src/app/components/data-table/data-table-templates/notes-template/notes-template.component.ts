import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notes-template',
  templateUrl: './notes-template.component.html',
  styleUrls: ['./notes-template.component.css']
})
export class NotesTemplateComponent {
  @Input() notes: string[] = []

}
