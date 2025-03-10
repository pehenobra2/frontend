import { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useRecoilState } from "recoil";
import { listaDeProdutosState, paginaAtualState, filtrosState, searchQueryState } from "../state/atom";
import CardProduto from "../components/catalogo/cardProduto";
import FiltroContainer from "../components/catalogo/Filtro";
import {useListaProdutos}  from "../state/hooks/useListaProdutos";
import { IProduto } from "../interfaces/IProduto";

type FiltersState = { [key: string]: Set<string> };

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
  const [, setProdutos] = useRecoilState(listaDeProdutosState);
  const [paginaAtual, setPaginaAtual] = useRecoilState(paginaAtualState);
  const [, setFiltros] = useRecoilState<FiltersState>(filtrosState);
  const [, setSearchQuery] = useRecoilState(searchQueryState);
  const produtosFiltrados = useListaProdutos();

  useEffect(() => {
    axios
      .get<IProduto[]>("http://localhost:8080/catalogo")
      .then((response) => {
        setProdutos(response.data);
        console.log("Todos os produtos:", response.data);
      })
      .catch((error) => console.error("Erro ao buscar produtos:", error));
  }, [setProdutos]);

  const toggleFilter = (group: string, value: string) => {
    setFiltros((prev) => {
      const updated = { ...prev };
  
      if (!updated[group]) {
        updated[group] = new Set();
      }
  
      const newSet = new Set(updated[group]);
  
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
  
      return { ...updated, [group]: newSet };
    });
  };
  
  

  
  

  const indiceInicial = (paginaAtual - 1) * produtosPorPagina;
  const produtosExibidos = produtosFiltrados.slice(indiceInicial, indiceInicial + produtosPorPagina);
  const totalPaginas = Math.ceil(produtosFiltrados.length / produtosPorPagina);

  return (
    <CatalogoContainer>
      <CatalogoBox>
        <FiltroContainer toggleFilter={toggleFilter} setSearchQuery={setSearchQuery} />
        <div>
          <ListaProdutos>
            {produtosExibidos.map((produto) => (
              <CardProduto key={produto.id} produto={{ ...produto, imagemUrl: produto.imagem }} />
            ))}
          </ListaProdutos>
          <Paginacao>
            <BotaoPaginacao onClick={() => setPaginaAtual(paginaAtual - 1)} disabled={paginaAtual === 1}>
              Anterior
            </BotaoPaginacao>
            <span>Página {paginaAtual} de {totalPaginas}</span>
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
