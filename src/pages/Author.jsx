import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import {
  getApiErrorMessage,
  getItemsByAuthorId,
} from "../api/newItems";
import { getTopSellerByAuthorId } from "../api/topSellers";
import SkeletonAuthor from "../components/UI/SkeletonAuthor";

const Author = () => {
  const { authorId } = useParams();
  const [items, setItems] = useState([]);
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchAuthorData = async () => {
      if (!authorId) {
        setError("Author not found.");
        setLoading(false);
        return;
      }

      try {
        const [data, sellerData] = await Promise.all([
          getItemsByAuthorId(authorId),
          getTopSellerByAuthorId(authorId).catch(() => null),
        ]);

        if (!isMounted) {
          return;
        }

        setSeller(sellerData || null);
        setItems(data);
        setError(null);

        if (data.length === 0 && !sellerData) {
          setError("No items found for this author.");
        }
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setError(getApiErrorMessage(err));
        setItems([]);
        setSeller(null);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    setLoading(true);
    fetchAuthorData();

    return () => {
      isMounted = false;
    };
  }, [authorId]);

  const authorImage = seller?.authorImage || items[0]?.authorImage;
  const authorName = seller?.authorName || `Author ${authorId}`;
  const username = seller?.authorName
    ? `@${seller.authorName.toLowerCase().replace(/\s+/g, "")}`
    : `@${authorId}`;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            {loading && <SkeletonAuthor />}

            {!loading && error && (
              <div className="text-center">
                <p>{error}</p>
              </div>
            )}

            {!loading && !error && (items.length > 0 || seller) && (
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={authorImage} alt={authorName} />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {authorName}
                            <span className="profile_username">{username}</span>
                            <span id="wallet" className="profile_wallet">
                              UDHUHWudhwd78wdt7edb32uidbwyuidhg7wUHIFUHWewiqdj87dy7
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">573 followers</div>
                        <Link to="#" className="btn-main">
                          Follow
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    {items.length > 0 ? (
                      <AuthorItems items={items} />
                    ) : (
                      <div className="text-center">
                        <p>No items found for this author.</p>
                      </div>
                    )}
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

export default Author;
