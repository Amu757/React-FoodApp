import "./style.css";
import { ThemeContext } from "../../App";
import { useContext } from "react";

const FavoriteItem = (props) => {
  const { id, image, title, RemoveFromFavorites } = props;
  const { theme } = useContext(ThemeContext);

  return (
    <div key={id} className="favorite-item">
      <div>
        <img src={image} alt="favorite image"></img>
      </div>
      <p style={theme ? { color: "#12343b" } : {}}>{title}</p>
      <button
        style={theme ? { backgroundColor: "#12343b" } : {}}
        type="button"
        onClick={RemoveFromFavorites}>
        Remove From Favorites
      </button>
    </div>
  );
};
export default FavoriteItem;
