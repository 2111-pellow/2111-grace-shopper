import React from "react"
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { getSinglePlantThunk } from "../store/singlePlant"
import { MdAddShoppingCart } from "react-icons/md"



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
        <img
          src={plant.imageUrl}
          style={{ width: "200px", height: "200px" }} />
        <div>
         $ {plant.price}
        </div>
        <div>
          {plant.description}
        </div>
        <button type="submit">{<MdAddShoppingCart />}</button>
        </div>
    )
  }
}

const mapState = (state) => {
  return {
    plant: state.singlePlant
    //user: state.singleUser
  }
}

const mapDispatch = (dispatch) => ({
  getSinglePlant: (plantId) => dispatch(getSinglePlantThunk(plantId))
})

export default connect(mapState, mapDispatch)(SinglePlant)
