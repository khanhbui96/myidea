// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Collections from '../components/Collections';
import {
  getAllCollections,
  deleteCollection, 
  updateCollection, 
  addCollection,
  filterCollectionByMonth,
  filterCollectionKey
} from '../actions/collections.actions'

const mapStateToProps = state=>{
  return {
    collections: state.collections
  }
}
export default connect(
  mapStateToProps,
  {
    getAllCollections,
    deleteCollection,
    updateCollection,
    addCollection,
    filterCollectionByMonth,
    filterCollectionKey
  }
)(Collections);