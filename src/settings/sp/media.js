import Backbone from 'backbone';
import _ from 'underscore';

let MediaFrame = Backbone.View.extend( {
	open: function() {
		alert('open modal');
	}
} );

MediaFrame.Select          = MediaFrame.extend();
MediaFrame.Post            = MediaFrame.Select.extend();
MediaFrame.Manage          = MediaFrame.Select.extend();
MediaFrame.ImageDetails    = MediaFrame.Select.extend();
MediaFrame.AudioDetails    = MediaFrame.Select.extend();
MediaFrame.VideoDetails    = MediaFrame.Select.extend();
MediaFrame.EditAttachments = MediaFrame.Select.extend();

let media = function( attributes ) {
	// console.log(attributes);
	var MediaFrame = media.view.MediaFrame,
	frame;

	if ( ! MediaFrame ) {
		return;
	}

	attributes = _.defaults( attributes || {}, {
		frame: 'select'
	});

	if ( 'select' === attributes.frame && MediaFrame.Select ) {
		frame = new MediaFrame.Select( attributes );
	} else if ( 'post' === attributes.frame && MediaFrame.Post ) {
		frame = new MediaFrame.Post( attributes );
	} else if ( 'manage' === attributes.frame && MediaFrame.Manage ) {
		frame = new MediaFrame.Manage( attributes );
	} else if ( 'image' === attributes.frame && MediaFrame.ImageDetails ) {
		frame = new MediaFrame.ImageDetails( attributes );
	} else if ( 'audio' === attributes.frame && MediaFrame.AudioDetails ) {
		frame = new MediaFrame.AudioDetails( attributes );
	} else if ( 'video' === attributes.frame && MediaFrame.VideoDetails ) {
		frame = new MediaFrame.VideoDetails( attributes );
	} else if ( 'edit-attachments' === attributes.frame && MediaFrame.EditAttachments ) {
		frame = new MediaFrame.EditAttachments( attributes );
	}

	delete attributes.frame;

	media.frame = frame;

	return frame;
}

_.extend( media, { 
	model: {}, 
	view: { MediaFrame }, 
	controller: {}, 
	frames: {}
});

const attachmentModel       = Backbone.Model.extend();
const attachmentsCollection = Backbone.Collection.extend();

media.model = attachmentModel.extend();
media.model.Selection = attachmentModel.extend();

export default media;
