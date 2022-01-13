import React from "react"
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import getSingleUserThunk from '../store/singleUser'
// import deletePlantThunk from '../store'
//need to write a thunk

//need to have user connected here from redux store and through the user we get the plants associated
//use magic methods addchild to add plant onto user model.
let plants2 = [
  {
    id: 1,
    plant_name: "Aluminum Plant",
    description: "An easy going house plant that is generally simple to please.",
    imageUrl: "https://www.houseplantsexpert.com/image-files/aluminum_plant.jpg",
    category: 'House Plant',
    easeOfCare: 'Easy',
    price: 98.00,
    quantity: 1,
  },
  {
    id: 2,
    plant_name: "Areca Palm",
    description: "A cane type palm growing up to 8ft tall with mulitple stems.",
    imageUrl: "https://www.houseplantsexpert.com/assets/images/areca_palm_1.jpg",
    category: 'House Plant',
    easeOfCare: 'Easy',
    price: 41.94,
    quantity: 1,
  }]
class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.changePlantQuantity = this.changePlantQuantity.bind(this);
    this.deletePlant = this.deletePlant.bind(this);
  }
  deletePlant(){}
  changePlantQuantity(plantId, event){
    const addAPlant = [...plants2];
      addAPlant[plantId].quantity = event.target.value;
  }

  render(){
    return (
      <div className="container">
       <h1>Guest Cart</h1>
       {/* we can toggle between name and guest */}
       <h3>{plants2.map((plant)=>{
         return  <h2 className="row" key={plant.id}>
         <div className="col left">
           <div className="thumbnail">
               <img src={plant.imageUrl} alt={plant.plant_name} style={{ width: "200px", height: "200px" }}/>
           </div>
           <div className="detail">
             <div className="name">
             <Link to={`/plants/${plant.id}`}>
                      {plant.plant_name} </Link>
             </div>
             <div className="description">{plant.description}</div>
             <div className="price">${plant.price}</div>
           </div>
         </div>
         <div className="col right">
           <div className="quantity">
             <input
               type="number"
               name="points"
               className="quantity"
               step="1"
               min="0"
               max="20"
               placeholder={plant.quantity}
               onChange={(event) => this.changePlantQuantity(plant.id, event)}
             />
           </div>
           <button className="remove" onClick={() => this.deletePlant(plant.id)} > Remove From Cart </button>
           </div>
      </h2>})}
      </h3>
      <div>
      <button className="proceed" > Proceed to Checkout </button>
      </div>
      </div>
  )
 }
}



const mapState = (state) => {
  return {
    user: state.singleUserReducer
//plants:
  }
}

const mapDispatch = (dispatch) => ({
  getSingleUser: (userId) => dispatch(getSingleUserThunk(userId)),
  // deletePlant: (id) => dispatch(deletePlantThunk(id))
})

export default connect(mapState, mapDispatch)(Cart)
