var app = angular.module('myApp',[]);
app.controller('myCtrl', function($scope){

  $scope.canvas = new fabric.Canvas('canvas', { selection: false });

  $scope.rectangles = [];
  $scope.circles = [];
  $scope.triangles = [];
  $scope.lines= [];

  $scope.isDown = false;
  $scope.size= 1;
  $scope.col = '#ff0000';
  $scope.canvas.freeDrawingBrush.color='#ff0000';
  $scope.mode = null;

  $scope.startx;
  $scope.starty;
  $scope.endx;
  $scope.endy;

  fabric.Object.prototype.selectable = false;

  $scope.SetPen = function()
  {
    $scope.canvas.freeDrawingBrush.width = $scope.size;
  }

  $scope.Move = function()
   {
     fabric.Object.prototype.selectable = true;
     $scope.canvas.isDrawingMode = false;
     $scope.canvas.selection = true;
     $scope.mode = null;
   }

   $scope.ClearAll = function()
   {
     $scope.canvas.clear();
     $scope.rectangles = [];
     $scope.circles = [];
     $scope.triangles = [];
   }

  $scope.canvas.on('mouse:down', function(options) {
    $scope.pointer = $scope.canvas.getPointer(options.e);
    $scope.startx = $scope.pointer.x;
    $scope.starty = $scope.pointer.y;
  });

  $scope.canvas.on('mouse:move', function(options){
      if (!$scope.isDown) return;
      $scope.pointer = $scope.canvas.getPointer(options.e);
      $scope.endx = $scope.pointer.x;
      $scope.endy = $scope.pointer.y;
    });

  $scope.canvas.on('mouse:up', function () {
    // check the current mode
    // add it to the recpective array
    $scope.temp = { type: $scope.mode,
                    x:$scope.startx,
                    y:$scope.starty,
                    w:$scope.endx-$scope.startx,
                    h:$scope.endy-$scope.starty,
                    col:$scope.col,
                    weight:$scope.size
                    };

    if($scope.mode=="rec")
    {
       $scope.rectangles.push($scope.temp);
    }

    else if($scope.mode=="cir")
    {
       $scope.circles.push($scope.temp);
    }

    else if ($scope.mode=="tri")
     {
       $scope.triangles.push($scope.temp);
    }

   redraw();
  });


  function redraw()
   {
     if($scope.canvas.isDrawingMode) return;

     $scope.canvas.clear();

     for (var i = 0 ; i < $scope.rectangles.length; i++) {
        // $scope.rectangles[i]
        // draw this rectangles
       $scope.rect = new fabric.Rect({
           left: $scope.rectangles[i].x,
           top: $scope.rectangles[i].y,
           width: $scope.rectangles[i].w,
           height:$scope.rectangles[i].h,
           fill:'',
           strokeWidth:$scope.rectangles[i].weight,
           stroke:$scope.rectangles[i].col
           });
           $scope.canvas.add($scope.rect);
           $scope.canvas.renderAll();
       }

       for (var i = 0; i < $scope.circles.length; i++) {
        // $scope.circles[i]
        $scope.cir = new fabric.Circle({
            left: $scope.circles[i].x,
            top: $scope.circles[i].y,
            radius: $scope.circles[i].w,
            fill:'',
            strokeWidth:$scope.circles[i].weight,
            stroke:$scope.circles[i].col
            });
        $scope.canvas.add($scope.cir);
        $scope.canvas.renderAll();
       }


       for (var i = 0; i < $scope.triangles.length ; i++) {
            $scope.tri = new fabric.Triangle({
              left:$scope.triangles[i].x,
              top:$scope.triangles[i].y,
              originX:'left',
              originY:'top',
              width:$scope.triangles[i].w,
              height:$scope.triangles[i].h,
              fill:'',
              strokeWidth:$scope.triangles[i].weight,
              stroke:$scope.triangles[i].col
            })
             $scope.canvas.add($scope.tri);
             $scope.canvas.renderAll();
       }
       console.log($scope.rectangles);
       console.log($scope.circles);
       console.log($scope.triangles);

  }

});
