import React,{useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {KeyboardBackspace} from '@material-ui/icons';
import {Link} from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { Add } from '@material-ui/icons'
import { Typography, Fab, Button, FormControl, InputLabel, Select } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import PaysActions from './elements/PaysActions';


const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
        marginTop: 10
    },
    formControl: {
        margin: theme.spacing(0),
        width: 160,
        marginRight: 10,
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    margin:{
        marginRight: 10
    }
}));

function Pays(props) {
    const classes = useStyles();
    const {getAllPays, pays, addPay, deletePay, updatePay, filterPayByMonth, filterPayKey} = props;
    const [open, setOpen] = React.useState(false);
    const [pay, setPay] = React.useState(null);
    const [status, setStatus] = React.useState('');
    const [keyword, setKeyword] = React.useState('');
    
    function handleClickOpen() {
        setPay(null);
        setOpen(true);
    }
    function handleClose() {
        setOpen(false);
    }
    const handleChange = (e) => {
        console.log(e.target.value)
    }
    const Pay = (pay)=>{
        return <TableRow >
                            <StyledTableCell>{pay.time}</StyledTableCell>
                            <StyledTableCell align="left">{pay.content} </StyledTableCell>
                            <StyledTableCell align="left">{pay.money}</StyledTableCell>
                            <StyledTableCell align="left">{pay.mentor}</StyledTableCell>
                            <StyledTableCell align="left">{pay.person}</StyledTableCell>
                            <StyledTableCell align="left">{pay.status ? 'Đã thanh toán' : "Chưa thanh toán"}</StyledTableCell>
                            <StyledTableCell align="left">
                                <Button
                                    onClick={() => {
                                        setPay(pay)
                                        setOpen(true)
                                    }}
                                    variant="outlined"
                                    size="small"
                                    color="primary"
                                    className={classes.margin}>
                                    Sửa
                                </Button>
                                <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={() => { deletePay(pay._id) }}>
                                    Xóa
                                </Button>
                            </StyledTableCell>
                        </TableRow>
    };
    const filterPays = (pays)=>{
        if(pays.isUpdate){
            if(keyword !==''){
                return pays.data.filter(element=>{
                    return element.content.indexOf(keyword) !== -1 || element.time.indexOf(keyword) !== -1 || element.mentor.indexOf(keyword) !== -1 ||element.person.indexOf(keyword) !== -1
                    }).map((pay, index) => {
                        return Pay(pay)
            })  
            }else{
                if(status !== ''){
                    return pays.data.filter(item => item.status.toString() == status).map((pay, index) => {
                        return Pay(pay)
                })   
                }else{
                    return pays.data.map((pay, index) => {
                        return Pay(pay)})
                }
            }
        }else{
            return <div>empty data</div>
        }
    }
    useEffect(()=>{
        getAllPays()
    },[])
    return (
        <Paper className={classes.root}>
            <Typography style={{ textAlign: 'center' }} variant='h4'>
            <Link to = '/' style={{float: 'left'}}>
                <KeyboardBackspace/>
            </Link>
                Quản lí các khoản chi của Tiểu đoàn</Typography>
            <div>
                <TextField
                    style={{ margin: 16 }}
                    placeholder='Tìm kiếm'
                    onChange={(e)=>{
                        setKeyword(e.target.value)}}
                />
                <TextField
                    style={{ margin: 16 }}
                    placeholder='Người chi'
                    onChange={(e)=>{
                        if(!e.target.value){
                            getAllPays()
                        }else{
                            filterPayKey(e.target.value)
                        }
                    }}
                />
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-native-simple">Tháng</InputLabel>
                    <Select native onChange={(e) => {
                        if(!e.target.value){
                            getAllPays()
                        }else{
                            filterPayByMonth(e.target.value)
                        }
                    }}>
                        <option value="" ></option>
                        <option value="01">Tháng 1</option>
                        <option value="02">Tháng 2</option>
                        <option value="03">Tháng 3</option>
                        <option value="04">Tháng 4</option>
                        <option value="05"> Tháng 5</option>
                        <option value="06">Tháng 6</option>
                        <option value="07"> Tháng 7</option>
                        <option value="08">Tháng 8</option>
                        <option value="09">Tháng 9</option>
                        <option value="10">Tháng 10</option>
                        <option value="11">Tháng 11</option>
                        <option value="12">Tháng 12</option>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-native-simple">Trạng thái</InputLabel>
                    <Select native onChange={(e) => {
                        setStatus(e.target.value)
                    }}>
                        <option value="" ></option>
                        <option value={true}>Đã thanh toán</option>
                        <option value={false}>Chưa thanh toán</option>
                    </Select>
                </FormControl>
                <Fab
                    onClick={handleClickOpen}
                    size="medium"
                    color="primary"
                    aria-label="Add"
                    className={classes.margin}
                    style={{ float: 'right' }}>
                    <Add />
                </Fab>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <div><PaysActions 
                    handleChange={handleChange} 
                    handleClose={setOpen} 
                    addPay={addPay}
                    pay={pay}
                    updatePay={updatePay}
                    /></div>
                </Dialog>
                </div>

            <Table className={classes.table}>
                <TableHead>
                    <TableRow style={{ background: "#3f51b5" }}>
                        <StyledTableCell style={{ background: "#3f51b5" }}>Thời gian</StyledTableCell>
                        <StyledTableCell style={{ background: "#3f51b5" }} align="left">Nội dung chi</StyledTableCell>
                        <StyledTableCell style={{ background: "#3f51b5" }} align="left">Số tiền chi</StyledTableCell>
                        <StyledTableCell style={{ background: "#3f51b5" }} align="left">Người triển khai</StyledTableCell>
                        <StyledTableCell style={{ background: "#3f51b5" }} align="left">Người chi</StyledTableCell>
                        <StyledTableCell style={{ background: "#3f51b5" }} align="left">Trạng thái </StyledTableCell>
                        <StyledTableCell style={{ background: "#3f51b5" }} align="left">Thao tác </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filterPays(pays)}
                </TableBody>
            </Table>
            <div >
                <Typography variant='h4'>Tổng: {pays.sum.sum1}</Typography>
                <Typography variant='h4'>Đã thanh toán: {pays.sum.sum2}</Typography>
                <Typography variant='h4'>Chưa thanh toán:{pays.sum.sum3}  </Typography>
            </div>
        </Paper>
    );
};
export default Pays;