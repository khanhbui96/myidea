import React, { useEffect } from 'react';
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
import CollectionsActions from './elements/ColectionActions';


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
        marginRight: 10
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1 ,
    }
}));

function Collections(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [collection, setCollection] = React.useState(null);
    const [status, setStatus] = React.useState('');
    const [keyword, setKeyword] = React.useState('');
    const {
        collections,
        getAllCollections,
        deleteCollection,
        updateCollection,
        addCollection,
        filterCollectionByMonth,
        filterCollectionKey
        } = props;
    useEffect(()=>{
        getAllCollections();
    },[])
    function handleClickOpen() {
        setCollection(null)
        setOpen(true);
    }
    function handleClose() {
        setOpen(false);
    }
    const handleChange = (e) => {
        console.log(e.target.value)
    };
    const Collection = (collection)=>{
        return <TableRow >
                            <StyledTableCell>{collection.time}</StyledTableCell>
                            <StyledTableCell align="left">{collection.content} </StyledTableCell>
                            <StyledTableCell align="left">{collection.money}</StyledTableCell>
                            <StyledTableCell align="left">{collection.person}</StyledTableCell>
                            <StyledTableCell align="left"></StyledTableCell>
                            <StyledTableCell align="left">{collection.status ? 'đã thu' : "chưa thu"}</StyledTableCell>
                            <StyledTableCell align="left" >
                                <Button
                                    onClick={() => {
                                        setCollection(collection)
                                        setOpen(true)
                                    }}
                                    variant="outlined"
                                    size="small"
                                    color="primary"
                                    style ={{marginRight: 10}}
                                    >
                                    Sửa
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    size="small" color="primary" 
                                    onClick={() => { deleteCollection(collection._id) }}>
                                    Xóa
                                </Button>
                            </StyledTableCell>
                        </TableRow>
    };
    const filterColllection = (collections)=>{
        if(collections.isUpdate){
            if(keyword !==''){
                return collections.data.filter(element=>{
                    return element.content.indexOf(keyword) !== -1 || element.time.indexOf(keyword) !== -1
                    }).map((collection, index) => {
                        return Collection(collection)
            })  
            }else{
                if(status !== ''){
                    return collections.data.filter(item => item.status.toString() == status).map((collection, index) => {
                        return Collection(collection)
                })   
                }else{
                    return collections.data.map((collection, index) => {
                        return Collection(collection)})
                }
            }
            
        }else{
            return <div>empty</div>
        }
        
        
        
    }
    return (
        <Paper className={classes.root}>
            
            <Typography style={{ textAlign: 'center' }} variant='h4'> 
            <Link to = '/' style={{float: 'left'}}>
                <KeyboardBackspace/>
            </Link>
            Quản lí các khoản thu của Tiểu đoàn</Typography>
            <div>
                <TextField
                    style={{ margin: 16 }}
                    placeholder='Tìm kiếm'
                    onChange={(e)=>{
                        setKeyword(e.target.value)}}
                />
                <TextField
                    style={{ margin: 16 }}
                    placeholder='Người chịu trách nhiệm thu'
                    onChange={(e)=>{
                        if(!e.target.value){
                            getAllCollections()
                        }else{
                            filterCollectionKey(e.target.value)
                        }
                    }}
                />
                <FormControl className={classes.formControl}>
                    <InputLabel  htmlFor="age-native-simple">Trạng thái {''}</InputLabel>
                    <Select native onChange={(e) => {
                        setStatus(e.target.value)
                    }}>
                        <option value="" ></option>
                        <option value={true}>Đã thu</option>
                        <option value={false}>Chưa thu</option>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl} style={{marginLeft: 10}}>
                    <InputLabel htmlFor="age-native-simple">Tháng </InputLabel>
                    <Select native onChange={(e) => {
                        if(!e.target.value){
                            getAllCollections()
                        }else{
                            filterCollectionByMonth(e.target.value)
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
                    <div><CollectionsActions
                        collection={collection}
                        handleChange={handleChange}
                        addCollection={addCollection}
                        updateCollection={updateCollection}
                        handleClose={setOpen} />
                    </div>
                </Dialog>
            </div>

            <Table className={classes.table}>
                <TableHead>
                    <TableRow style={{ background: "#3f51b5" }}>
                        <StyledTableCell style={{ background: "#3f51b5" }}>Thời gian</StyledTableCell>
                        <StyledTableCell style={{ background: "#3f51b5" }} align="left">Nội dung thu</StyledTableCell>
                        <StyledTableCell style={{ background: "#3f51b5" }} align="left">Số tiền thu</StyledTableCell>
                        <StyledTableCell style={{ background: "#3f51b5" }} align="left">Người chịu trách nhiệm</StyledTableCell>
                        <StyledTableCell style={{ background: "#3f51b5" }} align="left">Kí tên</StyledTableCell>
                        <StyledTableCell style={{ background: "#3f51b5" }} align="left">Trạng thái</StyledTableCell>
                        <StyledTableCell style={{ background: "#3f51b5" }} align="left">Thao tác</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                   {filterColllection(collections)}
                </TableBody>
            </Table>
            <div >
                <Typography variant='h4'>Tổng:{collections.sum.sum1} </Typography>
                <Typography variant='h4'>Đã thu:{collections.sum.sum2} </Typography>
                <Typography variant='h4'>Chưa thu:{collections.sum.sum3} </Typography>
            </div>
                <div>
                </div>
        </Paper>
    );
};

export default Collections