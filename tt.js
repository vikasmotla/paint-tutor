var app = angular.module('myApp',[]);
app.controller('myCtrl', function($scope){

  $scope.canvas = new fabric.Canvas('canvas', { selection: false });

  $scope.rectangles = [];
  $scope.circles = [];
  $scope.triangles = [];

  $scope.isDown = false;
  $scope.size=1;
  $scope.color = 'red';
  $scope.mode = null;

  $scope.startx;
  $scope.starty;
  $scope.endx;
  $scope.endy;

  fabric.Object.prototype.selectable = false;

  $scope.SetSize = function()
  {
    $scope.canvas.freeDrawingBrush.width = $scope.size;
  }



  $scope.canvas.on('mouse:down', function(o){
    $scope.pointer = $scope.canvas.getPointer(o.e);
    $scope.startx = $scope.pointer.x;
    $scope.starty = $scope.pointer.y;
  });

  $scope.canvas.on('mouse:move', function(o){
      if (!$scope.isDown) return;
      $scope.pointer = $scope.canvas.getPointer(o.e);
      $scope.endx = $scope.pointer.x;
      $scope.endy = $scope.pointer.y;
    });

  $scope.canvas.on('mouse:up', function (o) {
    redraw();
  });


  function redraw()
   {
     canvas.isDrawingMode = false;
     console.log("drawwing mode is "+ $scope.mode);

      if($scope.mode=="rec")
      {
        $scope.rect = new fabric.Rect({
            left: $scope.startx,
            top: $scope.starty,
            originX: 'left',
            originY: 'top',
            width: $scope.endx-$scope.startx,
            height: $scope.endy-$scope.starty,
            fill:'',
            strokeWidth:$scope.size,
            stroke:'red'
            });
        $scope.canvas.add($scope.rect);

        $scope.tempRectangle = {type:$scope.rect.type,
                                x:$scope.rect.left,
                                y:$scope.rect.top,
                                w:$scope.rect.width ,
                                h:$scope.rect.height,
                                col:$scope.rect.stroke,
                                weight:$scope.rect.strokeWidth
                                };
        $scope.rectangles.push($scope.tempRectangle);
        console.log($scope.rectangles);
      }

      else if($scope.mode=="cir")
      {
        $scope.cir = new fabric.Circle({
            left: $scope.startx,
            top: $scope.starty,
            originX: 'center',
            originY: 'center',
            radius: ($scope.endx - $scope.startx)/2,
            fill:'',
            strokeWidth:$scope.size,
            stroke:'red'
            });
        $scope.canvas.add($scope.cir);

        $scope.tempCircle = {type:$scope.cir.type,
                            x:$scope.cir.left,
                             y:$scope.cir.top,
                             r:$scope.cir.radius,
                             col:$scope.cir.stroke,
                             weight:$scope.cir.strokeWidth
                            };

        $scope.circles.push($scope.tempCircle);
        console.log($scope.circles);

      }

      else if($scope.mode=="tri")
      {
        $scope.tri = new fabric.Triangle({
            left: $scope.startx,
            top: $scope.starty,
            originX: 'left',
            originY:'top',
            width:$scope.endx-$scope.startx,
            height:$scope.endy-$scope.starty,
            strokeWidth: $scope.size,
            stroke: 'red',
            fill:''
            });

         $scope.canvas.add($scope.tri);
         $scope.tempTriangle = {type:$scope.tri.type,
                                x:$scope.tri.left,
                                y:$scope.tri.top,
                                b:$scope.tri.width,
                                h:$scope.tri.height,
                                col:$scope.tri.stroke,
                                weight:$scope.tri.strokeWidth};
         $scope.triangles.push($scope.tempTriangle);
         console.log($scope.triangles);
      }

  }


});
