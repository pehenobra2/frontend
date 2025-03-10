import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { ICategoria } from "../../interfaces/ICategoria";
import { IMarca } from "../../interfaces/IMarca";

const FiltroWrapper = styled.section`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 1.5em;
  padding: 20px;
  width: 250px;
`;

const TituloFiltro = styled.h4`
  background-color: #1B2747;
  color: #EFCD56;
  padding: 0.4em;
  text-align: center;
  border-radius: 1em;
`;

const BarraPesquisa = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 15px;
`;

const OpcoesFiltro = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const OpcaoFiltro = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #1B2747;
  font-weight: bold;
`;

interface FiltroContainerProps {
  toggleFilter: (group: string, value: string) => void;
  setSearchQuery: (query: string) => void;
}

const FiltroContainer: React.FC<FiltroContainerProps> = ({ toggleFilter, setSearchQuery }) => {
  const [searchQuery, setLocalSearchQuery] = useState<string>("");
  const [marcas, setMarcas] = useState<string[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);

  // Atualiza a pesquisa global quando o usuário digita
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchQuery(searchQuery);
    }, 300); // Adiciona um pequeno debounce

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, setSearchQuery]);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const [marcasRes, categoriasRes] = await Promise.all([
          axios.get<IMarca[]>("http://localhost:8080/marcas"),
          axios.get<ICategoria[]>("http://localhost:8080/categorias"),
        
        ]);

        setMarcas(marcasRes.data.map((item) => item.nome));
        setCategorias(categoriasRes.data.map((item) => item.nome));
        console.log("Marcas: ", marcas)
        console.log("Categorias: ", categorias)
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchDados();
  }, []);

  return (
    <FiltroWrapper>
      <BarraPesquisa
        type="text"
        placeholder="Pesquisar produtos..."
        value={searchQuery}
        onChange={(e) => setLocalSearchQuery(e.target.value)}
      />
      <TituloFiltro>Marcas</TituloFiltro>
      <OpcoesFiltro>
        {marcas.map((marca) => (
          <OpcaoFiltro key={marca}>
            <input type="checkbox" onChange={() => toggleFilter("marca", marca)} />
            {marca}
          </OpcaoFiltro>
        ))}
      </OpcoesFiltro>
      <TituloFiltro>Categorias</TituloFiltro>
      <OpcoesFiltro>
        {categorias.map((categoria) => (
          <OpcaoFiltro key={categoria}>
            <input type="checkbox" onChange={() => toggleFilter("categoria", categoria)} />
            {categoria}
          </OpcaoFiltro>
        ))}
      </OpcoesFiltro>
    </FiltroWrapper>
  );
};

export default FiltroContainer;
