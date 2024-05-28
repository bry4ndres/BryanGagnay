/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ProductFormComponent } from './product-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/core/services/products.service';
import { of } from 'rxjs';
import { ProductDTO } from 'src/app/core/DTOs/productDTO';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let mockProductsService: jasmine.SpyObj<ProductsService>;
  let mockToastr: jasmine.SpyObj<ToastrService>;

  beforeEach(async(() => {
    mockProductsService = jasmine.createSpyObj('ProductsService', ['updateProduct', 'currentProduct', 'changeProduct', 'createProduct','verificationId']);
    mockProductsService.updateProduct.and.returnValue(of({}));
    mockProductsService.currentProduct = of(null);

    mockToastr = jasmine.createSpyObj('ToastrService', ['success', 'warning']);

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot()],
      declarations: [ProductFormComponent],
      providers: [
        { provide: ProductsService, useValue: mockProductsService },
        { provide: ToastrService, useValue: mockToastr },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Form invalid when is empty', () => {
    expect(component.productForm.invalid).toBeTrue();
  });

  it('Form valid when is filled', fakeAsync(() => {
    component.productForm.controls['id'].setValue('uno');
    component.productForm.controls['name'].setValue('Product 1');
    component.productForm.controls['description'].setValue('descripcion de prueba');
    component.productForm.controls['logo'].setValue('http://logo-test.com');
    component.productForm.controls['date_release'].setValue(new Date().toISOString());
    component.productForm.controls['date_revision'].setValue(new Date().toISOString());

    tick();

    expect(component.productForm.valid).toBeTrue();
  }));

  it('should update product successfully', () => {
    const productToUpdate: ProductDTO = {
      id: 'uno',
      name: 'producto test',
      description: 'descripcion test',
      logo: 'logo test',
      date_release: new Date(),
      date_revision: new Date()
    };
    component.productForm.setValue(productToUpdate);

    mockProductsService.updateProduct.and.returnValue(of(true));

    component.updateProduct();

    expect(mockProductsService.updateProduct).toHaveBeenCalledWith(productToUpdate);
    expect(mockToastr.success).toHaveBeenCalledWith('Producto actualizado exitosamente');
  });

  it('should create product successfully', () => {
    const productToCreate: ProductDTO = {
      id: 'uno',
      name: 'producto test',
      description: 'descripcion test',
      logo: 'logo test',
      date_release: new Date(),
      date_revision: new Date()
    };
    component.productForm.setValue(productToCreate);

    mockProductsService.createProduct.and.returnValue(of(true));

    component.createProduct();

    expect(mockProductsService.createProduct).toHaveBeenCalledWith(productToCreate);
    expect(mockToastr.success).toHaveBeenCalledWith('Producto creado exitosamente');
  });
});
