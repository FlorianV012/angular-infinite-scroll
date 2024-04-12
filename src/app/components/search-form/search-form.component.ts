import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss',
})
export class SearchFormComponent {
  @Input() searchRef!: string;

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  onSubmit() {
    this.search.emit(this.searchRef);
  }
}
