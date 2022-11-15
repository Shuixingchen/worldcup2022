
// 使用walletStore
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react';
import walletStore from '../../store/WalletStore';

function Metamask() {
  
  function connectToMetamask() {
    walletStore.setWallet()
  }

  function renderMetamask() {
    if (walletStore.selectedAddress === "") {
      return (
        <div className="text-end">
          <button onClick={connectToMetamask} type="button" className="btn btn-outline-light me-2">Connect Wallet</button>
        </div>
      )
    } else {
      return (
          <div className='text-end'>{walletStore.selectedAddress}</div>
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
