import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public products : Product[] = [];
  public productsFounds : Product [] = [];
  public addedProducts : Product [] = [];
  public total =0;
  productCounts: { [key: string]: number } = {};
  public filter = [
    "Abarrotes",
    "Frutas y verduras",
    "Limpieza",
    "Farmacia",
  ];

  constructor(private productService:ProductsService) {
    this.products.push({
      name: "Coca cola",
      photo: "https://picsum.photos/500/300?random",
      price: 20,
      type: "Abarrotes",
      description: "Lorem ipsum dolor sit amet",
    });
    this.products.push({
      name: "Jabón Zote",
      photo: "https://picsum.photos/500/300?random",
      price: 40,
      type: "Limpieza",
      description: "Lorem ipsum dolor sit amet",
    });
    this.products.push({
      name: "Manzana",
      photo: "https://picsum.photos/500/300?random",
      price: 20,
      type: "Frutas y verduras",
      description: "Lorem ipsum dolor sit amet",
    });
    this.products.push({
      name: "Aspirina",
      photo: "https://picsum.photos/500/300?random",
      price: 50,
      type: "Farmacia",
      description: "Lorem ipsum dolor sit amet",
    });
    this.products.push({
      name: "Paracetamol",
      photo: "https://picsum.photos/500/300?random",
      price: 50,
      type: "Farmacia",
      description: "Lorem ipsum dolor sit amet",
    });
    this.products.push({
      name: "Sandía",
      photo: "https://picsum.photos/500/300?random",
      price: 20,
      type: "Frutas y verduras",
      description: "Lorem ipsum dolor sit amet",
    });

    this.productsFounds = this.products;
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
public addProducts(ProductAdded: Product){
  this.productService.addProducts(ProductAdded);
}
  public filterProducts():void{
    console.log(this.filter);
    this.productsFounds = this.products.filter(
      item =>{
        return this.filter.includes(item.type);
      }
    );
  }
  
}
