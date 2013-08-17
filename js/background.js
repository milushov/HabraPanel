chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
	chrome.tabs.get(tabId,function(tab)
	{
		var url = tab.url.match(/^[\w-]+:\/*\[?([\w\.:-]+)\]?(?::\d+)?/)[1];
		if((url=="habrahabr.ru" || url=="auth.habrahabr.ru") && (changeInfo.status=="loading"))
		{
			chrome.tabs.executeScript({file: 'js/jquery.js'});
			chrome.tabs.executeScript({file: 'js/redesign.js'});
		}
	});
 });