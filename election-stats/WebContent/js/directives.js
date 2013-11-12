'use strict';

/* Directives */


angular.module('esi.directives', [])
  .directive('callfoundation', function ($timeout) {
		return {
			restrict: 'A',
			link: function postLink(scope, element, attrs) {
				if ((attrs.ngRepeat && scope.$last) || attrs.config) {
					$timeout(function() {
						$(document).foundation();
						$(window).resize();
					});
				}
			}
		};
	});