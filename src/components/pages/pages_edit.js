import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPage } from '../../actions';

import GutenbergEditor from '../gutenberg_editor';

class PagesEdit extends React.Component {
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

		const page = {
			content: { raw: this.props.page.content },
			templates: '',
			title: { raw: this.props.page.title },
			type: 'page',
			id: this.props.page.id
		};
		
		return (
			<div>
				<h1>Edit!</h1>
				<p><Link to="/pages">Go back!</Link></p>
				<GutenbergEditor post={ page } />
			</div>
		)
	}
}

function mapStateToProps({ pages }, ownProps) {
	return { page: pages[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPage })(PagesEdit);
