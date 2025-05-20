// functions/start-verify.js
const Twilio = require('twilio');

exports.handler = async function (context, event, callback) {
  const response = new Twilio.Response();
  response.appendHeader('Content-Type', 'application/json');

  try {
    // Validate phone number
    if (!event.to || event.to.trim() === '') {
      throw new Error("Missing 'to' parameter; please provide a phone number.");
    }

    const client = context.getTwilioClient();
    const { VERIFY_SERVICE_SID } = context;
    const { to } = event;

    // Send verification OTP
    const verification = await client.verify
      .services(VERIFY_SERVICE_SID)
      .verifications.create({
        to,
        channel: 'sms',
        locale: event.locale || 'en',
      });

    response.setStatusCode(200);
    response.setBody({ success: true });
    return callback(null, response);
  } catch (error) {
    response.setStatusCode(400);
    response.setBody({
      success: false,
      error: error.message,
    });
    return callback(null, response);
  }
};
