const msgs = ["jules!", "@ihatedjuly"];
    const speed = 300;
    const wait = 3000;
    const blank = "j";
    let i = 0, j = 0, forward = true;

    function loop() {
      if (forward) {
        i++;
        document.title = msgs[j].slice(0, i);

        if (i === msgs[j].length) {
          setTimeout(() => {
            forward = false;
            loop();
          }, wait);
          return;
        }
      } else {
        i--;
        if (i === 0) {
          document.title = blank;
          forward = true;
          j = (j + 1) % msgs.length;
        } else {
          document.title = msgs[j].slice(0, i);
        }
      }

      setTimeout(loop, speed);
    }

    loop();