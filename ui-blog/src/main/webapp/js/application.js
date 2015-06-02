$(document).ready(function(){

	$('#postList').on('click', 'a.post-list-post', function(e){
		e.preventDefault();
		var $this = $(this);
		var postId = $(this).attr('data-id');
		console.log(postId);
		$('.blog-content').empty();

		var get_request_list = $.ajax({
			url: '../Blog/api',
      type: 'get',
      dataType: 'json',
      data: postId

    });

    get_request_list.done(function(data){

			$(data.blog.posts).each(function(index, element){
		    if(element.id == postId){
			    console.log(element.title);
			    console.log(element.text);
		    	blogTitle = element.title;
		    	blogText = element.text;
		    	blogDate = element.timestamp;
			  }
			});

      $('.blog-content').append('<div class="content-area-title">' +
      														blogTitle + '<span class="post-date">' + blogDate + '</span>' +
      													'</div><div class="content-area-text">' +
      														blogText +
      													'</div>' +
      													'<div class="edit-delete">' +
																	'<a href="">Edit</a> | <a href="">Delete</a></div>'
      													);
    });
	});

	$('.sidebar-header').click(function(e){
		e.preventDefault();
		$('.blog-content').empty();

		var get_request_all = $.ajax({
			url: '../Blog/api',
      type: 'get',
      dataType: 'json',
      // data: postId
    });

    get_request_all.done(function(data){

			$(data.blog.posts).each(function(index, element){
	    	blogTitle = element.title;
	    	blogText = element.text;
	    	blogDate = element.timestamp;

	      $('.blog-content').append('<div class="blog-post"><div class="content-area-title">' +
																		blogTitle + '<span class="post-date">' + blogDate + '</span>' +
																	'</div><div class="content-area-text">' +
																		blogText +
																	'</div>' +
																	'<div class="edit-delete">' +
																		'<a href="">Edit</a> | <a href="">Delete</a></div></div>'
																	);

			});
		});
  });

});