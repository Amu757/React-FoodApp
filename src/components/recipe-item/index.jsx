import { useContext } from "react";
import "./style.css";
import { ThemeContext } from "../../App";

const RecipeItem = (props) => {
  const { id, image, title, addToFavorites } = props;
  const { theme } = useContext(ThemeContext);

  return (
    <div key={id} className="recipe-item">
      <div>
        <img src={image} alt="recipe image"></img>
      </div>
      <p style={theme ? { color: "#12343b" } : {}}>{title}</p>
      <button
        style={theme ? { backgroundColor: "#12343b" } : {}}
        type="button"
        onClick={addToFavorites}>
        Add to Favorites
      </button>
    </div>
  );
};

export default RecipeItem;
