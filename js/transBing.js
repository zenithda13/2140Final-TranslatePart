$(document).ready(function() {
	var bing_token = '';

  	// Get an access token now.  Good for 10 minutes.
  	getToken();
  	// Get a new one every 9 minutes.
  	setInterval(getToken, 9 * 60 * 1000);

	function getToken() {
  		var requestStr = "./php/transtoken.php";
		$.ajax({
		    url: requestStr,
		    type: "GET",
		    cache: true,
		    dataType: 'json',
		    success: function (data) {
		      bing_token = data.access_token;
		    }
  		});
	}
	function ajaxTranslate(textToTranslate, fromLanguage, toLanguage, selector) {
		var p = {};
		p.appid = "Bearer " + bing_token;
		p.to = toLanguage;
		p.from = fromLanguage;
		p.text = textToTranslate;
		$.ajax({
			url: 'http://api.microsofttranslator.com/V2/Ajax.svc/Translate',
			data: p,
			dataType: 'jsonp',
			jsonp: 'oncomplete',
			complete: function(request, status) {
				//alert('complete: '+status); // you can use an alert here to check what really happens on completion of the request to translate
			},
			success: function(data, status) {
				//alert('success: data-'+data+',status-'+status); // again you can use an alert to check on success
				$(selector).text(data); // this is where we replace the element's current text with the translated text
			},
			error: function(request, status, error) {
				alert('error: status-'+status+',desc-'+error); // here you can check if there is any error on request
			}
		});
	} 

	$('#translateButton').click(function(event) {
		/* Act on the event */
		$("span").each(function (){
			ajaxTranslate($(this).text(), "en","zh-CHS",$(this));
			});
	});

	$('#translateButton2').click(function(event) {
		/* Act on the event */
		$("span").each(function (){
			ajaxTranslate($(this).text(), "zh-CHS","en",$(this));
			});
	});

	$('#translateButton3').click(function(event) {
		/* Act on the event */
		$("span").each(function (){
			ajaxTranslate($(this).text(), "en","fr",$(this));
			});
	});
});

