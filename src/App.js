import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import Items from './items';
import Alert from '@material-ui/lab/Alert';
import Grow from '@material-ui/core/Grow';
import { useScrollTrigger } from '@material-ui/core';

const styles = makeStyles( theme => ({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    sectionstyle: {
        maxWidth: 600,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fdfbfb",
        position: "relative",
        top: 100,
        boxShadow: "5px 5px 5px grey"
    },
    textstyle: {
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 20
    },
    formstyle: {
        marginBottom: 30,
        marginLeft: 50,
        marginRight: 50
    },
    buttonstyle: {
        height: 40
    },
    alertstyle: {
        width: 414,
        marginTop: 20,
        [theme.breakpoints.down('sm')]: {
            width: 314
        }
    },
    buttonstyle2: {
        marginBottom: 20
    },
    textfieldstyle: {
        width: "350px",
        backgroundColor: "#ebedee",
        [theme.breakpoints.down('sm')]: {
            width: 250
        }
    }
}))

const handleLocalStorage = () => {
    let item = localStorage.getItem('lists');
    if(item) {
        return JSON.parse(localStorage.getItem('lists'))
    } else {
        return []
    }
}


export default function App() {

    const[item,setItem] = useState();

    const[lists,setLists] = useState(handleLocalStorage());

    const[ids,setIds] = useState(0);
    
    const[alert,setAlert] = useState(false);

    const[isRemoved,setIsRemoved] = useState(false);

    const[isThere,setIsThere] = useState(false);
    
    const[isEdit,setIsEdit] = useState(false);

    const[isId,setIsId] = useState();

    const[display,setDisplay] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!item) {
            setIsThere(true);
            setTimeout(() => setIsThere(false),1000)
        } else if(item && isEdit) {
            setLists(lists.map((list) =>{
                if(list.id === isId) {
                    return {...list,name: item}
                } else {
                    return list
                }
            }))
            setIsEdit(false)
            setItem('')
            setIsId(null)
        } else {
            const newItem = { id: ids, name: item}
            setLists([...lists,newItem]);
            console.log(lists);
            setIds(ids + 1);
            setAlert(true);
            setTimeout(() => setAlert(false),1000)
            setItem('')
        } 
    }
    
    const handleRemove = (id) => {
        const remove = lists.filter((list) => list.id !== id)
        setLists(remove);
        console.log(remove);
        setIsRemoved(true);
        setTimeout(() => setIsRemoved(false),1000);
    }

    const handleCopy = (list,id) => {
        setItem(list);
        setIsEdit(true);
        setIsId(id);
    } 

    React.useEffect(() => {
        localStorage.setItem('lists' , JSON.stringify(lists))
    },[lists])

    React.useEffect(() => setTimeout(() => setDisplay(true),500),[]);

    const classes = styles();

    return (
        <Grow in={display}>
        <div className={classes.root}>
            <section className={classes.sectionstyle}>
                { alert && <div className={classes.alertstyle}>
                <Alert variant="filled" severity="success">Item Added Succesfully</Alert>
                </div> }
                { isRemoved && <div className={classes.alertstyle}>
                <Alert variant="filled" severity="error">Item Removed Succesfully</Alert>
                </div> }
                { isThere && <div className={classes.alertstyle}>
                <Alert variant="filled" severity="error">Invalid Input</Alert>
                </div> }
                <Typography variant="h5" className={classes.textstyle}>Grocery List</Typography>
                <form className={classes.formstyle} onSubmit={handleSubmit}>
                    <TextField variant="outlined" size="small" placeholder="Milk"  value={item} onChange={(e) => setItem(e.target.value)} className={classes.textfieldstyle}/>
                    <Button variant="contained" color="primary" size="medium" className={classes.buttonstyle} type="submit">{isEdit ? 'Edit' : 'Add'}</Button>
                </form>
                {lists.map((list,index) => {
                    return <Items key={list.id} {...list} index={index} remove={() => handleRemove(list.id)} copy={() => handleCopy(list.name,list.id)}/>
                })}
                <Button size="small" color="primary" className={classes.buttonstyle2} onClick={() => {
                    setLists([]);
                    setIsRemoved(true);
                    setTimeout(() => setIsRemoved(false),1000);
                    }}>Clear Items</Button>
                </section>
        </div>
        </Grow>
    )
}

