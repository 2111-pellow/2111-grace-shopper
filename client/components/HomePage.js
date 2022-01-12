import React from "react";
import { Link } from "react-router-dom";
import { GiMonsteraLeaf } from "react-icons/gi";
/**
 * COMPONENT
 */
const HomePage = () => {
  return (
    <div>
      <h1>
        {" "}
        {<GiMonsteraLeaf style={{ color: "green" }} />} The World of Decorative
        Plants {<GiMonsteraLeaf style={{ color: "green" }} />}
      </h1>
      <p>
        Discover more thant 100 Indoor plants for the Small-Space Gardener, and
        How to Care for Them Your home will be a plant paradise before you know
        it.
      </p>
      <p> click on "Our Leafy Friends" to view all our leafy friends </p>
      <div>
        <img
          src="https://t3.ftcdn.net/jpg/03/05/38/82/360_F_305388219_0V2CURNjS4CHD57xGXyukI2kBzr2v9ml.jpg"
          style={{ width: "450px", height: "450px" }}
        />
        <img
          src="https://envato-shoebox-0.imgix.net/bc39/e1a0-afc6-4d67-9ccc-b15452aa4f39/IMG_0134.jpg?auto=compress%2Cformat&fit=max&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&markalign=center%2Cmiddle&markalpha=18&w=800&s=36d840a57e4d244fc074159588402239"
          style={{ width: "450px", height: "450px" }}
        />

        <img
          src="https://envato-shoebox-0.imgix.net/7716/c8de-3f0c-4398-9722-56623db3391e/IMG_5372.jpg?auto=compress%2Cformat&fit=max&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&markalign=center%2Cmiddle&markalpha=18&w=500&s=42ca86337155441220f57e703c42d54d"
          style={{ width: "450px", height: "450px" }}
        />
        <img
          src="https://envato-shoebox-0.imgix.net/e4bd/3580-6f24-4ad3-b667-b75b76908325/IMG_2028.jpg?auto=compress%2Cformat&fit=max&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&markalign=center%2Cmiddle&markalpha=18&w=800&s=48d0849c76e5e626fa964ebba9911272"
          style={{ width: "450px", height: "450px" }}
        />
      </div>

      <form onSubmit={(event) => event.preventDefault()}>
        <button style={{ width: "200px" }}>
          <Link to="/plants">
            Our Leafy Friends {<GiMonsteraLeaf style={{ color: "green" }} />}
          </Link>
        </button>
      </form>
    </div>
  );
};

export default HomePage;
