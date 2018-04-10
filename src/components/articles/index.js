// External Dependencies
import { map, isEmpty } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

// Internal Dependencies
import { fetchArticles } from '../../store/actions';

class ArticlesIndex extends React.Component {
	componentDidMount() {
		this.props.fetchArticles( { order: 'desc', orderBy: 'date' } );
	}

	renderArticles() {
		if ( isEmpty( this.props.articles ) ) {
			return <tr><td colSpan="2">No articles</td></tr>;
		}

		return map( this.props.articles, article => {
			return (
				<tr key={ article.id }>
					<td>{ article.id }</td>
					<td>{ article.title.rendered }</td>
					<td style={ { textAlign: 'right' } }>{ article.category_id }</td>
				</tr>
			);
		} );
	}

	render() {
		return (
			<div key="articles-list">
				<h3>Articles</h3>
				<table>
					<thead>
						<tr>
							<th style={ { textAlign: 'left' } }>ID</th>
							<th style={ { textAlign: 'left' } }>Title</th>
							<th style={ { textAlign: 'left' } }>Category_id</th>
						</tr>
					</thead>
					<tbody>
						{ this.renderArticles() }
					</tbody>
				</table>
			</div>
		);
	}
}

function mapStateToProps( { articles } ) {
	return { articles };
}

export default connect( mapStateToProps, { fetchArticles } )( ArticlesIndex );
