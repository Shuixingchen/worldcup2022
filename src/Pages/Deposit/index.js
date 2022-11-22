
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {useLocation} from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import walletStore from '../../store/WalletStore';
import GameFactoryABI from '../../abi/GameFactory.json';
import GameABI from '../../abi/Game.json';
import {ethers} from 'ethers'
import {CalculateToPercentage,showDate} from '../../Components/Utils/time'
 
// 通过react-hook-form处理表单
function Deposit() {
    // 获取路由参数
    const location = useLocation()
    const [txHash,setTxHash] = useState("")

    // 获取当前结果百分比
    const [playAwinP, setPlayAwin] = useState(0)
    const [playBwinP, setPlayBwin] = useState(0)
    const [dogFallwinP, setDogFallwin] = useState(0)

    // 充值交易等待
    const [waitTx, setWaitTx] = useState(false)
    useEffect(()=>{
      const fetchData = async ()=>{
        if (walletStore.provider === undefined) {
          console.log("aa")
          return
        }
        if (location.state.contractAddr == "") {
          console.log("bb")
          return
        }
        console.log(`contractAddr: ${location.state.contractAddr}`)
        const Game = new ethers.Contract(location.state.contractAddr, GameABI.abi, walletStore.provider);
        let awinBalance = await Game.getBalance(location.state.playAID);
        let bwinBalance = await Game.getBalance(location.state.playBID);
        let dogfallBalance = await Game.getBalance(location.state.playAID+location.state.playBID);
        awinBalance = parseFloat(ethers.utils.formatEther(awinBalance))
        bwinBalance = parseFloat(ethers.utils.formatEther(bwinBalance))
        dogfallBalance = parseFloat(ethers.utils.formatEther(dogfallBalance))
        console.log(`a:${awinBalance}, b: ${bwinBalance}, dogfall: ${dogFallwinP},addr: ${location.state.contractAddr}`)
        let allBalance = awinBalance + bwinBalance + dogfallBalance
        setPlayAwin(CalculateToPercentage(awinBalance, allBalance))
        setPlayBwin(CalculateToPercentage(bwinBalance, allBalance))
        setDogFallwin(CalculateToPercentage(dogfallBalance, allBalance))
      }
      fetchData()
    },[walletStore.selectedAddress,waitTx])

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
      console.log(data)
      const GameFactory = new ethers.Contract(walletStore.chainInfo.worldcupaddr, GameFactoryABI.abi, walletStore.provider);
      const signer = await walletStore.provider.getSigner()
      const amountWei = ethers.utils.parseEther(data.amount);
      console.log(`worldcup: ${walletStore.chainInfo.worldcupaddr}, signer: ${await signer.getAddress()}, amountwei: ${amountWei}`)
      let depositTx = await GameFactory.connect(signer).deposit(data.playAID,data.playBID,data.startTime,data.whichWin, {value: amountWei});
      console.log(`depostiTx: ${depositTx.hash}`);
      setWaitTx(true)
      setTxHash(depositTx.hash)
      await depositTx.wait();
      setWaitTx(false)
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
            {showDate(location.state.startTime)}
          </div>
        </div> 
        <div className="clearfix" style={{"marginBottom":"20px"}}></div>
        <form className="row" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("playAID")} value={location.state.playAID}/>
            <input type="hidden" {...register("playBID")} value={location.state.playBID}/>
            <input type="hidden" {...register("startTime")} value={location.state.startTime}/>
            <div className="col-md-6 offset-md-3">
              <div className="h6">Select Team: </div>
              <div className="form-check">
                <label className="form-check-label" forhtml="playAWin">
                <input className="form-check-input" type="radio" value={location.state.playAID} {...register("whichWin")} id="playAWin" />
                  {location.state.playA} Win
                </label>
                <div className="progress">
                  <div className="progress-bar" role="progressbar" aria-valuenow="60"
                    aria-valuemin="0" aria-valuemax="100" style={{"width": playAwinP+"%"}}>
                    <span className="sr-only">{playAwinP}%</span>
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
                    aria-valuemin="0" aria-valuemax="100" style={{"width": playBwinP+"%"}}>
                    <span className="sr-only">{playBwinP}%</span>
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
                    aria-valuemin="0" aria-valuemax="100" style={{"width": dogFallwinP+"%"}}>
                    <span className="sr-only">{dogFallwinP}%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="clearfix" style={{"marginBottom":"10px"}}></div>
            <div className="col-6 offset-md-3 h5">
              <label forhtml="amount">
                Deposit Amount: 
              </label>
              <input className="form-control" type="number" id="amount" min={0.01} step={0.01} {...register("amount",{min:0.01, required:true})} />
            </div>
            {walletStore.selectedAddress === "" ? <div className="col-6 offset-md-3 primary">you should connect your wallet</div>:
              <div className="col-6 offset-md-3">
                <span>Your Address: {walletStore.selectedAddress}    <br/>balance: {walletStore.balanceInEther} Matic</span>
              </div>
            }
            {txHash==="" ? "": 
            <div><div className="clearfix" style={{"marginBottom":"10px"}}></div>
            <div className="col-6 offset-md-3" >
                <span>Deposit Transaction: {txHash} </span>
            </div></div>
            }
            {/* wait tx */}
            {waitTx ? <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            </div>:""}
            
            <div className="clearfix" style={{"marginBottom":"20px"}}></div>
            <div className="col-6 offset-md-3 text-center">
              <button type="submit" className="btn btn-primary">Deposit Submit</button>
            </div>
          </form>
      </div>
    )
}

export default observer(Deposit)