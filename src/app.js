Promise = require("bluebird");

const config = require("config"),
	Express = require("express"),
	fs = Promise.promisifyAll(require("fs")),
	request = require("request-promise"),
	yaml = require("js-yaml");

class App extends Express {
	constructor() {
		super();

		this.get("/", async (req, res) => {
			let widgetURL = config.get("discord.widgetAPI");
			let response = await request(widgetURL)
			let data = {
				widget: JSON.parse(response),
				widgetURL
			};
			res.render("index.pug", data);
		});

		this.get("/rules", async (req, res) => {
			let data = yaml.safeLoad(await fs.readFileAsync("rules.yml"));
			res.render("rules.pug", data);
		});

		this.get("/events", async (req, res) => {
			res.render("events.pug");
		})

		this.use(Express.static("public"));
	}
}

module.exports = App;