import React from "react"
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { getSinglePlantThunk } from "../store/singlePlant"



class SinglePlant extends React.Component {
  componentDidMount(){
    this.props.getSinglePlant(this.props.match.params.plantId)
    console.log(this.props)
  }
  handleSubmit(e){
    e.preventDefault();

  }

  render(){
    let plant = this.props.plant || {}
    return (
      <div>
        <div>
          {plant.plant_name}
        </div>
        <div>
          {plant.imageUrl}
        </div>
        <div>
         $ {plant.price}
        </div>
        <div>
          {plant.description}
        </div>
        <button type='submit'>Add to Cart</button>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    plant: state.singlePlantReducer
    //user: state.singleUserReducer
  }
}

const mapDispatch = (dispatch) => ({
  getSinglePlant: (plantId) => dispatch(getSinglePlantThunk(plantId))
})

export default connect(mapState, mapDispatch)(SinglePlant)
