import { BeforeInsert, Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
import { Payment } from '../../../../core/entities/Payment';

@Entity()
export class PaymentEntity {
    @ObjectIdColumn({ name: '_id'})
    _id: ObjectId

    @Column()
    orderId: number

    @Column()
    amount: number

    @Column()
    paymentDate: Date

    @Column()
    paymentUniqueNumber: string

    @Column()
    createdAt: Date

    @BeforeInsert()
    setCreatedAt() {
        this.createdAt = new Date();
    }

    toDomain(): Payment {
        let payment = new Payment(this.orderId, this.amount, this.paymentDate, this.paymentUniqueNumber)
        payment.id = this._id.toString()
        return payment
    }

    static fromDomain(payment: Payment): PaymentEntity {
        let paymentEntity = new PaymentEntity();
        paymentEntity._id = new ObjectId(payment.id)
        paymentEntity.orderId = payment.orderId
        paymentEntity.amount = payment.amount
        paymentEntity.paymentDate = payment.paymentDate
        paymentEntity.paymentUniqueNumber = payment.paymentUniqueNumber
        paymentEntity.createdAt = payment.createdAt        
        return paymentEntity;
      }

}