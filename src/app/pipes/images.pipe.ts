import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'images'
})
export class ImagesPipe implements PipeTransform {

  transform(movie: any): any {

    const url = 'https://image.tmdb.org/t/p/w500/';

  if (movie.backdrop_path) {
    return url + movie.backdrop_path;
  } else if (movie.poster_path) {
    return url + movie.poster_path;
  } else if (movie.imagen) {
    return url + movie.imagen;
  } else {
    return 'assets/img/no_image.png';
  }

  }

}
