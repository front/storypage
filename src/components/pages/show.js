// External Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import renderHTML from 'react-render-html';
import { isEmpty } from 'lodash';

// Internal Dependencies
import { fetchPost } from '../../store/actions';
import { getPost } from '../../store/selectors';
import Loading from '../loading';

class PagesShow extends React.Component {
	componentDidMount() {
		if ( ! this.props.post ) {
			const { id } = this.props.match.params;
			if ( id ) {
				this.props.fetchPost( id );
			}
		}
	}

	render() {		
		if ( isEmpty( this.props.post ) ) {
			return <Loading />;
		}

		const { content, title, type, id, header, footer } = this.props.post;

		return (
			<div>
				<section className="jumbotron">
					<div className="container">
						<h1>{ title.rendered }</h1>
						<p className="text-right">					
							<Link className="btn btn-outline-secondary float-left" to="/stories">Go to Stories</Link>
							<Link className={ `btn btn-${ type === 'page' ? 'info' : 'secondary' }` } to={ `/${ type }s/${ id }/edit` }>Edit</Link>
						</p>			
					</div>
				</section>

				{
					header && ( <div className="text-center">TODO: Header</div> )
				}
				<div>
					{ renderHTML( content.rendered ) }
				</div>
				{
					footer && ( <div className="text-center">TODO: Footer</div> )
				}
			</div>
		);
	}
}

function mapStateToProps( state, ownProps ) {
	return { post: getPost( state, ownProps.match.params.id ) };
}

export default connect( mapStateToProps, { fetchPost } )( PagesShow );
