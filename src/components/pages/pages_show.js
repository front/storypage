import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import renderHTML from 'react-render-html';

import { fetchPage } from '../../actions';

// Gutenberg imports
// import ReactHtmlParser from 'react-html-parser';

class PagesShow extends React.Component {
	componentDidMount() {
		if (!this.props.page) {
			const { id } = this.props.match.params;
			if (id) {
				this.props.fetchPage(id);
			}
		}
	}
	
	render() {
		if (!this.props.page) {
			return <div>Loading page...</div>;
		}
		
		return (
			<div>
				<h1>Page!</h1>
				<p><Link to="/pages">Go back!</Link></p>
				<p><Link to={ `/pages/${ this.props.page.id }/edit` }>Edit</Link></p>

				<br/>
				<br/>

				<div>
					<h1>{ this.props.page.title }</h1>
					{ renderHTML(this.props.page.content) }
				</div>
			</div>
		)
	}
}

function mapStateToProps({ pages }, ownProps) {
	return { page: pages[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPage })(PagesShow);
