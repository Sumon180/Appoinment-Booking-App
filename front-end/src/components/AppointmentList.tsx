import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Appointment, AppointmentListProps } from '../types';

const AppointmentList: React.FC<AppointmentListProps> = ({ appointments, onEditAppointment,
    onDeleteAppointment, }) => {

    const handleEditAppointment = (appointment: Appointment) => {
        onEditAppointment(appointment);
    };

    const handleDeleteAppointment = (id: string) => {
        onDeleteAppointment(id);
    };

    return (
        <div>
            <h2 className="text-3xl mb-5">Appointment List</h2>
            {appointments.length > 0 ? (
                <ul>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Doctor Name</TableCell>
                                    <TableCell align="right">Patient Name</TableCell>
                                    <TableCell align="right">Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {appointments.map((appointment) => (
                                    <TableRow
                                        key={uuidv4()}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {appointment.doctor.name}
                                        </TableCell>
                                        <TableCell align="right">{appointment.name}</TableCell>
                                        <TableCell align="right">{appointment.date}</TableCell>
                                        <TableCell align="right">
                                            <button
                                                onClick={() => handleEditAppointment(appointment)}
                                                className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteAppointment(appointment.id)}
                                                className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                                            >
                                                Delete
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </ul>
            ) : (
                <p className='text-center text-red-500'>No appointments available.</p>
            )}
        </div>
    );
};

export default AppointmentList;
