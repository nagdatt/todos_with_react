import React,{useState,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from '@material-ui/core/Button';
import { Alert, AlertTitle } from '@material-ui/lab';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const divStyle={
  margin:10,
}


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "90%",
      
    },
  },
}));


export default function BasicTextFields() {
  let initTodo;
  const get_todos=JSON.parse(localStorage.getItem("todos"));
  
  if(localStorage.getItem("sno")==="[]" || localStorage.getItem("sno")===null){
    localStorage.setItem("sno",0);
  }
  const get_Sno=parseInt(localStorage.getItem("sno"));
  if(get_todos===null){
    initTodo=[];
  }
  else{
    initTodo=get_todos;
  }
  const classes = useStyles();
  const classes2 = useStyles();
  const [title,setTitle]=useState("");
  const [desc,setDescription]=useState("");
  const [sno,setSno]=useState(get_Sno);
  const [todos,setTodos ]=useState(initTodo);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Update the document title using the browser API
  // console.log(todos);
   //console.log(get_Sno);
    localStorage.setItem("todos",JSON.stringify(todos));
    localStorage.setItem("sno",parseInt( get_Sno)+1);
    
    
    
    
  });
  let render=(
    <Collapse in={open}>
        <Alert
        severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>Sucess</AlertTitle>
        Todo is added, <strong>check it out!</strong>
        </Alert>
      </Collapse>);
  const submit=(e)=>{
    e.preventDefault() ;
    //console.log(title,desc);
    if(title==="" || desc===""){
      console.log("Entering Wrong data");
    }
    else{
      //console.log(todos);
      setSno(sno+1);
      const arr={
        dtitle:title,
        ddesc:desc,
        dsno:sno,
      }
      setTodos([...todos,arr]);
      setOpen(true);
      

     
    }
  }
  return (
    <div>
   
      <Card className={classes.root} style={divStyle} >
      <CardContent>
        <h3>Add Todo</h3>
      <form className={classes2.root} noValidate autoComplete="off" onSubmit={submit}>
        <TextField id="title" label="Title" variant="outlined"  value={title} onChange={e=>setTitle(e.target.value)}/>
        <TextField id="desc" label="Description" variant="outlined" value={desc} onChange={e=>setDescription(e.target.value)}/>
        <Button variant="contained" color="primary" type="submit">
        Add
      </Button>
      </form>
      
      </CardContent>
      <CardActions>
       
      </CardActions>
    </Card>
    {render}
    </div>
  );
}

