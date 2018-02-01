import angular = require('angular');

import '../basex-core';
import '../shared/r2dialog.shared';

const DEPENDENCIES = [
  'basex',
  'r2dialog.shared'
];

angular.module('r2dialog.b2b', DEPENDENCIES);

angular.bootstrap(document, ['r2dialog.b2b'], {
  strictDi: true
});


console.log('line from r2dialog.b2b.ts');
