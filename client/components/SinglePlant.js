import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getSinglePlantThunk } from "../store/singlePlant";
import { MdAddShoppingCart } from "react-icons/md";
import { addToOrderThunk } from '../store/cart'

class SinglePlant extends React.Component {
  constructor(props){
    super(props)
    this.addToOrder = this.addToOrder.bind(this)
    this.addPlantsToCart = this.addPlantsToCart.bind(this)
    this.state = {
      plantId: this.props.match.params.plantId
    }
  }
  componentDidMount() {
    this.props.getSinglePlant(this.props.match.params.plantId);

  }
  handleSubmit(e) {
    e.preventDefault();
  }

  addToOrder(plant){
    this.props.addToOrder(plant)
  }

addPlantsToCart() {
  const cart = parseInt(localStorage.getItem(this.state.plantId));
  const newCart = cart + 1;
  cart ? localStorage.setItem(this.state.plantId, newCart) : localStorage.setItem(this.state.plantId, 1);

//   const oldproduct = localStorage.getItem('products') ? localStorage.getItem('products') : "[]";
//   const arrayproduct =  JSON.parse(oldproduct);
//   let productsString = .products;
//   let products = location.state

//   arrayproduct.push(products);
//   if(productsString){
//       products = JSON.parse(productsString)
//   }

//   localStorage.setItem('products', JSON.stringify(arrayproduct));
// }
  }



  render() {
    let plant = this.props.plant || {};
    if (plant === null) {
      return <h1>Loading...</h1>;
    } else {
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
              Amount Currently In Stock:
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
                <button type="button" onClick={this.addPlantsToCart}>Add To {<MdAddShoppingCart />}</button>
              {/* </Link> */}
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
    cart: state.cartReducer
  };
};

const mapDispatch = (dispatch) => ({
  getSinglePlant: (plantId) => dispatch(getSinglePlantThunk(plantId)),
  addToOrder: (plantId) => dispatch(addToOrderThunk(plantId)),
});

export default connect(mapState, mapDispatch)(SinglePlant);
