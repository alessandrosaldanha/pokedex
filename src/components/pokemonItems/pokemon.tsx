import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

type PokemonItemProps = {
  id: number;
  src: string;
  name: string;
  types: string[];
};

const TYPE_COLORS: Record<string, string> = {
  grass: "#78C850",
  poison: "#A040A0",
  fire: "#F08030",
  flying: "#A890F0",
  water: "#6890F0",
  bug: "#A8B820",
  normal: "#A8A878",
  electric: "#F8D030",
  ground: "#E0C068",
  fairy: "#EE99AC",
  fighting: "#C03028",
  psychic: "#F85888",
  rock: "#B8A038",
  ghost: "#705898",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
};

const PokemonItem = ({ id, src, name, types }: PokemonItemProps) => {
  const navigate = useNavigate();
  const formattedId = `#${String(id).padStart(4, "0")}`;

  return (
    <Card
      style={{
        width: "16rem",
        cursor: "pointer",
        border: "none",
        backgroundColor: "transparent",
      }}
      onClick={() => navigate(`/details/${name}`)}
    >
      <div
        style={{
          backgroundColor: "#F2F2F2",
          borderRadius: "10px",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <Card.Img variant="top" src={src} alt={name} />
      </div>

      <Card.Body style={{ padding: "10px 0" }}>
        <span
          style={{ color: "#919191", fontWeight: "bold", fontSize: "0.85rem" }}
        >
          {formattedId}
        </span>

        <Card.Title
          className="text-capitalize"
          style={{
            fontWeight: "bold",
            fontSize: "1.4rem",
            margin: "4px 0 8px 0",
          }}
        >
          {name}
        </Card.Title>

        <div style={{ display: "flex", gap: "6px" }}>
          {types.map((type) => (
            <span
              key={type}
              className="text-capitalize"
              style={{
                backgroundColor: TYPE_COLORS[type.toLowerCase()] || "#777",
                color: "#FFFFFF",
                fontSize: "0.75rem",
                fontWeight: "600",
                padding: "3px 12px",
                borderRadius: "4px",
                display: "inline-block",
                textAlign: "center",
                minWidth: "60px",
              }}
            >
              {type}
            </span>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default PokemonItem;
