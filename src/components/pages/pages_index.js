// External Dependencies
import { map, isEmpty } from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Internal Dependencies
import { fetchPages, deletePage } from '../../store/actions';

class PagesIndex extends React.Component {
	constructor( props ) {
		super( props );

		this.onDeleteButtonClick = this.onDeleteButtonClick.bind( this );
	}
	componentDidMount() {
		// this.props.fetchPages( { _fields: 'id,title', per_page: 1 } );
		this.props.fetchPages();
	}

	onDeleteButtonClick( event ) {
		const pageId = event.target.value;
		this.props.deletePage( pageId );
	}

	renderPages() {
		if ( isEmpty( this.props.pages ) ) {
			return <tr><td colSpan="3">No pages</td></tr>;
		}

		return map( this.props.pages, page => {
			return (
				<tr key={ page.id }>
					<td>{ page.title }</td>
					<td><Link to={ `/pages/${ page.id }` }>preview</Link></td>
					<td><Link to={ `/pages/${ page.id }/edit` }>edit</Link></td>
					<td><button value={ page.id } onClick={ this.onDeleteButtonClick }>delete</button></td>
				</tr>
			);
		} );
	}

	render() {
		return (
			<div>
				<h1>Pages index!</h1>
				<nav>					
					<Link to="/">Go home!</Link> | <Link to="/pages/new">New page</Link>
				</nav>

				<br />

				<table>
					<thead>
						<tr>
							<th style={ { textAlign: 'left' } }>Page</th>
							<th style={ { textAlign: 'left' } } colSpan="3">Actions</th>
						</tr>
					</thead>
					<tbody>
						{ this.renderPages() }
					</tbody>
				</table>
			</div>
		);
	}
}

function mapStateToProps( { pages } ) {
	return { pages };
}

export default connect( mapStateToProps, { fetchPages, deletePage } )( PagesIndex );
