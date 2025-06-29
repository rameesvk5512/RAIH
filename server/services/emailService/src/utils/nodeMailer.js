import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import handlebars from "handlebars";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ramees@edgesplus.com",
    pass: "fojd pgqr bgvg phmq", 
  },
});

function loadTemplate(templateName, variables = {}) {
const filePath = path.resolve("src/templates", `${templateName}.hbs`);

  const templateSource = fs.readFileSync(filePath, "utf8");
  const template = handlebars.compile(templateSource);
  return template(variables); // inject data into template
}

export default async function sendEmail({ to, subject, template, variables }) {
  const htmlContent = loadTemplate(template, variables);

  const mailOptions = {
    from: '"RAIH Support" <yourgmail@gmail.com>',
    to,
    subject,
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
  console.log(`📧 Email sent to ${to}`);
}
