import Proptypes from "prop-types";
import { useEffect, useState } from "react";
import "./SectionBreadCrumb.scss";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import unidecode from "unidecode";

const SectionBreadCrumb = ({ type, child, category }) => {
  const [parentState, setParentState] = useState(null);

  const categoryParam = unidecode(category.toLowerCase())
    .split(" ")
    .map((word) => word.replace(/[^\w\s-]/g, ""))
    .filter((word) => word !== "-")
    .join("-");
  useEffect(() => {
    if (type === "news") setParentState("Tin tức");
    else if (type === "product") setParentState(category);
  }, [type, category]);

  return (
    <div className="bread-crumb">
      <div className="container">
        <h3>
          <Link to={"/"}>
            <span className="bread-crumb-group">
              Trang chủ{" "}
              <span className="arrow-right">
                <FaAngleRight />
              </span>
            </span>
          </Link>

          {parentState && (
            <Link to={`/${categoryParam}`}>
              <span className="bread-crumb-group">
                {parentState}{" "}
                <span className="arrow-right">
                  <FaAngleRight />
                </span>
              </span>
            </Link>
          )}
          <span className="current-active">{child}</span>
        </h3>
      </div>
    </div>
  );
};

SectionBreadCrumb.propTypes = {
  type: Proptypes.string.isRequired,
  child: Proptypes.string.isRequired,
  category: Proptypes.string,
};

export default SectionBreadCrumb;
