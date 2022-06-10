import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useVideo } from "./videos-context";

const ToolTipsContext = createContext();

const useToolTips = () => useContext(ToolTipsContext);

const ToolTipsProvider = ({ children }) => {
    const [toolTip, setToolTip] = useState([]);
    const { videos } = useVideo();
                         
  useEffect(() => {
    if(videos){
    let tempToggle = [];
    for (const element of videos) {
      tempToggle = [...tempToggle, { id: element._id, isToolTip: false }];
    }
    setToolTip(tempToggle);
  }
  }, [videos]);

  const toggleHandler = (e_id) => {
    let tempToggle = JSON.parse(JSON.stringify(toolTip));
    let tempArr = [];
    for (let i = 0; i < tempToggle.length; i++) {
      if (tempToggle[i].id === e_id)
      {
          if(tempToggle[i].isToolTip)
          {
            tempArr.push({ id: tempToggle[i].id, isToolTip: false });
          }
          else
          {
            tempArr.push({ id: tempToggle[i].id, isToolTip: true });
          }
      }
      else
        tempArr.push({ id: tempToggle[i].id, isToolTip: false });
    }
    setToolTip(tempArr);
  };

  return (
    <ToolTipsContext.Provider value={{ toggleHandler, toolTip }}>
      {children}
    </ToolTipsContext.Provider>
  );
};

export { useToolTips, ToolTipsProvider };
