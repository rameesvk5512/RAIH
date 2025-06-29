import amqp from "amqplib";
import sendEmail from "./nodeMailer.js";


const RABBIT_URL = "amqp://localhost";


export async function startEmailConsumer() {
  const connection = await amqp.connect(RABBIT_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue("email_queue", { durable: true });

  channel.consume("email_queue", async (msg) => {
  if (msg !== null) {
    const data = JSON.parse(msg.content.toString());
    console.log("📥 Received:", data);

    try {
      await sendEmail({
        to: data.to,
        subject: data.subject,
        template: data.template,
        variables: data.variables, // e.g., { name: "Ramees" }
      });
      channel.ack(msg);
    } catch (err) {
      console.error("❌ Failed to send email:", err.message);
      channel.nack(msg);
    }
  }
});


  console.log("📨 Email Service running with templated emails...");
}
