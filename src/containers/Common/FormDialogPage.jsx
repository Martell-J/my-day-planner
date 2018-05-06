import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dialog, RaisedButton } from "material-ui";

class FormDialogPage extends Component {

  /*
   * Class constructor.
   */
  constructor(props) {

    super(props);

    this.state = {
      "open": props.openOnRender,
    };

  }

  toggleDialog(val = null) {

    this.setState({
      "open": val !== null ? val : !this.state.open,
    });

  }

  openDialog() {

    this.toggleDialog(true);

  }

  closeDialog() {

    this.toggleDialog(false);

  }

  onSubmit(submitCallback) {

    submitCallback();
    this.closeDialog(false);

  }

  render() {

    const self = this;

    const actions = [
      <RaisedButton
        label="Close"
        primary={true}
        key="fd-close"
        onClick={self.closeDialog.bind(this)}
      />,
      <RaisedButton
        label="Submit"
        primary={true}
        key="fd-submit"
        keyboardFocused={true}
        onClick={self.onSubmit.bind(this)}
      />,
    ];

    return (
      <div>
        <Dialog
          title={self.props.title}
          actions={actions}
          modal={self.props.isModal}
          open={self.state.open}
          onRequestClose={self.toggleDialog.bind(this)}
        >
          { React.cloneElement(self.props.subComponent, { "onSubmit": self.onSubmit.bind(this) })};
        </Dialog>
      </div>
    );

  }

}

FormDialogPage.propTypes = {
  "title": PropTypes.object.isRequired,
  "isModal": PropTypes.bool.isRequired,
  "openOnRender": PropTypes.bool.isRequired,
  "subComponent": PropTypes.object.isRequired,
};

export default FormDialogPage;
