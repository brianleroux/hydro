/**
 * Hydro 
 * =====
 * Rehydrating micro applications. 
 *
 * (Offline virtual environment and package management for JavaScript.)
 * 
 * Features
 * --------
 * - create virtual environments of JavaScript libraries you define 
 * - library and dependency free 
 * - utilizes localStorage
 * - super tiny so it will load fast using HTML5 cache manifest
 *
 * Example usage
 * -------------
 * // something like this in an onLoad event to create a profile
 * var environment = new Hydro({ manifest:'simple-manifest.js' });
 * 
 * // simple-manifest.js
 * {
 * 	// the virtual environment profile to be loaded
 * 	"current":"0.0.1",
 * 
 * 	// available virtual environments profiles
 * 	"profiles":{
 * 		"0.0.1":[
 * 		   	{"name":"xui", "url":"../src/js/lib/xui-min.js"},
 * 			{"name":"fail", "url":"exists-it-does-not.js"}
 * 		]
 * 	}
 * }

TODO
====
- lib not found exception
- automaticUpdate();
- force(version)
- syntax check
- cleanup w/ a lib iterator
 * 
 */
var Hydro = function(options) {
	this.init(options);
};

Hydro.prototype = {
	/**
	 * loads a remote manifest into localStorage and kicks off the environment
	 *
	 *
	 */
	init:function(options) {
		var that = this;
		
		that.manifestUrl = options.manifest;
		that.update = options.update;
		
		// first run populates manifest and then loads the appropriate libs
		if (that.firstrun()) {
			that.loadManifest(function(){
				that.loadLibraries();
			});
		} else {
			// load the appropriate libs and then check for a fresh manifest
			that.rehydrate();
			that.checkForNewManifest();
		}
	},

	
	// loads the remote manifest into local storage
	loadManifest:function(callback) {
		var that = this;
		this.xhr(this.manifestUrl, function(){
			that.set('manifest', this.responseText);
			callback();			
		});
	},
		
	loadLibraries:function() {
		var m = this.manifest();
		var c = m.current;
		var p = m.profiles[c];
		var l = p.length;
		
		for (var i = 0; i < l; i++) {
			// chuck the libs into local storage for now using the convention 'profile:name' for the key
			var url = p[i].url;
			var key = c + ':' + p[i].name;
			var that = this;
			this.xhr(url, function(s) {
				that.set(key, this.responseText);
				that.initializeLibrary(that.get(key));
			});
		}
	},
	
	rehydrate:function() {
		var m = this.manifest();
		var c = m.current;
		var p = m.profiles[c];
		var l = p.length;
		
		for (var i = 0; i < l; i++) {
			var key = c + ':' + p[i].name;
			var that = this;
			that.initializeLibrary(that.get(key));
		}
	},
	
	checkForNewManifest:function() {
		var that = this;
		this.xhr(this.manifestUrl, function(){
			var newManifest = this.responseText;
			var oldManifest = that.get('manifest');
			
			if (newManifest != oldManifest) {
				that.update();
			}
		});
	},
	
	initializeLibrary:function(js) {
		eval(js);
	},
	
	
	//
	// helper methods
	// --------------
	// - consider these semiprivate however...
	// - do not care for those sorts of abstractions and would prefer to use tests/specs to prove the API
	//
	
	
	// g0d damn that's a pretty fucking good milkshake
	xhr:function(url, win) {
		var xhr  = new XMLHttpRequest();
      	xhr.open('get', url, false);
      	xhr.onload = win;
      	xhr.send();
	},
	
	// returns an item by key
	get:function(key) {
		return localStorage.getItem(key);
	},
	
	// sets an key and value to a store
	set:function(key, value) {
		localStorage.setItem(key, value);
	},
	
	// returns the manifest as a navigatable JSON object
	manifest:function() {
		return eval('(' + this.get('manifest') + ')');
	},
	
	// helper method to see if this is first time we're hydrating
	firstrun:function() {
		return this.get('manifest') == null
	}
	
	
// --		
};
