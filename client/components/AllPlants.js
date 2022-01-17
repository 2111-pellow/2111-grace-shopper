import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deletePlant, fetchPlants } from "../store/allPlants";
import { addToOrderThunk } from "../store/cart";
import { MdAddShoppingCart } from "react-icons/md";
import { me } from '../store/auth'
import ReactPaginate from "react-paginate";

class AllPlants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: "All",
      offset: 0,
      plants: [],
      perPage: 10,
      currentPage: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.delete = this.delete.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
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

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState( {currentPage: selectedPage, offset: offset} ,
      () => {
      this.receivedData()
      });
  };

  receivedData() {
              const postData =
                this.props.plants.slice(this.state.offset, this.state.offset + this.state.perPage).map(singlePlant => { return (
                <li key={singlePlant.id}>
                  <div className="product">
                  <Link to={`/plants/${singlePlant.id}`}>
                  {<img src={singlePlant.imageUrl} style={{ width: "200px", height: "200px"}}/>}
                  </Link>
                  <div>
                  <b>
                    <Link to={`/plants/${singlePlant.id}`} style={{ color: "black" }}>{singlePlant.plant_name}</Link>
                  </b>
                  </div>
                  <div className="product-price">
                  <div>{`$${singlePlant.price}`}</div>
                  <button className="add to cart" style={{ color: "black" }} type="button" onClick={() => {
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
                      );}}>Add To Cart{<MdAddShoppingCart />}
                  </button>
                  </div>
                {this.props.isAdmin ? <button type="button" onClick={this.delete} value ={singlePlant.id}>Delete Plant</button> : null}
                </div>
                </li>
              )})
              this.setState({
                pageCount: 9, postData})
            }

  render() {
    const { filtered } = this.state;
    const plants = this.props.plants.filter((plant) => {
      if (filtered != "All")
      return plant.easeOfCare === filtered;
      return plant;
    });
    // if (plants.length === 0) {
    //   return <h1>Loading...</h1>;
    // } else {
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
