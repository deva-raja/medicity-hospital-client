import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { showDoctor } from '../api/doctorApi';
import doctorImg from '../images/doctor_filler.jpg';
import CardComponent from './DoctorCardComponent';
import SkeletonCard from '../skeletons/SkeletonCard';

function ShowDoctorComponent() {
   const [doctor, setDoctors] = useState([]);
   const [loading, setLoading] = useState(true);
   const searchName = useSelector((state) => state.search.name);
   const searchSpeciality = useSelector((state) => state.search.speciality);
   const shouldSearch = useSelector((state) => state.search.search);
   const typing = useSelector((state) => state.search.typing);

   useEffect(() => {
      const fetchMessage = async () => {
         setLoading(true);
         const data = await showDoctor({ speciality: searchSpeciality, name: searchName });
         setDoctors(data.doctor);
         setLoading(false);
      };

      if (typing === false) {
         return fetchMessage();
      }

      // return () => {
      //    setDoctors();
      // };
   }, [shouldSearch, searchSpeciality, searchName, typing]);

   return (
      <div className='container'>
         <div className='card-container'>
            {loading && [1, 2, 3, 4, 5].map((n) => <SkeletonCard key={n} />)}
            {doctor &&
               doctor.map((message) => (
                  <CardComponent key={message._id} data={message} img={doctorImg} />
               ))}
            {doctor && doctor.length === 0 && <div className='not-found'>No doctor found</div>}
         </div>
      </div>
   );
}

export default ShowDoctorComponent;
