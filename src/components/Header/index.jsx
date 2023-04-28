import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { BellOutlined, CalendarOutlined, MessageOutlined } from "@ant-design/icons";
import { Badge, Avatar } from "antd";

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx("wrapper")}>
            <h2><b>Good morning, James!</b></h2>
            <div className={cx("action")}>
                <div className={cx("notification")}>
                    <Badge dot={true} size="small">
                        <BellOutlined style={{fontSize: '20px'}} />
                    </Badge>
                </div>
                <div className={cx("notification")}>
                    <Badge dot={true} size="small">
                        <MessageOutlined style={{fontSize: '18px'}} />
                    </Badge>
                </div>
                <div className={cx("notification")}>
                    <Badge dot={true} size="small">
                        <CalendarOutlined style={{fontSize: '20px'}}/>
                    </Badge>
                </div>
                <Avatar>U</Avatar>
            </div>
        </div>
    );
}

export default Header;
