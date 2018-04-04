// External Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Internal Dependencies
import { fetchPage } from '../../store/actions';
import { getPage } from '../../store/selectors';
import GutenbergEditor from '../gutenberg_editor';

const settings = {
	alignWide: false,
	availableTemplates: [],
	blockTyoes: true,
	disableCustomColors: false,
	titlePlaceholder: 'Add a title here...',
};

class PagesEdit extends React.Component {
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

		const page = {
			content: { raw: this.props.page.content },
			templates: '',
			title: { raw: this.props.page.title },
			type: 'page',
			id: this.props.page.id,
		};

		return (
			<div>
				<h1 
					style={ { margin: 0, height: '32px' } }>
					Editor! <small><Link to="/pages">Go back!</Link></small>
				</h1>
				<GutenbergEditor post={ page } settings={ settings } />
			</div>
		);
	}
}

function mapStateToProps( state, ownProps ) {
	return { page: getPage( state, ownProps.match.params.id ) };
}

export default connect( mapStateToProps, { fetchPage } )( PagesEdit );
