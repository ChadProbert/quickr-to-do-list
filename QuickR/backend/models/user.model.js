const mongoose = require("mongoose");

const User = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, unique: true, required: true },
		password: { type: String, required: true },
		todos: { type: Array },
	},
	// name of the collection in the mongoDB
	{ collection: "user-data" }
);

const model = mongoose.model("UserData", User);

module.exports = model;

/* references: 

https://docs.mongodb.com/manual/reference/operator/update/push/#mongodb-update-up.-push

https://www.youtube.com/watch?v=Ejg7es3ba2k

https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/

*/
