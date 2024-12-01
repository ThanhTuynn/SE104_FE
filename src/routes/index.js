import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import OrderProductPage from '../pages/OrderProductPage/OrderProductPage'
import ListConsumerPage from '../pages/ListCusmerPage/ListCusmerPage'
import ListStaffPage from '../pages/ListStaffPage/ListStaffPage'
import DetailCustomerPage from '../pages/DetailCustomerPage/DetailCustomerPage'
const routes = [
    {
        path: 'list-order-product',
        page: OrderProductPage,
        isShowHeader: true
    },
    {
        path: 'list-customer',
        page: ListConsumerPage,
        isShowHeader: true
    },
    {
        path: 'detail-customer',
        page: DetailCustomerPage,
        isShowHeader: true
    },
    {
        path: 'list-staff',
        page: ListStaffPage,
        isShowHeader: true
    },
    {
        path: '*',
        page: NotFoundPage,
    }
]

export default routes;