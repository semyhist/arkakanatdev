import { useState, useEffect, useCallback, useRef } from 'react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Sun, Moon, Instagram, X, Calendar, User, Users, MapPin, Star, Wind, Loader, AlertCircle, Send, ChevronDown, X as XIcon, Gauge, CircleDot, Flag, Clock, UserRound, ArrowRight, Trophy, CornerUpRight, CheckCircle2, History, Menu } from 'lucide-react';

// =================================================================================================
// 1. Static Data (data.js)
// Constant data used throughout the application is stored here.
// =================================================================================================
const team = {
  management: [
    { name: 'Aydın', bio: 'Genel sorumlu, kurucu ve yönetici.', emoji: '⚡' },
    { name: 'Melih', bio: 'Sorumlu, ekip içi yönetici.', emoji: '🧠' },
    { name: 'Yankı', bio: 'Yeni, genel sorumlu ve içerik sorumlusu.', emoji: '🎨' },
  ],
  admin: [
    { name: 'Nisa', bio: 'İçerik ve Ekip içi denge sorumlusu', emoji: '🏎️' },
    { name: 'Mehmet Selim', bio: '', emoji: '🏎️' },
    { name: 'Ela', bio: '@oscarpiyastri', emoji: '🏎️' },
    { name: 'Azra', bio: '@ferrarisefiri', emoji: '🏎️' },
    { name: 'Yunus Emre', bio: '@orek.edits', emoji: '🏎️' },
    { name: 'Yağız', bio: '@vettelsexuel', emoji: '🏎️' },
  ],
  Twitter: [
    { name: 'Utku', bio: 'Haber Departmanı yetkilisi.', emoji: '🏎️' },
    { name: 'Furkan', bio: 'Haber Departmanı yetkilisi.', emoji: '🏎️' },
    { name: 'Gencer', bio: '', emoji: '🏎️' },
    { name: 'Taha Yasin', bio: '', emoji: '🏎️' },
    { name: 'Utku', bio: '', emoji: '🏎️' },
    { name: 'Melisa', bio: '', emoji: '🏎️' },
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
  { name: 'Bahreyn GP', location: 'Sakhir, Bahreyn', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flag_of_Bahrain.svg/1280px-Flag_of_Bahrain.svg.png', length: '5.412 km', laps: 57, fastestLap: '1:31.447 (P. Gasly, 2020)', flag: '🇧🇭' },
  { name: 'Suudi Arabistan GP', location: 'Cidde, Suudi Arabistan', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Flag_of_Saudi_Arabia.svg/800px-Flag_of_Saudi_Arabia.svg.png', length: '6.174 km', laps: 50, fastestLap: '1:30.734 (L. Hamilton, 2021)', flag: '🇸🇦' },
  { name: 'Avustralya GP', location: 'Melbourne, Avustralya', image: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Australia.svg', length: '5.303 km', laps: 58, fastestLap: '1:20.260 (S. Perez, 2023)', flag: '🇦🇺' },
  { name: 'Japonya GP', location: 'Suzuka, Japonya', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Japan%28bordered%29.svg/1200px-Flag_of_Japan%28bordered%29.svg.png', length: '5.807 km', laps: 53, fastestLap: '1:30.983 (L. Hamilton, 2019)', flag: '🇯🇵' },
  { name: 'Çin GP', location: 'Şanghay, Çin', image: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg', length: '5.451 km', laps: 56, fastestLap: '1:32.238 (M. Schumacher, 2004)', flag: '🇨🇳' },
  { name: 'Miami GP', location: 'Miami, ABD', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png', length: '5.412 km', laps: 57, fastestLap: '1:29.708 (M. Verstappen, 2023)', flag: '🇺🇸' },
  { name: 'Emilia Romagna GP', location: 'Imola, İtalya', image: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg', length: '4.909 km', laps: 63, fastestLap: '1:15.484 (L. Hamilton, 2020)', flag: '🇮🇹' },
  { name: 'Monako GP', location: 'Monte Carlo, Monako', image: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Flag_of_Monaco.svg', length: '3.337 km', laps: 78, fastestLap: '1:12.909 (L. Hamilton, 2021)', flag: '🇲🇨' },
  { name: 'Kanada GP', location: 'Montreal, Kanada', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/960px-Flag_of_Canada_%28Pantone%29.svg.png', length: '4.361 km', laps: 70, fastestLap: '1:13.078 (V. Bottas, 2019)', flag: '🇨🇦' },
  { name: 'İspanya GP', location: 'Barselona, İspanya', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/640px-Flag_of_Spain.svg.png', length: '4.655 km', laps: 66, fastestLap: '1:18.149 (M. Verstappen, 2023)', flag: '🇪🇸' },
  { name: 'Avusturya GP', location: 'Spielberg, Avusturya', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_Austria.svg/1200px-Flag_of_Austria.svg.png', length: '4.318 km', laps: 71, fastestLap: '1:05.619 (C. Sainz, 2020)', flag: '🇦🇹' },
  { name: 'Büyük Britanya GP', location: 'Silverstone, Birleşik Krallık', image: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg', length: '5.891 km', laps: 52, fastestLap: '1:27.097 (M. Verstappen, 2020)', flag: '🇬🇧' },
  { name: 'Macaristan GP', location: 'Budapeşte, Macaristan', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Flag_of_Hungary.svg', length: '4.381 km', laps: 70, fastestLap: '1:16.627 (L. Hamilton, 2020)', flag: '🇭🇺' },
  { name: 'Belçika GP', location: 'Spa-Francorchamps, Belçika', image: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Belgium.svg', length: '7.004 km', laps: 44, fastestLap: '1:46.286 (V. Bottas, 2018)', flag: '🇧🇪' },
  { name: 'Hollanda GP', location: 'Zandvoort, Hollanda', image: 'https://media.istockphoto.com/id/1054401238/tr/vekt%C3%B6r/vekt%C3%B6r-hollanda-bayra%C4%9F%C4%B1-oran%C4%B1-2-3-hollanda-bayra%C4%9F%C4%B1-hollanda-krall%C4%B1%C4%9F%C4%B1-tricolor-bayrak.jpg?s=612x612&w=0&k=20&c=ewUZtITOGPtlomcZykdGWFBVlQx1tYng2yk8-XFkwLA=', length: '4.259 km', laps: 72, fastestLap: '1:11.097 (L. Hamilton, 2021)', flag: '🇳🇱' },
  { name: 'İtalya GP', location: 'Monza, İtalya', image: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg', length: '5.793 km', laps: 53, fastestLap: '1:21.046 (R. Barrichello, 2004)', flag: '🇮🇹' },
  { name: 'Azerbaycan GP', location: 'Bakü, Azerbaycan', image: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Flag_of_Azerbaijan.svg', length: '6.003 km', laps: 51, fastestLap: '1:43.080 (C. Leclerc, 2019)', flag: '🇦🇿' },
  { name: 'Singapur GP', location: 'Marina Bay, Singapur', image: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Singapore.svg', length: '5.063 km', laps: 62, fastestLap: '1:41.905 (K. Magnussen, 2018)', flag: '🇸🇬' },
  { name: 'ABD GP', location: 'Austin, ABD', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png', length: '5.513 km', laps: 56, fastestLap: '1:33.109 (C. Leclerc, 2019)', flag: '🇺🇸' },
  { name: 'Meksika GP', location: 'Meksiko, Meksika', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/960px-Flag_of_Mexico.svg.png', length: '4.304 km', laps: 71, fastestLap: '1:17.774 (M. Verstappen, 2022)', flag: '🇲🇽' },
  { name: 'Brezilya GP', location: 'Interlagos, Brezilya', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/2560px-Flag_of_Brazil.svg.png', length: '4.309 km', laps: 71, fastestLap: '1:10.540 (V. Bottas, 2018)', flag: '🇧🇷' },
  { name: 'Las Vegas GP', location: 'Las Vegas, ABD', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png', length: '6.201 km', laps: 50, fastestLap: '1:35.490 (O. Piastri, 2023)', flag: '🇺🇸' },
  { name: 'Katar GP', location: 'Losail, Katar', image: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Qatar.svg', length: '5.380 km', laps: 57, fastestLap: '1:24.319 (M. Verstappen, 2023)', flag: '🇶🇦' },
  { name: 'Abu Dabi GP', location: 'Yas Marina, BAE', image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_United_Arab_Emirates.svg', length: '5.281 km', laps: 58, fastestLap: '1:26.103 (M. Verstappen, 2021)', flag: '🇦🇪' }
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

    if (domRef.current) observer.observe(domRef.current);
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
      <div key={interval} className="flex flex-col items-center dark:bg-zinc-900 bg-gray-200 rounded-xl p-3 sm:p-4 md:p-6 mx-1 md:mx-2 border dark:border-zinc-700/50 border-gray-300 transform transition-transform duration-300 hover:scale-105 min-w-[70px]">
        <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-red-500">{String(timeLeft[interval]).padStart(2, '0')}</span>
        <span className="text-[10px] sm:text-xs md:text-sm font-semibold uppercase dark:text-gray-300 text-gray-700 mt-1">{interval}</span>
      </div>
    );
  });

  return (
    <div className="flex justify-center items-center py-4 flex-wrap gap-2">
      {timerComponents.length > 0 ? (
        timerComponents
      ) : (
        <span className="text-lg sm:text-xl md:text-2xl font-bold text-red-500">Yarış başladı!</span>
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
        <section className="text-center py-10 sm:py-12 md:py-16">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold dark:text-white text-gray-800 mb-3 sm:mb-4 animate-fade-in px-2">
            Formula 1'in Arka Kanat'ı
          </h1>
          <p className="text-base sm:text-lg md:text-xl dark:text-gray-300 text-gray-700 mb-6 sm:mb-8 animate-fade-in px-4">
            Bu sayfa bir Arka Kanat ürünüdür
          </p>
          {nextRace && (
            <div className="dark:bg-zinc-900 bg-gray-50 p-4 sm:p-6 rounded-3xl border dark:border-zinc-700/50 border-gray-300 shadow-2xl inline-block max-w-full animate-zoom-in text-left">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-red-400 flex items-center justify-start sm:justify-center">
                <CircleDot size={22} className="mr-2 sm:mr-3 text-red-500 animate-pulse" />
                Sıradaki Yarış
              </h2>
              <p className="dark:text-gray-200 text-gray-800 mb-4 text-lg sm:text-xl md:text-2xl font-semibold break-words">{nextRace.raceName}</p>

              {/* Countdown Component */}
              <Countdown targetDate={`${nextRace.date}T${nextRace.time || '00:00:00Z'}`} />

              {/* Race Details directly below the countdown */}
              <div className="mt-6 sm:mt-8 pt-4 border-t dark:border-zinc-800 border-gray-300">
                <h3 className="text-lg sm:text-xl font-bold dark:text-gray-200 text-gray-800 mb-3">Yarış Detayları</h3>
                <div className="grid grid-cols-1 gap-3 sm:gap-4 text-left">
                  {Object.keys(nextRace.hasOwnProperty('Sessions') ? nextRace.Sessions : nextRace).filter(key => key.includes('Practice') || key.includes('Qualifying') || key.includes('Sprint') || key.includes('Race')).map((key, index) => {
                    const session = nextRace.hasOwnProperty('Sessions') ? nextRace.Sessions[key] : nextRace[key];
                    if (!session) return null;
                    return (
                      <div key={index} className="dark:bg-zinc-900 bg-gray-200 rounded-lg p-3 sm:p-4 transition-colors duration-200 hover:dark:bg-zinc-700/70 hover:bg-gray-300 flex items-center space-x-3">
                        {getSessionIcon(key)}
                        <div className="min-w-0">
                          <p className="font-semibold dark:text-gray-200 text-gray-800 truncate">{getSessionNameTR(key)}</p>
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

      <div className="py-8 sm:py-10 md:py-12"></div>

      {/* New F1 History Section */}
      <AnimatedSection delay={400}>
        <section className="mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold dark:text-gray-100 text-gray-800 mb-4 sm:mb-6 flex items-center px-2">
            <History size={22} className="mr-2" /> F1 Tarihi
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {/* Most Driver Titles */}
            <div className="dark:bg-zinc-900 bg-white p-5 sm:p-6 rounded-2xl border dark:border-zinc-700/50 border-gray-300 shadow-lg transform transition-transform duration-300 hover:scale-[1.03] h-full flex flex-col">
              <h3 className="text-lg sm:text-xl font-semibold dark:text-gray-200 text-gray-800 mb-3 sm:mb-4">En Çok Pilotlar Şampiyonu</h3>
              <ul className="space-y-2 sm:space-y-3">
                {f1HistoryData.mostDriverTitles.map((item, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span className="font-semibold dark:text-gray-300 text-gray-700">{item.driver}</span>
                    <span className="text-lg font-bold text-red-500">{item.titles}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Most Constructor Titles */}
            <div className="dark:bg-zinc-900 bg-white p-5 sm:p-6 rounded-2xl border dark:border-zinc-700/50 border-gray-300 shadow-lg transform transition-transform duration-300 hover:scale-[1.03] h-full flex flex-col">
              <h3 className="text-lg sm:text-xl font-semibold dark:text-gray-200 text-gray-800 mb-3 sm:mb-4">En Çok Takımlar Şampiyonu</h3>
              <ul className="space-y-2 sm:space-y-3">
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
          <div className="mt-8 sm:mt-12 dark:bg-zinc-900 bg-white p-4 sm:p-6 rounded-2xl border dark:border-zinc-700/50 border-gray-300 shadow-lg">
            <h3 className="text-lg sm:text-xl font-semibold dark:text-gray-200 text-gray-800 mb-3 sm:mb-4">Bütün Sezon Şampiyonları</h3>
            <div className="overflow-auto max-h-96">
              <table className="min-w-full divide-y dark:divide-zinc-700 divide-gray-300 text-sm">
                <thead className="sticky top-0 dark:bg-zinc-900 bg-white">
                  <tr>
                    <th scope="col" className="px-4 sm:px-6 py-3 text-left text-[11px] sm:text-xs font-medium dark:text-gray-300 text-gray-500 uppercase tracking-wider">Sezon</th>
                    <th scope="col" className="px-4 sm:px-6 py-3 text-left text-[11px] sm:text-xs font-medium dark:text-gray-300 text-gray-500 uppercase tracking-wider">Pilot Şampiyonu</th>
                    <th scope="col" className="px-4 sm:px-6 py-3 text-left text-[11px] sm:text-xs font-medium dark:text-gray-300 text-gray-500 uppercase tracking-wider">Takımlar Şampiyonu</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-zinc-700 divide-gray-300">
                  {f1HistoryData.allChampions.map((champion, index) => (
                    <tr key={index} className="hover:dark:bg-zinc-700/50 hover:bg-gray-200 transition-colors">
                      <td className="px-4 sm:px-6 py-3 whitespace-nowrap dark:text-gray-200 text-gray-800">{champion.year}</td>
                      <td className="px-4 sm:px-6 py-3 whitespace-nowrap dark:text-gray-300 text-gray-700">{champion.driver}</td>
                      <td className="px-4 sm:px-6 py-3 whitespace-nowrap dark:text-gray-300 text-gray-700">{champion.constructor}</td>
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
    <div className="py-8 sm:py-10 md:py-12">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold dark:text-white text-gray-800 text-center mb-8 sm:mb-10 md:mb-12">
        2025 F1 Yarış Takvimi
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
        {f1Data?.races?.map((race, index) => (
          <AnimatedSection key={index} delay={index * 100}>
            <div className="dark:bg-zinc-900 bg-white rounded-2xl p-5 sm:p-6 border dark:border-zinc-700/50 border-gray-300 shadow-lg h-full">
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <span className="text-sm sm:text-base md:text-lg font-bold text-red-400">{race.round}. Yarış</span>
                {new Date(`${race.date}T${race.time}`) < new Date() && <span className="dark:bg-gray-600 bg-gray-400 text-white text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-full">Tamamlandı</span>}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold dark:text-gray-100 text-gray-800 mb-1.5 sm:mb-2">{race.raceName}</h3>
              <p className="dark:text-gray-300 text-gray-700 flex items-center">
                <MapPin size={16} className="mr-2 text-red-500 shrink-0" />
                <span className="truncate">{race.Circuit.circuitName}, {race.Circuit.Location.country}</span>
              </p>
              <p className="dark:text-gray-300 text-gray-700 flex items-center mt-2">
                <Calendar size={16} className="mr-2 text-red-500 shrink-0" />
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
    <div className="py-8 sm:py-10 md:py-12">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold dark:text-white text-gray-800 text-center mb-8 sm:mb-10 md:mb-12">
        Pist Rehberi
      </h1>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {circuits.map((circuit, index) => (
          <AnimatedSection key={index} delay={index * 100}>
            <div className="relative dark:bg-zinc-900 bg-white rounded-2xl overflow-hidden shadow-lg border dark:border-zinc-700/50 border-gray-300 h-full flex flex-col">
              <img
                src={circuit.image}
                alt={circuit.name}
                className="w-full h-40 sm:h-48 object-cover object-center transition-transform duration-500 hover:scale-110"
              />
              <div className="p-5 sm:p-6 flex-1">
                <h3 className="text-xl sm:text-2xl font-bold dark:text-gray-100 text-gray-800 mb-2">{circuit.name} {circuit.flag}</h3>
                <p className="dark:text-gray-300 text-gray-700 flex items-center mb-2">
                  <MapPin size={16} className="mr-2 text-red-500 shrink-0" />
                  <span className="truncate">{circuit.location}</span>
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
  <div className="py-8 sm:py-10 md:py-12">
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold dark:text-white text-gray-800 text-center mb-8 sm:mb-10 md:mb-12">
      Ekibimiz
    </h1>
    <div className="flex flex-col items-center">
      {/* Yönetim Segment */}
      <h2 className="text-2xl sm:text-3xl font-bold dark:text-white text-gray-800 mb-6 sm:mb-8 mt-2 sm:mt-4 border-b-2 border-red-500 pb-2">Yönetim</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-12 w-full">
        {team.management.map((member, index) => (
          <AnimatedSection key={`management-${index}`} delay={index * 150}>
            <div className="dark:bg-zinc-900 bg-white rounded-2xl p-6 text-center border dark:border-zinc-700/50 border-gray-300 h-full flex flex-col items-center">
              <span className="text-5xl mb-4">{member.emoji}</span>
              <h3 className="text-xl sm:text-2xl font-bold dark:text-gray-100 text-gray-800 mb-2">{member.name}</h3>
              <p className="dark:text-gray-300 text-gray-700 text-sm flex-1">{member.bio}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
      {/* İçerik Üretim */}
      <h2 className="text-2xl sm:text-3xl font-bold dark:text-white text-gray-800 mb-6 sm:mb-8 mt-2 sm:mt-4 border-b-2 border-red-500 pb-2">İçerik Üretim</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-12 w-full">
        {team.admin.map((member, index) => (
          <AnimatedSection key={`admin-${index}`} delay={index * 150}>
            <div className="dark:bg-zinc-900 bg-white rounded-2xl p-6 text-center border dark:border-zinc-700/50 border-gray-300 h-full flex flex-col items-center">
              <span className="text-5xl mb-4">{member.emoji}</span>
              <h3 className="text-xl sm:text-2xl font-bold dark:text-gray-100 text-gray-800 mb-2">{member.name}</h3>
              <p className="dark:text-gray-300 text-gray-700 text-sm flex-1">{member.bio}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* Haber (X) */}
      <h2 className="text-2xl sm:text-3xl font-bold dark:text-white text-gray-800 mb-6 sm:mb-8 mt-2 sm:mt-4 border-b-2 border-red-500 pb-2">Haber (X)</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 w-full">
        {team.Twitter.map((member, index) => (
          <AnimatedSection key={`Twitter-${index}`} delay={index * 150}>
            <div className="dark:bg-zinc-900 bg-white rounded-2xl p-6 text-center border dark:border-zinc-700/50 border-gray-300 h-full flex flex-col items-center">
              <span className="text-5xl mb-4">{member.emoji}</span>
              <h3 className="text-xl sm:text-2xl font-bold dark:text-gray-100 text-gray-800 mb-2">{member.name}</h3>
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
    if (!f1Data.driverStandings || f1Data.driverStandings.length === 0) {
      return <div className="text-center dark:text-gray-300 text-gray-700 py-10">Pilotlar sıralaması verisi henüz mevcut değil.</div>;
    }
    return (
      <div className="space-y-3 sm:space-y-4">
        {f1Data.driverStandings.map((driver, index) => {
          const teamName = driver.Constructors?.[0]?.name;
          const colorClass = constructorColors[teamName] || 'bg-gray-500';
          return (
            <div key={index} className="dark:bg-zinc-900 bg-white rounded-xl p-4 sm:p-5 flex items-center border dark:border-zinc-700/50 border-gray-300 relative">
              <div className={`w-2 h-full absolute left-0 top-0 bottom-0 rounded-l-xl ${colorClass}`}></div>
              <div className="flex-none w-10 sm:w-12 text-center text-lg sm:text-xl font-bold text-red-400">{driver.position}</div>
              <div className="flex-1 ml-3 sm:ml-4 min-w-0">
                <p className="font-semibold text-base sm:text-lg dark:text-white text-gray-800 truncate">{driver.Driver.givenName} {driver.Driver.familyName}</p>
                <p className="text-xs sm:text-sm dark:text-gray-300 text-gray-700 truncate">{teamName}</p>
              </div>
              <div className="text-right font-bold dark:text-gray-200 text-gray-800 ml-3 sm:ml-4">
                {driver.points} <span className="text-xs sm:text-sm dark:text-gray-300 text-gray-700">PTS</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderConstructors = () => {
    if (!f1Data.constructorStandings || f1Data.constructorStandings.length === 0) {
      return <div className="text-center dark:text-gray-300 text-gray-700 py-10">Takımlar sıralaması verisi henüz mevcut değil.</div>;
    }
    return (
      <div className="space-y-3 sm:space-y-4">
        {f1Data.constructorStandings.map((constructor, index) => {
          const constructorName = constructor.Constructor?.name;
          const colorClass = constructorColors[constructorName] || 'bg-gray-500';
          return (
            <div key={index} className="dark:bg-zinc-900 bg-white rounded-xl p-4 sm:p-5 flex items-center border dark:border-zinc-700/50 border-gray-300 relative">
              <div className={`w-2 h-full absolute left-0 top-0 bottom-0 rounded-l-xl ${colorClass}`}></div>
              <div className="flex-none w-10 sm:w-12 text-center text-lg sm:text-xl font-bold text-red-400">{constructor.position}</div>
              <div className="flex-1 ml-3 sm:ml-4 min-w-0">
                <p className="font-semibold text-base sm:text-lg dark:text-white text-gray-800 truncate">{constructorName}</p>
              </div>
              <div className="text-right font-bold dark:text-gray-200 text-gray-800 ml-3 sm:ml-4">
                {constructor.points} <span className="text-xs sm:text-sm dark:text-gray-300 text-gray-700">PTS</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="py-8 sm:py-10 md:py-12">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold dark:text-white text-gray-800 text-center mb-6 sm:mb-8">
        F1 Sezon Sıralamaları
      </h1>
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <button
          onClick={() => setActiveTab('drivers')}
          className={`px-5 sm:px-6 py-2 rounded-full font-medium transition-colors ${activeTab === 'drivers' ? 'bg-red-600 text-white' : 'dark:bg-zinc-900 bg-gray-200 dark:text-gray-300 text-gray-700 hover:text-red-400'}`}
        >
          Pilotlar
        </button>
        <button
          onClick={() => setActiveTab('constructors')}
          className={`px-5 sm:px-6 py-2 rounded-full font-medium transition-colors ${activeTab === 'constructors' ? 'bg-red-600 text-white' : 'dark:bg-zinc-900 bg-gray-200 dark:text-gray-300 text-gray-700 hover:text-red-400'}`}
        >
          Takımlar
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-2 sm:px-0">
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
  const [isNavOpen, setIsNavOpen] = useState(false);
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

  // shared nav button style
  const navBtn = (key, label) => (
    <button
      onClick={() => { setCurrentPage(key); setIsNavOpen(false); }}
      className={`w-full sm:w-auto text-left sm:text-center px-4 py-2 rounded-full font-medium transition-colors duration-300 ${currentPage === key ? 'bg-red-600 text-white' : 'dark:text-gray-300 text-gray-700 hover:text-red-400'}`}
    >
      {label}
    </button>
  );

  return (
    <div className={`font-sans ${isDarkMode ? 'dark bg-zinc-900 text-white' : 'light bg-gray-50 text-gray-900'} min-h-screen transition-colors duration-500`}>
      <style>{`
        body { font-family: 'Inter', sans-serif; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes zoom-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .z-20 { z-index: 20; }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 w-full z-40 dark:bg-zinc-900/80 bg-gray-50/80 backdrop-blur-sm shadow-lg border dark:border-zinc-700/50 border-gray-200">
        <nav className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Gauge size={26} className="text-red-500" />
              <span className="text-xl sm:text-2xl font-bold dark:text-gray-200 text-gray-800">Arka Kanat</span>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-2 lg:gap-4">
              {navBtn('home', 'Ana Sayfa')}
              {navBtn('race-calendar', 'Yarış Takvimi')}
              {navBtn('circuit-guide', 'Pist Rehberi')}
              {navBtn('standings', 'Sıralamalar')}
              {navBtn('team', 'Ekibimiz')}
            </div>

            <div className="flex items-center gap-2">
              <button onClick={toggleTheme} className="p-2 rounded-full dark:bg-zinc-900/50 bg-gray-200 hover:dark:bg-zinc-900 hover:bg-gray-300 transition-colors">
                {isDarkMode ? <Sun size={22} className="text-yellow-400" /> : <Moon size={22} className="text-gray-500" />}
              </button>
              {/* Mobile nav toggle */}
              <button
                className="md:hidden p-2 rounded-lg dark:bg-zinc-900/50 bg-gray-200 hover:dark:bg-zinc-900 hover:bg-gray-300 transition-colors"
                onClick={() => setIsNavOpen(v => !v)}
                aria-label="Menüyü Aç/Kapat"
              >
                {isNavOpen ? <XIcon size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile nav panel */}
          {isNavOpen && (
            <div className="md:hidden mt-3 grid gap-2">
              {navBtn('home', 'Ana Sayfa')}
              {navBtn('race-calendar', 'Yarış Takvimi')}
              {navBtn('circuit-guide', 'Pist Rehberi')}
              {navBtn('standings', 'Sıralamalar')}
              {navBtn('team', 'Ekibimiz')}
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 pt-24 sm:pt-28">
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="mt-8 sm:mt-10 md:mt-12 text-center dark:text-gray-500 text-gray-700 py-6 sm:py-8 border-t dark:border-zinc-700/50 border-gray-200">
        <div className="flex justify-center space-x-4 mb-3 sm:mb-4">
          <a href="https://www.instagram.com/arkakanat" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full dark:text-gray-300 text-gray-700 hover:text-red-500 transition-colors duration-300 transform hover:scale-110">
            <Instagram size={22} />
          </a>
          <a href="https://x.com/arkakanat" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full dark:text-gray-300 text-gray-700 hover:text-black dark:hover:text-white transition-colors duration-300 transform hover:scale-110">
            <X size={22} />
          </a>
        </div>
        <p className="text-xs sm:text-sm">
          &copy; 2025 Arka Kanat. Tüm hakları saklıdır.
        </p>
      </footer>
    </div>
  );
};

export default App;
