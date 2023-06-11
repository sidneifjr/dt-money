import { HeaderContainer, HeaderContent, NewTransactionbutton } from "./styles";
import * as Dialog from "@radix-ui/react-dialog";

import logoImg from '../../assets/logo.svg'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root>
          {/**
           * O atributo 'asChild' irá impedir que um novo botão seja criado.
           * Ao invés disso, aproveite o botão que já existe dentro da tag (no caso, NewTransactionButton).
           */}
          <Dialog.Trigger asChild>
            <NewTransactionbutton>Nova transação</NewTransactionbutton>
          </Dialog.Trigger>

          {/**
           * O modal não necessariamente faz parte do Header; apenas o botão atrelado à abertura do mesmo está presente no Header.
           * Assim, o uso de Portal é justificado, pois o Modal é um overlay sobreposto à página inteira e fora do contexto do Header.
           */}
          <Dialog.Portal>
            <Dialog.Overlay />

            <Dialog.Content>
              <Dialog.Title>Nova transação</Dialog.Title>

              <Dialog.Close />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}