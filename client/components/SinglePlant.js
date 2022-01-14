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
              <input
                type="number"
                name="points"
                className="quantity"
                step="1"
                min="1"
                max={plant.quantity}
                placeholder="1"
                onChange={(event) => this.changePlantQuantity(plant.id, event)}
                style={{ width: "130px" }}
              />
            </p>
            <p>
              <Link to="/cart">
                <button type="button">Add To {<MdAddShoppingCart />}</button>
              </Link>
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
