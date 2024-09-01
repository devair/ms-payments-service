export interface IPaymentQueueAdapterOUT{
    publish(queueName: string, message: string): Promise<void>
}