"use strict";
// Dummy data for initial load
Object.defineProperty(exports, "__esModule", { value: true });
const dummySchema = `class HelloMessage extends React.Component {
  handlePress = () => {
    alert('Hello')
  }
  render() {
    return (
      <div>
        <p>Hello {this.props.name}</p>
        <button onClick onClick onClick onClick onClick onClick onClick onClick onClick onClick onClick onClick onClick onClick onClick={this.handlePress}>Say Hello</button>
      </div>
    );
  }
}
Schema
Schema
Schema
Schema
Schema
Schema
Schema
Schema
Schema
Schema
Schema
Schema
Schema
Schema

Schema
Schema
Schema
Schema
Schema
Schema
Schema
Schema
Schema
Schema
Schema
ReactDOM.render(
  <HelloMessage name="Taylor" />, 
  mountNode 
);`;
const dummyResolver = `class HelloMessage extends React.Component {
  handlePress = () => {
    alert('Hello')
  }
  render() {
    return (
      <div>
        <p>Hello {this.props.name}</p>
        <button onClick={this.handlePress}>Say Hello</button>
      </div>
    );
  }
}
,
Resolver
Resolver
Resolver
Resolver

Resolver
Resolver
ReactDOM.render(
  <HelloMessage name="Taylor" />, 
  mountNode 
);`;
exports.default = {
    dummySchema,
    dummyResolver,
};
//# sourceMappingURL=dummyCode.js.map