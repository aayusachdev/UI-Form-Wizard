## UI for Wizard form administration

TechStack used-

1. JavaScript
2. ReactJS - Class based components/ functional components
3. styled-components - Used for creating Styled Components and globalStyles.
4. semantic-ui-react - Used for Buttons, Modal components.
5. Font-Awesome - Used for Icons like loading, done, close, lock etc.
6. PropTypes - For Static Prop Checking in child components.
7. HTML5 / CSS3 - Styling and FlexBox


# Thought process

I've built up on the discussion of Linked List representation we had during the call, here I've taken a Class based approach towards it. Since the steps wizard structure resemble a Linked List, I've created a Linked List data structure Class with all the helper methods needed. Using this class we can create our instance of LL to be used for steps wizard. Creating a class with all the properties and methods encapsulated together is an `Object Oriented Programming` technique.

Then we create an instance of this linked list `const list = new LinkedList()` inside our App Component. We initialize our state with this instance and create wrapper methods for Adding New Step, Removing a step inside our App component.

Before rendering the steps on the screen, We converts the Steps data from a format that makes sense to
store (Linked List) to a format that makes sense for the UI.

Hence, we iterate the List and create a mapped Array of Steps to render on the screen. The Step component are passed the props from the list and then pushed into an array. We then render this on the screen inside a CSS Flexbox.

I've divided this App in 2 more child-components. The `Step` component renders a Card representing a single Step of the wizard along with an arrow to depict direction(->) and an ADD button.

Step Component take all the required props like title, description, id etc.. to render the step on the screen. We also pass the `addStep`, `removeStep` methods as props.

Each Step has an Step Title and Step description to display the respective content. In the body we have status which can take 3 values as required - (blocked, progess, done).
The status for a new step created is Blocked and it can be changed to in-progress and done via the radio buttons.

If the status is "Blocked", the user can't add next step and the ADD button is hidden. 
If the status is "In-Progress", the user can see the ADD button but still can't create the next step.
Once the step status is "Done", on clicking the ADD button a Modal appears where user can enter the title and description of the next step. After submitting, the next step is added to the right side.

An Icon depicting the step's status is always present on the step-
1. Circular-loader for `In progress`
2. Lock for `Blocked`
3. Green Tick for `Done`

This is done by using `Conditional rendering` concept.

# Removing a Step
The Red cross Icon(x) in the Step's header(right side) can be clicked to remove that particular Step from the wizard.

Initially when the Steps is empty, we only show an ADD button `HeadStep` to add the new step and start the wizard.

# Actions Dropdown

The dropdown on the right side is searchable/clearable. It has a list of actions that cover the 5 requirements and the 1 extra requirement as well.

(Same as given in the design draft doc)

1. Show only first task - Display the first step
2. Show only last task - Display the last step
3. Reverse task order - Reverses the steps list
4. Search Task ID - Enter the task ID (numeric, starts for 0) to get that step if present.
5. Search Keyword - Search steps by a keyword (in title or description), and it shows how many steps
are between them, e.g.: [task1] -3- [task5] -5- [task10]. In this case, ADD button is hidden.

We store this selected action in the App component, and using a Switch Statement we perform the respective operation required to render the result.

Once an action from the dropdown is selected, it can be removed by clicking on the close[x] button in the dropdown. A message also appears on the screen to show that an action is selected.

So, this app has all the `5 requirements` tasks and also the `Extra task implemented`.

Additionally I've used `Prop-types` for static prop checking in child components and `Styled-Components` for creating Header and Global Styles.

# Live Prod link
https://aayusachdev-wizard-form.netlify.app/

To `run` locally, try- 

1. git clone
2. npm install
3. npm start

# Future Enhancements

Some additions we can do to this App are- 

1. For the `Search steps by a keyword` extra task, we can add `Debouncing` effect while entering the search string to optimise it more.

2. For the `Search Task ID` task, we can have a check to see that user enters a valid ID number, otherwise show an error.(Sanitize input)

3. Can make the code more modular and add some more styling as well.