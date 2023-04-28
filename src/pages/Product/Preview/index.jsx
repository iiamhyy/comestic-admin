import classNames from "classnames/bind";
import styles from "./Preview.module.scss";
import { Input, Row, Col, Upload, Button, Select, Tag, Checkbox } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { NumericFormat } from "react-number-format";
import { useState, useEffect } from "react";
import supabase from "../../../services/supabase";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProduct } from "../../../Store/Slice/product.slice";
import { fetchProductData } from "../../../services/supabase/resources/product.service";

const cx = classNames.bind(styles);

function Preview() {
    const location = useLocation();
    const product = location.state;
    const [colors, setColors] = useState([]);
    const [isPreview, setIsPreview] = useState(true);
    const [brands, setBrands] = useState([]);
    const [productName, setProductName] = useState(product.name);
    const [productDescription, setProductDescription] = useState(
        product.description
    );
    const [productPrice, setProductPrice] = useState(product.price);
    const [productBrand, setProductBrand] = useState(product.brand_id);
    const [productDiscount, setProductDiscount] = useState(product.discount);
    const [productImages, setProductImages] = useState(product.images);
    const [preOrder, setPreOrder] = useState(product.preOrder);
    const [productQuantity, setProductQuantity] = useState(product.quantity);
    const [productColor, setProductColor] = useState(product.color);
    const setIsEdit = () => setIsPreview((isPreview) => !isPreview);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fileList = product.images?.map((img, index) => ({
        uid: index,
        name: index + ".png",
        url: img,
        thumbUrl: img.thumbUrl,
        status: "success",
    }));

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

    const handelUpdateProduct = async () => {
        const { data } = await supabase
            .from("product")
            .update({
                
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
            .eq('id', product.id);

        if (data) {
            dispatch(setProduct(await fetchProductData()))
        }
    };

    const getFileImage = (img) => {
        let fileList = [...img.fileList];
        setProductImages(fileList);
    };

    const getFileColor = (id, label, value) => {
        setProductColor([...label]);
    };

    return (
        <div className={cx("preview")}>
            {isPreview ? (
                <button className={cx("btn-edit")} onClick={setIsEdit}>
                    Edit
                </button>
            ) : (
                ""
            )}

            <div className={cx("container")}>
                <Row gutter={[15, 25]}>
                    <Col flex="15%" style={{ display: "flex" }}>
                        <label style={{ margin: "auto 0" }}>Name : </label>
                    </Col>
                    <Col flex="85%">
                        <Input
                            defaultValue={product.name}
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className={cx("input-field")}
                            bordered={false}
                            disabled={isPreview && true}
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
                            defaultValue={product.description}
                            value={productDescription}
                            onChange={(e) =>
                                setProductDescription(e.target.value)
                            }
                            className={cx("input-field")}
                            bordered={false}
                            disabled={isPreview && true}
                        ></Input.TextArea>
                    </Col>
                    <Col flex="15%">
                        <label style={{ margin: "auto 0" }}>Pre-Order : </label>
                    </Col>
                    <Col flex="85%">
                        <Checkbox
                            defaultChecked={product.preOrder}
                            onChange={(e) => setPreOrder(e.target.checked)}
                            disabled={isPreview && true}
                        ></Checkbox>
                    </Col>
                    <Col flex="15%">
                        <label style={{ margin: "auto 0" }}>Image : </label>
                    </Col>
                    <Col flex="85%">
                        <Upload
                            disabled={isPreview && true}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture"
                            defaultFileList={[...fileList]}
                            className="upload-list-inline"
                            maxCount={5}
                            onChange={getFileImage}
                        >
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </Col>
                    <Col flex="15%">
                        <label style={{ margin: "auto 0" }}>Price : </label>
                    </Col>
                    <Col flex="85%">
                        <NumericFormat
                            thousandSeparator=","
                            defaultValue={product.price}
                            suffix="₫"
                            displayType="text"
                            customInput="span"
                            renderText={(value, props) => (
                                <Input
                                    className={cx("input-field")}
                                    bordered={false}
                                    disabled={isPreview && true}
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
                        <label style={{ margin: "auto 0" }}>Quantity : </label>
                    </Col>
                    <Col flex="85%">
                        <Input
                            defaultValue={product.quantity}
                            className={cx("input-field")}
                            bordered={false}
                            disabled={isPreview && true}
                            value={productQuantity}
                            onChange={(e) => setProductQuantity(e.target.value)}
                        ></Input>
                    </Col>
                    <Col flex="15%" style={{ display: "flex" }}>
                        <label style={{ margin: "auto 0" }}>Discount : </label>
                    </Col>
                    <Col flex="85%">
                        <Input
                            defaultValue={product.discount}
                            value={productDiscount}
                            onChange={(e) => setProductDiscount(e.target.value)}
                            className={cx("input-field")}
                            bordered={false}
                            disabled={isPreview && true}
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
                            disabled={isPreview && true}
                            defaultValue={product.brand_id}
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
                            disabled={isPreview && true}
                            onChange={getFileColor}
                            value={productColor}
                        />
                    </Col>
                    <Col flex="15%" style={{ display: "flex" }}>
                        <label style={{ margin: "auto 0" }}> </label>
                    </Col>
                    <Col flex="85%" className="flex gap-3">
                        {product.color?.map((color) => (
                            <div
                                className={cx("color")}
                                style={{ background: color.value }}
                            ></div>
                        ))}
                    </Col>
                </Row>
            </div>
            {isPreview ? null : (
                <div className={cx("btn-group")}>
                    <button
                        className={cx("btn-edit")}
                        onClick={handelUpdateProduct}
                    >
                        Save
                    </button>
                    <button className={cx("btn-edit")} onClick={() => navigate("/product")}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default Preview;
