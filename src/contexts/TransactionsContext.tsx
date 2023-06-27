import { ReactNode, createContext, useEffect, useState } from 'react'
import { api } from '../lib/axios';

interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: 'income' | 'outcome'
}

interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function fetchTransactions(query?: string) {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query
      }
    })

    setTransactions(response.data)
  }

  async function createTransaction(data: CreateTransactionInput) {
    const {description, price, category, type} = data;

    // Não é necessário incluir id, pois o json server cria essa propriedade automaticamente para cada novo item (como qualquer backend).
    // Mesmo que o createdAt seja normalmente gerado pelo backend, não é facilmente feito através do json server.
    const response = await api.post('transactions', {
      description,
      price,
      category,
      type,
      createdAt: new Date()
    })

    setTransactions(state => [response.data, ...state]);
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
    <TransactionsContext.Provider value={{ transactions, fetchTransactions, createTransaction }}>
      { children }
    </TransactionsContext.Provider>
  )
}