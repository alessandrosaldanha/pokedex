import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import PokemonItem from "../../components/pokemonItems/pokemon";
import api from "../../services/api";
import Paginacao from "../../components/pagination/Pagination";

type PokemonDataItem = {
  name: string;
  src: string;
  types: string[];
};

const Home = () => {
  const [pokemonData, setPokemonData] = useState<PokemonDataItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const limit = 30;

  useEffect(() => {
    const offset = (currentPage - 1) * limit;

    api
      .get(`/pokemon?limit=${limit}&offset=${offset}`)
      .then(async (response) => {
        setTotalPages(Math.ceil(response.data.count / limit));
        const detailPromises = response.data.results.map(
          (pokemon: { url: string }) => api.get(pokemon.url),
        );
        const detailsResponses = await Promise.all(detailPromises);
        const completeData: PokemonDataItem[] = detailsResponses.map((res) => ({
          name: res.data.name,
          src: res.data.sprites.other["official-artwork"].front_default,
          // Mapeia a lista de tipos (ex: ['grass', 'poison'])
          types: res.data.types.map((t: any) => t.type.name),
        }));

        setPokemonData(completeData);
      });
  }, [currentPage]);

  return (
    <Container
      className="home"
      style={{ display: "flex", gap: 10, marginTop: 100, flexWrap: "wrap" }}
    >
      {pokemonData.map((item: PokemonDataItem) => {
        return (
          <PokemonItem
            key={item.name}
            src={item.src}
            name={item.name}
            // Passar os tipos reais se escolher a Opção 2 (veja ajuste do card abaixo)
            // types={item.types}
          />
        );
      })}

      <Paginacao
        activePage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </Container>
  );
};

export default Home;
