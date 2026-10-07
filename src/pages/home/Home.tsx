import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import PokemonItem from "../../components/pokemonItems/pokemon";
import api from "../../services/api";
import Paginacao from "../../components/pagination/Pagination";
import PokemonFilters from "../../components/pokemonFilters/PokemonFilters";

type PokemonDataItem = {
  id: number;
  name: string;
  src: string;
  types: string[];
};

const Home = () => {
  const [pokemonData, setPokemonData] = useState<PokemonDataItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  // Estados dos Filtros
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedWeakness, setSelectedWeakness] = useState<string>("");

  const limit = 30;

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);

      try {
        // 1. FILTRO POR FRAQUEZA (Pokémons fracos contra o tipo selecionado)
        if (selectedWeakness) {
          // Busca as relações de dano do tipo selecionado
          const typeRes = await api.get(`/type/${selectedWeakness}`);

          // Descobre quais tipos tomam dano dobrado (são fracos) contra selectedWeakness
          const weakTypes = typeRes.data.damage_relations.double_damage_to.map(
            (t: { name: string }) => t.name,
          );

          // Busca a lista de Pokémons para cada um desses tipos frágeis
          const typePromises = weakTypes.map((typeName: string) =>
            api.get(`/type/${typeName}`),
          );
          const typeResponses = await Promise.all(typePromises);

          // Agrupa todos os Pokémons retornados sem duplicatas
          const pokemonMap = new Map<string, { url: string }>();
          typeResponses.forEach((res) => {
            res.data.pokemon.forEach((p: any) => {
              pokemonMap.set(p.pokemon.name, p.pokemon);
            });
          });

          const pokemonList = Array.from(pokemonMap.values());

          // Carrega os detalhes dos primeiros 40 Pokémons encontrados
          const detailPromises = pokemonList
            .slice(0, 40)
            .map((p) => api.get(p.url));
          const detailsResponses = await Promise.all(detailPromises);

          const completeData: PokemonDataItem[] = detailsResponses.map(
            (res) => ({
              id: res.data.id,
              name: res.data.name,
              src: res.data.sprites.other["official-artwork"].front_default,
              types: res.data.types.map((t: any) => t.type.name),
            }),
          );

          setPokemonData(completeData);
          setTotalPages(1);
        }
        // 2. FILTRO POR TIPO DIRETO
        else if (selectedType) {
          const typeRes = await api.get(`/type/${selectedType}`);
          const pokemonList = typeRes.data.pokemon.map((p: any) => p.pokemon);

          const detailPromises = pokemonList
            .slice(0, 40)
            .map((p: { url: string }) => api.get(p.url));
          const detailsResponses = await Promise.all(detailPromises);

          const completeData: PokemonDataItem[] = detailsResponses.map(
            (res) => ({
              id: res.data.id,
              name: res.data.name,
              src: res.data.sprites.other["official-artwork"].front_default,
              types: res.data.types.map((t: any) => t.type.name),
            }),
          );

          setPokemonData(completeData);
          setTotalPages(1);
        }
        // 3. BUSCA PADRÃO PAGINADA
        else {
          const offset = (currentPage - 1) * limit;
          const response = await api.get(
            `/pokemon?limit=${limit}&offset=${offset}`,
          );

          setTotalPages(Math.ceil(response.data.count / limit));

          const detailPromises = response.data.results.map(
            (pokemon: { url: string }) => api.get(pokemon.url),
          );
          const detailsResponses = await Promise.all(detailPromises);

          const completeData: PokemonDataItem[] = detailsResponses.map(
            (res) => ({
              id: res.data.id,
              name: res.data.name,
              src: res.data.sprites.other["official-artwork"].front_default,
              types: res.data.types.map((t: any) => t.type.name),
            }),
          );

          setPokemonData(completeData);
        }
      } catch (error) {
        console.error("Erro ao carregar Pokémons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [currentPage, selectedType, selectedWeakness]); // Adicionado selectedWeakness nas dependências

  // Filtra por nome no front-end
  const filteredPokemons = pokemonData.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(pokemon.id).includes(searchTerm),
  );

  return (
    <Container style={{ marginTop: 100, marginBottom: 50 }}>
      {/* Título da Página */}
      <div className="mb-4">
        <h1 className="fw-bold display-5">Lista de Pokémons</h1>
        <p className="text-muted">
          Pesquise Pokémons por nome, tipo ou explore a Pokédex completa.
        </p>
      </div>

      {/* Componente de Filtros */}
      <PokemonFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedType={selectedType}
        onTypeChange={(type) => {
          setSelectedType(type);
          setCurrentPage(1);
        }}
        selectedWeakness={selectedWeakness}
        onWeaknessChange={setSelectedWeakness}
      />

      {/* Lista de Cards */}
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row className="g-4">
          {filteredPokemons.map((item: PokemonDataItem) => (
            <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
              <PokemonItem
                id={item.id}
                src={item.src}
                name={item.name}
                types={item.types}
              />
            </Col>
          ))}
        </Row>
      )}

      {/* Paginação (exibida apenas sem filtro por tipo ativo) */}
      {!selectedType && !searchTerm && (
        <Paginacao
          activePage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </Container>
  );
};

export default Home;
