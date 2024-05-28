import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { environment } from 'src/environments/environment';
import { HttpResponse } from '@angular/common/http';
import { ProductDTO } from '../DTOs/productDTO';

describe('Service: Products', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService]
    });

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should ...', inject([ProductsService], (service: ProductsService) => {
    expect(service).toBeTruthy();
  }));

  it('should remove product', inject([ProductsService], (service: ProductsService) => {
    const mockResponse = 'Product removed successfully';

    service.deleteProduct('uno').subscribe(res => {
      expect(res).toEqual('Product removed successfully');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/bp/products/uno`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  }));

  it('should get message: Not product found with that identifier', inject([ProductsService], (service: ProductsService) => {
    const mockResponse = { name:'NotFoundError',message: 'Not product found with that identifier' };

    service.deleteProduct('uno').subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/bp/products/uno`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  }));

  it('should handle remove error', inject([ProductsService], (service: ProductsService) => {
    const mockError = { Errors: 'Network error' };

    service.deleteProduct('uno').subscribe(
      res => fail('should have failed with a network error'),
      (error) => {
        expect(error).toEqual('Network error');
      }
    );

    const req = httpMock.expectOne(`${environment.apiUrl}/bp/products/uno`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockError, { status: 500, statusText: 'Internal Server Error' });
  }));

  it('should get true when ID exist', inject([ProductsService], (service: ProductsService) => {
    const mockResponse = true ;

    service.verificationId('uno').subscribe(res => {
      expect(res).toBeTrue();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/bp/products/verification/uno`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  }));

  it('should get false when ID does not exist', inject([ProductsService], (service: ProductsService) => {
    const mockResponse = false ;

    service.verificationId('uno').subscribe(res => {
      expect(res).toBeFalse();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/bp/products/verification/uno`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  }));

  it('should create product', inject([ProductsService], (service: ProductsService) => {
    const mockProduct: ProductDTO = {
      id: '1',
      name: 'Product 1',
      description: 'description',
      logo: 'logo',
      date_release: new Date(),
      date_revision: new Date()
    };

    const mockResponse = {
      message: 'Product created successfully',
      data: mockProduct
    };

    service.createProduct(mockProduct).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/bp/products`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  }));

  it('should update product', inject([ProductsService], (service: ProductsService)=> {
    const mockProduct: ProductDTO = {
      id: '1',
      name: 'Product 1',
      description: 'description',
      logo: 'logo',
      date_release: new Date(),
      date_revision: new Date()
    };

    const mockResponse = {
      message: 'Product updated successfully',
      data: mockProduct
    };

    service.updateProduct(mockProduct).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/bp/products/${mockProduct.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  }));
});
