import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import {
  getApiErrorMessage,
  getNewItemById,
} from "../api/newItems";
import Countdown from "../components/UI/Countdown";
import SkeletonItemDetails from "../components/UI/SkeletonItemDetails";

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchItem = async () => {
      if (!id) {
        setError("Item not found.");
        setLoading(false);
        return;
      }

      try {
        const data = await getNewItemById(id);

        if (!isMounted) {
          return;
        }

        if (!data) {
          setError("Item not found.");
          setItem(null);
        } else {
          setItem(data);
          setError(null);
        }
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setError(getApiErrorMessage(err));
        setItem(null);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    setLoading(true);
    fetchItem();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            {loading && <SkeletonItemDetails />}

            {!loading && error && (
              <div className="text-center">
                <p>{error}</p>
              </div>
            )}

            {!loading && !error && item && (
              <div className="row">
                <div className="col-md-6 text-center">
                  <img
                    src={item.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt={item.title}
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>{item.title}</h2>

                    <div className="item_info_counts">
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {item.likes}
                      </div>
                    </div>
                    <Countdown expiryDate={item.expiryDate} />
                    <p>
                      doloremque laudantium, totam rem aperiam, eaque ipsa quae
                      ab illo inventore veritatis et quasi architecto beatae
                      vitae dicta sunt explicabo.
                    </p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${item.authorId}`}>
                              <img
                                className="lazy"
                                src={item.authorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${item.authorId}`}>
                              Author {item.authorId}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${item.authorId}`}>
                              <img
                                className="lazy"
                                src={item.authorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${item.authorId}`}>
                              Author {item.authorId}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{item.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
