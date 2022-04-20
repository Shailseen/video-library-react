import classNames from "classnames"
import iconStyle from "./IconAside.module.css"
import styles from "../OpenAside/OpenAside.module.css"
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import {useAside} from "../../../context/aside-context"

export const IconAside = () => {
    const {aside} = useAside();
    return (
        <div className={classNames(iconStyle.aside_container, aside[1] ? iconStyle.open_asides : "")}>
            <div className={styles.aside_list_container}>
                <HomeOutlinedIcon sx={{fontSize:32}}/>
            </div>
            <div className={styles.aside_list_container}>
                <VideoLibraryOutlinedIcon sx={{fontSize:32}}/>
            </div>
            <div className={styles.aside_list_container}>
                <ThumbUpOutlinedIcon sx={{fontSize:32}}/>
            </div>
            <div className={styles.aside_list_container}>
                <WatchLaterOutlinedIcon sx={{fontSize:32}}/>
            </div>
            <div className={styles.aside_list_container}>
                <HistoryRoundedIcon sx={{fontSize:32}}/>
            </div>
        </div>
    )
}