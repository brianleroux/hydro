Hydro 
=====
Rehydrating micro applications
---

HTML5 adds a new attribute to the html element called manifest wherein you define a static file that lists urls of static files for the browser to cache. This enables developers to create truly offline applications, a technique pioneered Gmail for mobile, and cleverly coined 'rehydrating' applications by Erik Schmidt. 

So, all this business is cool for sure, however, the implementation is currently a little buggy and does not provide a method for inspecting or modifying the cache contents. No problem, the very little bit of functionality afforded by cache manifest is enough to cache Hydro itself which can then take care of caching and synchronizing your application JavaScript. 

In a sense you can view a Hydro application as an offline virtual environment for JavaScript. In another sense it could also be viewed as clientside package management. What does all this crazy shit mean? I have no idea. The code herein is experimental hacking so hopefully you find it interesting, useful or (at the very least) nifty. 


Features
--------
- built on top of an HTML5 Cache Manifest
- create virtual environments of JavaScript libraries you define 
- library and dependency free 
- utilizes localStorage but any underlying store is easily swapped in
- super tiny therefore super fast
- spec'd so feel free to hack the shit out of her
- example app in the exmaple directory (duh!)


Example usage
-------------
	// in your index.html file add this attribute: <html manifest="hydro.manifest"> 

	// something like this in an onLoad event to create a profile
	var environment = new Hydro({ manifest:'app-manifest.js' });

	// simple-manifest.js
	{
		// the virtual environment profile to be loaded
		"current":"0.0.1",

		// available virtual environments profiles
		"profiles":{
			"0.0.1":[
			   	{"name":"xui", "url":"../src/js/lib/xui-min.js"},
					{"name":"fail", "url":"exists-it-does-not.js"}
			]
		}
	}


TODO
====
- lib not found exception
- automaticUpdate();
- force(version)
- syntax check
- cleanup w/ a lib iterator