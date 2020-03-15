import React from "react";

let baseURL = process.env.REACT_APP_BASEURL;

if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:3003";
}

class NewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      calories: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      let response = await fetch(`${baseURL}/foods`, {
        method: "POST",
        body: JSON.stringify({
          name: this.state.name,
          calories: this.state.calories
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      let data = await response.json();
      this.props.handleAddFood(data);
      this.setState({
        name: "",
        calories: 0
      });
    } catch (err) {
      console.error(err);
    }
  }

  handleChange(event){
      this.setState({ [event.currentTarget.id] : event.currentTarget.value });
  }

  render() {
    return (
      <div>
        
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={this.handleChange}
            value={this.state.name}
            placeholder="Chicken"
          ></input>
          <label htmlFor="calories">Calories</label>
          <input
            type="number"
            id="calories"
            name="calories"
            onChange={this.handleChange}
            value={this.state.calories}
            placeholder="0"
          ></input>
          <input id="create" type="submit" value="Create" />
        </form>
      </div>
    );
  }
}

export default NewForm;
