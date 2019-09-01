import React, {useEffect} from 'react';
import formatDate from '../../utils/formatDate'
import { makeStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import {FormControl,  Button, InputLabel, Select, IconButton, Dialog } from '@material-ui/core';
import {Subtitles} from '@material-ui/icons'
import 'date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    iconButton:{
        marginTop: 16
    }
}));

const CollectionsActions = (props)=>{
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState(Date.now());
    const [time, setTime] = React.useState(formatDate(new Date() ));
    const [content, setContent] = React.useState('');
    const [money, setMoney] = React.useState('');
    const [person, setPerson] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [err, setErr] =React.useState('');
    const [open, setOpen] = React.useState(false);
    function handleClickOpen() {
        setOpen(true);
      }
    
      function handleClose() {
        setOpen(false);
      }
    function handleDateChange(date) {
        setSelectedDate(date);
        setTime(formatDate(date));
    };
    const calculatorInput = (e)=>{
        const value = e.target.value;
        var ans ='';
        
        try{
            setErr('')
            ans = eval(value);
            console.log(ans)
            setMoney(ans.toString())
        }catch(err){
            setErr('Sai cú pháp')
        };
        if(!value){
            setMoney('');
            setErr('');
        }
    }
    useEffect(()=>{
        if(props.collection){
            setSelectedDate(`${props.collection.time.slice(3,5)}/${props.collection.time.slice(0,2)}/${props.collection.time.slice(6)}`)
            setContent(props.collection.content);
            setMoney(props.collection.money);
            setPerson(props.collection.person);
            setStatus(props.collection.status)
        }
    },[])
    return(
        <React.Fragment>
            {props.collection ? <DialogTitle id="form-dialog-title">Sửa</DialogTitle> : <DialogTitle id="form-dialog-title">Tạo mới</DialogTitle>}
            <DialogContent>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Thoi gian"
                        format="dd/MM/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    </MuiPickersUtilsProvider>
                        <TextField
                            margin="dense"
                            id="name"
                            label="Nội dung thu"
                            fullWidth
                            value={content}
                            onChange={(e)=>setContent(e.target.value)}
                            name='content'
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            fullWidth
                            label="Số tiền thu"
                            name='money'
                            value={money}
                            onChange={(e)=>{setMoney(e.target.value)}}
                        />
                        
                        <TextField
                            margin="dense"
                            id="name"
                            label="Người chịu trách nhiệm"
                            name='person'
                            value={person}
                            onChange={e=>setPerson(e.target.value)}
                            fullWidth
                        />
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-simple">Trạng thái</InputLabel>
                        <Select native defaultValue={props.collection ? props.collection.status : null}  onChange={(e)=>{setStatus(e.target.value)}}>
                            <option value="" />
                            <option value={true}>Đã thu</option>
                            <option value={false}>Chưa thu</option>
                        </Select>
                    </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button  
                        onClick={()=>{
                            props.handleClose(false)
                        }} 
                        color="primary">
                            Hủy
          </Button>
                        <Button onClick={()=>{
                            if(props.collection){
                                props.updateCollection(props.collection._id ,{time, money, content, status});
                            }else{
                                props.addCollection({time, money, content, person, status});
                            }
                            props.handleClose(false)
                        }} 
                            color="primary">
                           {props.collection ? 'Cập nhật' : 'Tạo mới'}
          </Button>
                    </DialogActions>
    </React.Fragment>
    )
}
export default CollectionsActions
