import Proptypes from "prop-types";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Header></Header>
      <div className="main-content">{children}</div>
      <Footer></Footer>
    </>
  );
};

DefaultLayout.propTypes = {
  children: Proptypes.node.isRequired,
};
export default DefaultLayout;
