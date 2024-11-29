import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { ProductDetailPageComponent } from '../product-detail-page/product-detail-page.component';

@Injectable({
  providedIn: 'root'
})
export class MockProductService {

  private nextId = 1
  private products: Product[] = []


  constructor() {
    this.initIfNeeded();
  }

  private initIfNeeded(){
    let data = localStorage.getItem('mock-product-data');

    if (data !== null) {
      this.products = JSON.parse(data);
      return;
    }

    this.add({
      title: 'banana',
      price: 5.29,
      description: 'Banana top'
    })

    this.add({
      title: 'maçã',
      price: 5.40,
      description: 'Maçã suculenta'
    })

    this.add({
      title: 'goiaba',
      price: 10.49,
      description: 'Goiaba sem bixera'
    })
  }

  private save(){
    localStorage.setItem('mock-product-data', JSON.stringify(this.products))
  }

  add(product: Product) : void {
    product.id = this.nextId;
    this.nextId++;
    this.products.push(product);
  }

  getAll() : Product[] {
    return this.products;
  }

  getById(id:number) : Product | null {
    for (let prod of this.products) {
      if (id === prod.id)
        return prod;
    }
    return null;
  }
}
