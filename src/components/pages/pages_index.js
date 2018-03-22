import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPages } from '../../actions';

class PagesIndex extends React.Component {
	componentDidMount() {
		this.props.fetchPages();
	}

	renderpages() {
		return _.map(this.props.pages, page => {
			return (
				<tr key={ page.id }>
					<td>{ page.title }</td>
					<td><Link to={ `/pages/${page.id}` }>preview</Link></td>
					<td><Link to={ `/pages/${page.id}/edit` }>edit</Link></td>
				</tr>
			);
		});
	}

	render() {
		return (
			<div>
				<h1>Pages index!</h1>
				<p><Link to="/">Go home!</Link></p>
				<p><Link to="/pages/new">New page</Link></p>

				<br/>
				<br/>

				<table>
					<thead>
						<tr>
							<td>Page</td>
							<td colSpan="2">Actions</td>
						</tr>
					</thead>
					<tbody>
						{ this.renderpages() }
					</tbody>
				</table>
			</div>
		)
	}
}

function mapStateToProps( { pages }) {
	return { pages };
}

export default connect(mapStateToProps, { fetchPages })(PagesIndex);
