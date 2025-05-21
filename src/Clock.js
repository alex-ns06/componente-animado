import React from 'react';
import Sketch from 'react-p5';

const Clock = () => {
  const SPEED_MULTIPLIER = 60;
  let startMillis = 0;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef);
    p5.angleMode(p5.DEGREES);
    startMillis = p5.millis();
  };

  const draw = (p5) => {
    p5.background(255);
    p5.translate(200, 200);
    p5.rotate(-90);

    const elapsedMillis = p5.millis() - startMillis;
    const acceleratedDate = new Date(Date.now() + elapsedMillis * (SPEED_MULTIPLIER - 1));

    const hours = acceleratedDate.getHours() % 12;
    const minutes = acceleratedDate.getMinutes();
    const seconds = acceleratedDate.getSeconds();
    const millis = acceleratedDate.getMilliseconds();

    const secondAngle = p5.map(seconds + millis / 1000, 0, 60, 0, 360);
    const minuteAngle = p5.map(minutes + seconds / 60, 0, 60, 0, 360);
    const hourAngle = p5.map(hours + minutes / 60, 0, 12, 0, 360);

    // 🎯 Desenha borda do relógio
    p5.push();
    p5.rotate(90);
    p5.stroke(0);
    p5.strokeWeight(12);
    p5.noFill();
    p5.ellipse(0, 0, 380, 380); // aro do relógio
    p5.pop();

    // 🕐 Números do relógio
    p5.rotate(90);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.textSize(18);
    p5.fill(0);
    for (let i = 1; i <= 12; i++) {
      let angle = p5.radians(i * 30 - 90);
      let x = 150 * Math.cos(angle);
      let y = 150 * Math.sin(angle);
      p5.text(i, x, y);
    }
    p5.rotate(-90);

    // ⏰ Ponteiro das horas
    p5.push();
    p5.rotate(hourAngle);
    p5.strokeWeight(6);
    p5.stroke(50);
    p5.line(0, 0, 60, 0);
    p5.pop();

    // ⏰ Ponteiro dos minutos
    p5.push();
    p5.rotate(minuteAngle);
    p5.strokeWeight(4);
    p5.stroke(100);
    p5.line(0, 0, 90, 0);
    p5.pop();

    // ⏰ Ponteiro dos segundos
    p5.push();
    p5.rotate(secondAngle);
    p5.strokeWeight(2);
    p5.stroke(255, 0, 0);
    p5.line(0, 0, 100, 0);
    p5.pop();

    // Centro
    p5.fill(0);
    p5.noStroke();
    p5.ellipse(0, 0, 12);
  };

  return (
    <div className="clock-container">
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default Clock;
