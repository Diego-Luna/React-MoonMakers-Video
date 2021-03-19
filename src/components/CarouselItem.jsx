/* eslint-disable no-unused-vars */
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  setFavorite,
  setFavoriteBackend,
  deleteFavorite,
  deleteFavoriteBackend,
} from "../actions";
import "../assets/styles/components/CarouselItem.css";
import playIcon from "../assets/static/play-icon.png";
import plusIcon from "../assets/static/plus-icon.png";
import removeIcon from "../assets/static/remove-icon.png";
import ready from "../assets/static/listo.png";

const CarouselItem = (props) => {
  const {
    _id,
    id,
    cover,
    title,
    year,
    contentRating,
    duration,
    isList,
  } = props;

  const { myList, user } = props;

  let userId = user.id;

  const handleSetFavorite = () => {
    props.setFavorite({
      _id,
      id,
      cover,
      title,
      year,
      contentRating,
      duration,
    });

    props.setFavoriteBackend({
      _id,
      userId,
    });
  };
  const handleDeleteFavorite = (itemId) => {
    props.deleteFavoriteBackend({ _id, id, userId });
    props.deleteFavorite(itemId);
  };
  return (
    <div className="carousel-item">
      <img className="carousel-item__img" src={cover} alt={title} />
      <div className="carousel-item__details">
        <div>
          <Link to={`/player/${id}`}>
            <img
              className="carousel-item__details--img"
              src={playIcon}
              alt="Play Icon"
            />
          </Link>

          {isList ? (
            <img
              className="carousel-item__details--img"
              src={removeIcon}
              alt="Plus Icon"
              onClick={() => handleDeleteFavorite(id)}
            />
          ) : myList.find((item) => item.id === id) ? (
            <img
              className="carousel-item__details--img"
              src={ready}
              alt="Plus Icon"
              onClick={() => handleDeleteFavorite(id)}
            />
          ) : (
            <img
              className="carousel-item__details--img"
              src={plusIcon}
              alt="Plus Icon"
              onClick={handleSetFavorite}
            />
          )}
        </div>
        <p className="carousel-item__details--title">{title}</p>
        <p className="carousel-item__details--subtitle">
          {`${year} ${contentRating} ${duration}`}
        </p>
      </div>
    </div>
  );
};

CarouselItem.propTypes = {
  cover: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.number,
  contentRating: PropTypes.string,
  duration: PropTypes.number,
};

const mapDispatchToProps = {
  setFavorite,
  setFavoriteBackend,
  deleteFavorite,
  deleteFavoriteBackend,
};

const mapStateToProps = (state) => {
  return {
    myList: state.myList,
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarouselItem);
