import React from "react";
import { connect } from "react-redux";
import { getSinglePlant, getSinglePlantThunk, updatePlant } from "../store/singlePlant";


class EditPlant extends React.Component {
  constructor(){
    super();
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

  componentDidUpdate(prevProps){
    if (prevProps.plant.id !== this.props.plant.id){
      this.setState({
        plant_name: this.props.plant.plant_name || '',
        description: this.props.plant.description || '',
        category: this.props.plant.category || '',
        easeOfCare: this.props.plant.easeOfCare || '',
        price: this.props.plant.price || '',
        stock: this.props.plant.stock || '',

      })
    }
  }

  componentWillUnmount() {
    this.props.clearPlant();
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.updatePlant(this.props.plant.id, this.state);
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const {plant_name, description, category, easeOfCare, price, stock} = this.state;
    return (
      <div>
        <h3>Edit Plant:</h3>
        <form id='update-plant-form' onSubmit={this.handleSubmit}>
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

const mapStateToProps = (state) => {
  return {
    plant: state.singlePlantReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePlant: (plantId, editedPlant) => dispatch(updatePlant(plantId, editedPlant)),
    getPlant: (plantId) => dispatch(getSinglePlantThunk(plantId)),
    clearPlant: () => dispatch(getSinglePlant({}))
}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPlant)
