<?php
	$ClientID="2140bing_translate";
	$ClientSecret="qTu36JotNAKrjz+yhf+7ETZ8a/40tZyB97U2RC56Td4=";
	$ClientSecret = urlencode ($ClientSecret);
	$ClientID = urlencode($ClientID);
	// Get a 10-minute access token for Microsoft Translator API.
	$url = "https://datamarket.accesscontrol.windows.net/v2/OAuth2-13";
	$postParams = "grant_type=client_credentials&client_id=$ClientID&client_secret=$ClientSecret&scope=http://api.microsofttranslator.com";

	//初始化一个新的会话，返回一个cURL句柄，供curl_setopt(), curl_exec()和curl_close() 函数使用。
	$ch = curl_init();
	//CURLOPT_URL: 需要获取的URL地址
	curl_setopt($ch, CURLOPT_URL, $url);
	//CURLOPT_POSTFIELDS: 全部数据使用HTTP协议中的"POST"操作来发送。要发送文件，在文件名前面加上@前缀并使用完整路径。
	curl_setopt($ch, CURLOPT_POSTFIELDS, $postParams);
	//CURLOPT_RETURNTRANSFER: 将curl_exec()获取的信息以文件流的形式返回，而不是直接输出。
	//使得curl_exec()能返回值而不是true
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
	//执行给定的cURL会话。这个函数应该在初始化一个cURL会话并且全部的选项都被设置后被调用。  
	$rsp = curl_exec($ch); 

	print $rsp;