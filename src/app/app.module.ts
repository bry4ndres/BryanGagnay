import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsListComponent } from './features/products-list/products-list.component';
import { HttpClientModule } from "@angular/common/http";
import { CustomHeaderComponent } from './shared/custom-header/custom-header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductFormComponent } from './features/product-form/product-form.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteProductModalComponent } from './features/delete-product-modal/delete-product-modal.component';
import { DateFormatPipe } from './shared/pipes/date-format.pipe';
import { LoadingComponent } from './shared/components/loading/loading.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    CustomHeaderComponent,
    ProductFormComponent,
    DeleteProductModalComponent,
    DateFormatPipe,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
