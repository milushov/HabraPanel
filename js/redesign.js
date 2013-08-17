var app_id = chrome.i18n.getMessage("@@extension_id");

var body = $('body');
var userpanel = $('.userpanel')[0];
var username = $(".dark").get(0).text;

//header

$.ajax({
  url: 'chrome-extension://'+app_id+'/html/panel.html',
  success: createTopBar
});


function createTopBar(topBar)
{
	body.prepend(topBar);
	$("#pl_username").html('<a href="http://habrahabr.ru/users/' + username + '/"><b>' + username + '</b></a><sup id="karma" class="sup"></sup><sup class="sup"> - </sup><sup class="sup" id="rating"></sup>');
	$("#pl_fav_link").prepend('<a href="http://habrahabr.ru/users/' + username +'/favorites/">Избранное</a>');

	var pl_count = $('.count');
	for(i=0;i<pl_count.length;i++)
	{
		if(pl_count[i].parentNode.className=="bottom")
		{
			if(pl_count[i].href=="http://habrahabr.ru/tracker/")
			{
				$("#pl_tracker").append('<a class="pl_count">'+pl_count[i].text+'</a>');
			}

			if(pl_count[i].href=="http://habrahabr.ru/conversations/")
			{
				$("#pl_conf").append('<a class="pl_count">'+pl_count[i].text+'</a>');
			}
		}
	}

	$(".search").remove();
	var logo = $(".logo");
	logo.attr("class","pl_logo");
	$(".sidebar_right").css('position','absolute');
	$(".sidebar_right").css('right','0');
	$(".sidebar_right").css('margin-top','50px');
	//logo.css("background-image", 'url("chrome-extension://'+app_id+'/html/logo.png")');


	var req = new XMLHttpRequest();
	req.open('GET', 'http://habrahabr.ru/api/profile/'+username, true);
	req.overrideMimeType('text/xml');
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200) {
			document.getElementById('karma').innerHTML= req.responseXML.getElementsByTagName('karma')[0].firstChild.nodeValue;
			document.getElementById('rating').innerHTML= req.responseXML.getElementsByTagName('rating')[0].firstChild.nodeValue;
			console.log(habra_karma,habra_rating);
		}
	};
	req.send();

	userpanel.remove();
}


window.onscroll = function()
{
	if (window.pageYOffset >= 0)
	{
		jQuery('#topbar').css({position: 'fixed', top: '0px',width:'100%'});
	}
	else
	{
		jQuery('#topbar').css({position: '', right: '', top: ''});
	}
}