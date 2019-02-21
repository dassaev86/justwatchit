// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCwgU08E5tQPPF_fP9VTJsgCaWnPrZC-3w',
    authDomain: 'just-watch-it.firebaseapp.com',
    databaseURL: 'https://just-watch-it.firebaseio.com',
    projectId: 'just-watch-it',
    storageBucket: 'just-watch-it.appspot.com',
    messagingSenderId: '127237426996'
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
