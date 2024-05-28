import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/core/services/products.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { dateValidator } from 'src/app/shared/validators/date-validator';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  private currentProductSubscription?: Subscription;
  productForm: FormGroup = new FormGroup({});
  isLoading = false;
  isNewProduct = true;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private toastr: ToastrService,
    private loadingService: LoadingService
  ) {
    this.productForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      logo: ['', Validators.required],
      date_release: ['', [Validators.required, dateValidator()]],
      date_revision: ['', Validators.required],
    });
  }

  ngOnInit() {

    this.loadingService.show();
    this.currentProductSubscription =this.productsService.currentProduct.subscribe((product) => {
      if (product) {
        this.isNewProduct = false;

        this.productForm.setValue(product);
        this.productForm.get('id')?.disable();
      } else {
        this.isNewProduct = true;
        this.productForm.get('id')?.enable();
      }

      this.loadingService.hide();
    });
  }

  ngOnDestroy(): void {
    this.productsService.changeProduct(null);
  }

  onSubmit() {
    this.loadingService.show();

    if (this.productForm.valid) {
      this.isLoading = true;

      if (this.isNewProduct) {
        this.productsService
          .verificationId(this.productForm.value.id)
          .subscribe(
            (exists) => {
              if (exists) {
                this.toastr.warning('El ID del producto ya existe');
              } else {
                this.createProduct();
              }
              this.loadingService.hide();
              this.isLoading = false;
            },
            (error) => {
              this.toastr.error('Error al validar el ID del producto');
              this.isLoading = false;
              this.loadingService.hide();
            }
          );
      }
      else {
        this.updateProduct();
      }
    } else {
      this.productForm.markAllAsTouched();
      this.loadingService.hide();
    }
  }

  createProduct() {
    this.productsService
      .createProduct(this.productForm.value)
      .subscribe(
        (res) => {
          if (res) {
            this.toastr.success('Producto creado exitosamente');
            this.productForm.reset();
          }

          this.loadingService.hide();
        },
        (error) => {
          this.toastr.warning('Error al crear el producto');
          this.loadingService.hide();
        }
      );
  }

  getRevisionDate() {
    const dateRelease = this.productForm.get('date_release')?.value;
    if (dateRelease) {
      const release = new Date(dateRelease);
      const oneYearAfterRelease = new Date(
        release.setFullYear(release.getFullYear() + 1)
      );

      this.productForm.controls['date_revision'].setValue(oneYearAfterRelease);

      return oneYearAfterRelease.toISOString().split('T')[0];
    }

    return null;
  }

  updateProduct() {
    this.productsService.updateProduct(this.productForm.getRawValue()).subscribe(
      (res) => {
        if (res) {
          this.toastr.success('Producto actualizado exitosamente');
          this.isLoading = false;
        }

        this.loadingService.hide();
      },
      (error) => {
        this.toastr.warning('Error al actualizar el producto');
        this.isLoading = false;
        this.loadingService.hide();
      }
    );
  }
}
