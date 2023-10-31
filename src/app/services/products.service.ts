import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { car } from '../models/car.models';

@Injectable({ providedIn: 'root' })
export class ProductsService {
    addedProducts: Product[] = [];
    _addedProductsO = new BehaviorSubject<Product[]>([]);
    addedcar: car[] = [];
    _addedcarO = new BehaviorSubject<car[]>([]);
    favorites:Product[]=[];
    _favoritesO = new BehaviorSubject<Product[]>([]);
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
        if (this.productCounts.hasOwnProperty(productAdded.name)) {
            this.productCounts[productAdded.name]++;
        } else {
            this.productCounts[productAdded.name] = 1;
        }
        this.notificar();    
    }
    addFavorites(newFavorit:Product):void{
        const existingProduct = this.favorites.find(
            (product) => product.name === newFavorit.name
        );
        if(!existingProduct){
            this.favorites.push(newFavorit);
        }
        this._favoritesO.next(this.favorites);
    }
    addcars(newcar:car):void{
        console.log(newcar);
        const existingcar = this.addedcar.find(
            (car) => car.shoppingDate === newcar.shoppingDate
        );
            if(!existingcar){
            this.addedcar.push(newcar);
        }
        this._addedcarO.next(this.addedcar);
    }
    removedFavorites(index:number):void{
        this.favorites.splice(index,1);
        this._favoritesO.next(this.favorites)
    }
    removeProduct(index: number): void {
        const productToRemove = this.addedProducts[index];

        // Encuentra todas las instancias del producto que coinciden con el que deseas eliminar
        const productsToRemove = this.productCounts[productToRemove.name];

        // Resta el precio de todas las instancias del producto eliminado del total
        this.total -= productToRemove.price * productsToRemove;

        // Elimina todas las instancias del producto del carrito
        this.addedProducts = this.addedProducts.filter(
            (product) => product.name !== productToRemove.name
        );

        // Actualiza la cantidad de productos de ese tipo
        if (this.productCounts.hasOwnProperty(productToRemove.name)) {
            this.productCounts[productToRemove.name] -= productsToRemove;
        }
        this.notificar();
    }

    incrementProduct(index: number): void {
        const product = this.addedProducts[index];
        this.productCounts[product.name] += 1;
        this.total += product.price;
        this.notificar();
    }

    decrementProduct(index: number): void {
        const product = this.addedProducts[index];
        if (this.productCounts[product.name] > 1) {
            this.productCounts[product.name] -= 1;
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
    addedcarO:Observable<car[]>=this._addedcarO.asObservable();
    addedProductsO:Observable<Product[]>=this._addedProductsO.asObservable();
    totalO:Observable<number> = this._totalO.asObservable();
    productCountsO: Observable<{[key:string]:number}> = this._productCountsO.asObservable();
    favoritesO:Observable<Product[]>=this._favoritesO.asObservable();

    /*
     **/
}
