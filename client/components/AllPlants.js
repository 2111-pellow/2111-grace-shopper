import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addPlant, deletePlant, fetchPlants } from "../store/allPlants";
import { createOrderThunk } from "../store/cart";
import { MdAddShoppingCart } from "react-icons/md";
import AddPlant from "./AddPlant";
//import ReactPaginate from "react-paginate";

class AllPlants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: "All",
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.delete = this.delete.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
  }

  componentDidMount() {
    this.props.fetchPlants();
  }

  handleChange(e) {
    this.setState({
      filtered: e.target.value,
    });
  }

  delete(e) {
    e.preventDefault();
    this.props.deletePlant(e.target.value);
  }

  add(e) {
    e.preventDefault();
    this.props.deletePlant(e.target.value);
  }

  handleClick(plant_id){
    let token = localStorage.getItem("token")
    let userId = this.props.user.id
    console.log
     //append if local storage is here
    if (token){
      console.log("token found, handle click", "plantId", plant_id, "userId", userId)
      this.props.createOrderThunk(plant_id, userId)
     }
   }

  addNewItem(plant_id, name, ImageUrl, price) {
    let token = localStorage.getItem("token");
    let tokened = token;
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
    const { filtered } = this.state;
    const plants = this.props.plants.filter((plant) => {
      if (filtered != "All") return plant.easeOfCare === filtered;
      return plant;
    });
   // const plants = this.props.plants;
    if (plants === []) {
      ("out of stock");
    } else {
      return (
        <div className="AllPlants">
          <div>
            <label htmlFor="filter">Ease of Care:</label>
            <select name="filter" value={filtered} onChange={this.handleChange}>
              <option>All</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          {this.props.isAdmin ? <AddPlant /> : null}
          <div className="products">
          {plants.map((singlePlant) => (
            <div key={singlePlant.id}>
              <div className="product">
                <Link to={`/plants/${singlePlant.id}`}>
                  {
                    <img
                      src={singlePlant.imageUrl}
                      style={{ width: "200px", height: "200px" }}
                    />
                  }
                </Link>
                <div>
                  <b>
                    <Link
                      to={`/plants/${singlePlant.id}`}
                      style={{ color: "black" }}
                    >
                      {singlePlant.plant_name}
                    </Link>
                  </b>
                </div>
                <div>
                  {`$${singlePlant.price}`}

                  <button
                    className="add-to-cart"
                    type="button"
                    onClick={() => {
                      this.handleClick(singlePlant.id),
                      this.addNewItem(
                        singlePlant.id,
                        singlePlant.plant_name,
                        singlePlant.imageUrl,
                        singlePlant.price
                      );
                    }} >
                    Add To {<MdAddShoppingCart />}
                  </button>
                </div>
                {this.props.isAdmin ? (
                  <button
                    className="delete button"
                    type="button"
                    onClick={this.delete}
                    value={singlePlant.id}
                  >
                    {" "}
                    Delete Plant
                  </button>
                ) : null}
              </div>
            </div>
          ))}
          </div>
        </div>
      );
    }
  }
}

const mapState = (state) => {
  return {
    plants: state.plants,
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin,
    order: state.cartReducer,
    user: state.auth,
  };
};

const mapDispatch = (dispatch) => ({
  fetchPlants: () => dispatch(fetchPlants()),
  deletePlant: (id) => dispatch(deletePlant(id)),
  addPlant: () => dispatch(addPlant),
  createOrderThunk: (plant_id, userId) => dispatch(createOrderThunk(plant_id, userId))
});

export default connect(mapState, mapDispatch)(AllPlants);

// add to cart

// check to see if there is a token
// if there is a toekn, dispatch new thunk function - setOrder
// grab the token again for thunk
// call an axios request that is a get - order.get for the backend with findorcreate
// return server get route - make sure to console.log since it is an array and see whcih one we want to pull from the array
// set that get result in the redux store
// NOW THERE IS AN ORDER

// if (token){
//   createOrder: (id) => dispatch(createOrder(id)),
// }

// step 2
// now we need to make a post request
// lol
// send in the product, set the headers using the orderid and userid
// find the order - server post request- grab the order - create into our through table!!!!
// create this new obj that represents the new plant obj
// find the item useItem - send it back to whatever needs it
// will need to have a put update function as well

//let token = JSON.parse(localStorage.getItem("token"))
// if (token){
// backend Login

// }else {
// guest experience
//}
