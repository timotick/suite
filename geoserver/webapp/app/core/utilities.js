/**
 * Module for reusable utitlies.
 */
 // http://stackoverflow.com/questions/19482000/angularjs-add-http-prefix-to-url-input-field
angular.module('gsApp.core.utilities', [])
.directive('httpPrefix', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, controller) {
      function ensureHttpPrefix(value) {
        // Need to add prefix if we don't have http:// prefix already
        if (value && !/^(https?):\/\//i.test(value) &&
            'http://'.indexOf(value) === -1) {
          controller.$setViewValue('http://' + value);
          controller.$render();
          return 'http://' + value;
        } else {
          return value;
        }
      }
      controller.$formatters.push(ensureHttpPrefix);
      controller.$parsers.splice(0, 0, ensureHttpPrefix);
    }
  };
})
.directive('popoverHtmlUnsafePopup', function () {
  return {
    restrict: 'EA',
    replace: true,
    scope: { title: '@',
    content: '@',
    placement: '@',
    animation: '&',
    isOpen: '&' },
    templateUrl: '/core/modals/popover-html-unsafe.tpl.html',
  };
})
.directive('popoverHtmlUnsafe', [ '$tooltip', function ($tooltip) {
  return $tooltip('popoverHtmlUnsafe', 'popover', 'click');
}])
/*
 * Filter below trims a long line
 * Adapted from http://stackoverflow.com/questions/18095727/limit-the-length-of-a-string-with-angularjs
 */
.filter('truncate', function () {
  return function (value, byword, max, tailEnd, tail) {
    if (!value) {
      return '';
    }
    max = parseInt(max, 10);
    if (!max) {
      return value;
    }
    if (value.length <= max) {
      return value;
    }
    var newValue = value.substr(0, max);
    if (byword) {
      var lastspace = newValue.lastIndexOf(' ');
      if (lastspace != -1) {
        newValue = newValue.substr(0, lastspace);
      }
    }
    if (tailEnd) { // include tail end of string
      var lastSlash = value.lastIndexOf('/');
      if (lastSlash != -1) {
        tail = value.substring(lastSlash);
      }
    }
    return newValue + '…' + tail;
  };
});
