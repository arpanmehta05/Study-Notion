const mailSender = require("../utils/Mailsender");
const { contactUsEmail } = require("../mail/templates/contactFormRes");

exports.contactUs = async (req, res) => {
  try {
    const { firstName, lastName, email, message, phoneNo, countrycode } =
      req.body;

    const emailData = await mailSender(
      email,
      "Your Data send successfully",
      contactUsEmail(email, firstName, lastName, message, phoneNo, countrycode)
    );
    console.log("Email Response", emailData);
    return res
      .status(200)
      .json({ status: 200, message: "Email Sent Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};
