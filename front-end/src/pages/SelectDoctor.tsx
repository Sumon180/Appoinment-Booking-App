import { useState, FC, useEffect } from 'react';
import { createAppointment, getAppointments } from '../services/api';
import DoctorCard from '../components/DoctorCard';
import AppointmentForm from '../components/AppointmentForm';
import { motion } from "framer-motion"
import AppointmentList from '../components/AppointmentList';

interface Doctor {
    id: number;
    name: string;
    specialty: string;
}

interface Appointment {
    doctor: Doctor;
    name: string;
    date: string;
}

const SelectDoctor: FC = () => {
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    const handleBookAppointment = (doctor: Doctor) => {
        setSelectedDoctor(doctor);
    };

    const handleAppointmentSubmit = async (appointment: Appointment) => {
        try {
            await createAppointment(appointment);
            setAppointments([...appointments, appointment]);
            setSelectedDoctor(null);
            fetchAppointments();
            alert('Booked Successfully');
        } catch (error) {
            console.error('Error creating appointment:', error);
            alert('Failed to book appointment');
        }
    };

    const fetchAppointments = async () => {
        try {
            const appointmentsData = await getAppointments();
            setAppointments(appointmentsData);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);


    const doctors: Doctor[] = [
        { id: 1, name: 'Dr. John Doe', specialty: 'Cardiology' },
        { id: 2, name: 'Dr. Jane Smith', specialty: 'Dermatology' },
        { id: 3, name: 'Dr. Alex Johnson', specialty: 'Pediatrics' },
        { id: 3, name: 'Dr. Sumon Hossain', specialty: 'Medicin' },
    ];



    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="container mx-auto flex flex-col items-center justify-center gap-16 w-screen h-screen'">
            <h1 className="text-3xl font-bold">Doctor Booking Appointment App</h1>
            {selectedDoctor ? (
                <AppointmentForm
                    doctor={selectedDoctor}
                    onSubmit={handleAppointmentSubmit}
                    fetchAppointments={fetchAppointments}
                />
            ) : (
                <div className="doctor-list p-10 bg-white border drop-shadow-lg">
                    <h2 className="text-2xl font-semi-bold mb-3">Choose a doctor:</h2>
                    <div className='flex flex-wrap items-center gap-3'>
                        {doctors.map((doctor) => (
                            <DoctorCard
                                key={doctor.id}
                                doctor={doctor}
                                onBookAppointment={handleBookAppointment}
                            />
                        ))}
                    </div>
                </div>
            )}
            <h2 className="text-xl font-bold mt-4">Appointments:</h2>
            <AppointmentList appointments={appointments} />
        </motion.div>
    );
};

export default SelectDoctor;
