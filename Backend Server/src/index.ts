import { App } from "./app";
import connectMongoDB from "./database-mongo";

connectMongoDB();
const app = new App();
app.start();

/*// CONEXÃO COM A BD
// =============================================================================
var url = "mongodb://localhost:27017";
var mongoose = require("mongoose");
mongoose.Promise = global.Promise; mongoose.connect(url);*/
