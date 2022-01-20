import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getSinglePlantThunk } from "../store/singlePlant";
import { MdAddShoppingCart } from "react-icons/md";
import { createOrderThunk } from "../store/cart";
import EditPlant from "./EditPlant";

class SinglePlant extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: { }
    };
    this.addNewItem = this.addNewItem.bind(this);

  }
  componentDidMount() {
    this.props.getSinglePlant(this.props.match.params.plantId);
  }
  handleSubmit(e) {
    e.preventDefault();
  }



  handleClick(plant_id){
    let token = localStorage.getItem("token")
    let userId = this.props.user.id
    if (token){
       if (!this.state.quantity[plant_id]){
        this.state.quantity[plant_id] = 1
      this.props.createOrderThunk(plant_id, this.state.quantity[plant_id], userId)
     } else {
      this.state.quantity[plant_id]++

     this.props.updateOrderThunk(plant_id, this.state.quantity[plant_id], userId)
     }
   }
  }

  addNewItem(plant_id, name, ImageUrl, price) {
    var items = JSON.parse(localStorage.getItem("cart")) || [];
    var item = items.find((item) => item.name === name);
    if (item) {
      item.count = Number(item.count) + 1;
    } else {
      items.push({
        plant_id,
        name,
        ImageUrl,
        count: 1,
        price,
      });
    }
    localStorage.setItem("cart", JSON.stringify(items));
  }

  render() {
    let plant = this.props.plant || {};
    if (plant === null) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div className="center">
          {this.props.isAdmin ? <EditPlant plant={this.props.plant} /> : null}

          <b>{plant.plant_name}</b>
          <img
            src={plant.imageUrl}
            style={{ width: "200px", height: "200px" }}
          />
          <div> $ {plant.price}</div>
          <div>{plant.description}</div>

          <div className="center">
            <div className="right__info">
              <p>
                Price: <span>$ {plant.price}</span>
              </p>
              <p>
                Amount Currently In Stock:
                {plant.stock}
              </p>
              <p>
                <button
                  type="button"
                  onClick={() => {
                    this.handleClick(plant.id)
                    this.addNewItem(
                      plant.id,
                      plant.plant_name,
                      plant.imageUrl,
                      plant.price
                    );
                  }}
                >
                  {" "}
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
    isAdmin: state.auth.isAdmin,
    order: state.cartReducer,
  };
};

const mapDispatch = (dispatch) => ({
  getSinglePlant: (plantId) => dispatch(getSinglePlantThunk(plantId)),
  addToOrder: (plantId) => dispatch(addToOrderThunk(plantId)),
  createOrderThunk: (plant_id, quantity, userId) => dispatch(createOrderThunk(plant_id, quantity, userId))
});

export default connect(mapState, mapDispatch)(SinglePlant);
