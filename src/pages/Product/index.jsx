import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import { Table, Tooltip } from "antd";
import {
    DeleteOutlined,
    EyeOutlined,
} from "@ant-design/icons/lib/icons";
import supabase from "../../services/supabase";
import { useState, useEffect, useRef, useCallback } from "react";
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

    
    // const fetchData = useCallback(async () => {
    //     const products = await fetchProductData();
    //     setProducts(products)
    // }, []);

    // useEffect(() => {
    //     fetchData();
    // }, [fetchData])


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
    }, []);

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
                        // isPreviewOpen={isPreviewOpen}
                        // handelPreviewClose={handelPreviewClose}
                    >
                        {/* <Preview productID={product.id}/> */}
                        <div className={cx("action")}>
                            <EyeOutlined />
                        </div>
                    </Link>
                </Tooltip>
                <Tooltip title="Delete">
                    <div className={cx("action")}>
                        <DeleteOutlined />
                    </div>
                </Tooltip>
            </div>,
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
