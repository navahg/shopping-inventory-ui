import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';

import { ProductService } from '../../services/product.service';
import { MatSnackBar } from '@angular/material';
import { AddProductFormComponent } from '../add-product-form/add-product-form.component';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.scss']
})
export class ProductManagerComponent implements OnInit {

  @ViewChild(AddProductFormComponent) private readonly  addProductForm: AddProductFormComponent;

  products: Product[];
  categories: { [category: string]: Product[] };
  selectedTabIndex: number;

  constructor(
    private snackBar: MatSnackBar,
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.products = [];
    this.categories = {};
    this.selectedTabIndex = 0;
    this.fetchProducts();
  }

  /**
   * Fetches all the available products
   */
  async fetchProducts(): Promise<void> {
    (await this.productService.getProducts())
      .subscribe((products) => {
        if (!products || products.length === 0) {
          return;
        }
        this.products = products;
        this.categories = _.groupBy(products, (p) => p.category) || {};
      });
  }

  /**
   * Adds the product to the database
   * @param product The product to be added
   */
  async addProduct(product: Product): Promise<void> {
    (await this.productService.addProduct(product))
      .subscribe(() => {
          this.selectedTabIndex = 0;
          this.addProductForm.clearForm();
          this.fetchProducts();
          this.snackBar.open('Added product!', null, {
            duration: 2000
          });
        },
        () => {
          this.snackBar.open('Unable to add the product!', null, {
            duration: 2000
          });
        });
  }
}
