import React from "react";
import Skeleton from "./Skeleton";
import SkeletonNewItem from "./SkeletonNewItem";

const SkeletonAuthor = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="d_profile de-flex">
            <div className="de-flex-col">
              <div className="profile_avatar">
                <Skeleton width="150px" height="150px" borderRadius="50%" />
                <div className="profile_name" style={{ marginTop: "20px" }}>
                  <Skeleton width="200px" height="28px" borderRadius="4px" />
                  <Skeleton
                    width="120px"
                    height="18px"
                    borderRadius="4px"
                  />
                </div>
              </div>
            </div>
            <div className="profile_follow de-flex">
              <Skeleton width="100px" height="40px" borderRadius="4px" />
            </div>
          </div>
        </div>
      </div>
      <div className="row" style={{ marginTop: "30px" }}>
        {new Array(4).fill(0).map((_, index) => (
          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
            <SkeletonNewItem />
          </div>
        ))}
      </div>
    </>
  );
};

export default SkeletonAuthor;
