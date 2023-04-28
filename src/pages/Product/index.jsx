import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import { Table, Tooltip, Modal, Button } from "antd";
import {
    DeleteOutlined,
    EyeOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons/lib/icons";
import supabase from "../../services/supabase";
import { useState, useEffect } from "react";
import AddProduct from "./AddProduct";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const columns = [
    {
        key: "name",
        title: "Name",
        dataIndex: "name",
    },
    {
        key: "price",

        title: "Price",
        dataIndex: "price",
        sorter: {
            compare: (a, b) => a.price - b.price,
            multiple: 3,
        },
    },
    {
        key: "discount",
        title: "Discount",
        dataIndex: "discount",
        sorter: {
            compare: (a, b) => a.english - b.english,
            multiple: 3,
        },
    },
    {
        key: "quantity",
        title: "Quantity",
        dataIndex: "quantity",
        sorter: {
            compare: (a, b) => a.math - b.math,
            multiple: 2,
        },
    },

    {
        key: "preOrder",
        title: "Pre-Order",
        dataIndex: "preOrder",
    },

    {
        key: "brand",
        title: "Brand",
        dataIndex: "brand_id",
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

function Product() {
    const [id, setId] = useState();
    const [fetchError, setFetchError] = useState();
    const [products, setProducts] = useState([]);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [confirmMessages, setConfirmMessages] = useState("Are you sure?");
    const showConfirmDelete = () => {
        setConfirmDelete(true);
    };
    const hideConfirmDelete = () => {
        setConfirmDelete(false);
    };

    const [isAddProductOpen, setIsAddProductOpen] = useState(false);

    const showAddProduct = () => {
        setIsAddProductOpen(true);
    };

    const handelAddProductClose = () => {
        setIsAddProductOpen(false);
    };

    useEffect(() => {
        const ids = products?.map((arr) => arr.id);
        setId(Math.max(...ids));
    }, [products]);

    useEffect(() => {
        const fetchProductData = async () => {
            const { data, error } = await supabase.from("product").select();
            if (error) {
                setFetchError("no product");
                setProducts(null);
            } else {
                setFetchError(null);
                setProducts(data);
            }
        };
        fetchProductData();
    }, [products]);

    // const handelDeleteProduct = async () => {
    //     const { data } = await supabase
    //         .from("product")
    //         .delete()
    //         .eq("id", product.id);
    // };

    const data = products?.map((product) => ({
        key: product.id,
        name: product.name,
        price: product.price,
        preOrder: [
            product.preOrder ? (
                <div className="h-6 border-[1px] border-[red] text-red-600 w-fit px-2 rounded-lg">
                    Pre-Order
                </div>
            ) : (
                <div className="border-[1px] border-[green] text-green-600 w-fit px-2 rounded-lg">
                    Availability
                </div>
            ),
        ],
        images: product.images,
        quantity: product.quantity,
        discount: [
            product.discount > 0 ? (
                <div>
                    <p className="h-6 border-[1px] border-[red] text-red-600 w-fit px-2 rounded-lg">
                        - {product.discount}%
                    </p>
                </div>
            ) : (
                product.discount
            ),
        ],
        brand_id: product.brand_id,
        description: product.description,
        color: product.color,
        action: [
            <div className="flex">
                <Tooltip title="Preview">
                    <Link
                        to={`/product-preview/${product.id}/${product.name}`}
                        state={product}
                    >
                        <div className={cx("action")}>
                            <EyeOutlined />
                        </div>
                    </Link>
                </Tooltip>
                <Tooltip title="Delete">
                    <div className={cx("action")} onClick={showConfirmDelete}>
                        <DeleteOutlined />
                    </div>
                </Tooltip>
                <Modal
                    title="Confirm"
                    open={confirmDelete}
                    onOk={async () => {
                        const { data } = await supabase
                            .from("product")
                            .delete()
                            .eq("id", product.id);
                        setConfirmLoading(true);
                        if (data) {

                            setConfirmMessages("Delete failed!")
                            setTimeout(() => {
                                setConfirmLoading(false);
                                setConfirmDelete(false);
                            }, 2000);
                            
                        }else{
                            setConfirmMessages("Successfully deleted!")
                            setTimeout(() => {
                                
                                setConfirmLoading(false);
                                setConfirmDelete(false);
                            }, 2000);
                        }
                    }}
                    onCancel={hideConfirmDelete}
                    confirmLoading={confirmLoading}
                    okText="Yes"
                    cancelText="No"
                >
                    <p>{confirmMessages}</p>
                </Modal>
            </div>,
        ],
    }));

    return (
        <div className={cx("wrapper")}>
            <div className="flex justify-end my-5">
                <button className={cx("add-product")} onClick={showAddProduct}>
                    ADD NEW PRODUCT
                </button>

                <AddProduct
                    isAddProductOpen={isAddProductOpen}
                    handelAddProductClose={handelAddProductClose}
                    setIsAddProductOpen={setIsAddProductOpen}
                    id={id}
                />
            </div>

            <Table columns={columns} dataSource={data} />
        </div>
    );
}

export default Product;
