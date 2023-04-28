import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import React, { useState } from "react";
import {
    AppstoreOutlined,
    LeftOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    RightOutlined,
    MailOutlined,
    MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Button, Menu } from "antd";

const cx = classNames.bind(styles); 

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem(<Link to="/"><p><b>Dashboard</b></p></Link>, "home", <MailOutlined style={{fontSize: '18px'}} />),
    getItem(<Link to="/product"><p><b>Product</b></p></Link>, "product", <AppstoreOutlined style={{fontSize: '18px'}} />),
    getItem(<Link to="/order"><p><b>Order</b></p></Link>, "order", <AppstoreOutlined style={{fontSize: '18px'}} />),
    
];

function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    return (
        <div className={cx("wrapper")}>
            <button
                onClick={toggleCollapsed}
                className={cx("btn-collapse")}
            >
                {collapsed ? < RightOutlined/> : <LeftOutlined />}
            </button>
            <div className={cx("title")}>
                <p><b>Mojury</b></p>

            </div>
            <Menu
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                mode="inline"
                inlineCollapsed={collapsed}
                items={items}
            />
        </div>
    );
}

export default Sidebar;
