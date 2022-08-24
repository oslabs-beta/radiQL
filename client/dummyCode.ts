
// Dummy data for initial load

const dummySchema: string = `const ExampleSchemaSample = \`

type Query {
	planets: [Planet!]!
		planet(_id: ID!): Planet!
	films: [Film!]!
		film(_id: ID!): Film!
	vessels: [Vessel!]!
		vessel(_id: ID!): Vessel!
	species: [Species!]!
		species(_id: ID!): Species!
	people: [Person!]!
		person(_id: ID!): Person!
	starship_specs: [StarshipSpec!]!
		starship_spec(_id: ID!): StarshipSpec!
}

\``;

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
ReactDOM.render(
  <HelloMessage name="Taylor" />, 
  mountNode 
);`;


export default {
  dummySchema,
  dummyResolver,
}