import { useState, useEffect, useCallback, useRef } from 'react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Sun, Moon, Instagram, X, Calendar, User, Users, MapPin, Star, Wind, Loader, AlertCircle, Send, ChevronDown, X as XIcon, Gauge, CircleDot, Flag, Clock, UserRound, ArrowRight, Trophy, CornerUpRight, CheckCircle2, History } from 'lucide-react';

// =================================================================================================
// 1. Static Data (data.js)
// Constant data used throughout the application is stored here.
// =================================================================================================
const team = {
  management: [
    { name: 'Emre', bio: 'Yarış stratejisti ve kahve bağımlısı. Pit stoplarımı saniyesinde hesaplarım.', emoji: '☕' },
    { name: 'Ozan', bio: 'Statistiklerin efendisi. Her tur zamanını ezbere bilir, her pisti rüyasında görür.', emoji: '📊' },
  ],
  admin: [
    { name: 'Ceren', bio: 'Pist rehberinin mimarı. Her virajın hikayesini anlatır, en hızlı turu ezbere bilir.', emoji: '🏎️' },
    { name: 'Deniz', bio: 'Fan duvarının bekçisi. Troll yorumlara karşı her zaman tetikte.', emoji: '🛡️' },
  ]
};

// New data for F1 History section
const f1HistoryData = {
  mostDriverTitles: [
    { driver: 'Lewis Hamilton', titles: 7 },
    { driver: 'Michael Schumacher', titles: 7 },
    { driver: 'Juan Manuel Fangio', titles: 5 },
    { driver: 'Alain Prost', titles: 4 },
    { driver: 'Sebastian Vettel', titles: 4 },
  ],
  mostConstructorTitles: [
    { constructor: 'Ferrari', titles: 16 },
    { constructor: 'Williams', titles: 9 },
    { constructor: 'McLaren', titles: 8 },
    { constructor: 'Mercedes', titles: 8 },
    { constructor: 'Red Bull Racing', titles: 7 },
  ],
  allChampions: [
    { year: 2024, driver: 'Max Verstappen', constructor: 'Red Bull Racing-Honda RBPT' },
    { year: 2023, driver: 'Max Verstappen', constructor: 'Red Bull Racing-Honda RBPT' },
    { year: 2022, driver: 'Max Verstappen', constructor: 'Red Bull Racing-Honda RBPT' },
    { year: 2021, driver: 'Max Verstappen', constructor: 'Red Bull Racing-Honda RBPT' },
    { year: 2020, driver: 'Lewis Hamilton', constructor: 'Mercedes' },
    { year: 2019, driver: 'Lewis Hamilton', constructor: 'Mercedes' },
    { year: 2018, driver: 'Lewis Hamilton', constructor: 'Mercedes' },
    { year: 2017, driver: 'Lewis Hamilton', constructor: 'Mercedes' },
    { year: 2016, driver: 'Nico Rosberg', constructor: 'Mercedes' },
    { year: 2015, driver: 'Lewis Hamilton', constructor: 'Mercedes' },
    { year: 2014, driver: 'Lewis Hamilton', constructor: 'Mercedes' },
    { year: 2013, driver: 'Sebastian Vettel', constructor: 'Red Bull Racing-Renault' },
    { year: 2012, driver: 'Sebastian Vettel', constructor: 'Red Bull Racing-Renault' },
    { year: 2011, driver: 'Sebastian Vettel', constructor: 'Red Bull Racing-Renault' },
    { year: 2010, driver: 'Sebastian Vettel', constructor: 'Red Bull Racing-Renault' },
    { year: 2009, driver: 'Jenson Button', constructor: 'Brawn-Mercedes' },
    { year: 2008, driver: 'Lewis Hamilton', constructor: 'McLaren-Mercedes' },
    { year: 2007, driver: 'Kimi Räikkönen', constructor: 'Ferrari' },
    { year: 2006, driver: 'Fernando Alonso', constructor: 'Renault' },
    { year: 2005, driver: 'Fernando Alonso', constructor: 'Renault' },
    { year: 2004, driver: 'Michael Schumacher', constructor: 'Ferrari' },
    { year: 2003, driver: 'Michael Schumacher', constructor: 'Ferrari' },
    { year: 2002, driver: 'Michael Schumacher', constructor: 'Ferrari' },
    { year: 2001, driver: 'Michael Schumacher', constructor: 'Ferrari' },
    { year: 2000, driver: 'Michael Schumacher', constructor: 'Ferrari' },
    { year: 1999, driver: 'Mika Häkkinen', constructor: 'McLaren-Mercedes' },
    { year: 1998, driver: 'Mika Häkkinen', constructor: 'McLaren-Mercedes' },
    { year: 1997, driver: 'Jacques Villeneuve', constructor: 'Williams-Renault' },
    { year: 1996, driver: 'Damon Hill', constructor: 'Williams-Renault' },
    { year: 1995, driver: 'Michael Schumacher', constructor: 'Benetton-Renault' },
    { year: 1994, driver: 'Michael Schumacher', constructor: 'Benetton-Ford' },
    { year: 1993, driver: 'Alain Prost', constructor: 'Williams-Renault' },
    { year: 1992, driver: 'Nigel Mansell', constructor: 'Williams-Renault' },
    { year: 1991, driver: 'Ayrton Senna', constructor: 'McLaren-Honda' },
    { year: 1990, driver: 'Ayrton Senna', constructor: 'McLaren-Honda' },
    { year: 1989, driver: 'Alain Prost', constructor: 'McLaren-Honda' },
    { year: 1988, driver: 'Ayrton Senna', constructor: 'McLaren-Honda' },
    { year: 1987, driver: 'Nelson Piquet', constructor: 'Williams-Honda' },
    { year: 1986, driver: 'Alain Prost', constructor: 'McLaren-TAG' },
    { year: 1985, driver: 'Alain Prost', constructor: 'McLaren-TAG' },
    { year: 1984, driver: 'Niki Lauda', constructor: 'McLaren-TAG' },
    { year: 1983, driver: 'Nelson Piquet', constructor: 'Brabham-BMW' },
    { year: 1982, driver: 'Keke Rosberg', constructor: 'Williams-Ford' },
    { year: 1981, driver: 'Nelson Piquet', constructor: 'Brabham-Ford' },
    { year: 1980, driver: 'Alan Jones', constructor: 'Williams-Ford' },
    { year: 1979, driver: 'Jody Scheckter', constructor: 'Ferrari' },
    { year: 1978, driver: 'Mario Andretti', constructor: 'Lotus-Ford' },
    { year: 1977, driver: 'Niki Lauda', constructor: 'Ferrari' },
    { year: 1976, driver: 'James Hunt', constructor: 'McLaren-Ford' },
    { year: 1975, driver: 'Emerson Fittipaldi', constructor: 'McLaren-Ford' },
    { year: 1974, driver: 'Emerson Fittipaldi', constructor: 'McLaren-Ford' },
    { year: 1973, driver: 'Jackie Stewart', constructor: 'Tyrrell-Ford' },
    { year: 1972, driver: 'Emerson Fittipaldi', constructor: 'Lotus-Ford' },
    { year: 1971, driver: 'Jackie Stewart', constructor: 'Tyrrell-Ford' },
    { year: 1970, driver: 'Jochen Rindt', constructor: 'Lotus-Ford' },
    { year: 1969, driver: 'Jackie Stewart', constructor: 'Matra-Ford' },
    { year: 1968, driver: 'Graham Hill', constructor: 'Lotus-Ford' },
    { year: 1967, driver: 'Denny Hulme', constructor: 'Brabham-Repco' },
    { year: 1966, driver: 'Jack Brabham', constructor: 'Brabham-Repco' },
    { year: 1965, driver: 'Jim Clark', constructor: 'Lotus-Climax' },
    { year: 1964, driver: 'John Surtees', constructor: 'Ferrari' },
    { year: 1963, driver: 'Jim Clark', constructor: 'Lotus-Climax' },
    { year: 1962, driver: 'Graham Hill', constructor: 'BRM' },
    { year: 1961, driver: 'Phil Hill', constructor: 'Ferrari' },
    { year: 1960, driver: 'Jack Brabham', constructor: 'Cooper-Climax' },
    { year: 1959, driver: 'Jack Brabham', constructor: 'Cooper-Climax' },
    { year: 1958, driver: 'Mike Hawthorn', constructor: 'Ferrari' },
    { year: 1957, driver: 'Juan Manuel Fangio', constructor: 'Maserati' },
    { year: 1956, driver: 'Juan Manuel Fangio', constructor: 'Ferrari' },
    { year: 1955, driver: 'Juan Manuel Fangio', constructor: 'Mercedes' },
    { year: 1954, driver: 'Juan Manuel Fangio', constructor: 'Maserati/Mercedes' },
    { year: 1953, driver: 'Alberto Ascari', constructor: 'Ferrari' },
    { year: 1952, driver: 'Alberto Ascari', constructor: 'Ferrari' },
    { year: 1951, driver: 'Juan Manuel Fangio', constructor: 'Alfa Romeo' },
    { year: 1950, driver: 'Giuseppe Farina', constructor: 'Alfa Romeo' },
  ]
};


const circuits = [
  { name: 'Bahreyn GP', location: 'Sakhir, Bahreyn', image: 'https://placehold.co/1200x600/124A69/C0DEEF?text=Bahreyn', length: '5.412 km', laps: 57, fastestLap: '1:31.447 (P. Gasly, 2020)', flag: '🇧🇭' },
  { name: 'Suudi Arabistan GP', location: 'Cidde, Suudi Arabistan', image: 'https://placehold.co/1200x600/3D5361/C0DEEF?text=Suudi+Arabistan', length: '6.174 km', laps: 50, fastestLap: '1:30.734 (L. Hamilton, 2021)', flag: '🇸🇦' },
  { name: 'Avustralya GP', location: 'Melbourne, Avustralya', image: 'https://placehold.co/1200x600/003C5C/C0DEEF?text=Avustralya', length: '5.303 km', laps: 58, fastestLap: '1:20.260 (S. Perez, 2023)', flag: '🇦🇺' },
  { name: 'Japonya GP', location: 'Suzuka, Japonya', image: 'https://placehold.co/1200x600/404040/C0DEEF?text=Japonya', length: '5.807 km', laps: 53, fastestLap: '1:30.983 (L. Hamilton, 2019)', flag: '🇯🇵' },
  { name: 'Çin GP', location: 'Şanghay, Çin', image: 'https://placehold.co/1200x600/8B0000/C0DEEF?text=Çin', length: '5.451 km', laps: 56, fastestLap: '1:32.238 (M. Schumacher, 2004)', flag: '🇨🇳' },
  { name: 'Miami GP', location: 'Miami, ABD', image: 'https://placehold.co/1200x600/008080/C0DEEF?text=Miami', length: '5.412 km', laps: 57, fastestLap: '1:29.708 (M. Verstappen, 2023)', flag: '🇺🇸' },
  { name: 'Emilia Romagna GP', location: 'Imola, İtalya', image: 'https://placehold.co/1200x600/800000/C0DEEF?text=Imola', length: '4.909 km', laps: 63, fastestLap: '1:15.484 (L. Hamilton, 2020)', flag: '🇮🇹' },
  { name: 'Monako GP', location: 'Monte Carlo, Monako', image: 'https://placehold.co/1200x600/000080/C0DEEF?text=Monako', length: '3.337 km', laps: 78, fastestLap: '1:12.909 (L. Hamilton, 2021)', flag: '🇲🇨' },
  { name: 'Kanada GP', location: 'Montreal, Kanada', image: 'https://placehold.co/1200x600/36454F/C0DEEF?text=Kanada', length: '4.361 km', laps: 70, fastestLap: '1:13.078 (V. Bottas, 2019)', flag: '🇨🇦' },
  { name: 'İspanya GP', location: 'Barselona, İspanya', image: 'https://placehold.co/1200x600/5C2E00/C0DEEF?text=İspanya', length: '4.655 km', laps: 66, fastestLap: '1:18.149 (M. Verstappen, 2023)', flag: '🇪🇸' },
  { name: 'Avusturya GP', location: 'Spielberg, Avusturya', image: 'https://placehold.co/1200x600/8B0000/C0DEEF?text=Avusturya', length: '4.318 km', laps: 71, fastestLap: '1:05.619 (C. Sainz, 2020)', flag: '🇦🇹' },
  { name: 'Büyük Britanya GP', location: 'Silverstone, Birleşik Krallık', image: 'https://placehold.co/1200x600/36454F/C0DEEF?text=Büyük+Britanya', length: '5.891 km', laps: 52, fastestLap: '1:27.097 (M. Verstappen, 2020)', flag: '🇬🇧' },
  { name: 'Macaristan GP', location: 'Budapeşte, Macaristan', image: 'https://placehold.co/1200x600/124A69/C0DEEF?text=Macaristan', length: '4.381 km', laps: 70, fastestLap: '1:16.627 (L. Hamilton, 2020)', flag: '🇭🇺' },
  { name: 'Belçika GP', location: 'Spa-Francorchamps, Belçika', image: 'https://placehold.co/1200x600/003C5C/C0DEEF?text=Belçika', length: '7.004 km', laps: 44, fastestLap: '1:46.286 (V. Bottas, 2018)', flag: '🇧🇪' },
  { name: 'Hollanda GP', location: 'Zandvoort, Hollanda', image: 'https://placehold.co/1200x600/DC0000/C0DEEF?text=Hollanda', length: '4.259 km', laps: 72, fastestLap: '1:11.097 (L. Hamilton, 2021)', flag: '🇳🇱' },
  { name: 'İtalya GP', location: 'Monza, İtalya', image: 'https://placehold.co/1200x600/800000/C0DEEF?text=İtalya', length: '5.793 km', laps: 53, fastestLap: '1:21.046 (R. Barrichello, 2004)', flag: '🇮🇹' },
  { name: 'Azerbaycan GP', location: 'Bakü, Azerbaycan', image: 'https://placehold.co/1200x600/404040/C0DEEF?text=Azerbaycan', length: '6.003 km', laps: 51, fastestLap: '1:43.080 (C. Leclerc, 2019)', flag: '🇦🇿' },
  { name: 'Singapur GP', location: 'Marina Bay, Singapur', image: 'https://placehold.co/1200x600/124A69/C0DEEF?text=Singapur', length: '5.063 km', laps: 62, fastestLap: '1:41.905 (K. Magnussen, 2018)', flag: '🇸🇬' },
  { name: 'ABD GP', location: 'Austin, ABD', image: 'https://placehold.co/1200x600/008080/C0DEEF?text=ABD', length: '5.513 km', laps: 56, fastestLap: '1:33.109 (C. Leclerc, 2019)', flag: '🇺🇸' },
  { name: 'Meksika GP', location: 'Meksiko, Meksika', image: 'https://placehold.co/1200x600/003C5C/C0DEEF?text=Meksika', length: '4.304 km', laps: 71, fastestLap: '1:17.774 (M. Verstappen, 2022)', flag: '🇲🇽' },
  { name: 'Brezilya GP', location: 'Interlagos, Brezilya', image: 'https://placehold.co/1200x600/5C2E00/C0DEEF?text=Brezilya', length: '4.309 km', laps: 71, fastestLap: '1:10.540 (V. Bottas, 2018)', flag: '🇧🇷' },
  { name: 'Las Vegas GP', location: 'Las Vegas, ABD', image: 'https://placehold.co/1200x600/000080/C0DEEF?text=Las+Vegas', length: '6.201 km', laps: 50, fastestLap: '1:35.490 (O. Piastri, 2023)', flag: '🇺🇸' },
  { name: 'Katar GP', location: 'Losail, Katar', image: 'https://placehold.co/1200x600/36454F/C0DEEF?text=Katar', length: '5.380 km', laps: 57, fastestLap: '1:24.319 (M. Verstappen, 2023)', flag: '🇶🇦' },
  { name: 'Abu Dabi GP', location: 'Yas Marina, BAE', image: 'https://placehold.co/1200x600/8B0000/C0DEEF?text=Abu+Dabi', length: '5.281 km', laps: 58, fastestLap: '1:26.103 (M. Verstappen, 2021)', flag: '🇦🇪' }
];

const constructorColors = {
  "Mercedes": "bg-[#00D2BE]",
  "Red Bull Racing": "bg-[#0600EF]",
  "Ferrari": "bg-[#DC0000]",
  "McLaren": "bg-[#FF8700]",
  "Aston Martin": "bg-[#006F62]",
  "Alpine": "bg-[#0090FF]",
  "Williams": "bg-[#005AFF]",
  "Visa Cash App RB": "bg-[#7198C6]",
  "Sauber": "bg-[#52E252]",
  "Haas F1 Team": "bg-[#B6BABD]",
  "RB": "bg-[#7198C6]", // Alias for Visa Cash App RB
  "AlphaTauri": "bg-[#507F9D]",
  "Force India": "bg-[#F596C8]",
  "Toro Rosso": "bg-[#0A2647]",
};

// =================================================================================================
// 2. Custom Hook (hooks/useF1Data.js)
// This custom hook handles data fetching and state management.
// =================================================================================================
const useF1Data = () => {
  const [f1Data, setF1Data] = useState({ races: [], driverStandings: [], constructorStandings: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchF1Data = useCallback(async () => {
    try {
      const [racesRes, driverStandingsRes, constructorStandingsRes] = await Promise.all([
        fetch('https://api.jolpi.ca/ergast/f1/2025/races.json'),
        fetch('https://api.jolpi.ca/ergast/f1/2025/driverStandings.json'),
        fetch('https://api.jolpi.ca/ergast/f1/2025/constructorStandings.json'),
      ]);

      if (!racesRes.ok || !driverStandingsRes.ok || !constructorStandingsRes.ok) {
        throw new Error('Network response was not ok');
      }

      const racesData = await racesRes.json();
      const driverStandingsData = await driverStandingsRes.json();
      const constructorStandingsData = await constructorStandingsRes.json();

      setF1Data({
        races: racesData.MRData.RaceTable.Races,
        driverStandings: driverStandingsData.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || [],
        constructorStandings: constructorStandingsData.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings || [],
      });
    } catch (err) {
      console.error("Error fetching F1 data:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchF1Data();
  }, [fetchF1Data]);

  return { f1Data, loading, error };
};

// =================================================================================================
// 3. Reusable Components (components/CustomComponents.js)
// Reusable components for the site.
// =================================================================================================
const AnimatedSection = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        observer.unobserve(domRef.current);
      }
    });

    observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      style={{ animationDelay: `${delay}ms` }}
      className={`transition-opacity duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      {children}
    </div>
  );
};

const Countdown = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate) - new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        gün: Math.floor(difference / (1000 * 60 * 60 * 24)),
        saat: Math.floor((difference / (1000 * 60 * 60)) % 24),
        dakika: Math.floor((difference / 1000 / 60) % 60),
        saniye: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval] && timeLeft[interval] !== 0) return null;
    return (
      <div key={interval} className="flex flex-col items-center dark:bg-zinc-900 bg-gray-200 rounded-xl p-4 md:p-6 mx-1 md:mx-2 border dark:border-zinc-700/50 border-gray-300 transform transition-transform duration-300 hover:scale-105">
        <span className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-red-500">{String(timeLeft[interval]).padStart(2, '0')}</span>
        <span className="text-xs md:text-sm font-semibold uppercase dark:text-gray-300 text-gray-700 mt-1">{interval}</span>
      </div>
    );
  });

  return (
    <div className="flex justify-center items-center py-4">
      {timerComponents.length > 0 ? (
        timerComponents
      ) : (
        <span className="text-xl md:text-2xl font-bold text-red-500">Yarış başladı!</span>
      )}
    </div>
  );
};

// Helper function to convert session times to Istanbul time
const convertToIstanbulTime = (date, time) => {
  try {
    const utcDate = new Date(`${date}T${time}`);
    return format(utcDate, 'dd MMMM yyyy, cccc HH:mm', { locale: tr });
  } catch (e) {
    console.error("Invalid date or time format:", date, time);
    return "Tarih bilgisi mevcut değil";
  }
};

const getSessionIcon = (sessionName) => {
  switch (sessionName) {
    case 'Race':
      return <Flag size={20} className="text-red-400" />;
    case 'Qualifying':
      return <Trophy size={20} className="text-blue-400" />;
    case 'Sprint':
      return <ArrowRight size={20} className="text-yellow-400" />;
    default:
      return <Clock size={20} className="text-gray-400" />;
  }
};

const getSessionNameTR = (sessionName) => {
  switch (sessionName) {
    case 'Race':
      return 'Yarış';
    case 'Qualifying':
      return 'Sıralama Turu';
    case 'Sprint':
      return 'Sprint Yarışı';
    case 'FirstPractice':
      return '1. Antrenman';
    case 'SecondPractice':
      return '2. Antrenman';
    case 'ThirdPractice':
      return '3. Antrenman';
    default:
      return sessionName;
  }
};


// =================================================================================================
// 4. Page Components (components)
// Each page's content is defined within its own component.
// =================================================================================================
const HomePage = ({ f1Data, loading, error }) => {
  if (loading) return <div className="text-center dark:text-gray-300 text-gray-700 py-10"><Loader size={48} className="animate-spin mx-auto mb-4" />Veriler yükleniyor...</div>;
  if (error) return <div className="text-center text-red-500 py-10"><AlertCircle size={48} className="mx-auto mb-4" />Veriler yüklenemedi. Lütfen daha sonra tekrar deneyin.</div>;

  const nextRace = f1Data?.races?.find(race => {
    const raceDate = new Date(`${race.date}T${race.time}`);
    return raceDate > new Date();
  });

  return (
    <>
      <AnimatedSection>
        <section className="text-center py-16">
          <h1 className="text-4xl md:text-6xl font-extrabold dark:text-white text-gray-800 mb-4 animate-fade-in">
            Formula 1 Tutkunlarının Buluşma Noktası
          </h1>
          <p className="text-lg md:text-xl dark:text-gray-300 text-gray-700 mb-8 animate-fade-in">
            En güncel haberler, yarış takvimi ve daha fazlası...
          </p>
          {nextRace && (
            <div className="dark:bg-zinc-900 bg-gray-50 p-6 rounded-3xl border dark:border-zinc-700/50 border-gray-300 shadow-2xl inline-block animate-zoom-in">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-red-400 flex items-center justify-center">
                <CircleDot size={24} className="mr-3 text-red-500 animate-pulse" />
                Sıradaki Yarış
              </h2>
              <p className="dark:text-gray-200 text-gray-800 mb-4 text-xl md:text-2xl font-semibold">{nextRace.raceName}</p>

              {/* Countdown Component */}
              <Countdown targetDate={`${nextRace.date}T${nextRace.time || '00:00:00Z'}`} />

              {/* Race Details directly below the countdown */}
              <div className="mt-8 pt-4 border-t dark:border-zinc-800 border-gray-300">
                <h3 className="text-xl font-bold dark:text-gray-200 text-gray-800 mb-4">Yarış Detayları</h3>
                <div className="grid grid-cols-1 gap-4 text-left">
                  {Object.keys(nextRace.hasOwnProperty('Sessions') ? nextRace.Sessions : nextRace).filter(key => key.includes('Practice') || key.includes('Qualifying') || key.includes('Sprint') || key.includes('Race')).map((key, index) => {
                    const session = nextRace.hasOwnProperty('Sessions') ? nextRace.Sessions[key] : nextRace[key];
                    // Ensure session object exists before trying to access its properties
                    if (!session) return null; 
                    return (
                      <div key={index} className="dark:bg-zinc-900 bg-gray-200 rounded-lg p-4 transition-colors duration-200 hover:dark:bg-zinc-700/70 hover:bg-gray-300 flex items-center space-x-3">
                        {getSessionIcon(key)}
                        <div>
                          <p className="font-semibold dark:text-gray-200 text-gray-800">{getSessionNameTR(key)}</p>
                          <p className="text-sm dark:text-gray-300 text-gray-700 mt-1">{convertToIstanbulTime(session.date, session.time)}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </section>
      </AnimatedSection>

      <div className="py-12"></div> {/* Added padding for better spacing */}
      
      {/* New F1 History Section */}
      <AnimatedSection delay={400}>
        <section className="mb-12">
          <h2 className="text-3xl font-bold dark:text-gray-100 text-gray-800 mb-6 flex items-center">
            <History size={24} className="mr-2" /> F1 Tarihi
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Most Driver Titles */}
            <div className="dark:bg-zinc-900 bg-white p-6 rounded-2xl border dark:border-zinc-700/50 border-gray-300 shadow-lg transform transition-transform duration-300 hover:scale-[1.03] h-full flex flex-col">
              <h3 className="text-xl font-semibold dark:text-gray-200 text-gray-800 mb-4">En Çok Pilotlar Şampiyonu</h3>
              <ul className="space-y-3">
                {f1HistoryData.mostDriverTitles.map((item, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span className="font-semibold dark:text-gray-300 text-gray-700">{item.driver}</span>
                    <span className="text-lg font-bold text-red-500">{item.titles}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Most Constructor Titles */}
            <div className="dark:bg-zinc-900 bg-white p-6 rounded-2xl border dark:border-zinc-700/50 border-gray-300 shadow-lg transform transition-transform duration-300 hover:scale-[1.03] h-full flex flex-col">
              <h3 className="text-xl font-semibold dark:text-gray-200 text-gray-800 mb-4">En Çok Takımlar Şampiyonu</h3>
              <ul className="space-y-3">
                {f1HistoryData.mostConstructorTitles.map((item, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span className="font-semibold dark:text-gray-300 text-gray-700">{item.constructor}</span>
                    <span className="text-lg font-bold text-red-500">{item.titles}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* All Season Champions */}
          <div className="mt-12 dark:bg-zinc-900 bg-white p-6 rounded-2xl border dark:border-zinc-700/50 border-gray-300 shadow-lg">
            <h3 className="text-xl font-semibold dark:text-gray-200 text-gray-800 mb-4">Bütün Sezon Şampiyonları</h3>
            <div className="overflow-auto max-h-96">
              <table className="min-w-full divide-y dark:divide-zinc-700 divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium dark:text-gray-300 text-gray-500 uppercase tracking-wider">
                      Sezon
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium dark:text-gray-300 text-gray-500 uppercase tracking-wider">
                      Pilot Şampiyonu
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium dark:text-gray-300 text-gray-500 uppercase tracking-wider">
                      Takımlar Şampiyonu
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-zinc-700 divide-gray-300">
                  {f1HistoryData.allChampions.map((champion, index) => (
                    <tr key={index} className="hover:dark:bg-zinc-700/50 hover:bg-gray-200 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-gray-200 text-gray-800">{champion.year}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-gray-300 text-gray-700">{champion.driver}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-gray-300 text-gray-700">{champion.constructor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </>
  );
};

const RaceCalendarPage = ({ f1Data, loading, error }) => {
  if (loading) return <div className="text-center dark:text-gray-300 text-gray-700 py-10"><Loader size={48} className="animate-spin mx-auto mb-4" />Takvim yükleniyor...</div>;
  if (error) return <div className="text-center text-red-500 py-10"><AlertCircle size={48} className="mx-auto mb-4" />Takvim verileri yüklenemedi.</div>;

  return (
    <div className="py-12">
      <h1 className="text-4xl md:text-5xl font-extrabold dark:text-white text-gray-800 text-center mb-12">
        2025 F1 Yarış Takvimi
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {f1Data?.races?.map((race, index) => (
          <AnimatedSection key={index} delay={index * 100}>
            <div className="dark:bg-zinc-900 bg-white rounded-2xl p-6 border dark:border-zinc-700/50 border-gray-300 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold text-red-400">{race.round}. Yarış</span>
                {new Date(`${race.date}T${race.time}`) < new Date() && <span className="dark:bg-gray-600 bg-gray-400 text-white text-xs font-semibold px-2 py-1 rounded-full">Tamamlandı</span>}
              </div>
              <h3 className="text-2xl font-bold dark:text-gray-100 text-gray-800 mb-2">{race.raceName}</h3>
              <p className="dark:text-gray-300 text-gray-700 flex items-center">
                <MapPin size={16} className="mr-2 text-red-500" />
                {race.Circuit.circuitName}, {race.Circuit.Location.country}
              </p>
              <p className="dark:text-gray-300 text-gray-700 flex items-center mt-2">
                <Calendar size={16} className="mr-2 text-red-500" />
                {format(new Date(race.date), 'dd MMMM yyyy', { locale: tr })}
              </p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
};

const CircuitGuidePage = ({ circuits }) => {
  return (
    <div className="py-12">
      <h1 className="text-4xl md:text-5xl font-extrabold dark:text-white text-gray-800 text-center mb-12">
        Pist Rehberi
      </h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {circuits.map((circuit, index) => (
          <AnimatedSection key={index} delay={index * 100}>
            <div className="relative dark:bg-zinc-900 bg-white rounded-2xl overflow-hidden shadow-lg border dark:border-zinc-700/50 border-gray-300 h-full flex flex-col">
              <img
                src={circuit.image}
                alt={circuit.name}
                className="w-full h-48 object-cover object-center transition-transform duration-500 hover:scale-110"
              />
              <div className="p-6 flex-1">
                <h3 className="text-2xl font-bold dark:text-gray-100 text-gray-800 mb-2">{circuit.name} {circuit.flag}</h3>
                <p className="dark:text-gray-300 text-gray-700 flex items-center mb-2">
                  <MapPin size={16} className="mr-2 text-red-500" />
                  {circuit.location}
                </p>
                <div className="text-sm dark:text-gray-300 text-gray-700 space-y-1">
                  <p><strong>Pist Uzunluğu:</strong> {circuit.length}</p>
                  <p><strong>Tur Sayısı:</strong> {circuit.laps}</p>
                  <p><strong>En Hızlı Tur:</strong> {circuit.fastestLap}</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
};

const TeamPage = () => (
  <div className="py-12">
    <h1 className="text-4xl md:text-5xl font-extrabold dark:text-white text-gray-800 text-center mb-12">
      Ekibimiz
    </h1>
    <div className="flex flex-col items-center">
      {/* Yönetim Segment */}
      <h2 className="text-3xl font-bold dark:text-white text-gray-800 mb-8 mt-4 border-b-2 border-red-500 pb-2">Yönetim</h2>
      <div className="grid sm:grid-cols-2 gap-8 mb-12">
        {team.management.map((member, index) => (
          <AnimatedSection key={`management-${index}`} delay={index * 150}>
            <div className="dark:bg-zinc-900 bg-white rounded-2xl p-6 text-center border dark:border-zinc-700/50 border-gray-300 h-full flex flex-col items-center">
              <span className="text-5xl mb-4">{member.emoji}</span>
              <h3 className="text-2xl font-bold dark:text-gray-100 text-gray-800 mb-2">{member.name}</h3>
              <p className="dark:text-gray-300 text-gray-700 text-sm flex-1">{member.bio}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
      
      {/* Admin Segment */}
      <h2 className="text-3xl font-bold dark:text-white text-gray-800 mb-8 mt-4 border-b-2 border-red-500 pb-2">Admin</h2>
      <div className="grid sm:grid-cols-2 gap-8">
        {team.admin.map((member, index) => (
          <AnimatedSection key={`admin-${index}`} delay={index * 150}>
            <div className="dark:bg-zinc-900 bg-white rounded-2xl p-6 text-center border dark:border-zinc-700/50 border-gray-300 h-full flex flex-col items-center">
              <span className="text-5xl mb-4">{member.emoji}</span>
              <h3 className="text-2xl font-bold dark:text-gray-100 text-gray-800 mb-2">{member.name}</h3>
              <p className="dark:text-gray-300 text-gray-700 text-sm flex-1">{member.bio}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </div>
);

const StandingsPage = ({ f1Data, loading, error }) => {
  const [activeTab, setActiveTab] = useState('drivers');

  if (loading) return <div className="text-center dark:text-gray-300 text-gray-700 py-10"><Loader size={48} className="animate-spin mx-auto mb-4" />Sıralamalar yükleniyor...</div>;
  if (error) return <div className="text-center text-red-500 py-10"><AlertCircle size={48} className="mx-auto mb-4" />Sıralama verileri yüklenemedi.</div>;

  const renderDrivers = () => {
    // Check if the driver standings data is available and not empty
    if (!f1Data.driverStandings || f1Data.driverStandings.length === 0) {
      return <div className="text-center dark:text-gray-300 text-gray-700 py-10">Pilotlar sıralaması verisi henüz mevcut değil.</div>;
    }
    return (
      <div className="space-y-4">
        {f1Data.driverStandings.map((driver, index) => {
          // Correctly access the constructor name from the nested object
          const teamName = driver.Constructors?.[0]?.name;
          const colorClass = constructorColors[teamName] || 'bg-gray-500';
          return (
            <div key={index} className="dark:bg-zinc-900 bg-white rounded-xl p-4 flex items-center border dark:border-zinc-700/50 border-gray-300 relative">
              <div className={`w-2 h-full absolute left-0 top-0 bottom-0 rounded-l-xl ${colorClass}`}></div>
              <div className="flex-none w-12 text-center text-xl font-bold text-red-400">{driver.position}</div>
              <div className="flex-1 ml-4">
                <p className="font-semibold text-lg dark:text-white text-gray-800">{driver.Driver.givenName} {driver.Driver.familyName}</p>
                <p className="text-sm dark:text-gray-300 text-gray-700">{teamName}</p>
              </div>
              <div className="text-right font-bold dark:text-gray-200 text-gray-800">
                {driver.points} <span className="text-sm dark:text-gray-300 text-gray-700">PTS</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderConstructors = () => {
    // Check if the constructor standings data is available and not empty
    if (!f1Data.constructorStandings || f1Data.constructorStandings.length === 0) {
      return <div className="text-center dark:text-gray-300 text-gray-700 py-10">Takımlar sıralaması verisi henüz mevcut değil.</div>;
    }
    return (
      <div className="space-y-4">
        {f1Data.constructorStandings.map((constructor, index) => {
          // The API now returns a nested 'Constructor' object. Access 'name' from there.
          const constructorName = constructor.Constructor?.name;
          const colorClass = constructorColors[constructorName] || 'bg-gray-500';
          return (
            <div key={index} className="dark:bg-zinc-900 bg-white rounded-xl p-4 flex items-center border dark:border-zinc-700/50 border-gray-300 relative">
              <div className={`w-2 h-full absolute left-0 top-0 bottom-0 rounded-l-xl ${colorClass}`}></div>
              <div className="flex-none w-12 text-center text-xl font-bold text-red-400">{constructor.position}</div>
              <div className="flex-1 ml-4">
                <p className="font-semibold text-lg dark:text-white text-gray-800">{constructorName}</p>
              </div>
              <div className="text-right font-bold dark:text-gray-200 text-gray-800">
                {constructor.points} <span className="text-sm dark:text-gray-300 text-gray-700">PTS</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="py-12">
      <h1 className="text-4xl md:text-5xl font-extrabold dark:text-white text-gray-800 text-center mb-8">
        F1 Sezon Sıralamaları
      </h1>
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('drivers')}
          className={`px-6 py-2 rounded-full font-medium transition-colors ${activeTab === 'drivers' ? 'bg-red-600 text-white' : 'dark:bg-zinc-900 bg-gray-200 dark:text-gray-300 text-gray-700 hover:text-red-400'}`}
        >
          Pilotlar
        </button>
        <button
          onClick={() => setActiveTab('constructors')}
          className={`px-6 py-2 rounded-full font-medium transition-colors ${activeTab === 'constructors' ? 'bg-red-600 text-white' : 'dark:bg-zinc-900 bg-gray-200 dark:text-gray-300 text-gray-700 hover:text-red-400'}`}
        >
          Takımlar
        </button>
      </div>

      <div className="max-w-3xl mx-auto">
        {activeTab === 'drivers' ? renderDrivers() : renderConstructors()}
      </div>
    </div>
  );
};


// =================================================================================================
// 5. Main Application Component (App.js)
// Manages the overall structure and page routing of the site.
// =================================================================================================
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const storedTheme = localStorage.getItem('theme');
      return storedTheme === 'dark' || (storedTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
    } catch (e) {
      return true; // Default to dark theme if local storage is unavailable
    }
  });
  const { f1Data, loading, error } = useF1Data();

  useEffect(() => {
    // Save theme setting to local storage
    try {
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    } catch (e) {
      console.error("Local storage is not available.", e);
    }
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage f1Data={f1Data} loading={loading} error={error} />;
      case 'race-calendar':
        return <RaceCalendarPage f1Data={f1Data} loading={loading} error={error} />;
      case 'circuit-guide':
        return <CircuitGuidePage circuits={circuits} />;
      case 'standings':
        return <StandingsPage f1Data={f1Data} loading={loading} error={error} />;
      case 'team':
        return <TeamPage />;
      default:
        return <HomePage f1Data={f1Data} loading={loading} error={error} />;
    }
  };

  return (
    <div className={`font-sans ${isDarkMode ? 'dark bg-zinc-900 text-white' : 'light bg-gray-50 text-gray-900'} min-h-screen transition-colors duration-500`}>
      <style>{`
        body {
          font-family: 'Inter', sans-serif;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoom-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .z-20 { z-index: 20; } /* Ensure dropdown is on top */
      `}</style>

      {/* Header */}
      <header className="fixed top-0 w-full z-40 dark:bg-zinc-900/80 bg-gray-50/80 backdrop-blur-sm shadow-lg border-b dark:border-zinc-700/50 border-gray-200">
        <nav className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <Gauge size={28} className="text-red-500" />
            <span className="text-2xl font-bold dark:text-gray-200 text-gray-800">Arkakanat</span>
          </div>
          <div className="flex-1 flex justify-center space-x-2 md:space-x-4">
            <button
              onClick={() => setCurrentPage('home')}
              className={`p-2 md:px-4 md:py-2 rounded-full font-medium transition-colors duration-300 ${currentPage === 'home' ? 'bg-red-600 text-white' : 'dark:text-gray-300 text-gray-700 hover:text-red-400'}`}
            >
              Ana Sayfa
            </button>
            <button
              onClick={() => setCurrentPage('race-calendar')}
              className={`p-2 md:px-4 md:py-2 rounded-full font-medium transition-colors duration-300 ${currentPage === 'race-calendar' ? 'bg-red-600 text-white' : 'dark:text-gray-300 text-gray-700 hover:text-red-400'}`}
            >
              Yarış Takvimi
            </button>
            <button
              onClick={() => setCurrentPage('circuit-guide')}
              className={`p-2 md:px-4 md:py-2 rounded-full font-medium transition-colors duration-300 ${currentPage === 'circuit-guide' ? 'bg-red-600 text-white' : 'dark:text-gray-300 text-gray-700 hover:text-red-400'}`}
            >
              Pist Rehberi
            </button>
            <button
              onClick={() => setCurrentPage('standings')}
              className={`p-2 md:px-4 md:py-2 rounded-full font-medium transition-colors duration-300 ${currentPage === 'standings' ? 'bg-red-600 text-white' : 'dark:text-gray-300 text-gray-700 hover:text-red-400'}`}
            >
              Sıralamalar
            </button>
            <button
              onClick={() => setCurrentPage('team')}
              className={`p-2 md:px-4 md:py-2 rounded-full font-medium transition-colors duration-300 ${currentPage === 'team' ? 'bg-red-600 text-white' : 'dark:text-gray-300 text-gray-700 hover:text-red-400'}`}
            >
              Ekibimiz
            </button>
          </div >
          <button onClick={toggleTheme} className="p-2 rounded-full dark:bg-zinc-900/50 bg-gray-200 hover:dark:bg-zinc-900 hover:bg-gray-300 transition-colors">
            {isDarkMode ? <Sun size={24} className="text-yellow-400" /> : <Moon size={24} className="text-gray-500" />}
          </button>
        </nav>
      </header >

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 pt-28">
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="mt-12 text-center dark:text-gray-500 text-gray-700 py-8 border-t dark:border-zinc-700/50 border-gray-200">
        <div className="flex justify-center space-x-4 mb-4">
          <a href="https://www.instagram.com/arkakanat" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full dark:text-gray-300 text-gray-700 hover:text-red-500 transition-colors duration-300 transform hover:scale-125">
            <Instagram size={24} />
          </a>
          <a href="https://x.com/arkakanat" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full dark:text-gray-300 text-gray-700 hover:text-black dark:hover:text-white transition-colors duration-300 transform hover:scale-125">
            <X size={24} />
          </a>
        </div>
        <p className="text-sm">
          &copy; 2024 Arkakanat. Tüm hakları saklıdır.
        </p>
      </footer>
    </div >
  );
};

export default App;
