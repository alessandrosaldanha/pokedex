import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";

type PokemonItemProps = {
  src: string;
  name: string;
};
const PokemonItem = ({ src, name }: PokemonItemProps) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={src} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Button variant="success">Grass</Button>
        <Button variant="danger">Posion</Button>
      </Card.Body>
    </Card>
  );
};

export default PokemonItem;
