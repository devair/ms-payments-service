import { MongoRepository  } from "typeorm";
import { Payment } from "../../../../core/entities/Payment";
import { IPaymentsGateway } from "../../../../communication/gateways/IPaymentsGateway";
import { PaymentEntity } from "../entities/PaymentEntity";
import { AppDataSource } from "..";
import { ObjectId } from 'mongodb';

class PaymentsRepositoryMongoDb implements IPaymentsGateway{
    
    private repository: MongoRepository <PaymentEntity>

    constructor(){
        this.repository = AppDataSource.getMongoRepository(PaymentEntity)
    }

    async create(payment: Payment): Promise<Payment> {
        const paymentCreated = await this.repository.save(PaymentEntity.fromDomain(payment))
        return paymentCreated.toDomain()

    }
    async list(): Promise<Payment[]> {
        const all = await this.repository.find()

        let payments : Payment[] = []

        all.forEach((elem)=>{
            payments.push(elem.toDomain())
        })
        
        return payments
    }
    
    async findById(id: string): Promise<Payment> {        
        const payment = await this.repository.findOne({ where: { _id: new ObjectId(id) }}) 
        if(payment)
            return payment.toDomain()
        return null
    }

    async findByOrder(orderId: number): Promise<Payment[]> {
        const all = await this.repository.find( { 
            where: {
                "orderId" : { $eq: orderId }
            }            
        })

        let payments : Payment[] = []

        all.forEach((elem)=>{
            payments.push(elem.toDomain())
        })
        
        return payments
    }
}

export { PaymentsRepositoryMongoDb }