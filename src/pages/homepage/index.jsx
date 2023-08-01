import { useContext, useEffect, useReducer, useState } from "react";
import Search from "../../components/search/index";
import "./style.css";
import RecipeItem from "../../components/recipe-item";
import FavoriteItem from "../../components/favorite-item";
import { ThemeContext } from "../../App";

const reducer = (state, action) => {
  switch (action.type) {
    case "filterFavorites":
      console.log(action);

      return { ...state, filteredValue: action.value };
    default:
      return state;
  }
};
const initialState = {
  filteredValue: "",
};

const Homepage = () => {
  // loading state
  const [loadingstate, setloadingstate] = useState(false);

  // save recipes from api
  const [recipe, setrecipes] = useState([]);

  //favorites data state
  const [favorites, setfavorites] = useState([]);

  // use reducer functionality
  const [filteredState, dispatch] = useReducer(reducer, initialState);
  // search food items

  const { theme } = useContext(ThemeContext);

  const searchdata = (getData) => {
    // make input field blank
    document.getElementById("search").value = "";
    //calling api geting related food items
    async function getReceipes() {
      // set laoding state as true until geting reasponse
      setloadingstate(true);
      // passing apikey and searched item in query
      const apiKey = "9c08c012fba247acae7747924f98200c";
      const apiResponse = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${getData}`
      );

      // Check if the response is successful

      const result = await apiResponse.json();
      // getting actual data from result
      const { results } = result;
      if (results.length > 0) {
        // set loading state false
        setloadingstate(false);
        // save recipes from results
        setrecipes(results);
      }
    }
    // call to pass query
    getReceipes();
  };

  const addToFavorites = (recipeItem) => {
    let cpyFavorites = [...favorites]; // create new copy

    const index = cpyFavorites.findIndex((item) => item.id === recipeItem.id);
    if (index === -1) {
      cpyFavorites.push(recipeItem);
      setfavorites(cpyFavorites);

      // save favorites in local Storage
      localStorage.setItem("favorites", JSON.stringify(cpyFavorites));
    } else {
      alert("item is already present in favorites");
    }
  };

  const RemoveFromFavorites = (Itemid) => {
    let cpyFavorites = [...favorites]; // create new copy
    cpyFavorites = cpyFavorites.filter((item) => item.id !== Itemid);
    setfavorites(cpyFavorites);
    localStorage.setItem("favorites", JSON.stringify(cpyFavorites));
  };

  // runs on page load
  useEffect(() => {
    //extracting data form local storage
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    setfavorites(storedFavorites);
  }, []);

  console.log(filteredState, "filteredState");
  // filter the favorites
  const filteredFavoriteItems = favorites.filter((item) =>
    item.title.toLowerCase().includes(filteredState.filteredValue)
  );
  return (
    <div className="homepage">
      <Search searchdata={searchdata} />
      {/* show favorites */}
      <div className="favorites-wrapper">
        <h1
          style={theme ? { color: "#12343b" } : {}}
          className="favorites-title">
          Favorites
        </h1>

        <div className="search-favorites">
          <input
            onChange={(event) =>
              dispatch({ type: "filterFavorites", value: event.target.value })
            }
            value={filteredState.filteredValue}
            type="text"
            name="favinput"
            placeholder="Search Favorites"
          />
        </div>

        <div className="favorites">
          {filteredFavoriteItems.length > 0
            ? filteredFavoriteItems.map((item) => (
                <FavoriteItem
                  RemoveFromFavorites={() => RemoveFromFavorites(item.id)}
                  id={item.id}
                  image={item.image}
                  title={item.title}
                />
              ))
            : console.log("showing null")}
        </div>
      </div>

      {/* show favorites */}
      {/* show loading state */}
      {loadingstate && (
        <div className="loading">Loading Recipes!! Plaese wait</div>
      )}
      {/* show loading state */}
      {/* map through all recipes */}
      <div className="items">
        {recipe.length > 0
          ? recipe.map((item) => (
              <RecipeItem
                addToFavorites={() => addToFavorites(item)}
                id={item.id}
                image={item.image}
                title={item.title}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default Homepage;
