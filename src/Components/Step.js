import React, { useState } from "react";
import {
  Button,
  Card,
  Form,
  Icon,
  Input,
  Radio,
  Modal,
} from "semantic-ui-react";
import PropTypes from "prop-types";
import { STATUS } from "../Constants/";

// Step Component representing a Single Step of the Wizard.
const Step = ({ id, title, description, addStep, removeStep, showAddBtn }) => {
  
  const [status, setStatus] = useState(STATUS.BLOCKED);
  const [isModal, setModal] = useState(false);
  const [nextStepTitle, setNextStepTitle] = useState("");
  const [nextStepDescription, setNextStepDescription] = useState("");

  const handleChange = (e, { value }) => {
    setStatus(value);
  };

  const addNextStep = (e) => {
    // console.log("ADD NEXT STEP!");
    setModal(false);
    addStep(id + 1, nextStepTitle, nextStepDescription);
    setNextStepTitle("");
    setNextStepDescription("");
    setStatus(STATUS.DONE);
  };
  return (
    <>
      <Card className="step">
        <Card.Header>
          {title}
          <Icon
            className="card-icon"
            name="remove"
            color="red"
            onClick={() => removeStep(id)}
            style={{ cursor: "pointer" }}
          />
        </Card.Header>
        <Card.Content>{description}</Card.Content>
        <Card.Content extra>
          <Form>
            <Form.Field>
              <Radio
                label="Done"
                name="radioGroup"
                value="done"
                checked={status === STATUS.DONE}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="Blocked"
                name="radioGroup"
                value="blocked"
                checked={status === STATUS.BLOCKED}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="In Progress"
                name="radioGroup"
                value="in_progress"
                checked={status === STATUS.IN_PROGRESS}
                onChange={handleChange}
              />
            </Form.Field>
          </Form>
          {status === STATUS.BLOCKED && (
            <Icon className="card-icon" name="lock" />
          )}
          {status === STATUS.IN_PROGRESS && (
            <Icon className="card-icon" name="spinner" color="blue" />
          )}
          {status === STATUS.DONE && (
            <Icon className="card-icon" name="check" color="green" />
          )}
        </Card.Content>
      </Card>
      <Icon
        className="arrow-icon"
        name="long arrow alternate right"
        size="large"
      />

      {status !== STATUS.BLOCKED && showAddBtn && (
        <>
          <button
            className={`add-btn ${
              status === STATUS.IN_PROGRESS ? "fade-btn" : ""
            }`}
            disabled={status === STATUS.IN_PROGRESS}
            onClick={() => setModal(true)}
          >
            ADD
          </button>
        </>
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
                value={nextStepTitle}
                onChange={(e) => setNextStepTitle(e.target.value)}
                placeholder="Enter Title for the next Step..."
              />
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <Input
                value={nextStepDescription}
                onChange={(e) => setNextStepDescription(e.target.value)}
                placeholder="Enter Description for the next Step..."
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="green"
            disabled={
              !(
                nextStepTitle.trim().length && nextStepDescription.trim().length
              )
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

Step.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  addStep: PropTypes.func.isRequired,
  removeStep: PropTypes.func.isRequired,
  showAddBtn: PropTypes.bool.isRequired,
};

export default Step;
