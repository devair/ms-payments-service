export interface IPaymentQueueAdapterOUT{
    publish(message: string): Promise<void>
}