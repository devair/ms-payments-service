import { Request, Response } from "express"
import { DataSource } from "typeorm"
import { OrdersService } from "../../../adapters/services/OrdersService"
import { CreatePaymentUseCase } from "../../../application/useCases/payments/CreatePaymentUseCase"
import { FindByIdPaymentUseCase } from "../../../application/useCases/payments/FindByIdPaymentUseCase"
import { FindByOrderPaymentUseCase } from "../../../application/useCases/payments/FindByOrderPaymentUseCase"
import { ListPaymentsUseCase } from "../../../application/useCases/payments/ListPaymentsUseCase"
import { CreatePaymentController } from "../../../communication/controller/payments/CreatePaymentController"
import { FindByIdPaymentController } from "../../../communication/controller/payments/FindByIdPaymentController"
import { FindByOrderPaymentController } from "../../../communication/controller/payments/FindByOrderPaymentController"
import { ListPaymentsController } from "../../../communication/controller/payments/ListPaymentsController"
import { PaymentPresenter } from "../../../communication/presenter/PaymentPresenter"
import { ApprovePaymentUserCase } from "../../../application/useCases/payments/ApprovePaymentUserCase"
import { IPaymentQueueAdapterOUT } from "../../../core/messaging/IPaymentQueueAdapterOUT"
import { ApprovePaymentController } from "../../../communication/controller/payments/ApprovePaymentController"
import { RejectPaymentUserCase } from "../../../application/useCases/payments/RejectPaymentUserCase"
import { RejectApprovePaymentController } from "../../../communication/controller/payments/RejectApprovePaymentController"

class PaymentsApi {

    constructor(
        private readonly dataSource: DataSource,
        private publisher: IPaymentQueueAdapterOUT
    ) { }

    async create(request: Request, response: Response): Promise<Response> {

        const ordersService = new OrdersService() // extenal call to orders microsservice
        const paymentCreated = new CreatePaymentUseCase(this.dataSource)
        const createPaymentController = new CreatePaymentController(paymentCreated)
        
        const { orderId, amount } = request.body;        

        try {
            const data = await createPaymentController.handler({ orderId, amount });

            // send to Orders Microservice
            if(data){                        
                await ordersService.updateOrderStatus({ orderId, status: 'Pronto'})          
            }

            response.contentType('application/json')
            return response.status(201).send(PaymentPresenter.toJson(data))
        }
        catch (ex) {
            return response.status(400).json({ message: ex.message });
        }     
    }

    async list(request: Request, response: Response): Promise<Response> {

        const listPaymentsUseCase = new ListPaymentsUseCase(this.dataSource)
        const listPaymentsController = new ListPaymentsController(listPaymentsUseCase)        

        try{
            const data = await listPaymentsController.handler()
            response.contentType('application/json')
            return response.status(200).send(PaymentPresenter.toJson(data))
        } catch (ex) {
            return response.status(400).json({ message: ex.message });
        }        
    }

    async findById(request: Request, response: Response): Promise<Response>{
        
        const { id } = request.params
        const findByIdPaymentUseCase = new FindByIdPaymentUseCase(this.dataSource)
        const findByIdPaymentController = new FindByIdPaymentController(findByIdPaymentUseCase)

        try{
            const data = await findByIdPaymentController.handler( id )
            response.contentType('application/json')
            return response.status(200).send(PaymentPresenter.toJson(data))
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }
    }

    async findByOrder(request: Request, response: Response): Promise<Response> {
        const { orderId } = request.params
        const findByOrderPaymentUseCase = new FindByOrderPaymentUseCase(this.dataSource)
        const findByOrderPaymentController = new FindByOrderPaymentController(findByOrderPaymentUseCase)        

        try{
            const data = await findByOrderPaymentController.handler(parseInt(orderId))
            response.contentType('application/json')
            return response.status(200).send(PaymentPresenter.toJson(data))
        } catch (ex) {
            return response.status(400).json({ message: ex.message });
        }        
    }    

    async approve(request: Request, response: Response): Promise<Response> {
        const approvePaymentUserCase = new ApprovePaymentUserCase(this.dataSource, this.publisher)
        const approvePaymentController = new ApprovePaymentController(approvePaymentUserCase)
        try {
            const { id } = request.params
            const { paymentDate, paymentUniqueNumber } = request.body
            const payment = await approvePaymentController.handler(id, paymentDate, paymentUniqueNumber)
            return response.status(201).json(payment);
        } catch (ex) {
            return response.status(400).json({ message: ex.message });
        }
    }

    async reject(request: Request, response: Response): Promise<Response> {
        const rejectPaymentUserCase = new RejectPaymentUserCase(this.dataSource, this.publisher)
        const rejectApprovePaymentController = new RejectApprovePaymentController(rejectPaymentUserCase)
        try {
            const { id } = request.params
            const { reason } = request.body
            const payment = await rejectApprovePaymentController.handler(id, reason)
            return response.status(201).json(payment);
        } catch (ex) {
            return response.status(400).json({ message: ex.message });
        }
    }
}

export { PaymentsApi }