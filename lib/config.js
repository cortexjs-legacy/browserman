var config;

exports.load=function(){
	return config;
}

exports.set=function(c){
	config=c;
}

exports.getMainServerAddress=function(){
	var server=config.server.main;
	return server.address+':'+server.port;
}

exports.getProxyServerAddress=function(){
	var server=config.server.proxy;
	return server.address+':'+server.port;
}
