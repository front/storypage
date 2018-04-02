// External dependences
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import renderHTML from 'react-render-html';

// Internal dependences
import { fetchPage } from '../../store/actions';
import { getPage } from '../../store/selectors';

class PagesShow extends React.Component {
	componentDidMount() {
		if ( ! this.props.page ) {
			const { id } = this.props.match.params;
			if ( id ) {
				this.props.fetchPage( id );
			}
		}
	}

	render() {
		if ( ! this.props.page ) {
			return <div>Loading page...</div>;
		}

		return (
			<div>
				<h1><em>{ this.props.page.title }</em> Preview!</h1>
				<p><Link to="/pages">Go back!</Link></p>
				<p><Link to={ `/pages/${ this.props.page.id }/edit` }>Edit</Link></p>

				<hr />

				<div>
					{ renderHTML( this.props.page.content ) }
				</div>
			</div>
		);
	}
}

function mapStateToProps( state, ownProps ) {
	return { page: getPage( state, ownProps.match.params.id ) };
}

export default connect( mapStateToProps, { fetchPage } )( PagesShow );
