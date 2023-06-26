import { ReactNode, createContext, useEffect, useState } from 'react'

interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function fetchTransactions(query?: string) {
    const url = new URL('http://localhost:3000/transactions')

    if(query){
      url.searchParams.append('q', query);
    }

    const response = await fetch(url)
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
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions }}>
      { children }
    </TransactionsContext.Provider>
  )
}