import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './features/products-list/products-list.component';
import { ProductFormComponent } from './features/product-form/product-form.component';

const routes: Routes = [
  { path: 'products-list', component: ProductsListComponent },
  { path: 'product-form', component: ProductFormComponent},
  { path: 'product-forms/:id', component: ProductFormComponent },
  { path: '**', redirectTo: '/products-list' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
