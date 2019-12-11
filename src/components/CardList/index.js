import React from "react";
import PropTypes from "prop-types";

import Card from "../Card";

import styles from "./styles.module.scss";

const FrameworkList = ({ data }) => {
  if (!data.length) return <p>Data is empty</p>;
  return data.map(framework => (
    <Card wrappedClass={styles.item} key={framework.id} {...framework} />
  ));
};

FrameworkList.propTypes = {
  data: PropTypes.array.isRequired
};

export default FrameworkList;
