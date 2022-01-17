import React from "react";
import { connect } from "react-redux";
import { fetchCampus, updateCampus, setCampus } from '../redux/singleCampus'


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
    if (prevProps.campus.id !== this.props.campus.id){
      this.setState({
        name: this.props.campus.name || '',
        address: this.props.campus.address || '',
        imageUrl: this.props.campus.imageUrl || '',
        description: this.props.campus.description || ''
      })
    }
  }

  componentWillUnmount() {
    this.props.clearCampus();
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.updateCampus(this.props.campus.id, this.state);
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const {name, address, description, imageUrl} = this.state;
    return (
      <div>
        <h3>Edit Campus:</h3>
        <form id='update-campus-form' onSubmit={this.handleSubmit}>
          <div>
            <label>Campus Name:</label>
            <input type='text' name='name' value={name} onChange={this.handleChange} />
          </div>
          <div>
            <label>Campus Address:</label>
            <input type='text' name='address' value={address} onChange={this.handleChange} />
          </div>
          <div>
            <label>Campus Image URL:</label>
            <input type='text' name='imageUrl' value={imageUrl} onChange={this.handleChange} />
          </div>
          <div>
            <label>Campus Description:</label>
            <input type='text' name='description' value={description} onChange={this.handleChange} />
          </div>
        <button type='submit'>Submit</button>
       </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    plant: state.plant
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePlant: (plantId, editedPlant) => dispatch(updatePlant(plantId, editedPlant)),
    clearCampus: () => dispatch(setCampus({}))
}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPlant)
