import { Link } from 'react-router-dom';

function Items(props) {
    return (
        <tr>
            <td scope="row">2022-11-21 12:00:00</td>
            <td><img src="https://ssl.gstatic.com/onebox/media/sports/logos/h0FNA5YxLzWChHS5K0o4gw_48x48.png" alt="" />aaa</td>
            <td><img src="https://ssl.gstatic.com/onebox/media/sports/logos/h0FNA5YxLzWChHS5K0o4gw_48x48.png" alt="" />bbb</td>
            <td><Link to="/deposit"><button>Deposit{props.name}</button></Link></td>
        </tr>
    )
}

export default Items