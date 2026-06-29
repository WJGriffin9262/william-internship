import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import { getApiErrorMessage, getNewItems } from "../../api/newItems";
import Countdown from "../UI/Countdown";
import SkeletonNewItem from "../UI/SkeletonNewItem";

const carouselOptions = {
  loop: true,
  margin: 10,
  nav: true,
  dots: false,
  autoplay: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  mouseDrag: true,
  touchDrag: true,
  responsive: {
    0: { items: 1 },
    576: { items: 2 },
    768: { items: 3 },
    992: { items: 4 },
    1200: { items: 4 },
  },
};

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchItems = async () => {
      try {
        const data = await getNewItems();

        if (!isMounted) {
          return;
        }

        setItems(data);
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

    fetchItems();

    return () => {
      isMounted = false;
    };
  }, []);

  const renderCard = (item) => (
    <div className="nft__item">
      <div className="author_list_pp">
        <Link
          to={`/author/${item.authorId}`}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={`Creator: ${item.authorId}`}
        >
          <img className="lazy" src={item.authorImage} alt="" />
          <i className="fa fa-check"></i>
        </Link>
      </div>
      {item.expiryDate != null && (
        <Countdown expiryDate={item.expiryDate} />
      )}

      <div className="nft__item_wrap">
        <div className="nft__item_extra">
          <div className="nft__item_buttons">
            <button>Buy Now</button>
            <div className="nft__item_share">
              <h4>Share</h4>
              <a href="" target="_blank" rel="noreferrer">
                <i className="fa fa-facebook fa-lg"></i>
              </a>
              <a href="" target="_blank" rel="noreferrer">
                <i className="fa fa-twitter fa-lg"></i>
              </a>
              <a href="">
                <i className="fa fa-envelope fa-lg"></i>
              </a>
            </div>
          </div>
        </div>

        <Link to={`/item-details/${item.id}`}>
          <img
            src={item.nftImage}
            className="lazy nft__item_preview"
            alt={item.title}
          />
        </Link>
      </div>
      <div className="nft__item_info">
        <Link to={`/item-details/${item.id}`}>
          <h4>{item.title}</h4>
        </Link>
        <div className="nft__item_price">{item.price} ETH</div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>{item.likes}</span>
        </div>
      </div>
    </div>
  );

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12">
            {loading && (
              <OwlCarousel className="owl-theme" {...carouselOptions}>
                {new Array(4).fill(0).map((_, index) => (
                  <div className="item" key={index}>
                    <SkeletonNewItem />
                  </div>
                ))}
              </OwlCarousel>
            )}

            {!loading && error && (
              <div className="text-center">
                <p>{error}</p>
              </div>
            )}

            {!loading && !error && items.length === 0 && (
              <div className="text-center">
                <p>No items available at the moment.</p>
              </div>
            )}

            {!loading && !error && items.length > 0 && (
              <OwlCarousel className="owl-theme" {...carouselOptions}>
                {items.map((item) => (
                  <div className="item" key={item.id}>
                    {renderCard(item)}
                  </div>
                ))}
              </OwlCarousel>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
