import React from "react"
import PropTypes from "prop-types"

class NewPostForm extends React.Component {
  constructor (props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeAttribute = this.onChangeAttribute.bind(this);
    this.state = { title: null, content: null }
  }

  onChangeAttribute({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleSubmit (event) {
    event.preventDefault();
    let body = JSON.stringify({authenticity_token: this.props.csrf_token, post: {title: this.state.title, content: this.state.content} })
    fetch('http://localhost:3000/p', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-Token': this.props.csrf_token,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: body,
        credentials: 'same-origin'
      }).then((response) => {return response.json()})
      .then((post)=>{
        console.log(post);
      })
  }

  render () {
    const { image_url } = this.props;

    return (
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <form className="new_post" id="new_post" onSubmit={this.handleSubmit}>
              <h2>Submit a post</h2>
              <div className='row'>
                <div className='col-md-1'>
                  <img src={image_url} />
                </div>
                <div className='col-md-11'>
                  <div className='form-group'>
                    <input className="form-control" placeholder="Title" type="text" name="title" id="post_title" onChange={this.onChangeAttribute} />
                  </div>
                  <div className='form-group'>
                    <textarea className="form-control" style={{minHeight: '200px'}} placeholder="Type your content here, including links. At least, explain the content around your link in a single paragraph." name="content" id="post_content" onChange={this.onChangeAttribute}>
                    </textarea>
                  </div>
                  <small className='form-text text-muted'>You can use Markdown.
                    <br/>
                    Note that your post may be edited to suit the format of the site.
                  </small>
                  <input type="submit" name="commit" value="Save" className="btn" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewPostForm
