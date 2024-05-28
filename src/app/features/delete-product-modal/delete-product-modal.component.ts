import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductDTO } from '../../core/DTOs/productDTO';

@Component({
  selector: 'app-delete-product-modal',
  templateUrl: './delete-product-modal.component.html',
  styleUrls: ['./delete-product-modal.component.css']
})
export class DeleteProductModalComponent implements OnInit {
  @Input() show = false;
  @Input() productToDelete: any;
  @Output() onClose = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.onClose.emit();
  }

  deleteProduct() {
    this.onDelete.emit();
  }

}
