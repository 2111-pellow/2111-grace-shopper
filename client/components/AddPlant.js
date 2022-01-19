import React from "react";
import { connect } from "react-redux";
import { addPlant } from "../store/allPlants";

class AddPlant extends React.Component {
  constructor(){
    super()
    this.state = {
      plant_name: '',
      description: '',
      category: '',
      easeOfCare: '',
      price: '',
      stock: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.addPlant(this.state);
    this.setState({
      plant_name: '',
      description: '',
      category: '',
      easeOfCare: '',
      price: '',
      stock: ''
    })
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render() {
    const { plant_name, description, category, easeOfCare, price, stock } = this.state;
    return (
      <div>
        <form id='plant-form' onSubmit={this.handleSubmit}>
          <p>ADD NEW PLANT</p>
          <div>
            <label>Plant Name:</label>
            <input type='text' name='plant_name' value={plant_name} onChange={this.handleChange} />
          </div>
          <div>
            <label>Description:</label>
            <input type='text' name='description' value={description} onChange={this.handleChange} />
          </div>
          <div>
            <label>Category:</label>
            <input type='text' name='category' value={category} onChange={this.handleChange} />
          </div>
          <div>
            <label>Ease of Care:</label>
            <input type='text' name='easeOfCare' value={easeOfCare} onChange={this.handleChange} />
          </div>
          <div>
            <label>Price:</label>
            <input type='text' name='price' value={price} onChange={this.handleChange} />
          </div>
          <div>
            <label>Stock:</label>
            <input type='text' name='stock' value={stock} onChange={this.handleChange} />
          </div>
        <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  addPlant: (plant) => dispatch(addPlant(plant))
});

export default connect(null, mapDispatchToProps)(AddPlant)
