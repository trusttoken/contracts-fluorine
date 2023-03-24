import { ProtocolConfig__factory } from 'build/types/factories/ProtocolConfig__factory'
import { Wallet } from 'ethers'
import { deployBehindProxy } from 'utils/deployBehindProxy'

interface ProtocolConfigParams {
  defaultProtocolFeeRate: number
  protocolAdmin: Wallet
  protocolTreasury: string
  pauser: Wallet
}

export async function deployProtocolConfig([wallet, pauser, protocolAdmin]: Wallet[]) {
  const defaultProtocolFeeRate = 0
  const protocolTreasury = Wallet.createRandom().address

  const protocolConfigParams: ProtocolConfigParams = {
    defaultProtocolFeeRate,
    protocolAdmin,
    protocolTreasury,
    pauser,
  }

  const protocolConfig = await deployBehindProxy(
    new ProtocolConfig__factory(wallet),
    defaultProtocolFeeRate,
    protocolAdmin.address,
    protocolTreasury,
    pauser.address
  )

  return { protocolConfig, protocolConfigParams }
}
