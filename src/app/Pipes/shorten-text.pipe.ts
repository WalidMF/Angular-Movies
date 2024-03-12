import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenText'
})
export class ShortenTextPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  transform(value: any, limit: number = 10, trail: string = '...'): string {
    if (value == null) {
         return "";
    }
    return value.length > limit ? value.substring(0, limit) + trail : value;
}

}
