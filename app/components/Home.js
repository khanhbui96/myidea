import React,{ useEffect} from 'react';
import {Send} from '@material-ui/icons';
import {Typography, FormControl, InputLabel, Select, Container, Button, Icon} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom'
import routes from '../constants/routes';
const style = makeStyles({
    title: {
        margin: 16
    }
})

const Home = (props)=>{
    const classes = style();
    const {
        getAllCollections, 
        getAllPays, 
        collections, 
        pays,
        filterCollectionByMonth,
        filterPayByMonth
    } = props;
    useEffect(()=>{
        getAllCollections();
        getAllPays();
    },[])
    return (
        <React.Fragment >
            <Link to={routes.HOME}>
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
            <div style={{display: 'flex',  justifyContent: 'center', alignItems: 'center', flexDirection:'column'}}>
            <Typography className = {classes.title} style={{ textAlign: 'center' }} variant='h4'>
                Báo cáo tài chính tiểu đoàn 25
            </Typography>
            <FormControl  className={classes.formControl}>
                    <InputLabel htmlFor="age-native-simple">Tháng</InputLabel>
                    <Select native onChange={(e) => {
                        if(!e.target.value){
                            getAllCollections();
                            getAllPays()
                        }else{
                            filterCollectionByMonth(e.target.value);
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
                <Container>
                    <Typography className = {classes.title} variant='h4'>
                        Tổng thu: {collections.sum.sum1} 
                        <Link to={routes.COLLECTIONS} style={{marginLeft: 6}}>
                            <Button variant="outlined" color="primary" className={classes.button}>
                                Chi tiết  
                                <Send style={{marginLeft: 6}}/>
                            </Button>
                        </Link>
                    </Typography>
                    <Typography className = {classes.title} variant='h4'>
                        Chi thu: {pays.sum.sum1}
                        <Link to = '/pays' style={{marginLeft: 6}}>
                            <Button variant="outlined" color="primary" className={classes.button}>
                                Chi tiết  
                                <Send style={{marginLeft: 6}}/>
                            </Button>
                        </Link> 
                    </Typography>
                    <Typography className = {classes.title} variant='h4'>
                        Quỹ: {collections.sum.sum1 - pays.sum.sum1}
                    </Typography>
                </Container>
            </div>
            
        </React.Fragment>
    )
};

export default Home
