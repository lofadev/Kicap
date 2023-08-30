import { useEffect, useState } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { Link } from "react-router-dom";
import { news } from "../../../data";
import "./News.scss";
import FormGroup from "../../components/FormGroup/FormGroup";

const News = () => {
  const [newState, setNewState] = useState({});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setNewState(news[0]);
  });
  return (
    <div className="article">
      <div className="container">
        <h1 className="title-head">{newState.title}</h1>
        <div className="postby">
          Đăng bởi <b>Kicap</b> vào lúc {newState.createdAt}
        </div>
        <div className="article-details">
          {Object.keys(newState).length !== 0 &&
            newState.paragraph.map((child, index) => (
              <p className="paragraph" key={index}>
                {child.map((item, index) => {
                  return item.isText ? (
                    <span key={index} className="p-text">
                      {item.data}
                    </span>
                  ) : item.isStrong ? (
                    <strong key={index} className="p-strong">
                      {item.data}
                    </strong>
                  ) : item.isLink ? (
                    <a key={index} href={item.url} target="_blank" className="p-link" rel="noreferrer">
                      {item.data}
                    </a>
                  ) : item.isHeading ? (
                    <span key={index} className="p-heading">
                      {item.data}
                    </span>
                  ) : (
                    ""
                  );
                })}
              </p>
            ))}
        </div>

        {/* tag */}
        <div className="tag-article">
          <span className="tag-head">Tags: </span>
          {Object.keys(newState).length !== 0 &&
            newState.tags.map((item, index) => {
              return (
                <Link title={item} to={"/"} key={index} className="tag-link">
                  {item}
                </Link>
              );
            })}
        </div>

        {/* article toolbar */}
        <div className="article-toolbar">
          <div className="article-toolbar-left">
            <span className="article-toolbar-head">Bạn đang xem: </span>
            <span className="article-toolbar-title" title={newState.title}>
              {newState.title}
            </span>
          </div>
          <div className="article-toolbar-right">
            <Link to="" className="article-toolbar-link">
              <GoChevronLeft></GoChevronLeft>
              <span> Bài trước</span>
            </Link>
            <span className="separator"></span>
            <Link to="" className="article-toolbar-link">
              <span>Bài sau </span>
              <GoChevronRight></GoChevronRight>
            </Link>
          </div>
        </div>

        {/* article comment */}
        <div className="article-comment">
          <form action="submit" className="form-cmt">
            <h5 className="form-title">Viết bình luận của bạn</h5>
            <p className="form-note">
              Địa chỉ email của bạn sẽ được bảo mật. Các trường bắt buộc được đánh dấu
              <span className="required"> *</span>
            </p>

            <div className="form-main">
              <FormGroup type="text" labelName="Nội dung" required></FormGroup>
              <FormGroup type="input" labelName="Họ tên" required></FormGroup>
              <FormGroup type="input" labelName="Email" required></FormGroup>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default News;
