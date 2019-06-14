import React, { Component } from 'react';
import api from '../services/api';
import './new.css';

class New extends Component {
    state = {
        image: null,
        author: '',
        place: '',
        description: '',
        hashtags: ''        
    }

    handleSubmit = async e => {
        e.preventDefault();
        const { image, author, place, description, hashtags } = this.state;
        const data = new FormData();
        data.append('image', image);
        data.append('author', author);
        data.append('place', place);
        data.append('description', description);
        data.append('hashtags', hashtags);
        
        await api.post('posts', data);

        this.props.history.push('/');
    }

    handleImageChange = e => {
        this.setState({ image: e.target.files[0] });
    }

    handleChange = (e) => {
        this.setState({ 
            [e.target.name]: e.target.value
        });
    }

    render() {
        const { author, place, description, hashtags } = this.state;

        return (
            <form id="new-post" onSubmit={this.handleSubmit}>
                <input type="file" onChange={this.handleImageChange} />
                <input 
                    type="text" 
                    name="author"
                    placeholder="Autor"
                    onChange={this.handleChange}
                    value={author}
                />
                <input 
                    type="text" 
                    name="place"
                    placeholder="Local"
                    onChange={this.handleChange}
                    value={place}
                />
                <input 
                    type="text" 
                    name="description"
                    placeholder="Descrição"
                    onChange={this.handleChange}
                    value={description}
                />
                <input 
                    type="text" 
                    name="hashtags"
                    placeholder="Hashtags"
                    onChange={this.handleChange}
                    value={hashtags}
                />
                <button type="submit">Enviar</button>
            </form>
        )
    }
}

export default New;
