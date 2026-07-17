import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getApiErrorMessage, getTopSellers } from "../../api/topSellers";
import SkeletonTopSellers from "../UI/SkeletonTopSellers";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchSellers = async () => {
      try {
        const data = await getTopSellers();

        if (!isMounted) {
          return;
        }

        setSellers(data);
        setError(null);
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setError(getApiErrorMessage(err));
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchSellers();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            {loading && <SkeletonTopSellers />}

            {!loading && error && (
              <div className="text-center">
                <p>{error}</p>
              </div>
            )}

            {!loading && !error && sellers.length === 0 && (
              <div className="text-center">
                <p>No top sellers available at the moment.</p>
              </div>
            )}

            {!loading && !error && sellers.length > 0 && (
              <ol className="author_list">
                {sellers.map((seller) => (
                  <li key={seller.id}>
                    <div className="author_list_pp">
                      <Link to={`/author/${seller.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={seller.authorImage}
                          alt={seller.authorName}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${seller.authorId}`}>
                        {seller.authorName}
                      </Link>
                      <span>{seller.price} ETH</span>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
