import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getFrameworks } from "../../modules/content";
import CardList from "../../components/CardList";

const FrameworkList = ({
  getFrameworks,
  content: { data, isLoading, error }
}) => {
  useEffect(() => {
    getFrameworks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // can create components for loading and error handling
  if (isLoading) return "Loading...";
  if (error) return error;

  return <CardList data={data} />;
};

FrameworkList.propTypes = {
  getFrameworks: PropTypes.func.isRequired,
  content: PropTypes.object.isRequired
};

export default connect(
  ({ content }) => ({ content }),
  dispatch => bindActionCreators({ getFrameworks }, dispatch)
)(FrameworkList);
