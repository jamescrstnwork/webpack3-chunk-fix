import angular = require('angular');
// declare const angular;

import '../basex-core';
import '../shared/r2dialog.shared';

const DEPENDENCIES = [
  'basex',
  'r2dialog.shared'
];

console.log('line from r2dialog.erp.ts');

angular.module('r2dialog.erp', DEPENDENCIES);
angular.module('r2dialog.erp').config( ['$stateProvider', '$locationProvider', ($stateProvider, $locationProvider) => {
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            controller: () => {
                console.log('dashboard controller is loaded');
            }
        });
}]);

angular.bootstrap(document, ['r2dialog.erp'], {
  strictDi: true
});
