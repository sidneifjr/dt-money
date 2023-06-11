import { HeaderContainer, HeaderContent, NewTransactionbutton } from "./styles";
import * as Dialog from "@radix-ui/react-dialog";

import logoImg from '../../assets/logo.svg'
import { NewTransactionModal } from "../NewTransactionModal";

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

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}