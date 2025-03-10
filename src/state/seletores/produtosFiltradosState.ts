import { selector } from "recoil";
import { filtrosState, listaDeProdutosState, searchQueryState } from "../atom";
import { IProduto } from "../../interfaces/IProduto";

export const produtosFiltradosState = selector({
    key: "produtosFiltradosState",
    get: ({ get }) => {
      const filtros = get(filtrosState);
      const todosOsProdutos = get(listaDeProdutosState);
      const searchQuery = get(searchQueryState).toLowerCase();
  
      return todosOsProdutos.filter((produto: IProduto) => {
        const marcasSelecionadas = filtros.marca ?? new Set();
        const categoriasSelecionadas = filtros.categoria ?? new Set();
  
        // 🔹 Corrigido: Comparação correta da marca
        const atendeMarca =
          marcasSelecionadas.size === 0 || marcasSelecionadas.has(produto.marca.nome); // Comparando pelo nome da marca
  
        const atendeCategoria =
            categoriasSelecionadas.size === 0 ||
            produto.categorias.some((cat) => categoriasSelecionadas.has(cat.nome));

        
        // 🔹 Filtro de pesquisa
        const atendePesquisa =
          searchQuery === "" || produto.nome.toLowerCase().includes(searchQuery);
  
        return atendeMarca && atendeCategoria && atendePesquisa;
      });
    },
  });
  
