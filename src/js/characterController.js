let randomRotation;
export const controls = (moveVector, setJump, cube) => {
  const checkKeyPress = (key) => {
    setJump();
    if (key.keyCode == "87") {
      cube.translateY(1);
      randomRotation = 0;
      moveVector.y = 1;
    }

    if (key.keyCode == "83") {
      cube.translateY(-1);
      moveVector.y = -1;
      randomRotation = 0;
    }
    if (key.keyCode == "65") {
      moveVector.x = -1;
      cube.translateX(-1);
      randomRotation = Math.random(-0.1, 0);
    }
    if (key.keyCode == "68") {
      moveVector.x = 1;
      cube.translateX(1);
      randomRotation = Math.random(0, 0.1);
    }
  };

  const checkKeyUp = (key) => {
    if (key.keyCode == "87" || key.keyCode == "83") {
      moveVector.y = 0;
    }

    if (key.keyCode == "65" || key.keyCode == "68") {
      moveVector.x = 0;
    }
  };
  window.addEventListener("keydown", checkKeyPress, false);
  window.addEventListener("keyup", checkKeyUp, false);
};
