import React from "react";
import Step from "./Components/Step";
import HeadStep from "./Components/HeadStep";

import LinkedList from "./Utils/LinkedList";
import { dropDownOptions } from "./Constants";

import { WizardHeader, GlobalStyle } from "./Themes/styledComponents";
import { Dropdown, Modal, Form, Input, Button } from "semantic-ui-react";

// Initializing our List object.
const list = new LinkedList();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: list,
      filter: "",
      searchTaskID: "",
      searchKeyword: "",
      isModal: false,
    };
  }

  setSearchHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  /* Adds a new node with title and description at the given index. */
  addNewNode = (id, title, desc) => {
    this.setState({ list: list.addNewNode(id, title, desc) });
  };

  /* Removed a node at the given index. */
  remove = (id) => {
    list.remove(id);
    this.setState({ list: list });
    // console.log(list);
  };

  handleChange = (e, { value }) => {
    this.setState({ filter: value }, () => {
      if (value === "REVERSE_ORDER") {
        this.setState({ list: list.reverse() });
      } else if (value === "SEARCH_TASK_ID" || value === "SEARCH_KEYWORD") {
        this.setState({ isModal: true });
      }
    });
    if (value === "") {
      this.setState({
        searchTaskID: "",
        searchKeyword: "",
      });
    }
  };

  /* Apply the selected filter from the Actions dropdown to the steps rendered.*/
  filterItems = (itemArr) => {
    const filter = this.state.filter;
    const searchKeyword = this.state.searchKeyword;
    // console.log("filter", filter);

    switch (filter) {
      case "SHOW_FIRST_TASK":
        return itemArr[0];

      case "SHOW_LAST_TASK":
        return itemArr[itemArr.length - 1];

      case "SEARCH_TASK_ID":
        return itemArr[this.state.searchTaskID] ?? [];

      case "SEARCH_KEYWORD":
        // console.log("SEARCH_KEYWORD", itemArr, searchKeyword);
        let emptyCount = 0;
        let resultArr = itemArr.map((item, index) => {
          if (
            item.props.description.includes(searchKeyword) ||
            item.props.title.includes(searchKeyword)
          ) {
            emptyCount = 0;
            return item;
          } else {
            emptyCount++;
            return <span className="item-count">{emptyCount}</span>;
          }
        });
        resultArr.reverse();
        let finalArr = resultArr.filter(function (item, pos, resultArr) {
          /* keep the 0th element as there is nothing before it
           and check if next element is also of span type or not. */
          return (
            pos === 0 ||
            item.type !== "span" ||
            item.type !== resultArr[pos - 1].type
          );
        });
        finalArr.reverse();
        // console.log("AFTER keyword search", finalArr);
        return finalArr;

      default:
        return itemArr;
    }
  };

  render() {
    let current = this.state.list.head;
    // Iterating the linked list representation of steps to get the 1-1 mapped Steps Array.
    let items = [];
    let itemIndex = items.length;
    while (current !== "null") {
      // console.log("#####current>>>", current);
      items.push(
        <Step
          key={`${current.title}-${current.description}`}
          id={itemIndex}
          title={current.title}
          description={current.description}
          addStep={this.addNewNode}
          removeStep={this.remove}
          showAddBtn={this.state.filter !== "SEARCH_KEYWORD"}
        ></Step>
      );
      itemIndex++;
      current = current.next;
    }
    // console.log(">>>>>", items);
    // console.log("STATE", this.state);

    const filteredSteps = this.filterItems(items);

    return (
      <>
        <GlobalStyle />
        <WizardHeader>UI for Wizard form administration</WizardHeader>
        {this.state.filter && (
          <div className="info">
            Selected action Applied. Click [x] on dropdown to go back to normal
            View.
          </div>
        )}
        <Dropdown
          className="actions-dropdown"
          search
          placeholder="Actions"
          clearable
          options={dropDownOptions}
          selection
          onChange={this.handleChange}
          value={this.state.filter}
        />

        <div>
          <div className="steps-wizard">
            <HeadStep
              showAddBtn={this.state.filter !== "SEARCH_KEYWORD"}
              addStep={this.addNewNode}
            />
            {filteredSteps}
          </div>

          <Modal
            dimmer="blurring"
            size="mini"
            closeIcon
            open={this.state.isModal}
            onClose={() => this.setState({ isModal: false })}
            onOpen={() => this.setState({ isModal: false })}
          >
            <Modal.Content>
              <Form>
                <Form.Field>
                  {this.state.filter === "SEARCH_TASK_ID" && (
                    <>
                      <label>Task ID</label>
                      <Input
                        value={this.state.searchTaskID}
                        name="searchTaskID"
                        onChange={(e) => this.setSearchHandler(e)}
                        placeholder="Enter Task id starting from 0..."
                      />
                    </>
                  )}
                  {this.state.filter === "SEARCH_KEYWORD" && (
                    <>
                      <label>Search Keyword</label>
                      <Input
                        value={this.state.searchKeyword}
                        name="searchKeyword"
                        onChange={(e) => this.setSearchHandler(e)}
                        placeholder="Enter Keyword to search..."
                      />
                    </>
                  )}
                </Form.Field>
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button
                color="green"
                onClick={() => this.setState({ isModal: false })}
              >
                Search
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
      </>
    );
  }
}

export default App;
