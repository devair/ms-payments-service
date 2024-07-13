import { Request, Response } from "express";
import { CreatePaymentController } from "../../../communication/controller/payments/CreatePaymentController";
import { FindByIdPaymentController } from "../../../communication/controller/payments/FindByIdPaymentController";
import { FindByOrderPaymentController } from "../../../communication/controller/payments/FindByOrderPaymentController";
import { ListPaymentsController } from "../../../communication/controller/payments/ListPaymentsController";
import { PaymentPresenter } from "../../../communication/presenter/PaymentPresenter";
import { PaymentsRepositoryMongoDb } from "../../datasource/typeorm/mongodb/PaymentsRepositoryMongoDb";
import { OrdersService } from "../../OrdersService";
class PaymentsApi {

    static async create(request: Request, response: Response): Promise<Response> {

        const ordersService = new OrdersService() // extenal call to orders microsservice
        const paymentsRepository = new PaymentsRepositoryMongoDb()     
        const createPaymentController = new CreatePaymentController(paymentsRepository)
        
        const { orderId, amount, paymentDate, paymentUniqueNumber } = request.body;        

        try {
            const data = await createPaymentController.handler({ orderId, amount, paymentDate, paymentUniqueNumber });

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

    static async list(request: Request, response: Response): Promise<Response> {

        const paymentsRepository = new PaymentsRepositoryMongoDb()
        const listPaymentsController = new ListPaymentsController(paymentsRepository)        

        try{
            const data = await listPaymentsController.handler()
            response.contentType('application/json')
            return response.status(200).send(PaymentPresenter.toJson(data))
        } catch (ex) {
            return response.status(400).json({ message: ex.message });
        }        
    }

    static async findById(request: Request, response: Response): Promise<Response>{
        
        const { id } = request.params
        const paymentsRepository = new PaymentsRepositoryMongoDb()
        const findByIdPaymentController = new FindByIdPaymentController(paymentsRepository)

        try{
            const data = await findByIdPaymentController.handler( id )
            response.contentType('application/json')
            return response.status(200).send(PaymentPresenter.toJson(data))
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }
    }

    static async findByOrder(request: Request, response: Response): Promise<Response> {
        const { orderId } = request.params
        const paymentsRepository = new PaymentsRepositoryMongoDb()
        const findByOrderPaymentController = new FindByOrderPaymentController(paymentsRepository)        

        try{
            const data = await findByOrderPaymentController.handler(parseInt(orderId))
            response.contentType('application/json')
            return response.status(200).send(PaymentPresenter.toJson(data))
        } catch (ex) {
            return response.status(400).json({ message: ex.message });
        }        
    }    
}

export { PaymentsApi }