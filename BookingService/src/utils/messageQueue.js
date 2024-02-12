const amqp = require("amqplib");
const {EXCHANGE_NAME, QUEUE_NAME, MESSAGE_BROKER_URL} = require("../config/serverConfig");
const {AppError} = require("./errors/index");
const createChannel = async () => {
    try {
        const connection = await amqp.connect(MESSAGE_BROKER_URL);
        const channel = await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME, "direct", false);
        return channel;
    } catch (error) {
        throw new AppError(error.name, error.message, "Error in connecting to message broker", 500);
    }
};

const subscribeMessage = async (channel, service, bindingKey) => {
    try {
        const applicationQueue = await channel.assertQueue(QUEUE_NAME);
        channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, bindingKey);
        channel.consume(applicationQueue.queue, (data) => {
            const payload = JSON.parse(data.content.toString());
            console.log(payload);
            channel.ack(data);
        });
    } catch (error) {
        throw new AppError(error.name, error.message, "Error in subscribing message", 500);
    }
};

const publishMessage = async (channel, bindingKey, message) => {
    try {
        await channel.assertQueue(QUEUE_NAME);
        await channel.publish(EXCHANGE_NAME, bindingKey, Buffer.from(JSON.stringify(message)));
    } catch (error) {
        throw new AppError(error.name, error.message, "Error in publishing message", 500);
    }
};
module.exports = {
    createChannel,
    subscribeMessage,
    publishMessage,
};
