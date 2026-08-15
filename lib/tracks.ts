// Add a song by filling in one row below — title, artist, film, year,
// an estimated duration in seconds (the player corrects this once the
// video loads), and the YouTube videoId (the 11-char code from the
// video URL, e.g. https://www.youtube.com/watch?v=XXXXXXXXXXX).
//
// Only add videos from the rights holder's own channel with embedding
// enabled. Leave videoId as "" for a slot you haven't filled yet — the
// player shows it as unavailable and skips over it instead of breaking.

export type Track = {
  id: string;
  title: string;
  artist: string;
  duration: number;
  videoId: string;
};

export type Playlist = {
  id: string;
  tracks: Track[];
};

export const playlists: Playlist[] = [
  {
    id: "songs",
    tracks: [
      { 
        id: "song-1", 
        title: "Ar Koto Raat Eka Thakbo", 
        artist: "Asha Bhosle",  
        duration: 240, 
        videoId: "WNoA-_yaTdU" 
      },
      { 
        id: "song-2", 
        title: "Kotha Hoyechilo", 
        artist: "Add artist",  
        duration: 240, 
        videoId: "aRo_J8JiNFY" 
      },
      { 
        id: "song-3", 
        title: "Bodhua Rimijhimi Ei Srabone", 
        artist: "Asha Bhosle",  
        duration: 240, 
        videoId: "BdTXyOlllmA" 
      },
      { 
        id: "song-4", 
        title: "Aj Ei Dintake", 
        artist: "Add artist",  
        duration: 240, 
        videoId: "nryrK9xjgU8" 
      },
      { 
        id: "song-5", 
        title: "Kotha Dilam", 
        artist: "Kishore Kumar, Asha Bhosle",  
        duration: 240, 
        videoId: "r5hFH-Hvieg" 
      },
      { 
        id: "song-6", 
        title: "Jodi Hoi Chorkata Oi Sarir Bhaje", 
        artist: "Kishore Kumar, Asha Bhosle",  
        duration: 240, 
        videoId: "XO91eSVZfk4" 
      },
      { 
        id: "song-7", 
        title: "Adho Alo Chayate",
        artist: "Kishore Kumar, Asha Bhosle",  
        duration: 240, 
        videoId: "A_D7gIVt078" 
      },
      { 
        id: "song-8", 
        title: "Akasher Chand Matir Bukete", 
        artist: "Asha Bhosle",  
        duration: 240, 
        videoId: "yfpvXtNRcWg" 
      },
      { 
        id: "song-9", 
        title: "Amar Swapno Tumi", 
        artist: "Kishore Kumar, Asha Bhosle",  
        duration: 240, 
        videoId: "bVaaOPAHfW8" 
      },
      { 
        id: "song-10", 
        title: "Bondho Moner Duar", 
        artist: "Asha Bhosle",  
        duration: 240, 
        videoId: "ogUq_1bbso" 
      },
      { 
        id: "song-11", 
        title: "Ektu Boso Chole Jeona", 
        artist: "Asha Bhosle",  
        duration: 240, 
        videoId: "R24VoZK6Fo4" 
      },
      
      { 
        id: "song-12", 
        title: "Emon Modhur Sondhaye", 
        artist: "Asha Bhosle",  
        duration: 240, 
        videoId: "VwUzcBGG5TQ" 
      },
      { 
        id: "song-13", 
        title: "Sondhabelay Tumi Ami", 
        artist: "Asha Bhosle",  
        duration: 240, 
        videoId: "6s7G1nyf_jA" 
      },
      { 
        id: "song-14", 
        title: "Hoyto Amake Karo Mone Nai", 
        artist: "Kishore Kumar",  
        duration: 240, 
        videoId: "BGYT5RDkz9U" 
      },
      { 
        id: "song-15", 
        title: "Mohuay Jomeche Ajj Mou Go", 
        artist: "Asha Bhosle",  
        duration: 240, 
        videoId: "w1z0yPGlLwA" 
      },
      { 
        id: "song-16", 
        title: "Gol Printer Sari Pore", 
        artist: "Mita Chatterjee",  
        duration: 240, 
        videoId: "zoAIg8_5Cto" 
      },
      
    ],
  },
];
