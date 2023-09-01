type Dot = { id: string; degreeX: number; degreeY: number };

export const calculateDotPositions = ({ lineLength, allDots }: { lineLength: number; allDots: Dot[] }) => {
  const getActualPointOnGraph = (degreeX: number, degreeY: number) => {
    const getMaxValue = () => {
      const allCoords = allDots.flatMap(({ degreeX, degreeY }) => {
        return Object.values({ degreeX, degreeY }).filter((coord) => {
          return Math.abs(coord);
        });
      });
      return Math.max(...allCoords);
    };

    const maximumDegree = getMaxValue();
    const halfLineLength = lineLength / 2;
    const sections = halfLineLength / maximumDegree;
    let x = Math.floor(Math.abs((maximumDegree + (degreeX || 0)) * sections));
    let y = Math.floor(Math.abs((maximumDegree + degreeY) * sections));

    [x, y] = [x, y].map((coord) => {
      //add padding to extreme coordinates
      if (coord === 0) return (coord += lineLength * 0.01);
      if (coord === lineLength) return (coord -= lineLength * 0.01);
      return coord;
    });
    return { x, y };
  };

  const parsedDots = allDots.map((coordSet) => {
    const invertedY = coordSet.degreeY * -1;
    //invert because CSS Y positions & actual graph Y positions are opposite
    const { x, y } = getActualPointOnGraph(coordSet.degreeX, invertedY);
    return { ...coordSet, left: x, top: y };
  });
  return parsedDots;
};
