// External Dependencies
import { map, isEmpty } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

// Internal Dependencies
import { fetchCategories } from '../../store/actions';

class CategoriesIndex extends React.Component {
	componentDidMount() {
		this.props.fetchCategories();
	}

	renderCategories() {
		if ( isEmpty( this.props.categories ) ) {
			return <tr><td colSpan="2">No categories</td></tr>;
		}

		return map( this.props.categories, category => {
			return (
				<tr key={ category.id }>
					<td>{ category.id }</td>
					<td>{ category.name }</td>
				</tr>
			);
		} );
	}

	render() {
		return (
			<div key="categories-list">
				<h3>Categories</h3>
				<table>
					<thead>
						<tr>
							<th style={ { textAlign: 'left' } }>ID</th>
							<th style={ { textAlign: 'left' } }>Name</th>
						</tr>
					</thead>
					<tbody>
						{ this.renderCategories() }
					</tbody>
				</table>
			</div>
		);
	}
}

function mapStateToProps( { categories } ) {
	return { categories };
}

export default connect( mapStateToProps, { fetchCategories } )( CategoriesIndex );
