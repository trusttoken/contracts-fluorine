import { waffle } from 'hardhat'
import { ContractTransaction } from 'ethers'

export async function getTxTimestamp(tx: ContractTransaction): Promise<number> {
  const txReceipt = await tx.wait()
  return (await waffle.provider.getBlock(txReceipt.blockHash)).timestamp
}

export async function timePassedBetween(earlierTx: ContractTransaction, laterTx: ContractTransaction) {
  return (await getTxTimestamp(laterTx)) - (await getTxTimestamp(earlierTx))
}
