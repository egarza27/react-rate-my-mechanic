import { connect } from "react-redux";
import MaintenanceSchedules from "../components/MaintenanceSchedules";

const mapStateToProps = (state) => {
  return {
    car: state.car,
  };
};

export default connect(mapStateToProps)(MaintenanceSchedules);
