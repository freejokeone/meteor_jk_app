Template.postItem.helpers({
	domain:function(){
		var a=document.createElement('a');
		a.href=this.url;
		return a.hostname;
	},
	ownPost:function(){
		//error post for admine

		// return this.userId===Meteor.userId();
		return 'admine';
	}
});