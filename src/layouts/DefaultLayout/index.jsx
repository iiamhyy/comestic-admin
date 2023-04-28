import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const cx = classNames.bind(styles);

function DefaultLayout() {
    return (
        <div className={cx("wrapper")}>
            <Sidebar />

            <div className={cx("inner-about")}>
                <Header />
                <div className={cx("container")}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
