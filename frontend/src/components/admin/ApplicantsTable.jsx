import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector((store) => store.application);
    const [popupStatus, setPopupStatus] = useState(null);
    const [reason, setReason] = useState('');
    const [selectedApplicant, setSelectedApplicant] = useState(null);

    const statusHandler = async (status, id, reason) => {
        console.log(status, id, reason);
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status, reason });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
        // Reset popup state
        setPopupStatus(null);
        setReason('');
    };

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants &&
                        applicants?.applications?.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell>{item?.applicant?.fullname}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell>
                                    {item.applicant?.profile?.resume ? (
                                        <a
                                            className="text-blue-600 cursor-pointer"
                                            href={item?.applicant?.profile?.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {item?.applicant?.profile?.resumeOriginalName}
                                        </a>
                                    ) : (
                                        <span>NA</span>
                                    )}
                                </TableCell>
                                <TableCell>{item?.applicant.createdAt.split('T')[0]}</TableCell>
                                <TableCell className={`${item?.status === 'rejected' ? 'text-red-500' : ''}`}>{item?.status}</TableCell>
                                <TableCell className="float-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            {shortlistingStatus.map((status, index) => {
                                                return (
                                                    <div
                                                        onClick={() => {
                                                            if (status === 'Accepted') {
                                                                setSelectedApplicant(item); // Set selectedApplicant for 'Accepted' status
                                                                statusHandler(status, item?._id, ""); // Handle status update directly
                                                            } else {
                                                                setSelectedApplicant(item); // Set selectedApplicant for 'Rejected' status
                                                                setPopupStatus(status); // Show popup for 'Rejected' status
                                                            }
                                                        }}
                                                        key={index}
                                                        className="flex w-fit items-center my-2 cursor-pointer"
                                                    >
                                                        <span>{status}</span>
                                                    </div>
                                                );
                                            })}
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>

            {/* Popup for adding a reason */}
            {popupStatus && selectedApplicant && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-md w-96">
                        <h3 className="text-lg font-semibold mb-4">
                            {popupStatus} - {selectedApplicant?.applicant?.fullname}
                        </h3>
                        <textarea
                            placeholder="Enter your message"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full border rounded p-2 mb-4"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setPopupStatus(null)}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => statusHandler(popupStatus, selectedApplicant?._id, reason)} // Pass selectedApplicant here
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApplicantsTable;



