
import { useForm } from "react-hook-form";
import {useLocation} from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import walletStore from '../../store/WalletStore';
import GameFactoryABI from '../../abi/GameFactory.json';
import {ethers} from 'ethers'
 
// 通过react-hook-form处理表单
function Deposit() {
    // 获取路由参数
    const location = useLocation()
    console.log(location.state)

    // 处理表单
    const { register, handleSubmit } = useForm();
    // 提交deposit
    const onSubmit = async (data)=>{
        console.log(data)
        const GameFactory = new ethers.Contract('0x613bce9B16D3CaCc099eC48D8356Cc51B56545b8', GameFactoryABI.abi, walletStore.provider);
        const amountWei = ethers.utils.parseEther(data.amount);
        let depositTx = await GameFactory.deposit(1,2,1668680282,3, {value: amountWei});
        console.log(`depostiTx: ${depositTx.hash}`);
        await depositTx.wait();
    }

    return (
        <div className="container" style={{"backgroundColor":""}}>
        <div className="clearfix" style={{"marginBottom":"50px"}}></div>
    
        <div className="row">
          <div className="col-md-2 offset-md-3">
            <img src={location.state.playAIcon} alt="" />
            <h5>{location.state.playA}</h5>
          </div>
          <div className="col-md-2">VS</div>
          <div className="col-md-2">
            <img src={location.state.playBIcon} alt="" />
            <h5>{location.state.playB}</h5>
          </div>
        </div>
        <div className="clearfix" style={{"marginBottom":"10px"}}></div>
        <div className="row">
          <div className="col-md-2 offset-md-3 h5">Start Time: </div>
          <div className="col-md-2">
            {location.state.startTime}
          </div>
        </div> 
        <div className="clearfix" style={{"marginBottom":"20px"}}></div>
        <form className="row" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("playAID")} value={location.state.playAID}/>
            <input type="hidden" {...register("playBID")} value={location.state.playBID}/>
            <div className="col-md-6 offset-md-3">
              <div className="h5">Select Team: </div>
              <div className="form-check">
                <label className="form-check-label" forhtml="playAWin">
                <input className="form-check-input" type="radio" value={location.state.playAID} {...register("whichWin")} id="playAWin" />
                   PlayA Win
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label" forhtml="playBWin">
                <input className="form-check-input" type="radio" value={location.state.playBID} {...register("whichWin")} id="playBWin" />
                  PlayB Win
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label" forhtml="dogfall">
                <input className="form-check-input" type="radio" value={location.state.playAID+location.state.playBID} {...register("whichWin")} id="dogfall" defaultChecked />
                  Dogfall
                </label>
              </div>
            </div>
            <div className="clearfix" style={{"marginBottom":"10px"}}></div>
            <div className="col-6 offset-md-3 h5">
              <label forhtml="amount">
                Deposit Amount: 
              </label>
              <input type="number" id="amount" min={0.01} step={0.01} {...register("amount")} />
            </div>
            {walletStore.selectedAddress === "" ? <div className="col-6 offset-md-3 primary">you should connect your wallet</div>:
              <div className="col-6 offset-md-3">
                <span>Your Address: {walletStore.selectedAddress}    balance: {walletStore.balanceInEther}</span>
              </div>
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