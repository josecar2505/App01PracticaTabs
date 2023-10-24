import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsService {
    addedProducts: Product[] = [];
    _addedProductsO = new BehaviorSubject<Product[]>([]);
    total = 0;
    _totalO = new BehaviorSubject<number>(0);
    productCounts: { [key: string]: number } = {};
    _productCountsO = new BehaviorSubject<{ [key: string]: number }>({});

    addProducts(productAdded: Product): void {
        
        const existingProduct = this.addedProducts.find(
            (product) => product.name === productAdded.name
        );

        if (!existingProduct) {
            this.addedProducts.push(productAdded);
        }
        this.total += productAdded.price;

        // Realiza un seguimiento de la cantidad de productos de cada tipo
        if (this.productCounts.hasOwnProperty(productAdded.type)) {
            this.productCounts[productAdded.type]++;
        } else {
            this.productCounts[productAdded.type] = 1;
        }
        this.notificar();    
    }

    
    removeProduct(index: number): void {
        const productToRemove = this.addedProducts[index];

        // Encuentra todas las instancias del producto que coinciden con el que deseas eliminar
        const productsToRemove = this.productCounts[productToRemove.type];

        // Resta el precio de todas las instancias del producto eliminado del total
        this.total -= productToRemove.price * productsToRemove;

        // Elimina todas las instancias del producto del carrito
        this.addedProducts = this.addedProducts.filter(
            (product) => product.name !== productToRemove.name
        );

        // Actualiza la cantidad de productos de ese tipo
        if (this.productCounts.hasOwnProperty(productToRemove.type)) {
            this.productCounts[productToRemove.type] -= productsToRemove;
        }
        this.notificar();
    }

    incrementProduct(index: number): void {
        const product = this.addedProducts[index];
        this.productCounts[product.type] += 1;
        this.total += product.price;
        this.notificar();
    }

    decrementProduct(index: number): void {
        const product = this.addedProducts[index];
        if (this.productCounts[product.type] > 1) {
            this.productCounts[product.type] -= 1;
            this.total -= product.price;
            this.notificar();
        }
    }

    notificar(){
        this._addedProductsO.next(this.addedProducts);
        this._totalO.next(this.total);
        this._productCountsO.next(this.productCounts);
    }

    /**Observables
     * Usados para mostrar cambios en tiempo real
     */
    addedProductsO:Observable<Product[]>=this._addedProductsO.asObservable();
    totalO:Observable<number> = this._totalO.asObservable();
    productCountsO: Observable<{[key:string]:number}> = this._productCountsO.asObservable();
    /*
     **/
}
