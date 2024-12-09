import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Contact, Mail, Pen } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import Footer from './Footer';
import { useSelector } from 'react-redux';
import UpdateProfileDialog from './UpdateProfileDialog';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);

  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex flex-col items-center md:items-start gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
            </Avatar>
            <div className="text-center md:text-left">
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p className="text-sm text-gray-500">{user?.profile.bio}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="text-right mt-4 md:mt-0" variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>+91 {user?.phoneNumber}</span>
          </div>
        </div>
        <div className="my-5">
          <h1 className="text-lg font-semibold">Skills</h1>
          <div className="flex flex-wrap gap-1 my-2 justify-center md:justify-start">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge className="py-2 px-2 rounded-md" key={index}>
                  {item}
                </Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a target="_blank" href={user?.profile?.resume} className="text-blue-700 w-full hover:underline cursor-pointer">
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl my-5 p-8">
        <h1 className="my-5 font-bold text-lg px-3 py-2">Applied Jobs</h1>
        {/* Application Table */}
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
      <Footer />
    </div>
  );
};

export default Profile;
