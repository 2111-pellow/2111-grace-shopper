import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getSinglePlantThunk } from "../store/singlePlant";
import { MdAddShoppingCart } from "react-icons/md";
import { addToOrderThunk } from "../store/cart";

class SinglePlant extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getSinglePlant(this.props.match.params.plantId);
  }
  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    let plant = this.props.plant || {};
    if (plant === null) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div className="center">
          <div>{plant.plant_name}</div>
          <img
            src={plant.imageUrl}
            style={{ width: "200px", height: "200px" }}
          />
          <div>$ {plant.price}</div>
          <div>{plant.description}</div>

          <div className="center">
            <div className="right__info">
              <p>
                Price: <span>$ {plant.price}</span>
              </p>
              <p>
                Amount Currently In Stock:
                <input
                  type="number"
                  name="points"
                  className="quantity"
                  step="1"
                  min="1"
                  max={plant.stock}
                  placeholder="1"
                  onChange={(event) =>
                    this.changePlantQuantity(plant.id, event)
                  }
                  style={{ width: "130px" }}
                />
              </p>
              <p>
                <button
                  type="button"
                  onClick={() => {
                    const cart = window.localStorage.getItem(plant.id);
                    let plants = [];
                    let plantDetails = {
                      plant_id: plant.id,
                      plant_name: plant.name,
                      price: plant.price,
                    };
                    if (cart) {
                      plants = JSON.parse(cart);
                    }
                    plants.push(plantDetails);
                    window.localStorage.setItem(
                      plant.id,
                      JSON.stringify(plants)
                    );
                  }}
                >
                  Add To {<MdAddShoppingCart />}
                </button>
              </p>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapState = (state) => {
  return {
    plant: state.singlePlantReducer,
    cart: state.cartReducer,
  };
};

const mapDispatch = (dispatch) => ({
  getSinglePlant: (plantId) => dispatch(getSinglePlantThunk(plantId)),
  addToOrder: (plantId) => dispatch(addToOrderThunk(plantId)),
});

export default connect(mapState, mapDispatch)(SinglePlant);
