import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  addedProducts: Product[] = [];
  total: number = 0;
  productCounts: { [key: string]: number } = {};

  //Constructor
  constructor(private router:Router ,private productService: ProductsService) {}
  ngOnInit() {
    this.productService.addedProductsO.subscribe((products: Product[]) => {
      this.addedProducts = products;
    });

    this.productService.totalO.subscribe((newTotal: number) => {
      this.total = newTotal;
    });

    this.productService.productCountsO.subscribe(
      (counts: { [key: string]: number }) => {
        this.productCounts = counts;
      }
    );
  }
  removeProduct(index: number){
    this.productService.removeProduct(index);
  }
  decrementProduct(index:number){
    this.productService.decrementProduct(index);
  }
  incrementProduct(index:number){
    this.productService.incrementProduct(index);
  }
  addCars(Products:Product[],Total:number){
  
    this.productService.addcars(({
      shoppingDate:new Date(),
      total:Total,
      products:Products
    }));

    this.productService.resetCart();
    this.redirectToTab();
  }
  redirectToTab(){
    this.router.navigate(['/tabs/tab4'])
  }
  getColor(productType: string): string {
    switch (productType) {
      case 'Abarrotes':
        return 'primary';
      case 'Frutas y verduras':
        return 'success';
      case 'Limpieza':
        return 'warning';
      case 'Farmacia':
        return 'danger';
      default:
        return '';
    }
  }
}
