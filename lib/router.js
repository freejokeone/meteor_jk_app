Router.configure({
	layoutTemplate:'layout',
	loadingTemplate:'loading',
	notFoundTemplate:'notFound',
	waitOn:function(){
		return [Meteor.subscribe('posts'),Meteor.subscribe('comments')];
	}
});

Router.route('/',{name:'postsList'});
Router.route('/posts/:_id',{
	name:'postPage',
	data:function(){
		return Posts.findOne(this.params._id);
	}
});
//管理编辑路由
Router.route('/posts/:_id/edit',{
	name:'postEdit',
	data:function(){
		return Posts.findOne(this.params._id);
	}
});
//定义提交路线
Router.route('/submit',{name:'postSubmit'});

var requireLogin=function(){
	if(!Meteor.user()){
		if(Meteor.loggingIn()){
			//启动时判断
			this.render(this.loadingTemplate)
		}else{
			this.render('accessDenied');
		}
	}else{
		this.next();
	}
};

//..
Router.onBeforeAction('dataNotFound',{only:'postPage'});

Router.onBeforeAction(requireLogin,{only:'postSubmit'});