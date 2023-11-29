const sgMail = require("@sendgrid/mail")
const ErrorResponse = require("./errorResponse")
require("dotenv").config()
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendMail = async ({ to, from, fromname, subject, message, html }) => {
  let defaultHtml = `<body><p>${message}</p></body>`
  if (html) {
    defaultHtml = html
  }
  const mailObject = {
    to,
    from,
    fromname,
    subject,
    html: defaultHtml,
  }

  await sgMail.send(mailObject)
}

module.exports = sendMail