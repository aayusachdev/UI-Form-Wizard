import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Form, Input, Modal } from "semantic-ui-react";

// Head Component to start the steps Wizard.
const HeadStep = ({ addStep, showAddBtn }) => {
  
  const [isModal, setModal] = useState(false);
  const [headTitle, setHeadTitle] = useState("");
  const [headDescription, setHeadDescription] = useState("");

  const addNextStep = (e) => {
    // console.log("ADD HEADER!");
    setModal(false);
    addStep(0, headTitle, headDescription);
    setHeadTitle("");
    setHeadDescription("");
  };

  return (
    <>
      {showAddBtn && (
        <button className="add-btn" onClick={() => setModal(true)}>
          ADD
        </button>
      )}
      <Modal
        dimmer="blurring"
        size="mini"
        closeIcon
        open={isModal}
        onClose={() => setModal(false)}
        onOpen={() => setModal(true)}
      >
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Title</label>
              <Input
                value={headTitle}
                onChange={(e) => setHeadTitle(e.target.value)}
                placeholder="Enter Title for the head Step..."
              />
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <Input
                value={headDescription}
                onChange={(e) => setHeadDescription(e.target.value)}
                placeholder="Enter Description for the head Step..."
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="green"
            disabled={
              !(headTitle.trim().length && headDescription.trim().length)
            }
            onClick={(e) => addNextStep(e)}
          >
            ADD
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

HeadStep.propTypes = {
  addStep: PropTypes.func.isRequired,
  showAddBtn: PropTypes.bool.isRequired,
};

export default HeadStep;
