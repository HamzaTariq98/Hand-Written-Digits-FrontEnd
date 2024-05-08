import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './header/Header'
import Drawing from './drawing/Drawing'
import LeaderBoardList from './leaderBoardList/LeaderBoardList'
import ModelBoardList from './modelBoardList/ModelsBoardList'

import './main.css'
import { useState ,useEffect ,useRef} from 'react'



// const apiUrl = 'http://0.0.0.0:8000'

const apiUrl = 'http://164.92.142.116:8000'

function Root() {


  const [pagestate, setPagestate] = useState('Loading');

  const [total_pred, setTotal_pred] = useState(0);
  const [total_correct, setTotal_correct] = useState(0);
  const [user_name, setUser_name] = useState('no name');
  const [total_user_pred, setTotal_user_pred] = useState(0);
  const [total_user_correct, setTotal_user_correct] = useState(0);

  
  const [leaderboard, setLeaderboard] = useState([{},{}]);
  const [modelboard, setModelboard] = useState([{},{}]);
  
  const [params, setParams] = useState('');
  const [formData, setFormData] = useState('');

  const is_prediction_correct = useRef('pending');
  const prediction_result = useRef(0);
  const freeze_drawing = useRef(false);
  const is_img_empty = useRef(true);
  const is_new_draw = useRef(true);
  

  // const [is_pred_correct, setIs_pred_correct] = useState('pending');

  const data_update = (data) => {
    setTotal_pred(data.total_pred)
    setTotal_correct(data.total_correct)
    setUser_name(data.user_name)
    setTotal_user_pred(data.total_user_pred)
    setTotal_user_correct(data.total_user_correct)
    setLeaderboard(data.leaderboard)
    setModelboard(data.modelboard)
  }


  const update_is_pred_correct = () =>{
    is_prediction_correct.current = 'pending';
  }

  const update_is_img_empty = () =>{
    is_prediction_correct.current = false;
  }

  const update_is_new_draw = () =>{
    is_new_draw.current = false;
  }

  async function fetchData() {
    await fetch(apiUrl+'/fetch_data',{method: 'POST'})
          .then((response) => response.json())
          .then((data) => {
            data_update(data)
            setPagestate('Loaded')
    })
  }
  
  async function predict(params,formData) {
    is_prediction_correct.current = 'pending'
    await fetch(apiUrl+'/perform_prediction?' + params.toString(),{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: formData
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.result){
        is_prediction_correct.current = 'yes'
      }
        else{
          prediction_result.current = data.prediction_result
          is_prediction_correct.current = 'no'
      }
      
      data_update(data)
            
    })
  }

  useEffect(() => {
    fetchData()
  }, []);

  


  switch (pagestate){
    case 'Loading':
      return(
        <React.StrictMode>
        <div className='container loading'>
          <p>Fetching Leaderboard and user data...</p>
        </div>
      </React.StrictMode>
      )

    case 'Loaded':
      return(
        <React.StrictMode>
        <div className='container'>
            <div className='row headerArea'>
              <Header total_pred={total_pred} total_correct={total_correct} user_name={user_name} total_user_pred={total_user_pred} total_user_correct={total_user_correct} />
            </div>
          <div className='row mainArea'>
            <div className='col'>
              <Drawing user_name={user_name} setParams={setParams} setFormData={setFormData} predict={predict} setUser_name={setUser_name} is_prediction_correct={is_prediction_correct} update_is_pred_correct={update_is_pred_correct} freeze_drawing={freeze_drawing} prediction_result={prediction_result} is_img_empty={is_img_empty} update_is_img_empty={update_is_img_empty} is_new_draw={is_new_draw} update_is_new_draw={update_is_new_draw}/>
            </div>
            <div className='col'>
              <div className='row'>
                <ModelBoardList modelboard={modelboard}/>
              </div>
              <div className='row'>
                <LeaderBoardList leaderboard={leaderboard}/>
              </div>
            </div>
          </div>
        </div>
      </React.StrictMode>
    )


  }
  
}



const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(<Root />);