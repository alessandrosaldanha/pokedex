import React from "react";
import { Form, Row, Col, InputGroup } from "react-bootstrap";

interface PokemonFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedType: string;
  onTypeChange: (type: string) => void;
  selectedWeakness: string;
  onWeaknessChange: (weakness: string) => void;
}

const ALL_TYPES = [
  "normal",
  "fire",
  "water",
  "grass",
  "electric",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "steel",
  "fairy",
];

const PokemonFilters: React.FC<PokemonFiltersProps> = ({
  searchTerm,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedWeakness,
  onWeaknessChange,
}) => {
  return (
    <Form className="mb-4 w-100">
      <Row className="g-3">
        {/* Busca por Nome ou ID */}
        <Col md={5} sm={12}>
          <Form.Group controlId="searchPokemon">
            <Form.Label className="fw-bold text-secondary">
              Procurar Pokémon
            </Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Digite o nome ou ID (ex: Bulbasaur ou 1)"
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onSearchChange(e.target.value)
                }
              />
            </InputGroup>
          </Form.Group>
        </Col>

        {/* Filtro por Tipo */}
        <Col md={3} sm={6}>
          <Form.Group controlId="selectType">
            <Form.Label className="fw-bold text-secondary">Tipo</Form.Label>
            <Form.Select
              value={selectedType}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                onTypeChange(e.target.value)
              }
            >
              <option value="">Todos os Tipos</option>
              {ALL_TYPES.map((type) => (
                <option key={type} value={type} className="text-capitalize">
                  {type}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        {/* Filtro por Fraqueza */}
        <Col md={4} sm={6}>
          <Form.Group controlId="selectWeakness">
            <Form.Label className="fw-bold text-secondary">Fraqueza</Form.Label>
            <Form.Select
              value={selectedWeakness}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                onWeaknessChange(e.target.value)
              }
            >
              <option value="">Todas as Fraquezas</option>
              {ALL_TYPES.map((type) => (
                <option key={type} value={type} className="text-capitalize">
                  Fraco contra {type}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default PokemonFilters;
