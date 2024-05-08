import './Model.css'


function Model(props) {

  return (
    <>
    <div className={'container model '+props.classname}>
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

export default Model
