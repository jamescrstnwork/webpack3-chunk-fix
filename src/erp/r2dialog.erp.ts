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

angular.bootstrap(document, ['r2dialog.erp'], {
  strictDi: true
});
