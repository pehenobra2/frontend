import styled from "styled-components";
import {IProdutoCard} from "../../interfaces/IProdutoCard";
import { useNavigate } from "react-router-dom";

interface CardProdutoProps {
    produto: IProdutoCard;
}

const CardProdutoList = styled.div`
    padding: 10px;
    box-sizing: border-box;
    border-radius: 30px;
    background: #E4E4E4;
    max-width: 290px;
    max-height: 400px;
    width: 290px;
    height: 400px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    &:hover {
        background-color: #d8d8d8;
    }
`;

const TituloCardProduto = styled.h2`
    color: #1B2747;
    text-align: center;
    font-size: 22px;
    font-family: Jost;
    font-style: normal;
`;

const ImageCardProduto = styled.img`
    margin-top: auto;
    max-width: 250px;
    max-height: 330px;
`;

const CardProduto: React.FC<CardProdutoProps> = ({ produto }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/catalogo/${produto.id}`);

    }

    return (
        <CardProdutoList onClick={handleClick}>
            <TituloCardProduto>{produto.nome}</TituloCardProduto>
            <ImageCardProduto src={produto.imagemUrl} />
        </CardProdutoList>
    );
};

export default CardProduto;