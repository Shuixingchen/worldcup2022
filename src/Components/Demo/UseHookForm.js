
import { useForm } from "react-hook-form";

// 通过react-hook-form处理表单
function UseHookForm() {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data)=>{
        console.log(data)
    }

    return (
        <div className="container">
        <div className="clearfix" style={{"marginBottom":"50px"}}></div>
    
        <div className="row">
          <div className="col-md-2 offset-md-3">
            <img src="https://ssl.gstatic.com/onebox/media/sports/logos/h0FNA5YxLzWChHS5K0o4gw_48x48.png" alt="" />
            <h5>aaaaa</h5>
          </div>
          <div className="col-md-2">VS</div>
          <div className="col-md-2">
            <img src="https://ssl.gstatic.com/onebox/media/sports/logos/h0FNA5YxLzWChHS5K0o4gw_48x48.png" alt="" />
            <h5>aaaaa</h5>
          </div>
        </div>
        <div className="clearfix" style={{"marginBottom":"10px"}}></div>
        <div className="row">
          <div className="col-md-2 offset-md-3 h5">Start Time: </div>
          <div className="col-md-2">
            2022-11-23 12:30:00
          </div>
        </div> 
        <div className="clearfix" style={{"marginBottom":"20px"}}></div>
        <form className="row" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("playAID")} />
            <input type="hidden" {...register("playBID")} />
            <div className="col-md-6 offset-md-3">
              <div className="h5">Select Team: </div>
              <div className="form-check">
                <label className="form-check-label" forhtml="playAWin">
                <input className="form-check-input" type="radio" value={1} {...register("whichWin")} id="playAWin" />
                   PlayA Win
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label" forhtml="playBWin">
                <input className="form-check-input" type="radio" value={2} {...register("whichWin")} id="playBWin" />
                  PlayB Win
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label" forhtml="dogfall">
                <input className="form-check-input" type="radio" value={3} {...register("whichWin")} id="dogfall" defaultChecked />
                  Dogfall
                </label>
              </div>
            </div>
            <div className="clearfix" style={{"marginBottom":"10px"}}></div>
            <div className="col-6 offset-md-3 h5">
              <label forhtml="amount">
                Deposit Amount: 
              </label>
              <input type="number" id="amount" max="10" min="0" step="0.01" {...register("amount")} />
            </div>
            <div className="col-6 offset-md-3">
              <span>Your Address: adfadfadfadf  balance: 1000</span>
            </div>
            <div className="clearfix" style={{"marginBottom":"20px"}}></div>
            <div className="col-6 offset-md-3 text-center">
              <button type="submit" className="btn btn-primary">Deposit Submit</button>
            </div>
          </form>
      </div>
    )
}

export default UseHookForm