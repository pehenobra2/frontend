import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";

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
    padding:  0.4em ;
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

function FiltroContainer({ toggleFilter, filterExists }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [marcas, setMarcas] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [marcasSelecionadas, setMarcasSelecionadas] = useState({});
    const [categoriasSelecionadas, setCategoriasSelecionadas] = useState({});

    // Simulação de marcas e categorias (pode ser atualizado via API)
    useEffect(() => {
        axios.get("http://localhost:8080/marcas")
            .then(response => {
                // Atualizando marcas com o formato adequado
                setMarcas(response.data.map(item => item.nome)); 
            })
            .catch(error => console.error("Erro ao buscar marcas:", error));

        axios.get("http://localhost:8080/categorias")
            .then(response => {
                // Atualizando categorias com o formato adequado
                setCategorias(response.data.map(item => item.nome)); 
            })
            .catch(error => console.error("Erro ao buscar categorias:", error));
    }, []);

    useEffect(() => {
        console.log('Marcas Selecionadas:', marcasSelecionadas);
        console.log('Categorias Selecionadas:', categoriasSelecionadas);
    
        Object.keys(marcasSelecionadas).forEach((marca) => {
            const isActive = marcasSelecionadas[marca];
            toggleFilter(marca, "marca", (produto) => produto.marca === marca);
        });
    
        Object.keys(categoriasSelecionadas).forEach((categoria) => {
            const isActive = categoriasSelecionadas[categoria];
            toggleFilter(categoria, "categoria", (produto) => produto.categoria === categoria);
        });
    }, [marcasSelecionadas, categoriasSelecionadas]);
    

    return (
        <FiltroWrapper>
            {/* Barra de Pesquisa */}
            <BarraPesquisa
                type="text"
                placeholder="Pesquisar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Filtro por Marcas */}
            <TituloFiltro>Marcas</TituloFiltro>
            <OpcoesFiltro>
                {marcas.map((marca) => (
                    <OpcaoFiltro key={marca}>
                        <input
                            type="checkbox"
                            checked={marcasSelecionadas[marca] || false}
                            onChange={() => handleCheckboxChange("marca", marca)}
                        />
                        {marca}
                    </OpcaoFiltro>
                ))}
            </OpcoesFiltro>

            {/* Filtro por Categorias */}
            <TituloFiltro>Categorias</TituloFiltro>
            <OpcoesFiltro>
                {categorias.map((categoria) => (
                    <OpcaoFiltro key={categoria}>
                        <input
                            type="checkbox"
                            checked={categoriasSelecionadas[categoria] || false}
                            onChange={() => handleCheckboxChange("categoria", categoria)}
                        />
                        {categoria}
                    </OpcaoFiltro>
                ))}
            </OpcoesFiltro>
        </FiltroWrapper>
    );
}

export default FiltroContainer;
