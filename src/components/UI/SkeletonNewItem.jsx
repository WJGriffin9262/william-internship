import React from "react";
import Skeleton from "./Skeleton";

const SkeletonNewItem = () => {
  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <Skeleton width="50px" height="50px" borderRadius="50%" />
      </div>
      <Skeleton width="100px" height="30px" borderRadius="4px" />
      <div className="nft__item_wrap">
        <Skeleton width="100%" height="280px" borderRadius="8px" />
      </div>
      <div className="nft__item_info">
        <Skeleton width="70%" height="20px" borderRadius="4px" />
        <Skeleton width="40%" height="18px" borderRadius="4px" />
        <Skeleton width="30%" height="18px" borderRadius="4px" />
      </div>
    </div>
  );
};

export default SkeletonNewItem;
