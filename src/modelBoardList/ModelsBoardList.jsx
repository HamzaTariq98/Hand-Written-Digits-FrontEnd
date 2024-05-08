import React from 'react';
import './ModelsBoardList.css';
import Model from './model/Model';

function ModelBoardList(props) {

    return (
        <>
            <div className='container modelBoardList'>
                <Model name={'model name'} total={'Total'} accuracy={'Accuracy'} classname={'headermodel'}/>
                {props.modelboard.map((model, index) => (
                    <Model key={index} name={model.model_name} total={model.total} accuracy={(model.correct !== 0) ? ((model.correct / model.total * 100).toFixed(0) + '%') : '0%'}  classname={'model'}/>
                ))}
            </div>
        </>
    );
}

export default ModelBoardList;
