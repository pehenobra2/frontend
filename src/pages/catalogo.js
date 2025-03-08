import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import CardProduto from "../components/catalogo/cardProduto";
import FiltroContainer from "../components/catalogo/Filtro";

// Definição dos grupos de filtros
const Group = {
  MARCA: "marca",
  CATEGORIA: "categoria",
};

/**
 * @typedef {Object} Filter
 * @property {string} name
 * @property {string} group
 * @property {(produto: any) => boolean} fnc
 */

const CatalogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  border-radius: 40px;
`;

const CatalogoBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  background-color: #f2f2f2;
  border-radius: 40px;
  width: 90%;
  height: 80vh;
  padding: 20px;
  overflow-y: auto;
`;

const ListaProdutos = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 1em;
  flex-wrap: wrap;
  margin-left: 20px;
`;

const Paginacao = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  gap: 10px;
`;

const BotaoPaginacao = styled.button`
  padding: 5px 10px;
  border: none;
  background-color: #efcd56;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #dabb4b;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

function Catalogo() {
  const produtosPorPagina = 6;
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/catalogo")
      .then((response) => {
        setProdutos(response.data);
        setProdutosFiltrados(response.data);
      })
      .catch((error) => console.error("Erro ao buscar produtos:", error));
  }, []);

  function filterExists(name, group) {
    return filters.some((f) => f.name === name && f.group === group);
  }

  function addFilter(name, group, fnc) {
    setFilters((currentFilters) => [...currentFilters, { name, group, fnc }]);
  }

  function removeFilter(name, group) {
    setFilters((currentFilters) =>
      currentFilters.filter((f) => !(f.name === name && f.group === group))
    );
  }

  function toggleFilter(name, group, fnc) {
    filterExists(name, group) ? removeFilter(name, group) : addFilter(name, group, fnc);
  }

  useEffect(() => {
    const filteredProducts = applyFilters(produtos, filters);
    setProdutosFiltrados(filteredProducts);
    setPaginaAtual(1);
  }, [filters, produtos]);

  function applyFilters(produtos, filters) {
    return produtos.filter((produto) => filters.every((filter) => filter.fnc(produto)));
  }

  useEffect(() => {
    const filteredProducts = applyFilters(produtos, filters);
    console.log('Produtos Filtrados:', filteredProducts);  // Verifique aqui
    setProdutosFiltrados(filteredProducts);
    setPaginaAtual(1);
}, [filters, produtos]);


  const indiceInicial = (paginaAtual - 1) * produtosPorPagina;
  const produtosExibidos = produtosFiltrados.slice(indiceInicial, indiceInicial + produtosPorPagina);
  const totalPaginas = Math.ceil(produtosFiltrados.length / produtosPorPagina);

  return (
    <CatalogoContainer>
      <CatalogoBox>
        <FiltroContainer toggleFilter={toggleFilter} filterExists={filterExists} />
        <div>
          <ListaProdutos>
            {produtosExibidos.map((produto) => (
              <CardProduto key={produto.id} produto={produto} />
            ))}
          </ListaProdutos>
          <Paginacao>
            <BotaoPaginacao onClick={() => setPaginaAtual(paginaAtual - 1)} disabled={paginaAtual === 1}>
              Anterior
            </BotaoPaginacao>
            <span>
              Página {paginaAtual} de {totalPaginas}
            </span>
            <BotaoPaginacao onClick={() => setPaginaAtual(paginaAtual + 1)} disabled={paginaAtual === totalPaginas}>
              Próxima
            </BotaoPaginacao>
          </Paginacao>
        </div>
      </CatalogoBox>
    </CatalogoContainer>
  );
}

export default Catalogo;
