import { Component } from '@angular/core';
import { Product } from '../models/product.model';

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

  constructor() {
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

    this.productsFounds = this.products;
  }

  public addProducts(productAdded: Product):void{
    const existingProduct = this.addedProducts.find(product => product.name === productAdded.name);

    if(!existingProduct){
      this.addedProducts.push(productAdded); 
    }
    this.total += productAdded.price;
    
    // Realiza un seguimiento de la cantidad de productos de cada tipo
    if (this.productCounts.hasOwnProperty(productAdded.type)) {
      this.productCounts[productAdded.type]++;
    } else {
      this.productCounts[productAdded.type] = 1;
    }
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

  removeProduct(index: number): void {
    const productToRemove = this.addedProducts[index];
  
    // Encuentra todas las instancias del producto que coinciden con el que deseas eliminar
    const productsToRemove = this.productCounts[productToRemove.type];
  
    // Resta el precio de todas las instancias del producto eliminado del total
    this.total -= productToRemove.price * productsToRemove;
  
    // Elimina todas las instancias del producto del carrito
    this.addedProducts = this.addedProducts.filter(product => product.name !== productToRemove.name);
  
    // Actualiza la cantidad de productos de ese tipo
    if (this.productCounts.hasOwnProperty(productToRemove.type)) {
      this.productCounts[productToRemove.type] -= productsToRemove;
    }
  }

  incrementProduct(index: number): void {
    const product = this.addedProducts[index];
    this.productCounts[product.type] += 1;
    this.total += product.price;
  }
  
  decrementProduct(index: number): void {
    const product = this.addedProducts[index];
    if(this.productCounts[product.type] >1){
    this.productCounts[product.type] -= 1;
    this.total -= product.price;
    }
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
