/**
 * Linked List data structure with all the helper methods.
 */
export default class LinkedList {
  constructor() {
    this.head = "null";
    this.length = 0;
  }

  /**
   * Adds a new node at the given index.
   * 
   * @param {*} index Position at which to add a new node.
   * @param {*} title Title to be displayed in the node.
   * @param {*} description Description to be displayed in the node.
   * @returns Linked list object.
   */
  addNewNode(index, title, description) {
    const newNode = { title, description };
    newNode.next = "null";

    if (this.head === "null") {
      this.head = newNode;
      this.length++;
      return this;
    }

    if (index === 0) {
      let temp = this.head;
      this.head = newNode;
      newNode.next = temp;
      this.length++;
      return this;
    }

    const previous = this.getAt(index - 1);
    newNode.next = previous.next;
    previous.next = newNode;
    this.length++;
    return this;
  }

  /**
   * Gets the node at index position in the linked list.
   * 
   * @param {*} index
   * @returns node at the index position.
   */
  getAt(index) {
    let counter = 0;
    let node = this.head;
    while (node) {
      if (counter === index) {
        return node;
      }
      counter++;
      node = node.next;
    }
    return null;
  }

  /**
   * Removes the node at index position from the linked list.
   * 
   * @param {*} index index of the node to be removed.
   * @returns Linked list with node removed.
   */
  remove(index) {
    if (index === 0) {
      this.head = this.head.next;
      this.length--;
      // console.log("HEAD DELETION", this);
      return this;
    }

    const previous = this.getAt(index - 1);

    if (!previous || previous.next === "null") {
      return undefined;
    }

    previous.next = previous.next.next;
    this.length--;
    return this;
  }

  /**
   * Reverses the linked list in place.
   * 
   * @returns reversed linked list.
   */
  reverse() {
    let current = this.head;
    let next = "null";
    let prev = "null";
    while (current !== "null") {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    this.head = prev;
    // console.log("THIS>>>>>>>>>>", this);
    return this;
  }
}
