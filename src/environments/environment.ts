// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import packageInfo from '../../package.json';

export const environment = {
  appName: "Localess [Dev]",
  firebase: {
    projectId: 'localess-dev',
    appId: '1:923248451826:web:47779533df41508d8a706b',
    storageBucket: 'localess-dev.appspot.com',
    locationId: 'europe-west6',
    apiKey: 'AIzaSyAGDhKpaTfxnX7kLeXQiuD-1sBWw0z9b2g',
    authDomain: 'localess-dev.firebaseapp.com',
    messagingSenderId: '923248451826',
  },
  auth: {
    customDomain: '*',
    providers: 'GOOGLE,MICROSOFT'
  },
  production: false,
  test: true,
  useEmulators: true,
  version: packageInfo.version,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
