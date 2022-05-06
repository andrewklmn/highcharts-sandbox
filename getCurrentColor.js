const getCurrentColor = (value, colorZones) => {
  let color = colorZones[colorZones.length - 1].color;

  for (let i = 0; i < colorZones.length - 1; i++) {
    if (colorZones[i].value > value) {
      return colorZones[i].color;
    }
  }
  return color;
};
