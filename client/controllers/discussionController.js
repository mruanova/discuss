app.controller("discussionController", function ($scope, $location, userFactory, discussionFactory, $cookies, $route) {
  $scope.user = {};
  //TODO: $scope.errors

  var checkCurrentUser = function(){
    if (!userFactory.currentUser){
      $location.url("/login");
    } else {
      $scope.currentUser = {}
      $scope.currentUser.id = $cookies.get('currentUserId')
      $scope.currentUser.username = $cookies.get('currentUserUsername')
    }

  }

  // checkCurrentUser();

  $scope.logout = function () {
    userFactory.logout(checkCurrentUser);
  }



  if ($location.url() == '/dashboard'){
    var setTopics = function(topics){
      $scope.topics = topics
    }

    discussionFactory.getTopics(setTopics)
  }

  if ($location.url().match('^/topics/')){
    $scope.addPost = function () {
      var newpostdata = { postText: $scope.newpost.posttext, _author: $scope.user.id };
      discussionFactory.addNewPost(newpostdata, function () {
          $scope.newpost = {};
      })
      $route.reload();
    }
    $scope.addComment = function (postidfrompage, newcomment) {
        var newcommentdata = {
            commentText: newcomment.commenttext,
            _author: $scope.user.id,
            _post: postidfrompage
        };
        commentFactory.addNewComment(newcommentdata, function () {
            $scope.newcomment = {};
        })
        $route.reload();
    }
  }








});
