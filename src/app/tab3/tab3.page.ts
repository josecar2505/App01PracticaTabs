import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  favorites:Product[]=[];
  constructor(private productService:ProductsService) {}
  ngOnInit(): void {
    this.productService.favoritesO.subscribe((products:Product[])=>{
      this.favorites = products;
    });
  }
  public addProducts(ProductAdded: Product){
    this.productService.addProducts(ProductAdded);
  }
  public removeFavorites(index:number){
    this.productService.removedFavorites(index);
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

