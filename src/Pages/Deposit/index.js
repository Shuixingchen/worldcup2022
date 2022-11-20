
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {useLocation} from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import walletStore from '../../store/WalletStore';
import GameFactoryABI from '../../abi/GameFactory.json';
import {ethers} from 'ethers'
 
// 通过react-hook-form处理表单
function Deposit() {
    // 获取路由参数
    const location = useLocation()
    const [txHash,setTxHash] = useState("")

    // 获取当前结果百分比
    // const [playAwin, setPlayAwin] = useState(0)
    // const [playBwin, setPlayBwin] = useState(0)
    // const [dogFallwin, dogFallAwin] = useState(0)

    // 处理表单
    const { register, handleSubmit } = useForm();

    // 提交deposit
    const onSubmit = async (data)=>{
      if (walletStore.selectedAddress === "") {
        alert("please connect wallet")
        return
      }
      if (data.amount < 0.01) {
        return
      }
      if (walletStore.chainInfo.worldcupaddr === "") {
        return
      }
      console.log(walletStore)
      const GameFactory = new ethers.Contract(walletStore.chainInfo.worldcupaddr, GameFactoryABI.abi, walletStore.provider);
      const signer = walletStore.provider.getSigner()
      const amountWei = ethers.utils.parseEther(data.amount);
      let depositTx = await GameFactory.connect(signer).deposit(1,2,1668680282,3, {value: amountWei});
      console.log(`depostiTx: ${depositTx.hash}`);
      await depositTx.wait();
      setTxHash(depositTx.hash)
    }

    return (
        <div className="container" style={{"backgroundColor":""}}>
        <div className="clearfix" style={{"marginBottom":"50px"}}></div>
    
        <div className="row">
          <div className="col-md-2 offset-md-3">
            <img src={location.state.playAIcon} alt="" />
            <h4>{location.state.playA}</h4>
          </div>
          <div className="col-md-2">VS</div>
          <div className="col-md-2">
            <img src={location.state.playBIcon} alt="" />
            <h4>{location.state.playB}</h4>
          </div>
        </div>
        <div className="clearfix" style={{"marginBottom":"10px"}}></div>
        <div className="row">
          <div className="col-md-2 offset-md-3 h6">Start Time: </div>
          <div className="col-md-2">
            {location.state.startTime}
          </div>
        </div> 
        <div className="clearfix" style={{"marginBottom":"20px"}}></div>
        <form className="row" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("playAID")} value={location.state.playAID}/>
            <input type="hidden" {...register("playBID")} value={location.state.playBID}/>
            <div className="col-md-6 offset-md-3">
              <div className="h6">Select Team: </div>
              <div className="form-check">
                <label className="form-check-label" forhtml="playAWin">
                <input className="form-check-input" type="radio" value={location.state.playAID} {...register("whichWin")} id="playAWin" />
                  {location.state.playA} Win
                </label>
                <div className="progress">
                  <div className="progress-bar" role="progressbar" aria-valuenow="60"
                    aria-valuemin="0" aria-valuemax="100" style={{"width": "40%"}}>
                    <span className="sr-only">40%</span>
                  </div>
                </div>
              </div>
              <div className="form-check">
                <label className="form-check-label" forhtml="playBWin">
                <input className="form-check-input" type="radio" value={location.state.playBID} {...register("whichWin")} id="playBWin" />
                  {location.state.playB} Win
                </label>
                <div className="progress">
                  <div className="progress-bar" role="progressbar" aria-valuenow="60"
                    aria-valuemin="0" aria-valuemax="100" style={{"width": "40%"}}>
                    <span className="sr-only">40%</span>
                  </div>
                </div>
              </div>
              <div className="form-check">
                <label className="form-check-label" forhtml="dogfall">
                <input className="form-check-input" type="radio" value={location.state.playAID+location.state.playBID} {...register("whichWin")} id="dogfall" defaultChecked />
                  Dogfall
                </label>
                <div className="progress">
                  <div className="progress-bar" role="progressbar" aria-valuenow="60"
                    aria-valuemin="0" aria-valuemax="100" style={{"width": "40%"}}>
                    <span className="sr-only">40%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="clearfix" style={{"marginBottom":"10px"}}></div>
            <div className="col-6 offset-md-3 h5">
              <label forhtml="amount">
                Deposit Amount: 
              </label>
              <input type="number" id="amount" min={0.01} step={0.01} {...register("amount",{min:0.01, required:true})} />
            </div>
            {walletStore.selectedAddress === "" ? <div className="col-6 offset-md-3 primary">you should connect your wallet</div>:
              <div className="col-6 offset-md-3">
                <span>Your Address: {walletStore.selectedAddress}    <br/>balance: {walletStore.balanceInEther}</span>
              </div>
            }
            {txHash==="" ? "": 
            <div><div className="clearfix" style={{"marginBottom":"10px"}}></div>
            <div className="col-6 offset-md-3" >
                <span>Deposit Transaction: {txHash} </span>
            </div></div>
            }
            <div className="clearfix" style={{"marginBottom":"20px"}}></div>
            <div className="col-6 offset-md-3 text-center">
              <button type="submit" className="btn btn-primary">Deposit Submit</button>
            </div>
          </form>
      </div>
    )
}

export default observer(Deposit)