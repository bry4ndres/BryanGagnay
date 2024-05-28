import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProductsListComponent } from './products-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ProductsService } from 'src/app/core/services/products.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ProductDTO } from 'src/app/core/DTOs/productDTO';
import { LoadingService } from 'src/app/shared/services/loading.service';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let productsService: jasmine.SpyObj<ProductsService>;
  let loadingService: jasmine.SpyObj<LoadingService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const productsServiceMock = jasmine.createSpyObj('ProductsService', ['getProducts', 'changeProduct', 'deleteProduct']);
    productsServiceMock.getProducts.and.returnValue(of([]));
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        ToastrModule.forRoot()],
      declarations: [ ProductsListComponent ],
      providers: [
        { provide: ProductsService, useValue: productsServiceMock },
        { provide: LoadingService, useValue: jasmine.createSpyObj('LoadingService', ['show', 'hide']) },
        { provide: Router, useValue: routerMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    loadingService = TestBed.inject(LoadingService) as jasmine.SpyObj<LoadingService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to product form on createProduct', () => {
    component.createProduct();
    expect(router.navigate).toHaveBeenCalledWith(['/product-form']);
  });

  it('should call changeProduct method of productsService and navigate to product form', () => {
    const product: ProductDTO = {
      id: 'uno',
      name: 'producto test',
      description: 'descripcion test',
      logo: 'logo test',
      date_release: new Date(),
      date_revision: new Date()
    };

    component.editProduct(product);
    expect(productsService.changeProduct).toHaveBeenCalledWith(product);
    expect(router.navigate).toHaveBeenCalledWith(['/product-form']);
  });

  it('should show all products when search query is empty', () => {
    const event = { target: { value: '' } };
    component.searchProduct(event);
    expect(component.filteredProducts).toEqual(component.products);
  });

  it('should toggle dropdown visibility', () => {
    component.toggleDropdown(0);
    expect(component.isDropdownVisible).toEqual(0);

    component.toggleDropdown(0);
    expect(component.isDropdownVisible).toBeNull();
  });


  it('should delete product successfully', () => {
    const productId = 'productId';

    productsService.deleteProduct.and.returnValue(of(true));

    component.products = [{ id: 'productId' } as ProductDTO];
    component.productToDelete = { id: productId } as ProductDTO;
    component.confirmDeleteProduct();


    expect(productsService.deleteProduct).toHaveBeenCalledWith(productId);
  });

});

