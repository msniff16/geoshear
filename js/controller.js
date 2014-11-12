// main controller for module
app.controller("controller", function($scope) {

    $scope.backgroundInfo = {
        sxy: 0,
        sxz: 0,
        syx: 0,
        syz: 0,
        szx: 0,
        szy: 0,
        start: 0,
        camera: "",
        controls: "",
        scene: "",
        renderer: "",
        cube: "",
        container: "",
        matrix: "",
        material: "",
        geometry: "",
    };

    $scope.grabSxyVal = function() {
        return $scope.backgroundInfo.sxy;
    }

    $scope.grabSxzVal = function() {
        return $scope.backgroundInfo.sxz;
    }

    $scope.grabSyxVal = function() {
        return $scope.backgroundInfo.syx;
    }

    $scope.grabSyzVal = function() {
        return $scope.backgroundInfo.syz;
    }

    $scope.grabSzxVal = function() {
        return $scope.backgroundInfo.szx;
    }

    $scope.grabSzyVal = function() {
        return $scope.backgroundInfo.szy;
    }

});