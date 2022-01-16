import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deletePlant, fetchPlants } from "../store/allPlants";
import { addToOrderThunk } from "../store/cart";
import { MdAddShoppingCart } from "react-icons/md";
import { me } from '../store/auth'

class AllPlants extends React.Component {
  constructor() {
    super();
    this.state = {
      filtered: "All",
    };
    this.handleChange = this.handleChange.bind(this);
    this.delete = this.delete.bind(this)
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
    this.props.deletePlant(e.target.value)
  }


  render() {
    console.log(this.props)
    const { filtered } = this.state;
    const plants = this.props.plants.filter((plant) => {
      if (filtered != "All")
      return plant.easeOfCare === filtered;
      return plant;
    });
    if (plants.length === 0) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div>
          <div>
            <label htmlFor="filter">Ease of Care:</label>
            <select name="filter" value={filtered} onChange={this.handleChange}>
              <option>All</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
            {plants.map((singlePlant) => {
              return (
                <div key={singlePlant.id}>
                  <b>
                    <Link to={`/plants/${singlePlant.id}`}>
                      {singlePlant.plant_name}
                    </Link>
                  </b>

                  <button
                    type="button"
                    onClick={() => {
                      const cart = window.localStorage.getItem('cart');
                      let plants = [];
                      let plantDetails = {
                        plant_id: singlePlant.id,
                        plant_name: singlePlant.plant_name,
                        ImageUrl: singlePlant.imageUrl,
                        price: singlePlant.price,
                      };

                      if (cart) {
                        plants = JSON.parse(cart);
                      }
                      plants.push(plantDetails);
                      window.localStorage.setItem(
                        'cart',
                        JSON.stringify(plants)
                      );
                    }}
                  >
                    Add To {<MdAddShoppingCart />}
                  </button>
                  <div>
                    <Link to={`/plants/${singlePlant.id}`}>
                      {
                        <img
                          src={singlePlant.imageUrl}
                          style={{ width: "200px", height: "200px" }}
                        />
                      }
                    </Link>
                  </div>

                  <div>{`$${singlePlant.price}`}</div>
                  {this.props.isAdmin ? <button type="button" onClick={this.delete} value={singlePlant.id}>Delete Plant</button> : null}

                </div>
              );
            })}
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
    isAdmin: state.auth.isAdmin
  };
};

const mapDispatch = (dispatch) => ({
  fetchPlants: () => dispatch(fetchPlants()),
  deletePlant: (id) => dispatch(deletePlant(id))
});

export default connect(mapState, mapDispatch)(AllPlants);
