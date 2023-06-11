import { useContext } from "react";
import { TransactionsContext } from "../contexts/TransactionsContext";

export function useSummary() {
  const { transactions } = useContext(TransactionsContext)

  /**
   * reduce() permite percorrer um array e reduzir o mesmo a uma nova estrutura de dados.
   * Ou seja: quero adaptár o meu transactions à essa estrutura de dados:
   * { income: 0, outcome: 0, total: 0 }
   * acc -> accumulator. Refere-se ao objeto { income: 0, outcome: 0, total: 0 }.
   * Todas as operações no reducer, farei no accumulator.
   */
  const summary = transactions.reduce((acc, transaction) => {
    if(transaction.type === 'income'){
      acc.income += transaction.price;
      acc.total += transaction.price;
    }

    else {
      acc.outcome += transaction.price;
      acc.total -= transaction.price;
    }

    return acc;
  }, { income: 0, outcome: 0, total: 0 });

  return summary
}