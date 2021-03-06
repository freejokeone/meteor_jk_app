Template.postEdit.events({
	'submit form':function(e){
		e.preventDefault();

		var currentPostId=this._id;

		var postProperties={
			url:$(e.targrt).find('[name=url]').val(),
			title:$(e.target).find('[name=title]').val()
		}

		//set id not defined


		Posts.update(currentPostId,($set:postProperties),function(error){
			if(error){
				//alert error information
				throwError(error.reason);
			}else{
				Router.go('postPage',{_id:currentPostId});
			}
		});
	},
	'click .delete':function(e){
		e.preventDefault();
		if(confirm("Delete this post?")){
			var currentPostId=this._id;
			Posts.remove(currentPostId);
			Router.go('postsList');
		}
	}
});

Template.postEdit.onCreated(function(){
	Session.set('postEditErrors',{});
});
Template.postEdit.helpers({
	errorMessage:function(field){
		return Session.get('postEditErrors')[field];
	},
	errorClass:function(field){
		return !!Session.get('postEditErrors')[field]?'has-error':"";
	}
})