import './Leader.css'


function Leader(props) {

  return (
    <>
    <div className={'container leader '+props.classname}>
        <div className='row'>
            <div className='col-4'>{props.name}</div>
            <div className='col-4'>{props.total}</div>
            <div className='col-4'>{props.accuracy}</div>
        </div>
        <hr />
    </div>
    </>
  )
}

export default Leader
