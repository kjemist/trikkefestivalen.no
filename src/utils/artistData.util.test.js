import { describe, expect, it } from "vitest";

import {
  comparePerformanceTimes,
  getProgramDisplayName,
  mapToProgramRows,
} from "./artistData.util";

const mockArtists = [
  {
    name: "Hin",
    programName: "HIN",
    performances: [
      { time: "20:00", venue: "Café Opera" },
      { time: "13:00", venue: "Bergens Tekniske Museum" },
    ],
  },
  {
    name: "Embla",
    programName: "EMBLA",
    performances: [{ time: "15:00", venue: "Bergens Tekniske Museum" }],
  },
  {
    name: "Julie Greve",
    performances: [{ time: "18:00", venue: "Engen, foran DNS" }],
  },
];

describe("artistData utilities", () => {
  it("prefers programName for program display labels", () => {
    expect(
      getProgramDisplayName({
        name: "Julie Greve",
        programName: "JULIE GREVE",
      }),
    ).toBe("JULIE GREVE");
  });

  it("falls back to name when programName is missing", () => {
    expect(getProgramDisplayName({ name: "Julie Greve" })).toBe("Julie Greve");
  });

  it("falls back to name when programName is an empty string", () => {
    expect(
      getProgramDisplayName({ name: "Julie Greve", programName: "" }),
    ).toBe("Julie Greve");
  });

  it("sorts performance rows chronologically", () => {
    const rows = [{ time: "20:00" }, { time: "09:30" }, { time: "13:00" }];

    expect(rows.sort(comparePerformanceTimes)).toEqual([
      { time: "09:30" },
      { time: "13:00" },
      { time: "20:00" },
    ]);
  });

  it("flattens performances into sorted program rows", () => {
    const rows = mapToProgramRows(mockArtists);

    expect(rows.map((row) => row.time)).toEqual([
      "13:00",
      "15:00",
      "18:00",
      "20:00",
    ]);
    expect(rows).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "Hin-13:00-Bergens Tekniske Museum",
          name: "HIN",
          time: "13:00",
          venue: "Bergens Tekniske Museum",
        }),
        expect.objectContaining({
          id: "Embla-15:00-Bergens Tekniske Museum",
          name: "EMBLA",
          time: "15:00",
          venue: "Bergens Tekniske Museum",
        }),
        expect.objectContaining({
          id: "Julie Greve-18:00-Engen, foran DNS",
          name: "Julie Greve",
          time: "18:00",
          venue: "Engen, foran DNS",
        }),
        expect.objectContaining({
          id: "Hin-20:00-Café Opera",
          name: "HIN",
          time: "20:00",
          venue: "Café Opera",
        }),
      ]),
    );
  });

  it("returns an empty array when no artists are provided", () => {
    expect(mapToProgramRows([])).toEqual([]);
  });

  it("ignores artists with no performances", () => {
    const rows = mapToProgramRows([
      {
        name: "Silent Artist",
        programName: "SILENT ARTIST",
        performances: [],
      },
      ...mockArtists,
    ]);

    expect(rows).toHaveLength(4);
    expect(rows.find((row) => row.name === "SILENT ARTIST")).toBeUndefined();
  });

  it("keeps multiple performances with the same time", () => {
    const rows = mapToProgramRows([
      {
        name: "Double Booking",
        performances: [
          { time: "19:00", venue: "Venue A" },
          { time: "19:00", venue: "Venue B" },
        ],
      },
    ]);

    expect(rows).toEqual([
      {
        id: "Double Booking-19:00-Venue A",
        name: "Double Booking",
        time: "19:00",
        venue: "Venue A",
      },
      {
        id: "Double Booking-19:00-Venue B",
        name: "Double Booking",
        time: "19:00",
        venue: "Venue B",
      },
    ]);
  });

  it("does not mutate the input artist data", () => {
    const input = [
      {
        name: "Hin",
        programName: "HIN",
        performances: [
          { time: "20:00", venue: "Café Opera" },
          { time: "13:00", venue: "Bergens Tekniske Museum" },
        ],
      },
    ];
    const snapshot = structuredClone(input);

    mapToProgramRows(input);

    expect(input).toEqual(snapshot);
  });

  it("builds valid sorted rows from mocked artist data", () => {
    const rows = mapToProgramRows(mockArtists);
    const performanceCount = mockArtists.reduce(
      (total, artist) => total + artist.performances.length,
      0,
    );
    const rowIds = rows.map((row) => row.id);
    const rowTimes = rows.map((row) => row.time);
    const sortedTimes = [...rowTimes].sort((left, right) =>
      comparePerformanceTimes({ time: left }, { time: right }),
    );

    expect(rows).toHaveLength(performanceCount);
    expect(new Set(rowIds).size).toBe(rowIds.length);
    expect(rowTimes).toEqual(sortedTimes);
    expect(rows).toEqual(
      expect.arrayContaining(
        mockArtists.flatMap((artist) =>
          artist.performances.map((performance) =>
            expect.objectContaining({
              id: `${artist.name}-${performance.time}-${performance.venue}`,
              name: getProgramDisplayName(artist),
              time: performance.time,
              venue: performance.venue,
            }),
          ),
        ),
      ),
    );
  });
});
