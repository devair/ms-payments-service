import { BeforeInsert, Column, Entity, ObjectIdColumn } from 'typeorm';
import { Payment } from '../../../../core/entities/Payment';

@Entity()
export class PaymentEntity {
    @ObjectIdColumn()
    _id: string

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
        const payment = new Payment(this.orderId, this.amount, this.paymentDate, this.paymentUniqueNumber)
        return payment
    }

    static fromDomain(payment: Payment): PaymentEntity {
        const paymentEntity = new PaymentEntity();
        paymentEntity._id = payment.id
        paymentEntity.orderId = payment.orderId
        paymentEntity.amount = payment.amount
        paymentEntity.paymentDate = payment.paymentDate
        paymentEntity.paymentUniqueNumber = payment.paymentUniqueNumber
        paymentEntity.createdAt = payment.createdAt        
        return paymentEntity;
      }

}