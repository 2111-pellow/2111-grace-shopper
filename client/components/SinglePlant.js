import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getSinglePlantThunk } from "../store/singlePlant";
import { MdAddShoppingCart } from "react-icons/md";

class SinglePlant extends React.Component {
  componentDidMount() {
    this.props.getSinglePlant(this.props.match.params.plantId);
    console.log(this.props);
  }
  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    let plant = this.props.plant || {};
    return (
      <div className="center">
        <div>{plant.plant_name}</div>
        <img src={plant.imageUrl} style={{ width: "200px", height: "200px" }} />
        <div>$ {plant.price}</div>
        <div>{plant.description}</div>
        {/* <button type="submit">{<MdAddShoppingCart />}</button> */}

        <div className="center">
          <div className="right__info">
            <p>
              Price: <span>$ {plant.price}</span>
            </p>
            <p>
              Quantity
              <select className="dropdown">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </p>
            <p>
              <button type="button">Add To {<MdAddShoppingCart />}</button>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    plant: state.singlePlantReducer,
    //user: state.singleUserReducer
  };
};

const mapDispatch = (dispatch) => ({
  getSinglePlant: (plantId) => dispatch(getSinglePlantThunk(plantId)),
});

export default connect(mapState, mapDispatch)(SinglePlant);
