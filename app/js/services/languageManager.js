'use strict';

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * @ngdoc service
 * @name tradity.languageManager
 * @description
 * # languageManager
 * Factory
 */
angular.module('tradity')
	.factory('languageManager', function (gettextCatalog, DEFAULT_LANGUAGE) {
		var localStorage_ = typeof localStorage != 'undefined' ? localStorage : {};
		
		var LanguageManager = function() {
			localStorage_.language = localStorage_.language || DEFAULT_LANGUAGE;
		};

		LanguageManager.asyncFiles = {
			'de': 'js/jit/l10n/de.json'
		};
		
		LanguageManager.prototype.setCurrentLanguage = function(lang) {
			var isChange = (lang != null && localStorage_.language != lang);
			
			if (isChange) {
				localStorage_.language = lang;
			
				gettextCatalog.setCurrentLanguage(localStorage_.language);
				gettextCatalog.loadRemote(LanguageManager.asyncFiles[localStorage_.language]);
			}
			
			return localStorage_.language;
		};
		
		LanguageManager.prototype.getCurrentLanguage = function() {
			return this.setCurrentLanguage(null);
		};
		
		return new LanguageManager();
	});