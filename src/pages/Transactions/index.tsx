import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";

interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

export function Transactions() {
  const [transactions, setTransactions] = useState<Transaction>([])

  async function loadTransactions() {
    const response = await fetch('http://localhost:3000/transactions')
    const data = await response.json();

    setTransactions(data)
    console.log(data)
  }

  /**
   * O useEffect é útil para este caso, onde quero que o código rode apenas uma vez e que não se repita, caso haja nova renderização.
   * Um ponto importante: se abrir a aba network no Chrome, duas requisições com o nome "transactions" serão exibidas.
   * Isso ocorre devido ao StrictMode do React, que realiza algumas verificações estritas e causa uma repetição apenas durante o modo de desenvolvimento.
   *  */ 
  useEffect(() => {
    loadTransactions()
  }, [])

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transactions.map(transaction => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.price}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{transaction.createdAt}</td>
                </tr>
              )
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}