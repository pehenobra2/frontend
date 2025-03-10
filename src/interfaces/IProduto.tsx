import { ICategoria } from "./ICategoria";

export interface IProduto {
    id: number;
    nome: string;
    imagem: string;
    preco: number;
    marca: {
      id_marca: number;
      nome: string;
    };
    categorias: ICategoria[];
  }