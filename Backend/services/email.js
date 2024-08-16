const nodemailer = require("nodemailer");
// const email_existence = require("email-existence");

// module.exports = {
//   checkEmail: (email) => {
//     return new Promise((resolve, reject) => {
//       email_existence.check(email, (error, response) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(response);
//         }
//       });
//     });
//   },
// };

exports.sendEmail = async (email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "20011598-076@uog.edu.pk",
      pass: "gtui ccjg shld vuha",
    },
  });
  const mailOptions = {
    from: "20011598-076@uog.edu.pk",
    to: email,
    subject: "Program is posted at PakOppertunityHub ",
    text: "A new Program is posted at PakOppertunityHub this might interest you get access to site and see latest programs by govt",
  };
  await transporter.sendMail(mailOptions);
};
