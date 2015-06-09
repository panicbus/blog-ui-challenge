// Written by Nico Crisafulli

$(document).ready(function(){

	////////////////////////////////
	/////// CREATE NEW POST ////////
	////////////////////////////////
	$('#newBlogPost').submit(function(e) {
		e.preventDefault();

		// Get the data from elements on the page:
		var blogTitle = $('#title').val(),
				blogText = $('#text').val(),
				url = '/Blog/api';

		// Send the data to the API
		var postIt = $.post(url, {title: blogTitle, text: blogText});

		// after submit, return to main
		postIt.done(function(data) {
			window.location = '/app/main.html';
		});
	});


	////////////////////////////////
	/////// VIEW SINGLE POST ///////
	////////////////////////////////
	$('#postList').on('click', 'li', function(e){
		e.preventDefault();
		var $this = $(this),
				postId = $(this).children('.post-list-post').attr('data-id'); // grab the attr from the child element
		$('#blogContent').empty();

		$('li').removeClass('current');
		$this.addClass('current');

		var request_list = $.ajax({
			url: '/Blog/api',
			type: 'get',
			dataType: 'json'
		});

		request_list.done(function(data){
			$(data.blog.posts).each(function(index, elem){
				if(elem.id == postId){
					blogTitle = elem.title;
					blogText = elem.text;
					blogDate = elem.timestamp;
					blogId = elem.id;
				}
			});

			// append post to content area
			$('#blogContent').append('<div class="blog-post" data-id="' + blogId + '"><div class="content-area-title">' +
																'<span class="post-title col-xs-12 col-md-7">' +	blogTitle +
																'</span><span class="post-date col-xs-12 col-md-5">' + blogDate + '</span>' +
																'</div><div class="content-area-text">' +
																	blogText +
																'</div>' +
																'<div class="edit-delete">' +
																'<a href="" class="edit-post">Edit</a> | <a href="" class="delete-post">Delete</a></div></div>'
																);
		});
	});


	///////////////////////////
	/////// EDIT POST /////////
	///////////////////////////
	$('#blogContent').on('click', '.edit-post', function(e){
		var $this = $(this).closest('.blog-post');
		e.preventDefault();
		var postId = $this.attr('data-id');
				// grab the text & remove extra white space
				postTitle = $this.find('.post-title').text().trim();
				postText = $this.find('.content-area-text').text().trim();

		// first clear the div then append the editing form
		$('#blogContent').empty().append('<div class="edit-post-body" data-id="' + postId + '"><div class="edit-post-header">Edit Post</div>' +
					'<div class="post-title"><form action="/app/main.html" method="post" id="editBlogPost" class="form-inline">' +
					'<div class="form-group"><label for="title">Title</label>' +
					'<input type="text" class="form-control" id="title" name="title"/></div><br/><div class="form-group">' +
					'<label for="text">Text</label><textarea class="form-control" rows="12" id="text" name="text"></textarea>' +
					'</div><br/><div class="edit-btn-container"><input type="submit" class="btn btn-primary edit-post-btn" value="Submit"/></div></form></div></div>');

		// add the post text in the form fields to edit and resubmit, the double selector & val() was necessary
		$('#title').val($('#title').val() + postTitle);
		$('#text').val($('#text').val() + postText);

		$('#editBlogPost').submit(function(e) {
			e.preventDefault();
			blogTitle = $('#title').val();
			blogText = $('#text').val()
			url = '/Blog/api/' + postId;

			// Send the data to the API
			var postIt = $.post(url, {title: blogTitle, text: blogText});
			//refresh once it's done
			postIt.done(function(){
				window.location = '/app/main.html';
			});

		});

	});

	///////////////////////////
	/////// DELETE POST ///////
	///////////////////////////

	$('#blogContent').on('click', '.delete-post', function(e){
		e.preventDefault();
		var $this = $(this).closest('.blog-post'),
				postId = $this.attr("data-id");
		$.ajax({
			url: "/Blog/api/" + postId,
			type: 'DELETE',
			success: function(result) {
				$this.remove();
			}
		})
		location.reload();
	});


});
