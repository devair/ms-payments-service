import { DataSource } from "typeorm"
import { IPaymentsGateway } from "../../../communication/gateways/IPaymentsGateway"
import { Payment, PaymentStatus } from "../../../core/entities/Payment"
import { PaymentEntity } from "../../../infra/datasource/typeorm/entities/PaymentEntity"
import { PaymentsRepositoryMongoDb } from "../../../infra/datasource/typeorm/mongodb/PaymentsRepositoryMongoDb"
import { IPaymentQueueAdapterOUT } from "../../../core/messaging/IPaymentQueueAdapterOUT"
import { QueueNames } from "../../../core/messaging/QueueNames"


export class RejectPaymentUserCase {

    private paymentsRepository: IPaymentsGateway

    constructor(
        private dataSource: DataSource,
        private publisher: IPaymentQueueAdapterOUT        
    ){
        this.paymentsRepository = new PaymentsRepositoryMongoDb(this.dataSource.getRepository(PaymentEntity))
    } 

    async execute(id: string, reason: string): Promise<Payment> {
        const queryRunner = this.dataSource.createQueryRunner()

        const paymentsRepository = queryRunner.manager.getRepository(PaymentEntity)

        await queryRunner.startTransaction()
        try {
            const paymentFound = await this.paymentsRepository.findById(id)
            if(!paymentFound) throw new Error(`Payment id ${id} not found`)

            switch (paymentFound.status){
                case PaymentStatus.APPROVED: {
                    throw new Error(`Payment id ${id} already approved`)                    
                }
                case PaymentStatus.REJECTED: {
                    throw new Error(`Payment id ${id} already rejected`)                    
                }
            }
            
            paymentFound.reject(reason)

            const paymentUpdated = await paymentsRepository.save(PaymentEntity.fromDomain(paymentFound))
                
            // Publicar evento de pagamento recebido
            const orderMessage = {
                id: paymentUpdated.orderId,
                status: 'Rejeitado'
            }

            await this.publisher.publish(QueueNames.PAYMENT_REJECTED, JSON.stringify(orderMessage))

            // Confirma a transação
            await queryRunner.commitTransaction()

            return paymentUpdated.toDomain()

        } catch (error) {
            // Em caso de erro, faz o rollback da transação 
            await queryRunner.rollbackTransaction()
            throw error
        }
        finally {
            await queryRunner.release()
        }
    }
}
