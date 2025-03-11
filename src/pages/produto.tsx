import styled from "styled-components";
import { IProduto } from "../interfaces/IProduto";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";




const Container = styled.div`
    width: 95%;
    background-color: #f2f2f2;
    border-radius: 1em;
    margin: auto;
    padding: 1em;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    align-items: center;
`;

const Grid1 = styled.div`
    display: grid;
    grid-template-rows: 0.1fr 3fr 1fr;
`;

const ContainerTexto = styled.div`
    padding: 2em;
    align-self: flex-start;
`;

const Marcas = styled.h3`
    font-size: 1.5em;
    font-weight: 10;
    color: #1B2747;
`;

const NomeProduto = styled.h2`
    font-size: 2.5em;
    font-weight: bold;
    color: #1B2747;
`;

const Descricao = styled.p`
    color: #1B2747;
`;

const Grid2 = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 100%;
    max-height: 450px;
`;

const FotoProdutoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1B2747;
    width: 450px;
    height: 450px;
    border-radius: 50%;
`;

const FotoProduto = styled.img`
    max-width: 100%;
    max-height: 100%;
    border-radius: 50%;
`;

const Dropdown = styled.div`
    margin: 10px 0;
`;

const Button = styled.button`
    background-color: #1B2747;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    margin-right: 10px;

    &:hover {
        background-color: #142030;
    }
`;

const ContainerBack = styled.div`
    display: flex;
    justify-content: flex-start; 
    align-items: center;  
`;


const ContainerButtons = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`;


function Produto() {
    const { id } = useParams<{ id: string }>();
    const [produto, setProduto] = useState<IProduto | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        axios
            .get<IProduto>(`http://localhost:8080/catalogo/${id}`)
            .then((response) => {
                setProduto(response.data);
            })
            .catch((error) => console.error("Erro ao buscar produto: ", error));
    }, [id]);

    if (!produto) {
        return <h2>Carregando ...</h2>;
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const talkToSeller = () => {
        window.location.href = `https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20produto%20${produto.nome}`;
    };

    return (
        <Container>
            <Grid>
                <Grid1>
                    <ContainerBack>
                        Voltar
                    </ContainerBack>
                    
                    <ContainerTexto>
                        <Marcas>{produto.marca.nome}</Marcas>
                        <NomeProduto>{produto.nome}</NomeProduto>
                        <Descricao>{produto.descricao}</Descricao>
                    </ContainerTexto>
                    <ContainerButtons>
                        {produto.saborOuCor !== "NENHUM" && (
                            <Dropdown>
                                <Button onClick={toggleDropdown}>
                                    {produto.saborOuCor === "COR" ? "Cores" : "Sabores"}
                                </Button>
                                {isOpen && (
                                    <div>
                                        {produto.saborOuCor === "COR" 
                                            ? produto.saborCor?.map((item, index) => <div key={index}>{item}</div>)
                                            : produto.saborCor?.map((item, index) => <div key={index}>{item}</div>)
                                        }
                                    </div>
                                )}
                            </Dropdown>
                        )}
                        {produto.saborCor?.length > 0 && (
                            <Dropdown>
                                <Button onClick={toggleDropdown}>Tipos</Button>
                                {isOpen && produto.saborCor.map((item, index) => (
                                    <div key={index}>{item}</div>
                                ))}
                            </Dropdown>
                        )}
                        <Button onClick={talkToSeller}>Falar com Vendedor</Button>
                    </ContainerButtons>
                </Grid1>
                <Grid2>
                    <FotoProdutoContainer>
                        <FotoProduto src={produto.imagem} />
                    </FotoProdutoContainer>
                </Grid2>
            </Grid>
        </Container>
    );
}

export default Produto;
