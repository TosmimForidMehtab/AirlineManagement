const amqp = require("amqplib");
const { EXCHANGE_NAME, QUEUE_NAME, MESSAGE_BROKER_URL } = require("../config/serverConfig");
const { ServerError } = require("./errors/index");
const createChannel = async () => {
    try {
        const connection = await amqp.connect(MESSAGE_BROKER_URL);
        const channel = await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME, "direct", false);
        return channel;
    } catch (error) {
        throw new ServerError("ServiceError", "Unable to connect to message broker");
    }
};

const subscribeMessage = async (channel, service, bindingKey) => {
    try {
        const applicationQueue = await channel.assertQueue(QUEUE_NAME);
        channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, bindingKey);
        channel.consume(applicationQueue.queue, (msg) => {
            const payload = JSON.parse(msg.content.toString());
            // console.log(payload);
            service(payload);
            channel.ack(msg);
        });
    } catch (error) {
        throw new ServerError("ServiceError", "Unable to connect to subscriber service");
    }
};

const publishMessage = async (channel, bindingKey, message) => {
    try {
        await channel.assertQueue(QUEUE_NAME);
        await channel.publish(EXCHANGE_NAME, bindingKey, Buffer.from(JSON.stringify(message)));
    } catch (error) {
        throw new ServerError("ServiceError", "Unable to connect to publisher service");
    }
};
module.exports = {
    createChannel,
    subscribeMessage,
    publishMessage,
};
