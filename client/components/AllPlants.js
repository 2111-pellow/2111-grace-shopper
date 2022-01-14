import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPlants } from "../store/allPlants";
import { MdAddShoppingCart } from "react-icons/md";

class AllPlants extends React.Component {
  constructor() {
    super();
    this.state = {
      filtered: "All",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.props.fetchPlants();
  }

  handleChange(e) {
    this.setState({
      filtered: e.target.value,
    });
  }

  render() {
    const { filtered } = this.state;
    const plants = this.props.plants.filter((plant) => {
      if (filtered === "All") return plant;
      if (filtered === "Easy") return plant.easeOfCare === "Easy";
      if (filtered === "Medium") return plant.easeOfCare === 'Medium';
      if (filtered === "Hard") return plant.easeOfCare === "Hard";
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

                  <button type="submit">{<MdAddShoppingCart />}</button>

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

const mapDispatch = (dispatch) => {
  return {
    fetchPlants: () => dispatch(fetchPlants()),
  };
};

export default connect(mapState, mapDispatch)(AllPlants);
