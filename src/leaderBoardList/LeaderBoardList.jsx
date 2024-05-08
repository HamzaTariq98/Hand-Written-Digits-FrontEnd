import React from 'react';
import './LeaderBoardList.css';
import Leader from './leader/Leader';

function LeaderBoardList(props) {

    return (
        <>
            <div className='container leaderBoardList'>
                <Leader name={'user name'} total={'Total'} accuracy={'Accuracy'} classname={'headerleader'}/>
                {props.leaderboard.map((leader, index) => (
                    <Leader key={index} name={leader.name} total={leader.total} accuracy={(leader.correct !== 0) ? ((leader.correct / leader.total * 100).toFixed(0) + '%') : '0%'}  classname={'leader'}/>
                ))}
            </div>
        </>
    );
}

export default LeaderBoardList;
