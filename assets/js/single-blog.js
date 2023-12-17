async function fetchBlogs() {
    try {

        const apiUrl = 'https://www.googleapis.com/blogger/v3/blogs/3070876788201062603/posts?callback=getBlogsFromBlogger&key=AIzaSyBkUZD6a2V9kZaW792072uWWpQLrdy86NI';
        const response = await $.ajax({
            url: apiUrl, method: 'GET', dataType: 'jsonp', crossOrigin: true
        });

        getBlogsFromBlogger(response);
    } catch (error) {
        //console.error('Error fetching data:', error);
        //$('#blog').addClass('d-none');
    }
}

function getBlogsFromBlogger(response) {
    let blogContentElem = $('#blog-content'),
        query = window.location.search.substring(1),
        vars = query.split("="),
        ID = vars[1];

    setTimeout(() => {
        blogContentElem.empty();

        $.each(response.items, function (key, value) {
            if (value.id === ID) {
                blogContentElem.append(`
                    <div class="post-box">
              <div class="post-thumb">
                <img src="assets/img/blog-1.png" class="img-fluid" alt="">
              </div>
              <div class="post-meta">
                <h1 class="article-title">${value.title}</h1>
                <ul>
                  <li>
                    <span class="bi bi-person"></span>
                    <a href="#">${value.author.displayName}</a>
                  </li>
                  <li>
                    <span class="bi bi-tag"></span>
                    <a href="#">${value.labels.join(', ')}</a>
                  </li>
                </ul>
              </div>
              <div class="article-content">
                ${value.content}
              </div>
            </div>
                `);
            }
        });
    }, 1500);
}

$(document).ready(function () {
    fetchBlogs();
});