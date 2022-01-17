import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addPlant, deletePlant, fetchPlants } from "../store/allPlants";
import { MdAddShoppingCart } from "react-icons/md";
import AddPlant from "./AddPlant";
import ReactPaginate from "react-paginate";


class AllPlants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //filtered: "All",
      offset: 0,
      plants: [],
      perPage: 10,
      currentPage: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.delete = this.delete.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.addNewItem = this.addNewItem.bind(this)
  }

  componentDidMount() {
    this.props.fetchPlants();
    this.receivedData();
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


  add(e){
    e.preventDefault();
    this.props.deletePlant(e.target.value)
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState( {currentPage: selectedPage, offset: offset} ,
      () => {
      this.receivedData()
      });
  };

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
  }

  receivedData() {
              const plants = this.props.plants;
              const postData = plants.slice(this.state.offset, this.state.offset + this.state.perPage).map(singlePlant => { return (
                <div key={singlePlant.id}>
                  <div className="product">
                  <Link to={`/plants/${singlePlant.id}`}>
                  {<img src={singlePlant.imageUrl} style={{ width: "200px", height: "200px"}}/>}
                  </Link>
                  <div>
                  <b>
                    <Link to={`/plants/${singlePlant.id}`} style={{ color: "black" }}>{singlePlant.plant_name}</Link>
                  </b>
                  </div>
                  <button className="add to cart"
                    type="button"
                    onClick={() => {this.addNewItem(singlePlant.id, singlePlant.plant_name, singlePlant.imageUrl,singlePlant.price)}}
                  >
                    Add To {<MdAddShoppingCart />}
                  </button>
                  <div>{`$${singlePlant.price}`}</div>
                {this.props.isAdmin ? <button type="button" onClick={this.delete} value ={singlePlant.id}>Delete Plant</button> : null}
                </div>
                </div>
              )})
              this.setState({
                pageCount: Math.ceil(plants.length/this.state.perPage), postData})
            }

  render() {
    // const { filtered } = this.state;
    // const plants = this.props.plants.filter((plant) => {
    //   if (filtered != "All")
    //   return plant.easeOfCare === filtered;
    //   return plant;
    // });
    const plants = this.props.plants;
    if (plants === []) {"out of stock"}
      else {
      return (
        <div>
            {/* <div>
            <label htmlFor="filter">Ease of Care:</label>
            <select name="filter" value={filtered} onChange={this.handleChange}>
              <option>All</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
            </div> */}

            {this.props.isAdmin ? <AddPlant/> : null}

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

            {this.state.postData}
            <ReactPaginate
              previousLabel = {"Previous"}
              nextLabel = {"Next"}
              pageCount={this.state.pageCount}
              marginPagesDisplayed ={1}
              pageRangeDisplayed = {9}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}/>
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
