import { ICategoria } from "./ICategoria";

export interface IProduto {
    id: number;
    nome: string;
    marca: {
      id_marca: number;
      nome: string;
    };
    descricao: string;
    preco: number;
    imagem: string;
    saborOuCor: string;
    saborCor: [string]
    categorias: ICategoria[];
  }