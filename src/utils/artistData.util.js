function parseTimeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
}

export function getProgramDisplayName(artist) {
  return artist.programName || artist.name;
}

export function comparePerformanceTimes(left, right) {
  return parseTimeToMinutes(left.time) - parseTimeToMinutes(right.time);
}

export function mapToProgramRows(artists) {
  return artists
    .flatMap((artist) =>
      artist.performances.map((performance) => ({
        id: `${artist.name}-${performance.time}-${performance.venue}`,
        name: getProgramDisplayName(artist),
        time: performance.time,
        venue: performance.venue,
      })),
    )
    .sort(comparePerformanceTimes);
}
