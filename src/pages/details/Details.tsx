import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Spinner, Badge } from "react-bootstrap";
import api from "../../services/api";

type Stat = {
  base_stat: number;
  stat: { name: string };
};

type PokemonDetailData = {
  id: number;
  name: string;
  src: string;
  height: number;
  weight: number;
  abilities: string[];
  types: string[];
  weaknesses: string[];
  stats: Stat[];
  flavorText: string;
  category: string;
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

const STAT_NAMES: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Special Attack",
  "special-defense": "Special Defense",
  speed: "Speed",
};

const Details = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<PokemonDetailData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      if (!name) return;
      setLoading(true);

      try {
        // 1. Dados básicos do Pokémon
        const res = await api.get(`/pokemon/${name}`);
        const data = res.data;

        // 2. Descrição (flavor text) e Categoria (genera)
        const speciesRes = await api.get(data.species.url);
        const englishFlavor = speciesRes.data.flavor_text_entries.find(
          (entry: any) => entry.language.name === "en",
        );
        const englishGenus = speciesRes.data.genera.find(
          (g: any) => g.language.name === "en",
        );

        // 3. Obter Fraquezas cruzando os tipos do Pokémon
        const typesList = data.types.map((t: any) => t.type.name);
        const typePromises = data.types.map((t: any) => api.get(t.type.url));
        const typeResponses = await Promise.all(typePromises);

        const weaknessSet = new Set<string>();
        typeResponses.forEach((typeRes) => {
          typeRes.data.damage_relations.double_damage_from.forEach((d: any) => {
            weaknessSet.add(d.name);
          });
        });

        setPokemon({
          id: data.id,
          name: data.name,
          src: data.sprites.other["official-artwork"].front_default,
          height: data.height / 10, // decímetros para metros
          weight: data.weight / 10, // hectogramas para kg
          abilities: data.abilities.map((a: any) => a.ability.name),
          types: typesList,
          weaknesses: Array.from(weaknessSet),
          stats: data.stats,
          flavorText: englishFlavor
            ? englishFlavor.flavor_text.replace(/[\n\f]/g, " ")
            : "No description available.",
          category: englishGenus
            ? englishGenus.genus.replace(" Pokémon", "")
            : "Unknown",
        });
      } catch (error) {
        console.error("Erro ao carregar detalhes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [name]);

  if (loading) {
    return (
      <Container className="text-center" style={{ marginTop: "150px" }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (!pokemon) return null;

  const formattedId = `#${String(pokemon.id).padStart(4, "0")}`;

  return (
    <Container
      style={{ marginTop: "80px", maxWidth: "900px" }}
      className="pb-5"
    >
      {/* Barra de Navegação Superior (Anterior / Seguinte) */}
      <div
        className="d-flex justify-content-between align-items-center mb-4 p-3 text-white rounded"
        style={{ backgroundColor: "#A4A4A4" }}
      >
        <button
          className="btn text-white fw-bold p-0"
          onClick={() => navigate(`/details/${pokemon.id - 1}`)}
          disabled={pokemon.id <= 1}
        >
          &lt; #{String(pokemon.id - 1).padStart(4, "0")}
        </button>
        <button
          className="btn text-white fw-bold p-0"
          onClick={() => navigate(`/details/${pokemon.id + 1}`)}
        >
          #{String(pokemon.id + 1).padStart(4, "0")} &gt;
        </button>
      </div>

      {/* Título Principal */}
      <div className="text-center mb-4">
        <h1 className="fw-bold text-capitalize display-5">
          {pokemon.name} <span style={{ color: "#919191" }}>{formattedId}</span>
        </h1>
      </div>

      <Row className="g-4">
        {/* Lado Esquerdo: Imagem Oficial */}
        <Col md={6} className="text-center">
          <div
            style={{
              backgroundColor: "#F2F2F2",
              borderRadius: "12px",
              padding: "30px",
            }}
          >
            <img
              src={pokemon.src}
              alt={pokemon.name}
              style={{
                width: "100%",
                maxHeight: "320px",
                objectFit: "contain",
              }}
            />
          </div>
        </Col>

        {/* Lado Direito: Descrição e Bloco Azul de Informações */}
        <Col md={6}>
          <p className="fs-5 text-secondary mb-4">{pokemon.flavorText}</p>

          {/* Card Azul de Atributos */}
          <div
            className="p-4 text-white rounded-3 mb-4"
            style={{ backgroundColor: "#30A7D7" }}
          >
            <Row className="g-3">
              <Col xs={6}>
                <div className="fw-semibold">Height</div>
                <div className="fs-5 text-dark fw-bold">{pokemon.height} m</div>
              </Col>
              <Col xs={6}>
                <div className="fw-semibold">Category</div>
                <div className="fs-5 text-dark fw-bold">{pokemon.category}</div>
              </Col>
              <Col xs={6}>
                <div className="fw-semibold">Weight</div>
                <div className="fs-5 text-dark fw-bold">
                  {pokemon.weight} kg
                </div>
              </Col>
              <Col xs={6}>
                <div className="fw-semibold">Abilities</div>
                <div className="fs-5 text-dark fw-bold text-capitalize">
                  {pokemon.abilities.join(", ")}
                </div>
              </Col>
            </Row>
          </div>

          {/* Tipos */}
          <div className="mb-3">
            <h5 className="fw-bold text-secondary">Type</h5>
            <div className="d-flex gap-2">
              {pokemon.types.map((type) => (
                <span
                  key={type}
                  className="text-capitalize"
                  style={{
                    backgroundColor: TYPE_COLORS[type.toLowerCase()] || "#777",
                    color: "#FFF",
                    padding: "6px 20px",
                    borderRadius: "5px",
                    fontWeight: "600",
                  }}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          {/* Fraquezas */}
          <div>
            <h5 className="fw-bold text-secondary">Weaknesses</h5>
            <div className="d-flex flex-wrap gap-2">
              {pokemon.weaknesses.map((weakness) => (
                <span
                  key={weakness}
                  className="text-capitalize"
                  style={{
                    backgroundColor:
                      TYPE_COLORS[weakness.toLowerCase()] || "#777",
                    color: "#FFF",
                    padding: "6px 20px",
                    borderRadius: "5px",
                    fontWeight: "600",
                  }}
                >
                  {weakness}
                </span>
              ))}
            </div>
          </div>
        </Col>
      </Row>

      {/* Secção Inferior: Gráfico de Estatísticas (Stats) */}
      <Row className="mt-5">
        <Col md={6}>
          <div
            className="p-4 rounded-3"
            style={{ backgroundColor: "#A4A4A4", color: "#313131" }}
          >
            <h5 className="fw-bold mb-3 text-white">Stats</h5>
            <Row
              className="text-center align-items-end"
              style={{ height: "180px" }}
            >
              {pokemon.stats.map((st) => {
                // Cada barra representa blocos de 15 pontos de atributo
                const bars = Math.min(10, Math.ceil(st.base_stat / 15));
                return (
                  <Col
                    key={st.stat.name}
                    className="d-flex flex-column align-items-center h-100 justify-content-end"
                  >
                    <div className="w-100 d-flex flex-column gap-1 mb-2">
                      {Array.from({ length: 10 }).map((_, idx) => (
                        <div
                          key={idx}
                          style={{
                            height: "8px",
                            backgroundColor:
                              10 - idx <= bars ? "#30A7D7" : "#FFFFFF",
                            borderRadius: "2px",
                          }}
                        />
                      ))}
                    </div>
                    <small
                      className="fw-bold text-white"
                      style={{ fontSize: "0.7rem" }}
                    >
                      {STAT_NAMES[st.stat.name] || st.stat.name}
                    </small>
                  </Col>
                );
              })}
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Details;
