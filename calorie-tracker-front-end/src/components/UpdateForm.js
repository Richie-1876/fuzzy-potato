import React from "react";

let baseURL = process.env.REACT_APP_BASEURL;

if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:3003";
}

class UpdateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foods: this.props.foods,
      name: "",
      calories: 0,
      food: null
    };
    this.handleUpdateFood = this.handleUpdateFood.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.handleEditFood = this.handleEditFood.bind(this)
}
// handleEditFood(food) {
//     const copyFoods = [food, ...this.state.foods];
//     this.setState({
//       foods: copyFoods
//     });
//   }

  async handleUpdateFood(food) {
      console.log(food)
      console.log(food._id);
    try {
      let response = await fetch(`${baseURL}/foods/${food._id}`, {

        method: "PUT",
        body: JSON.stringify({
          name: this.state.name,
          calories: this.state.calories
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      let updatedFood = await response.json();
      console.log(updatedFood);
      const foundFood = this.state.foods.findIndex(
        foundItem => foundItem._id === food._id
      );
      const copyFoods = [...this.state.foods];

      copyFoods[foundFood].name = updatedFood.name;
      console.log(updatedFood.name);
      console.log(copyFoods);

      copyFoods[foundFood].calories = updatedFood.calories;
      this.props.handleeditfood(copyFoods)
      console.log(this.state.foods);
    } catch (err) {
      console.error(err);
    }
  }
  handleChange(event) {
    this.setState({
      [event.currentTarget.id]: event.currentTarget.value
    });
  }
  render() {
    return (
      <div className="modal edit">
        <form onSubmit={(event)=>{
            event.preventDefault()
            this.handleUpdateFood(this.props.food)
        }} handleeditfood={this.props.handleEditFood}>
          <div className="row">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              onChange={this.handleChange}
              value={this.name}
            />
            <label htmlFor="Calories">Calories</label>
            <input
              type="number"
              id="calories"
              onChange={this.handleChange}
              value={this.calories}
            />
            <input
              type="submit"
              value="Update Food"
              className="button"
              id="update"

            />

          </div>
        </form>
      </div>
    );
  }
}

export default UpdateForm;
