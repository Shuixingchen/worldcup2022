import { makeAutoObservable } from "mobx"
import { ethers } from "ethers";
import chainList from '../json/chain.json'

class WalletStore {
    provider
    accounts
    balance
    balanceInEther
    selectedAddress = ""
    chainID = 0
    chainInfo
    constructor() {
        makeAutoObservable(this)
    }
    getChainInfo = (chainID)=> {
        for (let elem of chainList.values()) {
            if (chainID == elem.chainid) {
                this.chainInfo = elem
                return
            }
        }
        // 没有找到，弹窗
        alert("Only support Mumbai(chainid:80001) and Polygon Mainnet(chainid:137)")
    }
    setWallet = async () => {
        this.provider = new ethers.providers.Web3Provider(window.ethereum)
        this.accounts = await this.provider.send("eth_requestAccounts", []);
        this.selectedAddress = this.accounts[0]
        this.balance = await this.provider.getBalance(this.selectedAddress);
        this.balanceInEther = ethers.utils.formatEther(this.balance);
        this.chainID = window.ethereum.networkVersion
        this.getChainInfo(this.chainID)
        let self = this
        // console.log(`address:${this.balanceInEther} balance: ${this.balance}, balanceETh: ${this.balanceInEther}`)
        window.ethereum.on('chainChanged', async function (networkIDstring) {
            self.provider = new ethers.providers.Web3Provider(window.ethereum)
            self.chainID = parseInt(networkIDstring, 16)
            self.getChainInfo(self.chainID)
            self.balance = await self.provider.getBalance(self.selectedAddress);
            self.balanceInEther = ethers.utils.formatEther(self.balance);
            console.log(`address:${self.selectedAddress} balance: ${this.balance}, balanceETh: ${this.balanceInEther}`)
        })
        window.ethereum.on('accountsChanged', async function (accounts) {
            self.provider = new ethers.providers.Web3Provider(window.ethereum)
            self.selectedAddress = accounts[0]
            self.balance = await self.provider.getBalance(self.selectedAddress);
            self.balanceInEther = ethers.utils.formatEther(self.balance);
            // console.log(`address: ${self.selectedAddress} balance: ${self.balance}, balanceETh: ${self.balanceInEther}`)
        })
    }
}

const walletStore = new WalletStore
export default walletStore