import React,{Fragment, useState, useEffect} from 'react'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { Button, FormControl, makeStyles, MenuItem, Slider, TextField } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Adding } from '../Redux/Action';
import getUid  from 'get-uid'



//material UI styling

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
  }));

  
  function Main() {
    
    
    const dispatch = useDispatch();


    const [data, setData] = useState({
        name: '',
        time : '01:00:00',
        type : [],
        NoSlices : 6,
        diameter : 60,
        spiceness: 3,
        NoOfBread : 1,
    })
    

    const [order, setOrder] = useState({})

    // Cases of Order Array Depending on the type

    useEffect(()=>{
        if (data.type[0] === 'pizza') {setOrder({type: 'Pizza',preparation_time : data.time, name: data.name, no_of_slices : data.NoSlices, diameter : data.diameter ,id: getUid() })}
        else if(data.type[0] === 'Soup'){setOrder({type: 'soup',preparation_time : data.time, name: data.name,spiceness : data.spiceness ,id: getUid()})}
        else{setOrder({type: 'sandwich',preparation_time : data.time, name: data.name,slices_of_bread: data.NoOfBread ,id: getUid() })}
    },[data])


    // MAterial UI Styling
    const classes = useStyles();

    // Handling submit of the order and modifying redux State
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(Adding(order))
    }
    
    // Handling Change,Values and Marks of Slider
    const handleChange = (event, newValue) => {
        setData({...data, spiceness: newValue})
    };
    
    function valuetext(value) {
        return value;
    }

    const marks = [
        {value: 10,label: 'Spiceness',},{value: 9,},{value: 8,},{value: 7,},{value: 6,},{value: 5,},{value: 4,},{value: 3,},{value: 2,},{value: 1,},
    ]
    
    
    return (
        <div className="container">
            { data.type.length ? <h1 style={{paddingTop: '5px', marginBottom: '-1px'}}> Ordering Your {data.type} </h1> : null}
            <form className='form' onSubmit={handleSubmit} className={classes.container}>

                <div className="main">

                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                        required
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={data.type[0]}
                            onChange={(e)=> setData({...data,type : [e.target.value]})}
                        >
                            <MenuItem value={'pizza'}>pizza</MenuItem>
                            <MenuItem value={'Soup'}>Soup</MenuItem>
                            <MenuItem value={'Sandwich'}>Sandwich</MenuItem>
                        </Select>
                    </FormControl>


                    <TextField required value={data.name} onChange={(e) => setData({...data,name : e.target.value})} className={classes.textField} id="standard-basic" label="Name"  />
                    <TextField
                    required
                        id="time"
                        label="Time Of Preparation"
                        type="time"
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        inputProps={{
                        step: 1,
                        }}
                        value={data.time}
                        onChange={(e) => setData({...data,time : e.target.value})}
                        
                    />
                </div>
                <div className="extra">

                                {/* Switiching between different component according to Type */}
                    {
                        data.type.map(t => {
                            if(t === 'pizza') return <Fragment>
                                    <h2>Extra For Pizza</h2>
                                    <TextField required className={classes.textField} value={data.NoSlices} onChange={e => setData({...data,NoSlices : e.target.value})} id="standard-basic" label="No.Slices" type='number'  name="quantity" InputProps={{ inputProps: { min: "0", max: "12", step: "2" } }} />
                                    <TextField required className={classes.textField} id="standard-basic" label="Diameter cm" value={data.diameter} onChange={e => setData({...data,diameter : e.target.value})} type='number'  name="quantity" InputProps={{ inputProps: { min: "30", max: "150", step: "5" } }} />
                                </Fragment>

                            else if(t === 'Soup') return <Fragment>
                                <h2>Extra For Soup</h2>
                                 <Slider
                                style={{width : '200px', marginTop: '50px'}}
                                getAriaValueText={valuetext}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={10}
                                marks={marks}
                                value={data.spiceness}
                                onChange={handleChange}
                            />
                                </Fragment>
                            else return <Fragment>
                                <h2>Extra For Bread</h2>
                                <TextField required className={classes.textField} id="standard-basic" label="slices of bread"  type='number' value={data.NoOfBread} onChange={e => setData({...data,NoOfBread: e.target.value})}  name="quantity" InputProps={{ inputProps: { min: "1", step: "1" } }} />
                            </Fragment> 
                        })
                    }
                </div>
                
                <Button className='btnn' type='submit' variant="contained" color="primary"> Order </Button>
            </form>
        </div>
    )
}

export default Main
