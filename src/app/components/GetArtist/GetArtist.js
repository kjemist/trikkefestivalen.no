import Image from "next/image";
import React from "react";
import artistsData from "@/data/artists.json";
import styles from "./getArtist.module.css";

export default function GetArtist() {
  const artister_og_program = artistsData.artists;

  return (
    <div className={styles.artister_og_program}>
      {artister_og_program.map((artist) => (
        <div key={artist.name} className={styles.artistCard}>
          <Image
            src={`/artistInfo/${artist.image}`}
            alt="artistImage"
            width={400}
            height={450}
          />
          <p>
            {artist.performances.map((performance, index) => (
              <React.Fragment
                key={`${artist.name}-${performance.time}-${performance.venue}`}
              >
                {index > 0 ? <br /> : null}
                {performance.time}
                <br />
                {performance.venue}
              </React.Fragment>
            ))}
          </p>
          <p>{artist.shortBio}</p>
        </div>
      ))}
    </div>
  );
}
