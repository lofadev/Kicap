import { Fragment, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { policys } from "../../../data";
import EvoBlogHeader from "../../components/EvoBlogHeader/EvoBlogHeader";
import "./Policy.scss";

const Policy = () => {
  const { title } = useParams();
  const handleFindPolicy = useCallback(() => {
    return policys.find((policy) => {
      return policy.navigate === title;
    });
  }, [title]);

  const [policyState, setPolicy] = useState(handleFindPolicy);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPolicy(handleFindPolicy);
  }, [title, handleFindPolicy]);
  return (
    <section className="policy-page">
      <EvoBlogHeader title={policyState.title}></EvoBlogHeader>
      <div className="policy-content">
        <div className="container">
          {Object.keys(policyState).length !== 0 &&
            policyState.data.map((child, index) => (
              <p className="paragraph" key={index}>
                {child.map((item, i) => {
                  return item.isText ? (
                    <Fragment key={i}>{item.p}</Fragment>
                  ) : item.isStrong ? (
                    <strong key={i}>{item.p}</strong>
                  ) : item.isLink ? (
                    <a key={i} href={`mailto:${item.to}`} target="_blank" className="p-link" rel="noreferrer">
                      {item.p}
                    </a>
                  ) : (
                    ""
                  );
                })}
              </p>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Policy;
