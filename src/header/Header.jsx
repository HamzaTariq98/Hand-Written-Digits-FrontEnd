import siteLogo from '/favicon.png'
import './Header.css'

function Header(props) {

  const user_name = props.user_name

  const total_pred = props.total_pred
  const total_perc = (props.total_correct) ? (parseFloat(props.total_correct/props.total_pred*100).toFixed(1)+'%') : '0%'

  const total_user_pred = props.total_user_pred
  const total_user_perc = (props.total_user_correct) ? (parseFloat(props.total_user_correct/props.total_user_pred*100).toFixed(1)+'%') : '0%'

  return (
    <>
    <div className='container header'>
        <div className='row'>
          <div className='col-sm'><img className='mainpage-img' src={siteLogo} alt="number 5" width={60} height={60}/></div>
          <div className='col-sm'>
            <b>Total Drawings: {total_pred}</b>
            <br />
            <b>Model Accuracy: {total_perc}</b>
          </div>
          <div className='col-sm'>
            {user_name}'s Drawings: {total_user_pred}
            <br />
            Accuracy: {total_user_perc}
          </div>
        </div>
    </div>
    </>
  )
}

export default Header
