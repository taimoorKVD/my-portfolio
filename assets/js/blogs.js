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
    let blogContentElem = $('#blog-content');

    setTimeout(() => {
        blogContentElem.empty();

        $.each(response.items, function (key, value) {
            blogContentElem.append(`
                <div class="col-md-4">
                    <div class="card card-blog">
                        <div class="card-img p-3">
                            <a href="blog-single.html?bl=${value.id}"><img src="assets/img/blog-1.png" alt="" class="img-fluid"></a>
                        </div>
                        <div class="card-body">
                            <div class="card-category-box">
                                <div class="card-category">
                                    <h6 class="category">${value.labels.join(', ')}</h6>
                                </div>
                            </div>
                            <h3 class="card-title"><a href="blog-single.html?bl=${value.id}">${value.title}</a></h3>
                            <p class="card-description d-none"></p>
                        </div>
                        <div class="card-footer">
                            <div class="post-author">
                                <a href="#">
                                    <img src="assets/img/taimoor-hussain-profile.png" alt="" class="avatar rounded-circle">
                                    <span class="author">${value.author.displayName}</span>
                                </a>
                            </div>
                            <div class="post-date">
                                <span class="bi bi-clock"></span> ${new Date(value.updated).toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>
            `);
        });
    }, 1500);
}

$(document).ready(function () {
    fetchBlogs();
});