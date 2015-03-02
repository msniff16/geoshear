// main controller for module
app.controller("controller", function($scope, $interval) {

    $scope.backgroundInfo = {
        sxy: 0,
        sxz: 0,
        syx: 0,
        syz: 0,
        szx: 0,
        szy: 0,
        height: 1,
        width: 1,
        depth: 1,
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
        simpleShear: "NO",
        pureShear: "NO",
        constriction: "NO",
        flattening: "NO",
        resetHit: "NO",
        changeType: "",
        disabled: false,
    };

    $scope.grabSxyVal = function() {
        return parseFloat($scope.backgroundInfo.sxy).toFixed(2);
    }

    $scope.grabSxzVal = function() {
        return parseFloat($scope.backgroundInfo.sxz).toFixed(2);
    }

    $scope.grabSyxVal = function() {
        return parseFloat($scope.backgroundInfo.syx).toFixed(2);
    }

    $scope.grabSyzVal = function() {
        return parseFloat($scope.backgroundInfo.syz).toFixed(2);
    }

    $scope.grabSzxVal = function() {
        return parseFloat($scope.backgroundInfo.szx).toFixed(2);
    }

    $scope.grabSzyVal = function() {
        return parseFloat($scope.backgroundInfo.szy).toFixed(2);
    }

    $scope.grabHeight = function() {
        return parseFloat($scope.backgroundInfo.height).toFixed(2);
    }

    $scope.grabWidth = function() {
        return parseFloat($scope.backgroundInfo.width).toFixed(2);
    }

    $scope.grabDepth = function() {
        return parseFloat($scope.backgroundInfo.depth).toFixed(2);
    }

    $scope.totalVolume = function() {
        return ($scope.backgroundInfo.width * $scope.backgroundInfo.height * $scope.backgroundInfo.depth).toFixed(2);
    }

    $scope.setDefaults = function() {
        $scope.backgroundInfo.sxy = 0;
        $scope.backgroundInfo.sxz = 0;
        $scope.backgroundInfo.syx = 0;
        $scope.backgroundInfo.syz = 0;
        $scope.backgroundInfo.szx = 0;
        $scope.backgroundInfo.szy = 0;
        $scope.backgroundInfo.height = 1;
        $scope.backgroundInfo.width = 1;
        $scope.backgroundInfo.depth = 1;
    }

    // prevent checkboxes from being clicked pre-maturely
    $scope.disabled = function() {
        return $scope.backgroundInfo.disabled;
    }

    // Preset shears/deformations
    $scope.setSimpleShear = function() {
        if($scope.backgroundInfo.simpleShear == "YES") {
            $scope.setDefaults();
            $scope.backgroundInfo.disabled = true;
            $scope.change('simpleShear');
        }
        else {
            $scope.backgroundInfo.disabled = true;
            $scope.reset('simpleShear');
        }
    }

    $scope.setPureShear = function() {
        if($scope.backgroundInfo.pureShear == "YES") {
            $scope.setDefaults();
            $scope.backgroundInfo.disabled = true;
            $scope.change('pureShear');
        }
        else {
            $scope.backgroundInfo.disabled = true;
            $scope.reset('pureShear');
        }
    }

    $scope.setConstriction = function() {
        if($scope.backgroundInfo.constriction == "YES") {
            $scope.setDefaults();
            $scope.backgroundInfo.disabled = true;
            $scope.change('constriction');
        }
        else {
            $scope.backgroundInfo.disabled = true;
            $scope.reset('constriction');
        }
    }

    $scope.setFlattening = function() {
        if($scope.backgroundInfo.flattening == "YES") {
            $scope.setDefaults();
            $scope.backgroundInfo.disabled = true;
            $scope.change('flattening');
        }
        else {
            $scope.backgroundInfo.disabled = true;
            $scope.reset('flattening');
        }
    }

    /* ----- Animate Functions ------ */

    $scope.change = function(type) {
       $scope.changeType = type;
       $scope.animateChange();
    }

    $scope.reset = function(type) {
       $scope.resetHit = type;
       $scope.callAtInterval();
    }

    // animate growth
    $scope.animateChange = function() {
        if($scope.changeType == "simpleShear") {
            if($scope.backgroundInfo.syx >= 2) {
                $scope.changeType = "";
                $scope.backgroundInfo.disabled = false;
                return $scope.backgroundInfo.syx = 2;
            }
            $scope.backgroundInfo.syx += 0.1;
        }
        if($scope.changeType == "pureShear") {
            if($scope.backgroundInfo.height <= 0.5) {
                $scope.changeType = "";
                $scope.backgroundInfo.disabled = false;
                return $scope.backgroundInfo.height = 0.5;
            }
            if($scope.backgroundInfo.width >= 2) {
                $scope.changeType = "NO";
                $scope.backgroundInfo.disabled = false;
                return $scope.backgroundInfo.width = 2;
            }
            $scope.backgroundInfo.height -= 0.05;
            $scope.backgroundInfo.width += 0.1;
        }
        if($scope.changeType == "constriction") {
            if($scope.backgroundInfo.height >= 2) {
                $scope.changeType = "";
                $scope.backgroundInfo.disabled = false;
                return $scope.backgroundInfo.height = 2;
            }
            else {
                $scope.backgroundInfo.height += 0.1;
            }
            if($scope.backgroundInfo.width <= 0.7 || $scope.backgroundInfo.depth <= 0.7) {
                $scope.backgroundInfo.depth = 0.7;
                $scope.backgroundInfo.width = 0.7;
            }
            else {
                $scope.backgroundInfo.width -= 0.03;
                $scope.backgroundInfo.depth -= 0.03;
            }
        }
        if($scope.changeType == "flattening") {
            if($scope.backgroundInfo.height <= 0.6) {
                $scope.changeType = "";
                $scope.backgroundInfo.disabled = false;
                return $scope.backgroundInfo.height = 0.6;
            }
            else {
                $scope.backgroundInfo.height -= 0.06;
            }
            if($scope.backgroundInfo.width >= 1.3 || $scope.backgroundInfo.depth >= 1.3) {
                $scope.backgroundInfo.depth = 1.3;
                $scope.backgroundInfo.width = 1.3;
            }
            else {
                $scope.backgroundInfo.width += 0.06;
                $scope.backgroundInfo.depth += 0.06;
            }
        }
    }

    // reset hit --> animate reset
    $scope.callAtInterval = function() {
        if($scope.resetHit == "simpleShear") {
            if($scope.backgroundInfo.syx <= 0) {
                $scope.resetHit = "NO";
                $scope.backgroundInfo.disabled = false;
                return $scope.backgroundInfo.syx = 0;
            }
            $scope.backgroundInfo.syx -= 0.1;
        }
        if($scope.resetHit == "pureShear") {
            if($scope.backgroundInfo.height >= 1) {
                $scope.resetHit = "NO";
                $scope.backgroundInfo.disabled = false;
                return $scope.backgroundInfo.height = 1;
            }
            if($scope.backgroundInfo.width <= 1) {
                $scope.resetHit = "NO";
                $scope.backgroundInfo.disabled = false;
                return $scope.backgroundInfo.width = 1;
            }
            $scope.backgroundInfo.height += 0.05;
            $scope.backgroundInfo.width -= 0.1;
        }
        if($scope.resetHit == "constriction") {
            if($scope.backgroundInfo.height <= 1) {
                $scope.resetHit = "NO";
                $scope.backgroundInfo.disabled = false;
                return $scope.backgroundInfo.height = 1;
            }
            if($scope.backgroundInfo.width >= 1 || $scope.backgroundInfo.depth >= 1) {
                $scope.resetHit = "NO";
                $scope.backgroundInfo.depth = 1;
                $scope.backgroundInfo.disabled = false;
                return $scope.backgroundInfo.width = 1;
            }
            $scope.backgroundInfo.height -= 0.1;
            $scope.backgroundInfo.width += 0.03;
            $scope.backgroundInfo.depth += 0.03;
        }
        if($scope.resetHit == "flattening") {
            if($scope.backgroundInfo.height >= 1) {
                $scope.resetHit = "NO";
                $scope.backgroundInfo.disabled = false;
                return $scope.backgroundInfo.height = 1;
            }
            if($scope.backgroundInfo.width <= 1 || $scope.backgroundInfo.depth <= 1) {
                $scope.resetHit = "NO";
                $scope.backgroundInfo.depth = 1;
                $scope.backgroundInfo.disabled = false;
                return $scope.backgroundInfo.width = 1;
            }
            $scope.backgroundInfo.height += 0.08;
            $scope.backgroundInfo.width -= 0.06;
            $scope.backgroundInfo.depth -= 0.06;
        }
    }

    // set intervals
    $interval( function(){ $scope.callAtInterval(); }, 50);
    $interval( function(){ $scope.animateChange(); }, 50);

});