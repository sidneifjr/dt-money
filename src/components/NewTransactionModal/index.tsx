import * as Dialog from "@radix-ui/react-dialog";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";

import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles";

export function NewTransactionModal() {
  return (
    <>
      {/**
        * O modal não necessariamente faz parte do Header; apenas o botão atrelado à abertura do mesmo está presente no Header.
        * Assim, o uso de Portal é justificado, pois o Modal é um overlay sobreposto à página inteira e fora do contexto do Header.
        */}
      <Dialog.Portal>
        <Overlay />

        <Content>
          <Dialog.Title>Nova transação</Dialog.Title>

          <CloseButton>
            <X size={24} />
          </CloseButton>

          <form action="">            
            <input type="text" placeholder="Descrição" required />
            <input type="number" placeholder="Preço" required />
            <input type="text" placeholder="Categoria" required />

            <TransactionType>
              <TransactionTypeButton variant="income">
                <ArrowCircleUp size={24} />
                Entrada
              </TransactionTypeButton>

              <TransactionTypeButton variant="outcome">
                <ArrowCircleDown size={24} />
                Saída
              </TransactionTypeButton>
            </TransactionType>

            <button type="submit">Cadastrar</button>
          </form>
        </Content>
      </Dialog.Portal>
    </>
  )
}