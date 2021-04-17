import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';




const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function About() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const[todos,setTodos]=useState(JSON.parse(localStorage.getItem("todos")));
  console.log(todos)

  //let todos=JSON.parse(localStorage.getItem("todos"))  ;
 // console.log("Entering Wrong data");

 // console.log(todos);
 const divStyle={
   margin:10,
 }
 const deleteItem=(key)=>{
 
   let todosUpdates=todos.filter((todo)=>{
     if(todo.dsno!=key)
     return true;
   })
   //console.log(todos)
  setTodos(todosUpdates)
   
   
 }
 useEffect(()=>{
  localStorage.setItem("todos",JSON.stringify(todos));
 })
const WriteTable=(todo,key)=>{
 
  return <div style={divStyle}> 
<Card className={classes.root} variant="outlined" >
      <CardContent>
       
        <Typography className={classes.pos} color="textSecondary">
        {todo.dtitle}
        </Typography>
        <Typography variant="body2" component="p">
          {todo.ddesc}
          <br />
         
        </Typography>
      </CardContent>
      <CardActions>
      <Button variant="contained" color="secondary" onClick={()=>{deleteItem(todo.dsno)}}>
        Delete
      </Button>
      </CardActions>
    </Card>
  </div>
}
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
let renders=todos.length;
if(renders===0){
  renders=<div>
          <Alert severity="warning">No Todos Found, <strong>Please Add Some Tod's!</strong></Alert>

  </div>
}
else{
  renders= todos.map((todo)=>{
    return <div key={todo.dsno}> {WriteTable(todo,todo.dsno)}</div>
   })
}
  return (
    <div className={classes.root}>
      
      {
      renders
    }
    </div>
  );
}