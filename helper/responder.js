// Function for sending successful response
const sendSuccess = async function (res, message, data) {
	let returnArray = {
		'success': true,
		'message': message,
		'data': data
	}
	return res.status(200).json(returnArray);

}

// Function for sending response when some error occurs
const sendError = async function (res, message,code = 400) {

	let returnOb = {
		'success': false,
		'message': message,
		'responseCode': code
	}
	return res.status(code).json(returnOb);
}

module.exports = {
    sendError,
    sendSuccess
}