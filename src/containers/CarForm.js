import { connect } from "react-redux";
import CarForm from "../components/CarForm";
import { setCarInfo } from "../redux/actions";

const mapDispatchToProps = (dispatch) => {
  return {
    setCarInfo: (carInfo) => dispatch(setCarInfo(carInfo)),
  };
};

export default connect(null, mapDispatchToProps)(CarForm);
