import React, { Component } from 'react';
import api from '../services/api';
import './feed.css';
import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';
import io from 'socket.io-client';

class Feed extends Component {

    state = {
        feed: []
    };

    async componentDidMount() {
        this.registerToSocket();
        const resp = await api.get('posts');

        this.setState({ feed: resp.data });
    }

    // atualiza a página, tanto com posts e likes
    registerToSocket = () => {
        const socket = io('http://localhost:3000');

        socket.on('post', newPost => {
            this.setState({
                feed: [newPost, ...this.state.feed]
            })
        })

        socket.on('like', likedPost => {
            this.setState({
                feed: this.state.feed.map(post => 
                    post._id === likedPost._id ? likedPost : post
                )
            })
        })
    }

    handleLike = id => {
        api.post(`/posts/${id}/like`)
    }

    render() {
        const { feed } = this.state;

        return (
            <section id="post-list">
                {
                    feed.map(post => (
                        <article key={post._id}>
                            <header>
                                <div className="user-info">
                                    <span>{post.author}</span>
                                    <span className="place">{post.place}</span>
                                </div>
                                <img src={more} alt="Mais" />
                            </header>
                            <img src={`http://localhost:3000/files/${post.image}`} alt="" />        
                            <footer>
                                <div className="actions">
                                    <button type="button" onClick={() => this.handleLike(post._id)}>
                                        <img src={like} alt="Curtir" />
                                    </button>                                    
                                    <img src={comment} alt="Comentar" />
                                    <img src={send} alt="Enviar" />
                                    <strong>{post.likes} curtidas</strong>
                                    <p>
                                        {post.description}
                                        <span>{post.hashtags}</span>
                                    </p>
                                </div>
                            </footer>
                        </article>
                    ))
                }
            </section>
        );
    }
}

export default Feed;
