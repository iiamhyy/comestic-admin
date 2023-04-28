import classNames from "classnames/bind";
import styles from "./AddProduct.module.scss";
import { Input, Modal, Row, Col, Upload, Button, Select, Tag, Checkbox } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { NumericFormat } from "react-number-format";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../Store/Slice/product.slice";
import supabase from "../../../services/supabase";

const cx = classNames.bind(styles);

function AddProduct(props) {
    const [colors, setColors] = useState([]);
    const [brands, setBrands] = useState([]);
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState();
    const [productBrand, setProductBrand] = useState("");
    const [productDiscount, setProductDiscount] = useState(0);
    const [productImages, setProductImages] = useState([])
    const [preOrder, setPreOrder] = useState(false)
    const [productQuantity, setProductQuantity] = useState(0);
    const [productColor, setProductColor] = useState([])

    useEffect(() => {
        const fetchColorData = async () => {
            const { data } = await supabase.from("color").select();
            if (data) {
                setColors(data);
            } else {
                setColors(null);
            }
        };
        fetchColorData();
    }, []);

    const colorOptions = colors?.map((color) => ({
        id: color.id,
        value: color.value,
        label: color.label,
    }));


    useEffect(() => {
        const fetchBrandData = async () => {
            const { data } = await supabase.from("brand").select();
            if (data) {
                setBrands(data);
            } else {
                setBrands(null);
            }
        };
        fetchBrandData();
    }, []);

    const brandOptions = brands?.map((brand) => ({
        value: brand.id,
        label: brand.name,
    }));
    const tagRender = (props) => {
        const { label, value, closable, onClose } = props;
        const onPreventMouseDown = (event) => {
            event.preventDefault();
            event.stopPropagation();
        };
        return (
            <Tag
                color={value}
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{
                    marginRight: 3,
                }}
            >
                {label}
            </Tag>
        );
    };

    const handelAddProduct = async () => {
        const { data } = await supabase
            .from("product")
            .insert({
                id: props.id + 1,
                created_at: null,
                name: productName,
                price: productPrice,
                preOrder: preOrder,
                images: productImages,
                description: productDescription,
                color: productColor,
                brand_id: productBrand,
                discount: productDiscount,
                quantity: productQuantity,
            })
            .select();

        if (data) {
            props.setIsAddProductOpen(false)
        }
    };


    const getFileImage = (img) => {
        let fileList = [...img.fileList];
        setProductImages(fileList);
        
    }


    const getFileColor = (id, label, value) => {

        setProductColor([...label])
    }

    return (
        <Modal
            centered
            width="90%"
            open={props.isAddProductOpen}
            onCancel={props.handelAddProductClose}
            footer={[null]}
        >
            <div className={cx("preview")}>
                <div className={cx("container")}>
                    <Row gutter={[15, 25]}>
                        <Col flex="15%" style={{ display: "flex" }}>
                            <label style={{ margin: "auto 0" }}>Name : </label>
                        </Col>
                        <Col flex="85%">
                            <Input
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                className={cx("input-field")}
                                bordered={false}
                                
                            ></Input>
                        </Col>

                        <Col flex="15%" style={{ display: "flex" }}>
                            <label style={{ margin: "auto 0" }}>
                                Description :{" "}
                            </label>
                        </Col>
                        <Col flex="85%">
                            <Input.TextArea
                                rows={3}
                                value={productDescription}
                                onChange={(e) =>
                                    setProductDescription(e.target.value)
                                }
                                className={cx("input-field")}
                                bordered={false}
                                
                            ></Input.TextArea>
                        </Col>
                        <Col flex="15%" style={{ display: "flex" }}>
                            <label style={{ margin: "auto 0" }}>Pre-Order : </label>
                        </Col>
                        <Col flex="85%">
                            <Checkbox
                                onChange={(e) => setPreOrder(e.target.checked)}
                            ></Checkbox>
                        </Col>
                        <Col flex="15%">
                            <label style={{ margin: "auto 0" }}>Image : </label>
                        </Col>
                        <Col flex="85%">
                            <Upload
                                fileList={[...productImages]}
                                onChange={getFileImage}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture"
                                className="upload-list-inline"
                                maxCount={5}
                            >
                                <Button icon={<UploadOutlined />}>
                                    Upload
                                </Button>
                            </Upload>
                        </Col>
                        <Col flex="15%">
                            <label style={{ margin: "auto 0" }}>Price : </label>
                        </Col>
                        <Col flex="85%">
                            <NumericFormat
                                thousandSeparator=","
                                suffix="₫"
                                displayType="text"
                                customInput="span"
                                renderText={(value, props) => (
                                    <Input
                                        className={cx("input-field")}
                                        bordered={false}
                                        {...props}
                                        defaultValue={value}
                                        value={productPrice}
                                        onChange={(e) =>
                                            setProductPrice(e.target.value)
                                        }
                                    />
                                )}
                            ></NumericFormat>
                        </Col>
                        <Col flex="15%" style={{ display: "flex" }}>
                            <label style={{ margin: "auto 0" }}>
                                Quantity :{" "}
                            </label>
                        </Col>
                        <Col flex="85%">
                            <Input
                                className={cx("input-field")}
                                bordered={false}
                                value={productQuantity}
                                onChange={(e) =>
                                    setProductQuantity(e.target.value)
                                }
                            ></Input>
                        </Col>
                        <Col flex="15%" style={{ display: "flex" }}>
                            <label style={{ margin: "auto 0" }}>
                                Discount :{" "}
                            </label>
                        </Col>
                        <Col flex="85%">
                            <Input
                                value={productDiscount}
                                onChange={(e) =>
                                    setProductDiscount(e.target.value)
                                }
                                className={cx("input-field")}
                                bordered={false}
                                suffix="%"
                            ></Input>
                        </Col>
                        <Col flex="15%" style={{ display: "flex" }}>
                            <label style={{ margin: "auto 0" }}>Brand : </label>
                        </Col>
                        <Col flex="85%">
                            <Select
                                allowClear
                                options={brandOptions}
                                className={cx("input-field") + " w-full"}
                                bordered={false}
                                onChange={(value) => setProductBrand(value)}
                            />
                        </Col>
                        <Col flex="15%" style={{ display: "flex" }}>
                            <label style={{ margin: "auto 0" }}>Color : </label>
                        </Col>

                        <Col flex="85%" className="flex gap-3">
                            <Select
                                mode="multiple"
                                allowClear
                                tagRender={tagRender}
                                options={colorOptions}
                                className={cx("input-field") + " w-full"}
                                bordered={false}
                                onChange={getFileColor}
                            />
                        </Col>
                    </Row>
                </div>

                <div className={cx("btn-group")}>
                    <button
                        className={cx("btn-edit")}
                        onClick={handelAddProduct}
                    >
                        Save
                    </button>
                    <button className={cx("btn-edit")}>Delete</button>
                </div>
            </div>
        </Modal>
    );
}

export default AddProduct;
