// External dependences
import { map } from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Internal dependences
import { fetchPages } from '../../store/actions';

class PagesIndex extends React.Component {
	componentDidMount() {
		this.props.fetchPages();
	}

	renderPages() {
		return map( this.props.pages, page => {
			return (
				<tr key={ page.id }>
					<td>{ page.title }</td>
					<td><Link to={ `/pages/${ page.id }` }>preview</Link></td>
					<td><Link to={ `/pages/${ page.id }/edit` }>edit</Link></td>
				</tr>
			);
		} );
	}

	render() {
		return (
			<div>
				<h1>Pages index!</h1>
				<p><Link to="/">Go home!</Link></p>
				<p><Link to="/pages/new">New page</Link></p>

				<br />
				<br />

				<table>
					<thead>
						<tr>
							<td>Page</td>
							<td colSpan="2">Actions</td>
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

export default connect( mapStateToProps, { fetchPages } )( PagesIndex );
