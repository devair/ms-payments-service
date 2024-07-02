import { BeforeInsert, Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
import { Payment } from '../../../../core/entities/Payment';

@Entity({ name: 'payments'})
export class PaymentEntity {
    @ObjectIdColumn({ name: '_id'})
    _id: ObjectId

    @Column({ nullable: false})
    orderId: number

    @Column({ nullable: false})
    amount: number

    @Column({ nullable: false})
    paymentDate: Date

    @Column({ nullable: false})
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
        const paymentEntity = new PaymentEntity();
        
        if(payment.id){
            paymentEntity._id = new ObjectId(payment.id)
        }
        paymentEntity.orderId = payment.orderId
        paymentEntity.amount = payment.amount
        paymentEntity.paymentDate = payment.paymentDate
        paymentEntity.paymentUniqueNumber = payment.paymentUniqueNumber
        paymentEntity.createdAt = payment.createdAt        
        return paymentEntity;
      }

}