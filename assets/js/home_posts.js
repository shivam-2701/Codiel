{
  console.log("Script added");

  let createPost = function () {
    let newPostForm = $(" #new-post-form");
    newPostForm.submit((event) => {
      event.preventDefault();
      $.ajax({
        type: "post",
        url: "/posts/create",
        data: newPostForm.serialize(),
        success: function (response) {
          newPostForm.find(" textarea").val('')
          let newPost = newPostDom(response.data.post);
          // console.log(newPost);
          $("#post-list-contatiner>ul").prepend(newPost);
          deletePost($(" .delete-post-button", newPost));
          createNoty("success", "New Post added");
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };
  // Method to create a post in dom

  let newPostDom = function (post) {
    return $(`<li id="post-${post._id}">
        <p>
          
          <small><a class="delete-post-button"
            href="/posts/destroy/${post._id}">X</a></small>
           ${post.content}
          <br />
          <small>${post.user.name}</small>
        </p>
        <div class="post-comments">
          <form action="/comments/create" method="post">
            <input
              type="text"
              name="content"
              placeholder="Type here to add commnet"
            />
            <input type="hidden" name="post" value="${post._id}" />
            <input type="submit" value="Add Comment" />
          </form>
          <div class="post-comments-list">
            <ul>
            </ul>
          </div>
        </div>
      </li>`);
  };

  let deletePost = function (deleteLink) {
    $(deleteLink).click((event) => {
      event.preventDefault();
      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: (response) => {
          const deletedPost = $(` li#post-${response.data.post_Id}`);
          deletedPost.remove();
          createNoty("success", "Post and related comments deleted");
        },
        error: (error) => {
          console.error(error);
        },
      });
    });
  };
  let postDeletionAjax = () => {
    const deleteButtons = $(" div#post-list-contatiner").find(
      " a.delete-post-button"
    );
    for (let i = 0; i < deleteButtons.length; i++) {
      deletePost($(deleteButtons[i]));
    }
  };

  let createNoty = (type, message) => {
    new Noty({
      theme: "relax",
      text: message,
      type: type,
      layout: "topRight",
      timeout: 1500,
    }).show();
  };
  postDeletionAjax();
  createPost();
}
