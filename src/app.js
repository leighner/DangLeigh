
   headTexture = PIXI.Texture.fromImage("images/head.png");
   upperBodyTexture = PIXI.Texture.fromImage("images/upper_body.png");
   pelvisTexture = PIXI.Texture.fromImage("images/pelvis.png");
   upperLegTexture = PIXI.Texture.fromImage("images/upper_leg.png");
   lowerLegTexture = PIXI.Texture.fromImage("images/upper_leg.png");
   upperArmTexture = PIXI.Texture.fromImage("images/upper_arm.png");
   lowerRightArmTexture = PIXI.Texture.fromImage("images/lower_right_arm.png");
   lowerLeftArmTexture = PIXI.Texture.fromImage("images/lower_left_arm.png");
   resumeTexture = PIXI.Texture.fromImage("images/Resume.png");
   linkedInTexture = PIXI.Texture.fromImage("images/linkedIn.png");
   angryFaceTexture = PIXI.Texture.fromImage("images/angry_head.png");

(function () {
  'use strict';
  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      function( callback ){
        window.setTimeout(callback, 1000 / 60);
      };
  })();
  var myView = document.getElementById('dangleman');
  var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight * .5, myView);

  var container = new PIXI.Container();

  container.interactive = true
  container.position.x = renderer.width / 2;
  container.position.y = renderer.height / 2;
  container.scale.y = -1;
  var SCALE = 100;

  renderer.backgroundColor = 0xdddfd4;
  $("#dangleman").append(renderer.view);
  var shouldersDistance = 0.5,
    upperArmLength = 0.4,
    lowerArmLength = 0.4,
    upperArmSize = 0.2,
    lowerArmSize = 0.2,
    neckLength = 0.1,
    headRadius = 0.25,
    upperBodyLength = 0.6,
    pelvisLength = 0.4,
    upperLegLength = 0.5,
    upperLegSize = 0.2,
    lowerLegSize = 0.2,
    lowerLegLength = 0.5;

  var OTHER =     Math.pow(2,1),
    BODYPARTS = Math.pow(2,2),
    GROUND =    Math.pow(2,3),
    OTHER =     Math.pow(2,4),
    bodyPartShapes = [];
  var headShape = new p2.Circle({ radius: headRadius }),
    upperArmShapeLeft = new p2.Box({ width: upperArmLength, height: upperArmSize }),
    upperArmShapeRight = new p2.Box({ width: upperArmLength, height: upperArmSize }),
    lowerArmShapeLeft = new p2.Box({ width: lowerArmLength, height: lowerArmSize }),
    lowerArmShapeRight = new p2.Box({ width: lowerArmLength, height: lowerArmSize }),
    upperBodyShape = new p2.Box({ width: shouldersDistance, height: upperBodyLength }),
    pelvisShape = new p2.Box({ width: shouldersDistance, height: pelvisLength }),
	linkedInShape = new p2.Box({ width: shouldersDistance, height: pelvisLength }),
	resumeShape	= new p2.Box({ width: pelvisLength, height: shouldersDistance  }),
    upperLegShapeLeft = new p2.Box({ width: upperLegSize, height: upperLegLength }),
    upperLegShapeRight = new p2.Box({ width: upperLegSize, height: upperLegLength }),
    lowerLegShapeLeft = new p2.Box({ width: lowerLegSize, height: lowerLegLength }),
    lowerLegShapeRight = new p2.Box({ width: lowerLegSize, height: lowerLegLength });
  bodyPartShapes.push(
    headShape,
    upperArmShapeRight,
    upperArmShapeLeft,
    lowerArmShapeRight,
    lowerArmShapeLeft,
    upperBodyShape,
    pelvisShape,
	linkedInShape,
	resumeShape,
    upperLegShapeRight,
    upperLegShapeLeft,
    lowerLegShapeRight,
    lowerLegShapeLeft
  );
  for(var i=0; i<bodyPartShapes.length; i++){
    var s = bodyPartShapes[i];
    s.collisionGroup = BODYPARTS;
    s.collisionMask = GROUND|OTHER;
  }
  var world = new p2.World({
    gravity : [0, -15]
  });
  world.defaultContactMaterial.friction = 5
  world.solver.iterations = 100;
  world.solver.tolerance = 0.002;

  // Lower legs
  var lowerLeftLeg = new p2.Body({
    mass: 1,
    position: [-shouldersDistance/2,lowerLegLength / 2]
  });

  var lowerRightLeg = new p2.Body({
    mass: 1,
    position: [shouldersDistance/2,lowerLegLength / 2]
  });

  lowerLeftLeg.addShape(lowerLegShapeLeft);
  lowerRightLeg.addShape(lowerLegShapeRight);
  world.addBody(lowerLeftLeg);
  world.addBody(lowerRightLeg);

  var lowerRightLegGraphics = new PIXI.Sprite(lowerLegTexture);
  lowerRightLegGraphics.anchor.x = 0.5;
  lowerRightLegGraphics.anchor.y = 0.5;
  container.addChild(lowerRightLegGraphics);

  var lowerLeftLegGraphics = new PIXI.Sprite(lowerLegTexture);
  lowerLeftLegGraphics.anchor.x = 0.5;
  lowerLeftLegGraphics.anchor.y = 0.5;
  container.addChild(lowerLeftLegGraphics);

  // Upper legs
  var upperLeftLeg = new p2.Body({
    mass: 1,
    position: [-shouldersDistance/2,lowerLeftLeg.position[1]+lowerLegLength/2+upperLegLength / 2]
  });

  var upperRightLeg = new p2.Body({
    mass: 1,
    position: [shouldersDistance/2,lowerRightLeg.position[1]+lowerLegLength/2+upperLegLength / 2]
  });

  upperLeftLeg.addShape(upperLegShapeLeft);
  upperRightLeg.addShape(upperLegShapeRight);
  world.addBody(upperLeftLeg);
  world.addBody(upperRightLeg);

  var upperRightLegGraphics = new PIXI.Sprite(upperLegTexture);
  upperRightLegGraphics.anchor.x = 0.5;
  upperRightLegGraphics.anchor.y = 0.5;
  container.addChild(upperRightLegGraphics);


  var upperLeftLegGraphics = new PIXI.Sprite(upperLegTexture);
  upperLeftLegGraphics.anchor.x = 0.5;
  upperLeftLegGraphics.anchor.y = 0.5;
  container.addChild(upperLeftLegGraphics);
    // resume
  var resume = new p2.Body({
    mass: 1,
    position: [0, upperLeftLeg.position[1]+upperLegLength/2+pelvisLength/2]
  });
  resume.addShape(resumeShape);
  world.addBody(resume);

  var resumeGraphics = new PIXI.Sprite(resumeTexture);
  resumeGraphics.anchor.x = 0.5;
  resumeGraphics.anchor.y = 0.5;
  container.addChild(resumeGraphics);
  // Pelvis
  var pelvis = new p2.Body({
    mass: 1,
    position: [0, upperLeftLeg.position[1]+upperLegLength/2+pelvisLength/2]
  });
  pelvis.addShape(pelvisShape);
  world.addBody(pelvis);

  var pelvisGraphics = new PIXI.Sprite(pelvisTexture);
  pelvisGraphics.anchor.x = 0.5;
  pelvisGraphics.anchor.y = 0.5;
  container.addChild(pelvisGraphics);

    
  // LinkedIn
  var linkedIn = new p2.Body({
    mass: 1,
    position: [0, upperLeftLeg.position[1]+upperLegLength/2+pelvisLength/2]
  });
  linkedIn.addShape(linkedInShape);
  world.addBody(linkedIn);

  var linkedInGraphics = new PIXI.Sprite(linkedInTexture);
  linkedInGraphics.setInteractive = true;
  linkedInGraphics.anchor.x = 0.5;
  linkedInGraphics.anchor.y = 0.5;
  container.addChild(linkedInGraphics);

  
  // Upper body
  var upperBody = new p2.Body({
    mass: 1,
    position: [0,pelvis.position[1]+pelvisLength/2+upperBodyLength/2]
  });
  upperBody.addShape(upperBodyShape);
  world.addBody(upperBody);

  var upperBodyGraphics = new PIXI.Sprite(upperBodyTexture);
  upperBodyGraphics.anchor.x = 0.5;
  upperBodyGraphics.anchor.y = 0.5;
  container.addChild(upperBodyGraphics);

  // Head
  var head = new p2.Body({
    mass: 1,
    position: [0,upperBody.position[1]+upperBodyLength/2+headRadius+neckLength]
  });
  head.addShape(headShape);
  world.addBody(head);


  // Upper arms
  var upperLeftArm = new p2.Body({
    mass: 1,
    position: [-shouldersDistance/2-upperArmLength/2, upperBody.position[1]+upperBodyLength/2],
  });
  var upperRightArm = new p2.Body({
      mass: 1,
      position: [shouldersDistance / 2 + upperArmLength / 2, upperBody.position[1] + upperBodyLength / 2],
  });

  upperLeftArm.addShape(upperArmShapeLeft);
  upperRightArm.addShape(upperArmShapeRight);
  world.addBody(upperLeftArm);
  world.addBody(upperRightArm);

  var upperLeftArmGraphics = new PIXI.Sprite(upperArmTexture);
  upperLeftArmGraphics.anchor.x = 0.5;
  upperLeftArmGraphics.anchor.y = 0.5;
  container.addChild(upperLeftArmGraphics);

  var upperRightArmGraphics = new PIXI.Sprite(upperArmTexture);
  upperRightArmGraphics.anchor.x = 0.5;
  upperRightArmGraphics.anchor.y = 0.5;
  container.addChild(upperRightArmGraphics);

  // lower arms
  var lowerLeftArm = new p2.Body({
    mass: 1,
    position: [ upperLeftArm.position[0] - lowerArmLength/2 - upperArmLength/2,
      upperLeftArm.position[1]],
  });

  var lowerLeftArmGraphics = new PIXI.Sprite(lowerLeftArmTexture);
  lowerLeftArmGraphics.anchor.x = 0.5;
  lowerLeftArmGraphics.anchor.y = 0.5;
  container.addChild(lowerLeftArmGraphics);

  var lowerRightArm = new p2.Body({
    mass: 1,
    position: [ upperRightArm.position[0] + lowerArmLength/2 + upperArmLength/2,
      upperRightArm.position[1]],
  });


  var lowerRightArmGraphics = new PIXI.Sprite(lowerRightArmTexture);
  lowerRightArmGraphics.anchor.x = 0.5;
  lowerRightArmGraphics.anchor.y = 0.5;
  container.addChild(lowerRightArmGraphics);

  lowerLeftArm.addShape(lowerArmShapeLeft);
  lowerRightArm.addShape(lowerArmShapeRight);
  world.addBody(lowerLeftArm);
  world.addBody(lowerRightArm);
  
  // Neck joint
  var neckJoint = new p2.RevoluteConstraint(head, upperBody, {
    localPivotA: [0,-headRadius-neckLength/2],
    localPivotB: [0,upperBodyLength/2],
  });
  neckJoint.setLimits(-Math.PI / 8, Math.PI / 8);
  world.addConstraint(neckJoint);

  // Knee joints
  var leftKneeJoint = new p2.RevoluteConstraint(lowerLeftLeg, upperLeftLeg, {
    localPivotA: [0, lowerLegLength/2],
    localPivotB: [0,-upperLegLength/2],
  });
  var rightKneeJoint= new p2.RevoluteConstraint(lowerRightLeg, upperRightLeg, {
    localPivotA: [0, lowerLegLength/2],
    localPivotB:[0,-upperLegLength/2],
  });
  leftKneeJoint.setLimits(-Math.PI / 8, Math.PI / 8);
  rightKneeJoint.setLimits(-Math.PI / 8, Math.PI / 8);
  world.addConstraint(leftKneeJoint);
  world.addConstraint(rightKneeJoint);

  // Hip joints
  var leftHipJoint = new p2.RevoluteConstraint(upperLeftLeg, pelvis, {
    localPivotA: [0, upperLegLength/2],
    localPivotB: [-shouldersDistance/2,-pelvisLength/2],
  });
  var rightHipJoint = new p2.RevoluteConstraint(upperRightLeg, pelvis, {
    localPivotA: [0, upperLegLength/2],
    localPivotB: [shouldersDistance/2,-pelvisLength/2],
  });
  leftHipJoint.setLimits(-Math.PI / 8, Math.PI / 8);
  rightHipJoint.setLimits(-Math.PI / 8, Math.PI / 8);
  world.addConstraint(leftHipJoint);
  world.addConstraint(rightHipJoint);
  // Spine
  var spineJoint = new p2.RevoluteConstraint(pelvis, upperBody, {
    localPivotA: [0,pelvisLength/2],
    localPivotB: [0,-upperBodyLength/2],
  });
  spineJoint.setLimits(-Math.PI / 8, Math.PI / 8);
  world.addConstraint(spineJoint);
  // Shoulders
  var leftShoulder = new p2.RevoluteConstraint(upperBody, upperLeftArm, {
    localPivotA:[-shouldersDistance/2, upperBodyLength/2],
    localPivotB:[upperArmLength/2,0],
  });
  var rightShoulder= new p2.RevoluteConstraint(upperBody, upperRightArm, {
    localPivotA:[shouldersDistance/2,  upperBodyLength/2],
    localPivotB:[-upperArmLength/2,0],
  });
  leftShoulder.setLimits(-Math.PI / 3, Math.PI / 3);
  rightShoulder.setLimits(-Math.PI / 3, Math.PI / 3);
  world.addConstraint(leftShoulder);
  world.addConstraint(rightShoulder);
  // Elbow joint
  var leftElbowJoint = new p2.RevoluteConstraint(lowerLeftArm, upperLeftArm, {
    localPivotA: [lowerArmLength/2, 0],
    localPivotB: [-upperArmLength/2,0],
  });
  var rightElbowJoint= new p2.RevoluteConstraint(lowerRightArm, upperRightArm, {
    localPivotA:[-lowerArmLength/2,0],
    localPivotB:[upperArmLength/2,0],
  });
  leftElbowJoint.setLimits(-Math.PI / 8, Math.PI / 8);
  rightElbowJoint.setLimits(-Math.PI / 8, Math.PI / 8);
  world.addConstraint(leftElbowJoint);
  world.addConstraint(rightElbowJoint);
  
    // Resume joint
  var resumeHandJoint = new p2.RevoluteConstraint(resume, upperLeftArm, {
    localPivotA: [lowerArmLength, 0],
    localPivotB: [-upperArmLength,0],
  });
  resumeHandJoint.setLimits(-Math.PI / 8, Math.PI / 8);
  world.addConstraint(resumeHandJoint);


      // Resume joint
  var linkedInHandJoint = new p2.RevoluteConstraint(linkedIn, upperRightArm, {
    localPivotA:[-lowerArmLength,0],
    localPivotB:[upperArmLength,0],
  });
  linkedInHandJoint.setLimits(-Math.PI / 8, Math.PI / 8);
  world.addConstraint(linkedInHandJoint);


  
  world.addBody(createWall([0, -2]));

  var headGraphics = new PIXI.Sprite(headTexture);
  headGraphics.anchor.x = 0.5;
  headGraphics.anchor.y = 0.5;
  container.addChild(headGraphics);



  var mouseConstraint;

  // Create a body for the cursor
  var mouseBody = new p2.Body();
  world.addBody(mouseBody);
  renderer.view.addEventListener('mousedown', function(event){
    // Convert the canvas coordinate to physics coordinates
    var position = getPhysicsCoord(event);
    // Check if the cursor is inside the box
    var hitBodies = world.hitTest(position, [head, upperBody, resume, pelvis, linkedIn, lowerLeftLeg, lowerRightLeg, upperRightLeg, upperLeftLeg, upperLeftArm, upperRightArm, lowerLeftArm, lowerRightArm]);

    if(hitBodies.length){
	headGraphics.texture = angryFaceTexture;
	  var hitBody = hitBodies[0];
      if(hitBody == resume){	 
        removeMouseConstraint();	  
	    window.open("LeighPascoe.pdf");
	  }
	  else if(hitBody == linkedIn){
	      removeMouseConstraint();
		  window.open("https://ca.linkedin.com/in/leighpascoe");
	  }else{
        // Move the mouse body to the cursor position
        mouseBody.position[0] = position[0];
        mouseBody.position[1] = position[1];
        // Create a RevoluteConstraint.
        // This constraint lets the bodies rotate around a common point
        mouseConstraint = new p2.RevoluteConstraint(mouseBody, hitBodies[0], {
          worldPivot: position,
          collideConnected:false
        });
        world.addConstraint(mouseConstraint);
	  }
    }
  });
  
  function removeMouseConstraint(){
	  headGraphics.texture = headTexture;
  	  world.removeConstraint(mouseConstraint);
      mouseConstraint = null;
  }
  
  // Sync the mouse body to be at the cursor position
  renderer.view.addEventListener('mousemove', function(event){
    var position = getPhysicsCoord(event);
    mouseBody.position[0] = position[0];
    mouseBody.position[1] = position[1];
  });

  // Remove the mouse constraint on mouse up
  renderer.view.addEventListener('mouseup', function(event){
    removeMouseConstraint();
  });


  function getPhysicsCoord(mouseEvent){
    var rect = renderer.view.getBoundingClientRect();
    var x = mouseEvent.clientX - rect.left;
    var y = mouseEvent.clientY - rect.top;
    x = (x - renderer.view.width * .5) / SCALE;
    y = (y - renderer.view.height * .5) / -SCALE;
    return [x, y];
  }
  
  function drawPart(graphic,part)
  {
    graphic.position.x = part.position[0] * SCALE;
    graphic.position.y = part.position[1] * SCALE;
    graphic.rotation = part.angle;
  }

  function createWall(PlanePosition)
  {
    // Create leftwall
    var planeShape = new p2.Plane();
    var plane = new p2.Body({
    position:PlanePosition
    });
    plane.addShape(planeShape);
    planeShape.collisionGroup = GROUND;
    planeShape.collisionMask =  BODYPARTS|OTHER;
	return plane;
  }
  (function render () {

	drawPart(upperBodyGraphics,upperBody);
	drawPart(headGraphics,head);
	drawPart(pelvisGraphics,pelvis);
	drawPart(resumeGraphics,resume);
	drawPart(linkedInGraphics,linkedIn);
	drawPart(upperLeftLegGraphics,upperLeftLeg);
	drawPart(upperRightLegGraphics,upperRightLeg);
	drawPart(lowerRightLegGraphics,lowerRightLeg);
	drawPart(lowerLeftLegGraphics,lowerLeftLeg);
	drawPart(upperRightArmGraphics,upperRightArm);
	drawPart(upperLeftArmGraphics,upperLeftArm);
	drawPart(lowerRightArmGraphics,lowerRightArm);
	drawPart(lowerLeftArmGraphics,lowerLeftArm);	
	
    world.step(.016);
    renderer.render(container);

    requestAnimFrame(render);
  })();




  window.addEventListener("resize", function () {

    renderer.resize(window.innerWidth, window.innerHeight * .5);
    container.position.x = renderer.width * .5;
    container.position.y = renderer.height * .5;
  }, false)


}());