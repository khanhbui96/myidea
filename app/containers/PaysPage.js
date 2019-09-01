// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Pays from '../components/Pays';
import {
  getAllPays, 
  addPay, 
  deletePay, 
  updatePay, 
  filterPayByMonth, 
  filterPayKey
  
} from '../actions/pays.actions'

const mapStateToProps = state=>{
  return {
    pays: state.pays
  }
}
export default connect(
  mapStateToProps,
  {
    getAllPays, 
    addPay, 
    deletePay, 
    updatePay, 
    filterPayByMonth, 
    filterPayKey
  }
)(Pays);
