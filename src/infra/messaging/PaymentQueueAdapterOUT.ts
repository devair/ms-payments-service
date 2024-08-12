import amqplib from "amqplib"
import { IPaymentQueueAdapterOUT } from "../../core/messaging/IPaymentQueueAdapterOUT"

export class PaymentQueueAdapterOUT implements IPaymentQueueAdapterOUT{
   
    private channel!: amqplib.ConfirmChannel;

    constructor(
        private connection: amqplib.Connection,
        private queueName: string
    ) { }

    async connect() {
        this.channel = await this.connection.createConfirmChannel();
        await this.channel.assertQueue(this.queueName, { durable: true });
    }

    async publish(message: string): Promise<void>{
        const messageBuffer = Buffer.from(message);

        return new Promise((resolve, reject) => {
            this.channel.sendToQueue(this.queueName, messageBuffer, {}, (err, ok) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        })
    }

}