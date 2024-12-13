import HomePage from '../pages/HomePage/HomePage'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import ListCustomerPage from '../pages/ListCustomerPage/ListCustomerPage'
import DetailCustomer from '../pages/DetailCustomer/DetailCustomer'
import ListEmployeePage from '../pages/ListEmployeePage/ListEmployeePage'
import DetailEmployee from '../pages/DetailEmployee/DetailEmployee'
import ImportProduct from '../pages/ImportProductPage/ImportProduct'
import CreateImportProduct from '../pages/CreateImportProduct/CreateImportProduct'
import DetailImportProduct from '../pages/DetailImportProduct/DetailImportProduct'

const routes = [
    {
        path:'/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: 'list-customer',
        page: ListCustomerPage,
        isShowHeader: true
    },
    {
        path: 'customer-detail/1',
        page: DetailCustomer,
        isShowHeader: true
    },
    {
        path: 'list-employee',
        page: ListEmployeePage,
        isShowHeader: true
    },
    {
        path: 'employee-detail/1',
        page: DetailEmployee,
        isShowHeader: true
    },
    {
        path: 'list-import-product',
        page: ImportProduct,
        isShowHeader: true
    },
    {
        path: 'import-product-detail/1',
        page: DetailImportProduct,
        isShowHeader: true
    },
    {
        path: 'create-import-product',
        page: CreateImportProduct,
        isShowHeader: true
    },
    {
        path: '*',
        page: NotFoundPage,
    },
]

export default routes;