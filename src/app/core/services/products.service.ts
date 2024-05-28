import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, catchError, map, of } from "rxjs";
import { ProductDTO } from "../DTOs/productDTO";

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  private apiUrl= environment.apiUrl;

  private productSource = new BehaviorSubject(null);
  currentProduct = this.productSource.asObservable();


  constructor(private http: HttpClient) {}

  changeProduct(product: any) {
    this.productSource.next(product);
  }

  deleteProduct(id:string){
    return this.http.delete(`${this.apiUrl}/bp/products/${id}`)
    .pipe(
      map(resp => resp),
      catchError(e =>{
        throw e.error.Errors;
      })
    )
  }

  getProducts() {
    return this.http.get(`${this.apiUrl}/bp/products`);
  }

  createProduct(product: ProductDTO) {
    return this.http.post(`${this.apiUrl}/bp/products`, product)
    .pipe(
      map(resp => resp),
      catchError(e =>{
        throw e.error.Errors;
      })
    )
  }

  updateProduct(product: ProductDTO) {
    return this.http.put(`${this.apiUrl}/bp/products/${product.id}`, product)
    .pipe(
      map(resp => resp),
      catchError(e =>{
        throw e.error.Errors;
      })
    )
  }

  verificationId(id:string){
    return this.http.get(`${this.apiUrl}/bp/products/verification/${id}`)
  }
}
