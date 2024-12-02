import HomePage from '../pages/HomePage/HomePage';
import AdjustServicePage from '../pages/AdjustServicePage/AdjustServicePage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import OrderProductPage from '../pages/OrderProductPage/OrderProductPage';
import TopbarComponent from '../components/TopbarComponent/TopbarComponent';
import ProductPage from '../pages/ProductPage/ProductPage';
import ServicePage from '../pages/ServicePage/ServicePage';
import AddServicePage from '../pages/AddServicePage/AddServicePage';
import AddProductPage from '../pages/AddProductPage/AddProductPage';
import AdjustProductPage from '../pages/AdjustProductPage/AdjustProductPage'; // Import AdjustProductPage
import SignIn from '../pages/SignIn/SignIn';
import SignUp from '../pages/SignUp/SignUp';   
const routes = [
    {
        path: '/dang-nhap',
        page: SignIn,
        isShowHeader: false,
        protected: false,
    },
    {
        path: '/dang-ky',
        page: SignUp,
        isShowHeader: false,
        protected: false,
    },
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
        protected: false,
        protected: true,
    },
    {
        path: 'adjust-service/:id',
        page: AdjustServicePage,
        isShowHeader: true,
        protected: true,
    },
    {
        path: 'list-order-product',
        page: OrderProductPage,
        isShowHeader: true,
        protected: true,
    },
    {
        path: 'list-product',
        page: ProductPage,
        isShowHeader: true,
        protected: true,
    },
    {
        path: 'list-service',
        page: ServicePage,
        isShowHeader: true,
        protected: true,
    },
    {
        path: 'add-product',
        page: AddProductPage,
        isShowHeader: true,
        protected: true,
    },
    {
        path: 'adjust-product/:key', // Thêm route cho AdjustProductPage với tham số id
        page: AdjustProductPage,
        isShowHeader: true,
        protected: true,
    },
    {
        path: 'add-service',
        page: AddServicePage,
        isShowHeader: true,
        protected: true,
      },
    {
        path: 'top-bar',
        page: TopbarComponent,
    },
    {
        path: '*',
        page: NotFoundPage,
    },
];

export default routes;