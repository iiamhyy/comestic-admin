import classNames from "classnames/bind";
import styles from "./Order.module.scss";
import { Table } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons/lib/icons";
import supabase from "../../services/supabase";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const columns = [
    {
        title: "Time",
        dataIndex: "time",
    },
    {
        title: "Customer Name",
        dataIndex: "userName",
        sorter: {
            compare: (a, b) => a.price - b.price,
            multiple: 3,
        },
    },
    {
        title: "Customer Id",
        dataIndex: "user",
        sorter: {
            compare: (a, b) => a.english - b.english,
            multiple: 3,
        },
    },
    {
        title: "Email",
        dataIndex: "email",
        sorter: {
            compare: (a, b) => a.math - b.math,
            multiple: 2,
        },
    },

    {
        title: "Phone number",
        dataIndex: "phone",
    },

    {
        title: "Address",
        dataIndex: "address",
        sorter: {
            compare: (a, b) => a.english - b.english,
            multiple: 1,
        },
    },
    {
        key: "action",
        title: "",

        dataIndex: "action",
    },
];

function Order() {
    const [id, setId] = useState();
    const [fetchError, setFetchError] = useState();
    const [orders, setOrders] = useState([]);

    const [product, setProduct] = useState();
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const showPreView = () => {
        setIsPreviewOpen(true);
    };

    const handelPreviewClose = () => {
        setIsPreviewOpen(false);
    };

    const [isAddProductOpen, setIsAddProductOpen] = useState(false);

    const showAddProduct = () => {
        setIsAddProductOpen(true);
    };

    const handelAddProductClose = () => {
        setIsAddProductOpen(false);
    };

    useEffect(() => {
        const ids = orders?.map((arr) => arr.id);
        setId(Math.max(...ids));
    }, [orders]);

    useEffect(() => {
        const fetchProductData = async () => {
            const { data, error } = await supabase.from("order").select();
            if (error) {
                setFetchError("no product");
                setOrders(null);
            } else {
                setFetchError(null);
                setOrders(data);
            }
        };
        fetchProductData();
    }, []);

    const data = orders?.map((order) => ({
        key: order.id,
        time: order.created_at.slice(0,10) + " / " + order.created_at.slice(11,19),
        userName: order.customerName,
        user: order.user_id,
        email: order.email,
        phone: order.phoneNumber,
        address: order.address,

        action: [
            //   <Link to={`/product-preview/${product.id}/${product.name}` } state= {product}
            //               // isPreviewOpen={isPreviewOpen}
            //               // handelPreviewClose={handelPreviewClose}
            //               >
            //                   {/* <Preview productID={product.id}/> */}
            //               <div className={cx("action")} >
            //           <EyeOutlined />
            //           <p>Preview</p>
            //       </div></Link>
            // <div>
            //     <Dropdown
            //         key={product.id}
            //         trigger={["click"]}
            //         onClick={() => setProduct(product)}
            //         menu={{ items }}
            //         placement="bottom"
            //     >
            //         <EllipsisOutlined style={{ fontSize: "18px" }} />
            //     </Dropdown>
            // </div>,
        ],
    }));

    return (
        <div className={cx("wrapper")}>
            <Table columns={columns} dataSource={data} />
        </div>
    );
}

export default Order;
