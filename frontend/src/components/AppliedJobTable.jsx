import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector((store) => store.job);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedReason, setSelectedReason] = useState('');

    const handleCheckReason = (reason) => {
        setSelectedReason(reason);
        setShowPopup(true);
    };

    return (
        <div>
            <Table>
                <TableCaption>
                    {allAppliedJobs.length !== 0
                        ? 'A list of your applied jobs'
                        : 'You have not applied for any Jobs'}
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                        <TableHead className="text-right">Reason</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allAppliedJobs.map((appliedJob) => (
                        <TableRow key={appliedJob._id}>
                            <TableCell>{appliedJob?.createdAt?.split('T')[0]}</TableCell>
                            <TableCell>{appliedJob.job?.title}</TableCell>
                            <TableCell>{appliedJob.job?.company?.name}</TableCell>
                            <TableCell className="text-right">
                                <Badge
                                    className={`${
                                        appliedJob?.status === 'rejected'
                                            ? 'bg-red-400'
                                            : appliedJob.status === 'pending'
                                            ? 'bg-gray-400'
                                            : 'bg-green-400'
                                    }`}
                                >
                                    {appliedJob.status.toUpperCase()}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <span
                                    className="cursor-pointer bg-blue-500 hover:bg-blue-600 w-15 h-8 py-1 px-1 text-white font-semibold rounded-sm"
                                    onClick={() => handleCheckReason(appliedJob?.reason || 'No reason provided')}
                                >
                                    Check Reason
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Popup */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-md w-96">
                        <h3 className="text-lg font-semibold mb-4">Reason</h3>
                        <p className="mb-4 text-gray-700">{selectedReason}</p>
                        <button
                            onClick={() => setShowPopup(false)}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Back
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppliedJobTable;
