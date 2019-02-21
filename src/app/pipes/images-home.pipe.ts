import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagesHome'
})
export class ImagesHomePipe implements PipeTransform {

  transform(movie: any): any {

    const url = 'https://image.tmdb.org/t/p/w500/';

  if (movie.backdrop_path) {
    return url + movie.backdrop_path;
  } else {
    return 'assets/img/no-image-found.gif';
  }

  }

}

