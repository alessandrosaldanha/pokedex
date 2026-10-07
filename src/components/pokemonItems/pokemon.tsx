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
      className="h-100 border-0 bg-transparent"
      style={{
        width: "100%", // <-- Ajustado para fluidizar no grid da Home
        cursor: "pointer",
      }}
      onClick={() => navigate(`/details/${name}`)}
    >
      <div
        style={{
          backgroundColor: "#F2F2F2",
          borderRadius: "10px",
          padding: "12px", // Reduzido levemente para telas menores
          textAlign: "center",
        }}
      >
        <Card.Img
          variant="top"
          src={src}
          alt={name}
          style={{
            maxHeight: "130px", // Limita a imagem para não estourar o card
            objectFit: "contain",
          }}
        />
      </div>

      <Card.Body style={{ padding: "8px 0" }}>
        <span
          style={{ color: "#919191", fontWeight: "bold", fontSize: "0.8rem" }}
        >
          {formattedId}
        </span>

        <Card.Title
          className="text-capitalize text-truncate" // 'text-truncate' evita que nomes longos quebrem o card
          style={{
            fontWeight: "bold",
            fontSize: "1.1rem", // Ajustado para proporção de 2 cards lado a lado
            margin: "2px 0 6px 0",
          }}
        >
          {name}
        </Card.Title>

        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
          {types.map((type) => (
            <span
              key={type}
              className="text-capitalize"
              style={{
                backgroundColor: TYPE_COLORS[type.toLowerCase()] || "#777",
                color: "#FFFFFF",
                fontSize: "0.7rem",
                fontWeight: "600",
                padding: "2px 8px",
                borderRadius: "4px",
                display: "inline-block",
                textAlign: "center",
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
