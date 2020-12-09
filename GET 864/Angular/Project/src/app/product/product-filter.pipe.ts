import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name:'productFilter'
})
export class ProductFilterPipe implements PipeTransform{
    transform(products:any[], searchTerm:string):any[]{
        if(!products||!searchTerm){
            return products;
        }

        return products.filter(prod=> prod.ProductDetails.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1);
    }
}