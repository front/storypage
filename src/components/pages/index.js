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
			const badgeType = page.type === 'page' ? 'secondary' : 'info';
			return (
				<tr key={ page.id }>
					<td><span className={ `badge badge-${ badgeType }` }>{ page.type }</span></td>
					<td>{ page.title }</td>
					<td><Link className="btn btn-sm btn-outline-success" to={ `/pages/${ page.id }` }>Preview</Link></td>
					<td><Link className="btn btn-sm btn-outline-primary" to={ `/pages/${ page.id }/edit` }>Edit</Link></td>
					<td><button className="btn btn-sm btn-outline-danger" value={ page.id } onClick={ this.onDeleteButtonClick }>Delete</button></td>
				</tr>
			);
		} );
	}

	render() {
		return (
			<div className="container">
				<section>
					<h1>Pages and Posts</h1>
					<p className="text-right">					
						<Link className="btn btn-outline-secondary float-left" to="/">Go home!</Link>{ " " }
						<Link className="btn btn-secondary" to="/pages/new?type=page">New page</Link>{ " " }
						<Link className="btn btn-info" to="/pages/new?type=post">New post</Link>
					</p>
				</section>

				<br />

				<table className="table ">
					<thead>
						<tr>
							<th>Type</th>
							<th>Title</th>
							<th colSpan="3">Actions</th>
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
