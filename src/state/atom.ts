import { atom } from "recoil";
import { IProduto } from "../interfaces/IProduto";

  export const listaDeProdutosState = atom<IProduto[]>({
    key: "listaDeProdutosState",
    default: [],
  });
  
  export const listaDeProdutosFiltradosState = atom<IProduto[]>({
    key: "listaDeProdutosFiltradosState",
    default: [],
  });

  export const filtrosState = atom<{ [key: string]: Set<string> }>({
    key: "filtrosState",
    default: {}, 
  });

// Átomo para armazenar o valor da pesquisa
  export const searchQueryState = atom<string>({
    key: "searchQueryState",
    default: "", // Valor inicial é uma string vazia
  }); 

// Átomo para armazenar a página atual da navegação
  export const paginaAtualState = atom<number>({
    key: "paginaAtualState",
    default: 1, // Valor inicial é a página 1
  });
