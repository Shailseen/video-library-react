import { useVideo } from "../../../context/videos-context";
import classNames from "classnames";
import styles from "./VideoCardList.module.css";
import { VideoCard } from "../VideoCard/VideoCard";
import { useState } from "react";
import { useEffect } from "react";
import { useToolTips } from "../../../context/toolTip-context";

export const VideoCardList = () => {
  const { videos} = useVideo();
  const [videoList,setVideoList] = useState();
  const [categoriesData, setCategoriesData] = useState([]);

  const { toolTip } = useToolTips();

  const getVideosByCategorys = (name) => {
    if(name==="All") {
      setVideoList(videos);
    }
    else {
      let temp = videos.filter((obj) => obj.categoryName === name && obj)
      setVideoList(temp);
    }
  }

  useEffect(() => {
    const categories = new Set();
    videos.map((obj) => categories.add(obj.categoryName));
    let categoriesArr = [{ cateogry: "All", style: true }];

    for (const element of categories) {
      categoriesArr = [...categoriesArr, { cateogry: element, style: false }];
    }
    setCategoriesData(categoriesArr);
    setVideoList(videos);
  }, [videos]);

  const chipsStyleHandler = (index) => {
    let tempArr = JSON.parse(JSON.stringify(categoriesData));

    for (let i = 0; i < tempArr.length; i++) {
      tempArr[i] = { cateogry: tempArr[i].cateogry, style: false };
    }

    tempArr[index] = { cateogry: tempArr[index].cateogry, style: true };

    setCategoriesData(tempArr);
  };
  return (
    <>
      <div className={styles.chips_container}>
        {categoriesData &&
          categoriesData.map((chips, index) => (
            <div
              onClick={() => (chipsStyleHandler(index),getVideosByCategorys(categoriesData[index].cateogry))}
              key={chips.cateogry}
              className={classNames(
                styles.chips,
                chips.style ? styles.chips_enabled : styles.chips_disabled
              )}
            >
              {chips.cateogry}
            </div>
          ))}
      </div>
      <div className={classNames(styles.cardList_container)}>
        {videoList && videoList.map((card) => (
          <VideoCard key={card._id} card={card} toolTip={toolTip.find(obj => obj.id===card._id)} />
        ))}
      </div>
    </>
  );
};
