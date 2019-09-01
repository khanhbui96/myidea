import React, {useEffect} from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import formatDate from '../../utils/formatDate';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import {Subtitles} from '@material-ui/icons'
import {FormControl,  Button, InputLabel, Select, IconButton, Dialog } from '@material-ui/core';
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
    const [err, setErr] =React.useState('');
    const [content, setContent] = React.useState('');
    const [money, setMoney] = React.useState('');
    const [mentor, setMentor] = React.useState('');
    const [person, setPerson] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [open, setOpen] = React.useState(false);
    
    function handleClickOpen() {
        setOpen(true);
      }
      function handleClose() {
        setOpen(false);
      }
    const calculatorInput = (e)=>{
        const value = e.target.value;
        var ans ='';
        
        try{
            setErr('')
            ans = eval(value);
            setMoney(ans.toString())
        }catch(err){
            setErr('Sai cú pháp')
        };
        if(!value){
            setErr('')
            setMoney('');
            
        }
        
    }
    function handleDateChange(date) {
        setSelectedDate(date);
        setTime(formatDate(date));
    }
    useEffect(()=>{
        if(props.pay){
            setSelectedDate(`${props.pay.time.slice(3,5)}/${props.pay.time.slice(0,2)}/${props.pay.time.slice(6)}`)
            setContent(props.pay.content);
            setMoney(props.pay.money);
            setPerson(props.pay.person);
            setMentor(props.pay.mentor)
            setStatus(props.pay.status)
        }
    },[])
    return(
        <React.Fragment>
            {props.pay ? <DialogTitle id="form-dialog-title">Sửa</DialogTitle> : <DialogTitle id="form-dialog-title">Tạo mới</DialogTitle>}
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
                            label="Nội dung chi"
                            fullWidth
                            value={content}
                            onChange={(e)=>setContent(e.target.value)}
                            name='content'
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Số tiền thu"
                            name='money'
                            fullWidth
                            value={money}
                            onChange={(e)=>{setMoney(e.target.value)}}
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Người triển khai"
                            name='mentor'
                            value={mentor}
                            onChange={e=>setMentor(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Người chi"
                            name='person'
                            value={person}
                            onChange={e=>setPerson(e.target.value)}
                            fullWidth
                        />
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-simple">Trạng thái</InputLabel>
                        <Select native defaultValue={props.pay ? props.pay.status : null}  onChange={(e)=>{setStatus(e.target.value)}}>
                            <option value="" />
                            <option value={true}>Đã thanh toán</option>
                            <option value={false}>Chưa thanh toán</option>
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
                            if(props.pay){
                                props.updatePay(props.pay._id ,{time, money, content, mentor, person, status});
                            }else{
                                props.addPay({time, money, content, person, status});
                            }
                            props.handleClose(false)
                        }} 
                            color="primary">
                            {props.pay ? 'Cập nhật' : 'Tạo mới'}
          </Button>
                    </DialogActions>
    </React.Fragment>
    )
}
export default CollectionsActions