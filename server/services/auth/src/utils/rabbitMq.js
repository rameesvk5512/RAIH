import amqp from "amqplib";

const RABBIT_URL = "amqp://localhost";

let channel;

export async function initRabbitMQ() {
  const connection = await amqp.connect(RABBIT_URL);
  channel = await connection.createChannel();
  await channel.assertQueue("email_queue", { durable: true });
  console.log("✅ RabbitMQ channel ready");
}

export function publishToEmailQueue(data) {
  if (!channel) throw new Error("RabbitMQ channel is not initialized");
  channel.sendToQueue("email_queue", Buffer.from(JSON.stringify(data)), {
    persistent: true,
  });
  console.log("📤 Sent to email_queue:", data.to);
}
