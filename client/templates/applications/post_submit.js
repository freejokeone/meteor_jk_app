Template.postSubmit.events({
	'submit form':function(e){
		e.preventDefault();

		var post={
			url:$(e.target).find('[name=url]').val(),
			title:$(e.target).find('[name=title]').val()
		};
		post._id=Posts.insert(post);

		//路由位置不同
		Router.go('postPage',post);
	}
});


// Template.postSubmit.events({
// 	'submit form':function(e){
// 		e.preventDefault();

// 		var post={
// 			url:$(e.target).find('[name=url]').val(),
// 			title:$(e.target).find('[name=title]').val()
// 		}
// 		Meteor.call('postInsert',post,function(error,result){
// 			if(error){
// 				return alert(error.reason);
// 			}
// 			Router.go('postPage',{_id:result._id});
// 		});
// 	},
// })