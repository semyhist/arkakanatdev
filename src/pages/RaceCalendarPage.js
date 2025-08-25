import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { AlertCircle, MapPin, Calendar } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import RaceCalendarSkeleton from '../components/skeletons/RaceCalendarSkeleton';

const RaceCalendarPage = ({ f1Data, loading, error }) => {
  if (loading) return <RaceCalendarSkeleton />;
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

export default RaceCalendarPage;