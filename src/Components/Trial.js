import { Button } from '@material-ui/core';
import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {useHistory} from 'react-router-dom'
import {Removing} from '../Redux/Action';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import axios from 'axios'

function Trial() {
    const State = useSelector(state => state.INOrder)
    const dispatch = useDispatch();
    const history = useHistory();



    // Posting the State of redux  Note: didn't work

    const handleClick = () => {
        if(State.length)
            history.push('/success')
            State.map(one => 
                axios({
                    method: 'post',
                    url: 'https://frosty-wood-6558.getsandbox.com:443/dishes',
                    headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                    },
                    data: one
                }).then(response =>  console.log(response))
                .catch(err => console.log(err))
            ) 
    }



    return (
        <Fragment>
            <h1 style={{color : 'white'}}>Your Order</h1>
            <div className='theOrder'>
                {
                    State.map(one => {
                        return (
                            <div className='chosen'>
                             <h1  > {one.type}  </h1>
                             <HighlightOffIcon onClick={()=> dispatch(Removing(one))}></HighlightOffIcon>
                            </div>
                        )
                    })
                }
    
            </div>
            <Button onClick={handleClick} style={{backgroundColor: 'beige', color: '#290505', fontWeight : '700', marginTop : '-50px'}} className='btnn' type='submit' variant="contained" color="primary"> Confirm </Button>
        </Fragment>
    )
}

export default Trial;
