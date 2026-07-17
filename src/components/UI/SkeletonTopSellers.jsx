import React from "react";
import Skeleton from "./Skeleton";

const SkeletonTopSellers = () => {
  return (
    <ol className="author_list">
      {new Array(12).fill(0).map((_, index) => (
        <li key={index}>
          <div className="author_list_pp">
            <Skeleton width="50px" height="50px" borderRadius="50%" />
          </div>
          <div className="author_list_info">
            <Skeleton width="100px" height="16px" borderRadius="4px" />
            <Skeleton width="60px" height="14px" borderRadius="4px" />
          </div>
        </li>
      ))}
    </ol>
  );
};

export default SkeletonTopSellers;
