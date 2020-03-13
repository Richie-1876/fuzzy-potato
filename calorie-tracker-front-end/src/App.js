import React from 'react';
import NewForm from './components/NewForm'

let baseURL = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003'
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      foods: []
    }
    this.getFoods = this.getFoods.bind(this)
    this.handleAddFood = this.handleAddFood.bind(this)
  }
  componentDidMount(){
    this.getFoods()
  }
  async getFoods() {
    try {
      let response = await fetch(`${baseURL}/foods`)
      let data = await response.json()
      this.setState({
        foods: data
      })

    } catch(e) {
      console.error(e);
    }
  }

  handleAddFood(food){
    const copyFoods = [food, ...this.state.foods]
    this.setState({
      foods : copyFoods
    })
  }

  render() {
    return(
      <div>
        <h1>Calorie Counter</h1>
        <NewForm handleAddFood={this.handleAddFood}/>
        <ul>
        {
          this.state.foods.map(food => {
            return(
              <li key={food._id}>{food.name}:{food.calories}{' '} calories</li>
            )
          })
        }
        </ul>
      </div>
    )
  }
}
export default App;
