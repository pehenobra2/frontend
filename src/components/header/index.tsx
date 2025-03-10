import styled from 'styled-components'
import logo from '../../assets/Logo_Realli.png';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
    background-color: #FFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 5%;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        padding: 1rem;
    }
`

const LogoContainer = styled(Link)`
    display: flex;
    align-items: center;
    width: 20%; 

    @media (max-width: 768px) {
        width: 100%;
        justify-content: center;
    }
`

const ImgLogo = styled.img`
    max-width: 100%;
    height: auto;
`

const OpcoesContainer = styled.nav`
    flex-grow: 1;
    display: flex;
    justify-content: center;
    width: 80%;

    @media (max-width: 768px) {
        width: 100%;
        justify-content: center;
        margin-top: 1rem;
    }
`

const Opcoes = styled.ul`
    display: flex;
    list-style: none;
    width: 80%;
    justify-content: space-around; 
    align-items: center;
    padding: 0;
    margin: 0;

    @media (max-width: 768px) {
        gap: 10px;
        justify-content: center; 
    }
`

const Opcao = styled.li`
    font-size: 1rem;
    font-weight: bold;

    @media (max-width: 768px) {
        font-size: 0.9rem;
    }
`


const TextoOpcao = styled.a`

    text-decoration: none;
    color: #1B2747;
    text-align: center;
    font-size: 30px;
    cursor: pointer;

`

const BotaoCatalogoContainer = styled.div`
    width: 20%;
    display: flex;
    justify-content: flex-end;

    @media (max-width: 768px) {
        width: 100%;
        justify-content: center;
        margin-top: 1rem;
    }
`

const BotaoCatalogo = styled(Link)`
    color: #1B2747;
    font-size: 30px;
    border-radius: 100px;
    background: #EFCD56;
    border-style: none;
    padding: 0.10em 0.40em;
    text-decoration: none;

    &:hover {
        background: #dabb4b;
        cursor: pointer;
    }
`

const textoOpcoes = ['Marcas', 'Empresa', 'Social']

function Header() {
    return (
        <HeaderContainer>
            <LogoContainer to="/">
                <ImgLogo src={logo} alt="Logo" />
            </LogoContainer>

            <OpcoesContainer>
                <Opcoes>
                    {textoOpcoes.map((texto, index) => (
                        <Opcao key={index}><TextoOpcao>{texto}</TextoOpcao></Opcao>
                    ))}
                </Opcoes>
            </OpcoesContainer>

            <BotaoCatalogoContainer>
                <BotaoCatalogo to="/catalogo">Catálogo</BotaoCatalogo>
            </BotaoCatalogoContainer>
        </HeaderContainer>
    )
}

export default Header
