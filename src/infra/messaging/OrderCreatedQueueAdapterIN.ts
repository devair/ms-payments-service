import amqpCallback from "amqplib/callback_api"
import { CreatePaymentUseCase } from "../../application/useCases/payments/CreatePaymentUseCase"
import { QueueNames } from "../../core/messaging/QueueNames"
import { OutputOrderQueueDTO } from "../../application/dtos/ICreateOrderQueueDTO"

export class OrderCreatedQueueAdapterIN {
    constructor(
        private rabbitMQUrl: string,
        private createPaymentUseCase: CreatePaymentUseCase
    ) { }

    async consume() {
        amqpCallback.connect(this.rabbitMQUrl, (err: any, connection: any) => {
            if (err) {
                throw err;
            }
            connection.createChannel((err: any, channel: any) => {
                if (err) {
                    throw err;
                }
                channel.assertQueue(QueueNames.ORDER_CREATED, { durable: true });
                channel.consume(QueueNames.ORDER_CREATED, async (msg: any) => {
                    if (msg !== null) {
                        try {
                            // Processa a mensagem                            
                            const order: OutputOrderQueueDTO = JSON.parse(msg.content.toString());

                            console.log('Payment - Received:', order)

                            // Aqui o servico persiste e publica na mesma transacao para o proximo canal
                            await this.createPaymentUseCase.execute({ orderId: order.orderId, amount: order.amount})
                            channel.ack(msg);
                        } catch (error) {
                            console.error('Processing error');
                            // Rejeita a mensagem e reencaminha para a fila
                            channel.nack(msg);
                        }
                    }
                }, { noAck: false })
            })
        })
    }

}