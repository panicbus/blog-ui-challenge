$(document).ready(function(){

	$('#postList').on('click', 'a.post-list-post', function(e){
		e.preventDefault();
		var $this = $(this);
		var postId = $(this).attr('data-id');
		console.log(postId);
		$('.blog-content').empty();

		var get_request = $.ajax({
			url: '../Blog/api',
      type: 'get',
      dataType: 'json',
      data: postId

    });

    get_request.done(function(data){

			$(data.blog.posts).each(function(index, element){
		    if(element.id == postId){
			    console.log(element.title);
			    console.log(element.text);
		    	blogTitle = element.title;
		    	blogText = element.text;
			  }
			})

      $('.blog-content').append('<div class="content-area-title">' +
      														blogTitle +
      													'</div><div class="content-area-text">' +
      														blogText +
      													'</div>'
      													)
    });
	});

})