import { makeAutoObservable } from "mobx"
import { ethers } from "ethers";

class WalletStore {
    provider
    accounts
    balance
    balanceInEther
    selectedAddress = ""
    constructor() {
        makeAutoObservable(this)
    }

    setWallet = async () => {
        this.provider = new ethers.providers.Web3Provider(window.ethereum)
        this.accounts = await this.provider.send("eth_requestAccounts", []);
        this.selectedAddress = this.accounts[0]
        this.balance = await this.provider.getBalance(this.selectedAddress);
        this.balanceInEther = ethers.utils.formatEther(this.balance);
    }
}

const walletStore = new WalletStore
export default walletStore