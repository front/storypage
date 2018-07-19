// External Dependencies
import React from 'react';

class InputNSubmit extends React.Component {
  constructor (props) {
    super(props);
    this.state = { inputValue: '' };
  }

  render () {
    const { inputValue } = this.state;
    const {
      value,
      onSubmit,
      onCancel,
    } = this.props;

    return (
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          defaultValue={ value }
          onChange={ event => this.setState({ inputValue: event.target.value }) }
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-success"
            type="button"
            onClick={ () => onSubmit(inputValue) }
          >Ok</button>
          <button
            className="btn btn-outline-danger"
            type="button"
            onClick={ onCancel }
          >Cancel</button>
        </div>
      </div>
    );
  }
}

export default InputNSubmit;
