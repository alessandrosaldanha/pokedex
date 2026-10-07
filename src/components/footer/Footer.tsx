import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#1F1F1F",
        color: "#B0B0B0",
        paddingTop: "40px",
        paddingBottom: "25px",
        marginTop: "auto",
        borderTop: "4px solid #E3350D", // Vermelho característico da Pokéball
      }}
    >
      <Container>
        <Row className="gy-4 align-items-center">
          {/* Coluna 1: Branding / Sobre */}
          <Col md={4} sm={12}>
            <h5
              className="text-white fw-bold mb-2"
              style={{ letterSpacing: "1px" }}
            >
              Pokédex <span style={{ color: "#E3350D" }}>Web</span>
            </h5>
            <p className="small mb-0" style={{ fontSize: "0.9rem" }}>
              Uma aplicação web construída com React, TypeScript e Bootstrap,
              consumindo dados da PokéAPI para listar e exibir detalhes de todos
              os Pokémons.
            </p>
          </Col>

          {/* Coluna 2: Navegação Rápida */}
          <Col md={4} sm={6} className="text-md-center">
            <h6 className="text-white fw-semibold mb-3">Navegação</h6>
            <ul
              className="list-unstyled d-flex flex-column gap-2 mb-0"
              style={{ fontSize: "0.95rem" }}
            >
              <li>
                <Link
                  to="/home"
                  className="text-decoration-none text-secondary-hover text-light"
                >
                  Home / Lista
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-decoration-none text-secondary-hover text-light"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </Col>

          {/* Coluna 3: Links Sociais do Alessandro */}
          <Col md={4} sm={6} className="text-md-end">
            <h6 className="text-white fw-semibold mb-3">Desenvolvido por</h6>
            <div className="fw-bold text-white mb-2">Alessandro Saldanha</div>
            <div className="d-flex gap-3 justify-content-md-end">
              <a
                href="https://github.com/alessandrosaldanha"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light btn-sm px-3"
                style={{ borderRadius: "20px" }}
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/alessandrosaldanha/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary btn-sm px-3"
                style={{ borderRadius: "20px" }}
              >
                LinkedIn
              </a>
            </div>
          </Col>
        </Row>

        <hr style={{ borderColor: "#333", margin: "30px 0 20px 0" }} />

        {/* Linha Inferior: Copyright e Créditos */}
        <Row>
          <Col className="text-center small text-muted">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Alessandro Saldanha. Todos os
              direitos reservados.
            </p>
            <p className="mb-0" style={{ fontSize: "0.8rem" }}>
              Dados obtidos através da{" "}
              <a
                href="https://pokeapi.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted text-decoration-underline"
              >
                PokéAPI
              </a>
              . Pokémon e seus respectivos nomes são marcas registradas da
              Nintendo.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
