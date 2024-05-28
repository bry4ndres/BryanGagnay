import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProductModalComponent } from './delete-product-modal.component';

describe('DeleteProductModalComponent', () => {
  let component: DeleteProductModalComponent;
  let fixture: ComponentFixture<DeleteProductModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteProductModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onClose event when closeModal is called', () => {
    spyOn(component.onClose, 'emit');

    component.closeModal();

    expect(component.onClose.emit).toHaveBeenCalled();
  });

  it('should emit onDelete event when deleteProduct is called', () => {
    spyOn(component.onDelete, 'emit');

    component.deleteProduct();

    expect(component.onDelete.emit).toHaveBeenCalled();
  });
});
