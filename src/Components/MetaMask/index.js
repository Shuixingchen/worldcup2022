
// 使用walletStore
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react';
import walletStore from '../../store/WalletStore';

function Metamask() {
  async function connectToMetamask() {
    await walletStore.setWallet()
  }

  function limitWords(txt){
    var str = txt;
    str = str.substr(0,5) + '...'+str.substr(-4);
    return str;
  }

  function renderMetamask() {
    if (walletStore.selectedAddress === "" && walletStore.chainID === 0) {
      return (
        <div className="text-end">
          <button onClick={connectToMetamask} type="button" className="btn btn-outline-light me-2">Connect Wallet</button>
        </div>
      )
    } else {
      return (
          <div className='text-end'>chainID:{walletStore.chainID} accounts: {limitWords(walletStore.selectedAddress)}</div>
      );
    }
  }
  return (
    <div>
      {renderMetamask()}
    </div>
  )
}

export default observer(Metamask);
