import React, { Component } from "react";
// import axios from "axios";

import axios from "../../axios";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";
import post from "../../components/Post/Post";

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false
  };
  componentDidMount() {
    axios
      .get("/posts")
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return { ...post, author: "Max" };
        });
        this.setState({ posts: updatedPosts });
        console.log(response);
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: true });
      });
  }
  postSelectedHandler = id => {
    this.setState({ selectedPostId: id });
  };
  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong!</p>;
    if (!this.state.error) {
      posts = this.state.posts.map(posts => {
        return (
          <Post
            key={post.id}
            title={posts.title}
            author={posts.author}
            clicked={() => this.postSelectedHandler(posts.id)}
          ></Post>
        );
      });
    }

    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
