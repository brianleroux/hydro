var manifest 		= hydro.manifest();
var current 		= manifest.current;
var profiles 		= manifest.profiles; 
var currentProfile 	= profiles[current];


var renderAppSkeleton = function() {	
	x$('body').inner('<h1>Hydro View Source Example Application</h1><div id="manifest"><p>Profiles</p></div><div id="stage"></stage>');
}();


var renderProfile = function(profile) {
	var s = '';
	for (var i = 0; i < profiles[profile].length; i++) {
		s += '<div class="code">'
		s += '<h2>' + profiles[profile][i].name + '</h2>';
		s += '<p>' + profiles[profile][i].url + '</p>';
		s += '<textarea>' + hydro.get(profile + ':' + profiles[profile][i].name) + '</textarea>';
		s += '</div>'
	}
	x$('#stage').html(s);
};


var renderProfiles = function() {		
	x$('#manifest').bottom('<ul></ul>');
	
	for (var i in profiles) {
		var klass = i == current ? 'selected' : '';
		x$('#manifest ul').bottom('<li class="' + klass + '">' + i + '</li>');
	}
		
	x$('#manifest ul li').click(function(e) {
		x$('#manifest ul li').removeClass('selected');
		x$(e.target).addClass('selected');
		var id = x$(e.target).first().innerText;
		renderProfile(id);
	});
	
	renderProfile(current);
}();
