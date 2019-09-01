import { connect } from 'react-redux';
import Home from '../components/Home';
import {getAllCollections, filterCollectionByMonth} from '../actions/collections.actions';
import {getAllPays, filterPayByMonth} from '../actions/pays.actions';

const mapStateToProps = (state)=>{
  return {
      pays: state.pays,
      collections: state.collections
  }
}
export default connect(
  mapStateToProps,
  {
    getAllCollections,
    filterCollectionByMonth,
    getAllPays, 
    filterPayByMonth
  }
)(Home);
