
import angular = require('angular');

const DEPENDENCIES = [];

console.log('line from basex: index.ts');

// FIXED from : https://code.angularjs.org/1.6.8/docs/error/$injector/nomod?p0=basex
// When defining a module with no module dependencies,
// the array of dependencies should be defined and empty.
// var myApp = angular.module('myApp', []);
// To retrieve a reference to the same module for further configuration, call angular.module without the array argument.

// var myApp = angular.module('myApp');

angular.module('basex',DEPENDENCIES);

