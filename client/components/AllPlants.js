import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addPlant, deletePlant, fetchPlants } from "../store/allPlants";
import { MdAddShoppingCart } from "react-icons/md";
import AddPlant from "./AddPlant";

class AllPlants extends React.Component {
  constructor() {
    super();
    this.state = {
      filtered: "All",
    };
    this.handleChange = this.handleChange.bind(this);
    this.delete = this.delete.bind(this)
    this.addNewItem = this.addNewItem.bind(this)
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

<<<<<<< HEAD
  add(e){
    e.preventDefault();
    this.props.deletePlant(e.target.value)
=======
  addNewItem(plant_id, name, ImageUrl, price) {
    var items = JSON.parse(localStorage.getItem('cart')) || [];
    var item = items.find(item => item.name === name);
    if (item) {
      item.count = Number(item.count) + 1;
    } else {
      items.push({
        plant_id,
        name,
        ImageUrl,
        count: 1,
        price
      })
    }
    localStorage.setItem('cart', JSON.stringify(items));
>>>>>>> 32237bd23ff8d8609435a716224d8c713a034e1a
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
            <AddPlant/>
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
                    onClick={() => {this.addNewItem(singlePlant.id, singlePlant.plant_name, singlePlant.imageUrl,singlePlant.price)}}
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
  deletePlant: (id) => dispatch(deletePlant(id)),
  addPlant: () => dispatch(addPlant)
});

export default connect(mapState, mapDispatch)(AllPlants);
