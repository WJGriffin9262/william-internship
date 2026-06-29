import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import {
  getApiErrorMessage,
  getItemsByAuthorId,
} from "../api/newItems";
import SkeletonAuthor from "../components/UI/SkeletonAuthor";

const Author = () => {
  const { authorId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchAuthorItems = async () => {
      if (!authorId) {
        setError("Author not found.");
        setLoading(false);
        return;
      }

      try {
        const data = await getItemsByAuthorId(authorId);

        if (!isMounted) {
          return;
        }

        if (data.length === 0) {
          setError("No items found for this author.");
          setItems([]);
        } else {
          setItems(data);
          setError(null);
        }
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setError(getApiErrorMessage(err));
        setItems([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    setLoading(true);
    fetchAuthorItems();

    return () => {
      isMounted = false;
    };
  }, [authorId]);

  const authorImage = items[0]?.authorImage;

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

            {!loading && !error && items.length > 0 && (
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            Author {authorId}
                            <span className="profile_username">
                              @{authorId}
                            </span>
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
                    <AuthorItems items={items} />
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
