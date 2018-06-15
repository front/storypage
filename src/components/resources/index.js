// External Dependencies
import { map, isEmpty, startCase, keys } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

// Internal Dependencies
import * as Actions from '../../store/actions';

class ResourcesIndex extends React.Component {
	constructor( props ) {
		super( props );
		
		this.state = {
			fields: [],
		};
	}

	componentDidMount() {
		this.props.fetchResources();
	}

	componentWillReceiveProps( nextProps ) {
		if ( this.props.resources !== nextProps.resources ) {
			const { resources } = nextProps;

			if ( ! isEmpty( resources ) ) {
				const fields = keys( map( resources )[ 0 ] );
				this.setState( { fields } );
			}
		}
	}

	renderHeaders() {
		const { fields } = this.state;

		let headers = <th>No { this.props.type } found</th>;

		if ( ! isEmpty( fields ) ) {
			headers = fields.map( field => <th key={ `header-${ field }` }><code>{ field }:</code></th> );
		}

		return <thead><tr>{ headers }</tr></thead>;
	}

	renderBody() {
		const { fields } = this.state;

		if ( ! isEmpty( fields ) ) {
			const body = map( this.props.resources, item => {
				return <tr key={ `${ this.props.type }-${ item.id }` }>{ fields.map( field => {
					return <td key={ field }><pre>{ JSON.stringify( item[ field ], null, 2 ) }</pre></td>;
				} ) }</tr>;
			} );

			return <tbody>{ body }</tbody>;
		}	
	}

	renderRequests() {
		const requests = {
			types: [
				// { path: '/wp/v2/types', description: 'Get all types' },
				{ path: '/wp/v2/types/[slug]', description: 'Get one type by slug' },
			],
		};

		const reqs = requests[ this.props.type ];

		if ( ! isEmpty( reqs ) ) {	
			return ( 
				<table className="table table-bordered">
					<thead>
						<tr>
							<th>apiRequest</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{
							map( reqs, req => {
								return ( 
									<tr key={ `req-${ req.path }` }>
										<td><code>{ req.path }</code></td>
										<td>{ req.description }</td>
									</tr>
								);
							} )
						}
					</tbody>
				</table>
			);
		}
	}

	render() {
		return (
			<section key={ this.props.key }>			
				<h3>{ startCase( this.props.type ) } <small>(<Link target="_blank" to={ `https://v2.wp-api.org/reference/${ this.props.type }` }>WP documentation</Link>)</small></h3>

				{ this.renderRequests() }				

				<table className="table table-striped table-responsive">
					{ this.renderHeaders() }					
					{ this.renderBody() }
				</table>
			</section>
		);
	}
}

function mapStateToProps( state, ownProps ) {
	return { resources: state[ ownProps.type ] };
}

function mapDispacthToProps( dispatch, ownProps ) {
	return bindActionCreators( { fetchResources: Actions[ `fetch${ startCase( ownProps.type ) }` ] }, dispatch );
}

export default connect( mapStateToProps, mapDispacthToProps )( ResourcesIndex );
