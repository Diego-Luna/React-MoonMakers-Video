import React, { useState } from "react";
import { connect } from 'react-redux';
import { searchApi } from '../actions';
import classNames from "classnames";
import "../assets/styles/components/Search.css";

const Search = (props, isHome) => {
  const [form, setValues] = useState({
    search: "",
  });

  const handleInput = (event) => {
    event.preventDefault();
    props.searchApi(event.target.value);

    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const inputStyle = classNames("input", {
    isHome,
  });
  return (
    <section className="main">
      <h2 className="main__title">¿Qué quieres ver hoy?</h2>
      <input
        type="text"
        className={inputStyle}
        placeholder="Buscar..."
        onChange={handleInput}
        name="search"
      />
    </section>
  );
};

const mapDispatchToProps = {
  searchApi,
};

export default connect(null, mapDispatchToProps)(Search);
