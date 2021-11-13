import React, { Component } from 'react';

class TermForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { terms: [] };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state.term = '';
    }

    handleChange(event) {
        this.setState({ term: event.target.value });
    }

    handleSubmit(event) {
        
        this.setState({ terms: [...this.state.terms, this.state.term] });
        this.props.parentCallback(this.state.terms);
            console.log('A term was submitted: ' + this.state.term);
            event.preventDefault();
        
    }

    

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Add Search Terms:  
          <input type="text" term={this.state.term} onChange={this.handleChange} />
                </label>
                <input type="submit" ref ="Add" value="Add" />
                <input type="submit" ref ="Clear" value="Clear" />
                <ul>{this.state.terms.map(item => (
                  <li key={item}>{item}</li>
                  ))}
                </ul>
            </form>
            

        );
    }
}
export default TermForm;