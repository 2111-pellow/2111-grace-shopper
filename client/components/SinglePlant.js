import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getSinglePlantThunk } from "../store/singlePlant";
import { MdAddShoppingCart } from "react-icons/md";
import { addToCartThunk } from '../store/cart'

class SinglePlant extends React.Component {
  constructor(props){
    super(props)
    this.addToCart = this.addToCart.bind(this)
  }
  componentDidMount() {
    this.props.getSinglePlant(this.props.match.params.plantId);
  }
  handleSubmit(e) {
    e.preventDefault();
  }

  addToCart(plant){
    this.props.addToCart(plant)
    console.log(this.props)
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
                max={plant.stock}
                placeholder="1"
                onChange={(event) => this.changePlantQuantity(plant.id, event)}
                style={{ width: "130px" }}
              />
            </p>
            <p>
              {/* <Link to="/cart"> */}
                <button type="button" onClick={()=> this.addToCart(plant.id)}>Add To {<MdAddShoppingCart />}</button>
              {/* </Link> */}
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
    cart: state.cartReducer
  };
};

const mapDispatch = (dispatch) => ({
  getSinglePlant: (plantId) => dispatch(getSinglePlantThunk(plantId)),
  addToCart: (plantId) => dispatch(addToCartThunk(plantId)),
});

export default connect(mapState, mapDispatch)(SinglePlant);
