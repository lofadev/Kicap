import Proptypes from "prop-types";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import unidecode from "unidecode";
import "./SectionBreadCrumb.scss";

const SectionBreadCrumb = ({ parent = null, child = null }) => {
  const parentParam = unidecode(parent.toLowerCase())
    .split(" ")
    .map((word) => word.replace(/[^\w\s-]/g, ""))
    .filter((word) => word !== "-")
    .join("-");

  return (
    <div className="bread-crumb">
      <div className="container">
        <h3>
          <Link to={"/"}>
            <span className="bread-crumb-group">
              Trang chủ
              <span className="arrow-right">
                <FaAngleRight />
              </span>
            </span>
          </Link>

          <Link to={`/${parentParam}`}>
            <span className="bread-crumb-group">
              {parent}
              {child && (
                <span className="arrow-right">
                  <FaAngleRight />
                </span>
              )}
            </span>
          </Link>
          {child && <span className="current-active">{child}</span>}
        </h3>
      </div>
    </div>
  );
};

SectionBreadCrumb.propTypes = {
  parent: Proptypes.string.isRequired,
  child: Proptypes.string.isRequired,
};

export default SectionBreadCrumb;
