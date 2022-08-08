
// Dummy data for initial load

const dummySchema: string = `class HelloMessage extends React.Component {
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

const dummyResolver: string = `class HelloMessage extends React.Component {
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


export default {
  dummySchema,
  dummyResolver,
}