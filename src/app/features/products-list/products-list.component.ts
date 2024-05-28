import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductDTO } from 'src/app/core/DTOs/productDTO';
import { ProductsService } from 'src/app/core/services/products.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: ProductDTO[] = [];
  isLoading: boolean = false;

  filteredProducts: ProductDTO[] = [];
  totalProductsNumber: number = 0;
  productsToShow: number = 5;
  currentPage = 1;
  pageSize = 10;


  isDropdownVisible: number | null = null;

  showDeleteModal = false;
  productToDelete: ProductDTO | null = null;

  constructor(private productsService: ProductsService, private router: Router, private toastr: ToastrService, private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loadingService.show();

    this.productsService.getProducts().subscribe((res: any) => {

      this.products = res.data as ProductDTO[];

      this.changeProductCount({ target: { value: this.productsToShow } });
      this.totalProductsNumber = this.products.length;

      this.loadingService.hide();
    });
  }

  changeProductCount(event: any) {
    const count = event.target.value;
    this.productsToShow = count;
    this.filteredProducts = this.products.slice(0, count);
  }

  createProduct() {
    this.router.navigate(['/product-form']);
  }

  editProduct(product: ProductDTO) {
    this.productsService.changeProduct(product);
    this.router.navigate(['/product-form']);
  }

  searchProduct(event: any) {
    const query = event.target.value.toLowerCase();
    if (query === '') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => product.name.toLowerCase().includes(query));
    }
  }

  toggleDropdown(index: number | null) {
    if (this.isDropdownVisible === index) {
      this.isDropdownVisible = null; // Cierra el menú si ya está abierto
    } else {
      this.isDropdownVisible = index; // Abre el menú para el índice dado
    }
  }

  deleteProduct(product: ProductDTO) {
    this.productToDelete = product;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  confirmDeleteProduct() {
    this.loadingService.show();
    this.isLoading = true;
    this.showDeleteModal = false;

    this.productsService.deleteProduct(this.productToDelete!.id).subscribe((res) => {
      if (res) {
        this.products = this.products.filter(product => product.id !== this.productToDelete!.id);
        this.filteredProducts = this.filteredProducts.filter(product => product.id !== this.productToDelete!.id);

        this.totalProductsNumber = this.products.length;
        this.changeProductCount({ target: { value: this.productsToShow } });

        this.isLoading = false;
        this.loadingService.hide();
      }
    },
      (error) => {
        this.toastr.warning('Error al eliminar el producto');
        this.isLoading = false;
        this.loadingService.hide();
      }
    );
  }
}
