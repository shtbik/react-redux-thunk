import React from "react";
import Proptypes from "prop-types";

const Card = ({ id, name, author, wrappedClass }) => {
  return (
    <div className={wrappedClass}>
      <p>{name}</p>
      {author && author.firstName && <p>Author: {author.firstName}</p>}
    </div>
  );
};

Card.protypes = {
  id: Proptypes.number.isRequired,
  name: Proptypes.string.isRequired,
  author: Proptypes.object.isRequired,
  wrappedClass: Proptypes.string
};

Card.defaultProps = {
  wrappedClass: ""
};

export default Card;
