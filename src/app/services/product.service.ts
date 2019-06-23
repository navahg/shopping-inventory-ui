import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppConstants } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
    private config: AppConstants
  ) {
  }

  /**
   * Fetches the products from the server
   * @return The collection of the products as an observable
   */
  async getProducts(): Promise<Observable<Product[]>> {
    // get the api
    const endpoint: any = await fetch(this.config.API_ROOT).then(response => response.json());

    return this.http.get<Product[]>(`http://${endpoint.ip}/api/products`);
  }

  /**
   * Adds a product to the web site
   * @param product The product to be added
   */
  async addProduct(product: Product): Promise<Observable<object>> {
    // get the api
    const endpoint: any = await fetch(this.config.API_ROOT).then(response => response.json());

    return this.http.post<object>(`http://${endpoint.ip}/api/products`, product);
  }
}
