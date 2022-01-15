import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPlants } from "../store/allPlants";
import { addToOrderThunk } from '../store/cart'
import { MdAddShoppingCart } from "react-icons/md";

class AllPlants extends React.Component {
  constructor() {
    super();
    this.state = {
      filtered: "All",
    };
    this.handleChange = this.handleChange.bind(this)
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    this.props.fetchPlants();
  }

  handleChange(e) {
    this.setState({
      filtered: e.target.value,
    });
  }
  addToCart(plant){
    this.props.addToCart(plant)
    console.log(this.props)
  }

  render() {
    const { filtered } = this.state;
    const plants = this.props.plants.filter((plant) => {
      if (filtered != "All") return plant.easeOfCare === filtered;
      return plant;
    });
    if (plants.length === 0) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div>
          <div>
            <label htmlFor="filter">Ease of Care:</label>
            <select
              name="filter"
              value={filtered}
              onChange={this.handleChange}
            >
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

                  <button type="button" onClick={()=> this.addToCart(singlePlant.id)}>{<MdAddShoppingCart />}</button>

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
  };
};

const mapDispatch = (dispatch) => ({
    fetchPlants: () => dispatch(fetchPlants()),
    addToCart: (plantId) => dispatch(addToOrderThunk(plantId))
});

export default connect(mapState, mapDispatch)(AllPlants);
