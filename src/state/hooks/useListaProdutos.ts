import { useRecoilValue } from "recoil";
import { produtosFiltradosState } from "../seletores/produtosFiltradosState";

export const useListaProdutos = () => {

    return useRecoilValue(produtosFiltradosState)
}