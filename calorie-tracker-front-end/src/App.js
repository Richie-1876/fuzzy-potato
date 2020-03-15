import React from "react";
import NewForm from "./components/NewForm";
import UpdateForm from "./components/UpdateForm";

let baseURL = process.env.REACT_APP_BASEURL;

if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:3003";
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foods: [],
      isEditing: false
    };
    this.getFoods = this.getFoods.bind(this);
    this.handleAddFood = this.handleAddFood.bind(this);
    this.deleteFood = this.deleteFood.bind(this);
    this.handleEditButton = this.handleEditButton.bind(this);
    this.handleEditFood = this.handleEditFood.bind(this)
  }
  componentDidMount() {
    this.getFoods();
  }
  async getFoods() {
    try {
      let response = await fetch(`${baseURL}/foods`);
      let data = await response.json();
      this.setState({
        foods: data
      });
    } catch (e) {
      console.error(e);
    }
  }
  handleEditFood(copyFoods) {
    this.setState({
      foods: copyFoods,
      isEditing: false
    })
  }

  handleAddFood(food) {
    const copyFoods = [food, ...this.state.foods];
    this.setState({
      foods: copyFoods
    });
  }

  handleEditButton() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  async deleteFood(id) {
    try {
      let response = await fetch(`${baseURL}/foods/${id}`, {
        method: "DELETE"
      });
      let data = await response.json();
      const foundFood = this.state.foods.findIndex(food => food._id === id);
      const copyFoods = [...this.state.foods];
      copyFoods.splice(foundFood, 1);
      this.setState({ foods: copyFoods });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div>
        <h1>Calorie Counter</h1>
        <NewForm handleAddFood={this.handleAddFood} />
        <ul>
        {
          this.state.foods.map(food => {
            return(
              <div className="food-container"key={food._id}>
                <li >{food.name}:{' '}{food.calories}{' '} calories</li>
                <button className="button" onClick={()=>{this.deleteFood(food._id)}}>DELETE</button>
                <button className="button" id="edit"
                    onClick={() => {
                      this.handleEditButton();
                    }}
                  >
                    EDIT
                  </button>
                  {this.state.isEditing ? (
                    <UpdateForm
                      foods={this.state.foods}
                      handleChange={this.handleChange}
                      food={food}
                      handleeditfood={this.handleEditFood}
                    />     ) : (
                      " "
                    )}
                  </div>
            );
          })}
        </ul>
      </div>
    );
  }
}
export default App;
