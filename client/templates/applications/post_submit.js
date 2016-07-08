// Template.postSubmit.events({
// 	'submit form':function(e){
// 		e.preventDefault();

// 		var post={
// 			url:$(e.target).find('[name=url]').val(),
// 			title:$(e.target).find('[name=title]').val()
// 		};
// 		post._id=Posts.insert(post);

// 		//路由位置不同
// 		Router.go('postPage',post);
// 	}
// });


Template.postSubmit.events({
	'submit form': function(e) {
		e.preventDefault();
		var post = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val()
		};
		var errors=validatePost(post);
		if(errors.title||errors.url){
			return Session.set('postSubmitErrors',errors);
		};

		Meteor.call('postInsert', post, function(error, result) {
		// 向用户显示错误信息并终止
		if (error) return throwError(error.raeson);

		// 显示结果，跳转页面
		if (result.postExists) alert('This link has already been posted（该链接已经存在）');
		Router.go('postPage', {_id: result._id});
		// Router.go('postsList');
		});
	}
});

Template.postSubmit.onCreated(function(){
	Session.set('PostSubmitError',{});
});

Template.postSubmit.helpers({
 	errorMessage:function(field){
 		return Session.get('postSubmitErrors')[field];
 	},
 	errorClass:function(field){
 		return !!Session.get('postSubmitErrors')[field]?'has-error':"";
 	}
 })