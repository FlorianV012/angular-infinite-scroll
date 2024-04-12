import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPhoto } from '../../interfaces/photo';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() picture!: IPhoto;
  @Output() closeModal: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onCloseModal() {
    this.closeModal.emit();
  }
}
