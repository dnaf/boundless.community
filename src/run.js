const App = require("./app"),
	config = require("config");

let app = new App();

let server = app.listen(config.get("http.port"), config.get("http.address"), () => {
	let address = server.address();
	console.info("Server listening at http://%s:%s", address.address, address.port);
});