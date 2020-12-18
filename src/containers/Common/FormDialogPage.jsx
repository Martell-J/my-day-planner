import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dialog, DialogActions, DialogTitle, DialogContent, Button } from "@material-ui/core";

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

    const valProvided = val !== null && typeof val === "boolean";

    this.setState({
      "open": valProvided ? val : !this.state.open,
    });

  }

  openDialog() {

    this.toggleDialog(true);

  }

  closeDialog() {

    this.toggleDialog(false);

  }

  onSubmit(submitCallback) {

    submitCallback()
      .then((msg) => {

        this.closeDialog();
        this.props.onOpenDisplayMessage(msg, "success");

      })
      .catch(this.props.onOpenDisplayMessage);

  }

  render() {

    const self = this;

    const actions = [
      <Button
        variant="contained"
        style={{ "marginRight": "10px" }}
        color="secondary"
        key="fd-close"
        onClick={self.closeDialog.bind(this)}
      >Close</Button>,
    ];

    return (
      <div>
        <Dialog
          open={self.state.open}

          // style={{ width: "70%", margin: "0 auto" }}
          onClose={self.toggleDialog.bind(this)}
        >
          <DialogTitle>{self.props.title}</DialogTitle>
          <DialogContent

            // style={{ width: "100%" }}
          >
            { React.cloneElement(self.props.subComponent, { "onSubmit": self.onSubmit.bind(this) })}
          </DialogContent>
          <DialogActions>
            {actions}
          </DialogActions>
        </Dialog>
      </div>
    );

  }

}

FormDialogPage.propTypes = {
  "title": PropTypes.string.isRequired,
  "isModal": PropTypes.bool.isRequired,
  "openOnRender": PropTypes.bool.isRequired,
  "subComponent": PropTypes.object.isRequired,
  "onOpenDisplayMessage": PropTypes.func.isRequired,
};

export default FormDialogPage;
