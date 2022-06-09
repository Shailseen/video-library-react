import { useToolTips, useVideo } from "../../../context/index";
import classNames from "classnames";
import styles from "./VideoCardList.module.css";
import { VideoCard } from "../../index";
import { useState, useEffect } from "react";

export const VideoCardList = () => {
  const { videos, searchVideosList } = useVideo();
  const [videoList, setVideoList] = useState();
  const [categoriesData, setCategoriesData] = useState([]);
  const [videoListByCategory, setVideoListByCategory] = useState();
  const [sortBy, setSortBy] = useState("Relevant");
  const [sortByVideoList, setSortByVideoList] = useState();
  const { toolTip } = useToolTips();

  const sortVideos = (videos) => {
    videos = JSON.parse(JSON.stringify(videos))
    if (sortBy !== "Relevant") {
      videos.sort(function(a, b) {
        return new Date(b.uploadAt) - new Date(a.uploadAt);
      });
      setSortByVideoList((prev) => videos);  
    }
    else 
    setSortByVideoList((prev) => videos);
  };

  useEffect(() => {
    sortBy === "Relevant"
      ? setSortByVideoList((prev) => videoList)
      : sortVideos(videoList);
  }, [sortBy, videoList]);

  const getVideosByCategories = (name) => {
    if (name === "All") {
      setVideoListByCategory(videos);
      setVideoList(videos);
    } else {
      let temp = videos.filter((obj) => obj.categoryName === name && obj);
      setVideoList(temp);
      setVideoListByCategory(temp);
    }
  };

  useEffect(() => {
    const categories = new Set();
    videos.map((obj) => categories.add(obj.categoryName));
    let categoriesArr = [{ cateogry: "All", style: true }];

    for (const element of categories) {
      categoriesArr = [...categoriesArr, { cateogry: element, style: false }];
    }

    setCategoriesData(categoriesArr);
    setVideoList(videos);
    setVideoListByCategory(videos);
  }, [videos]);

  useEffect(() => {
    const operation = (list1, list2, isUnion = false) =>
      list1.filter(
        ((set) => (a) => isUnion === set.has(a.videoYTId))(
          new Set(list2.map((b) => b.videoYTId))
        )
      );

    const inBoth = (list1, list2) => operation(list1, list2, true);
    if (searchVideosList.length && searchVideosList)
      setVideoList(inBoth(searchVideosList, videoListByCategory));
  }, [searchVideosList, videoListByCategory]);

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
              onClick={() => (
                chipsStyleHandler(index),
                getVideosByCategories(categoriesData[index].cateogry)
              )}
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

      <div className={styles.sort_container}>
        <button
          className={classNames("button-style-none solid-button", styles.btn)}
          onClick={() => setSortBy(prev => "Relevant")}
        >
          Relevant
        </button>
        <button
          className={classNames("button-style-none solid-button", styles.btn)}
          onClick={() => setSortBy(prev => "Latest Videos")}
        >
          Latest Videos
        </button>
      </div>

      {videos && videoList && (
        <p className={styles.results}>
          Showing results {videoList.length}/{videos.length}
        </p>
      )}
      <div className={classNames(styles.cardList_container)}>
        {sortByVideoList &&
          sortByVideoList.map((card) => (
            <VideoCard
              key={card._id}
              card={card}
              toolTip={toolTip.find((obj) => obj.id === card._id)}
            />
          ))}
      </div>
    </>
  );
};
