import React from 'react';
import { connect } from 'react-redux';
import * as actionType from '../../store/actions';

const Tile = (props) => {
    const eventOnClickFunc = () => {
        if(props.tileId === 'nominate') {
            props.nominatedData(props.item)
        } else {
            const getId = props.item.imdbID;
            const testThis = [...props.nominatedDataList];
            testThis.splice(testThis.findIndex(i => i['imdbID'] === getId),1);
            props.removeNomination(testThis);
        }

    }
    return <div className='movie-tile' key={props.id}>
        <div class="movie-details">
            <div className='movie-title'>{props.item.Title}</div>
            <div className='movie-year'>({props.item.Year})</div>
        </div>
        <button className="nominate-me" onClick={eventOnClickFunc} disabled={props.val || undefined}>{props.button}</button>
    </div>
}

const mapStateToProps = state => {
	return {
        nominatedDataList: state.nominatedData
	}
}

const mapDispatchToProps = dispatch => {
	return {
		nominatedData: (data) => dispatch({ type: actionType.NOMINATED_DATA, payload: data }),
        removeNomination: (data) => dispatch({ type: actionType.REMOVE_NOMINATED_DATA, payload: data })
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Tile);
