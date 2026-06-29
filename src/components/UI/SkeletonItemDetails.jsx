import React from "react";
import Skeleton from "./Skeleton";

const SkeletonItemDetails = () => {
  return (
    <div className="row">
      <div className="col-md-6 text-center">
        <Skeleton width="100%" height="400px" borderRadius="8px" />
      </div>
      <div className="col-md-6">
        <div className="item_info">
          <Skeleton width="70%" height="36px" borderRadius="4px" />
          <div className="item_info_counts" style={{ marginTop: "20px" }}>
            <Skeleton width="60px" height="24px" borderRadius="4px" />
            <Skeleton width="60px" height="24px" borderRadius="4px" />
          </div>
          <div style={{ marginTop: "20px" }}>
            <Skeleton width="100%" height="16px" borderRadius="4px" />
            <Skeleton width="90%" height="16px" borderRadius="4px" />
          </div>
          <div className="d-flex flex-row" style={{ marginTop: "30px" }}>
            <div className="mr40">
              <Skeleton width="60px" height="16px" borderRadius="4px" />
              <div className="item_author" style={{ marginTop: "10px" }}>
                <Skeleton width="50px" height="50px" borderRadius="50%" />
              </div>
            </div>
          </div>
          <div style={{ marginTop: "30px" }}>
            <Skeleton width="60px" height="16px" borderRadius="4px" />
            <Skeleton width="100px" height="30px" borderRadius="4px" />
          </div>
          <div style={{ marginTop: "20px" }}>
            <Skeleton width="120px" height="30px" borderRadius="4px" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonItemDetails;
