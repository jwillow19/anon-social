import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => {
  if (alerts !== null && alerts.length > 0) {
    const alertComp = alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ));
    return alertComp;
  } else {
    return null;
  }
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

// [*] Fetch redux state from reducer to props of alert component
const mapStateToProps = (state) => ({
  // set property[alert] (props.alerts) to the state of the 'alert' reducer in rootreducer
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
