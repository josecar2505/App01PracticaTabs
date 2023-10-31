import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { car } from '../models/car.models';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(private productService: ProductsService) { }
  addedCars: car[] = [];
  ngOnInit() {
    this.productService.addedcarO.subscribe((cars: car[]) => {
      this.addedCars = cars;
    });
  }
  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Sumamos 1 ya que los meses comienzan en 0 (enero)
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    // Formateamos la fecha y hora como "dd/mm/aaaa hh:mm"
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
}

