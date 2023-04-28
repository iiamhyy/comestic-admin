import { Routes, Route } from "react-router-dom";

import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Preview from "../pages/Product/Preview";
import Order from "../pages/Order";

export const RoutesConfig = () => {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route path="/" index element={<Home />}></Route>
                <Route path="/product" element={<Product />}></Route>
                <Route path="/product-preview/:productId/:productName" element={<Preview />}></Route>
                <Route path="/order" index element={<Order />}></Route>
            </Route>
        </Routes>
    );
};
