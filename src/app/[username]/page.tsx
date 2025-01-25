'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect, use } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface UserProfile {
  id: string;
  name: string | null;
  email: string;
  username: string;
  avatarUrl: string | null;
  tokens: number;
  createdAt: Date;
}

export default function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isUserNotFound, setIsUserNotFound] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Partial<UserProfile>>({});
  const { username: encodedUsername } = use(params);
  const username = decodeURIComponent(encodedUsername)
  const isOwnProfile = session?.user?.username === username.slice(1);

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/users/${username.slice(1)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedProfile),
      });
      console.log({ response })

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  useEffect(() => {
    // Fetch user profile data
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/users/${username.slice(1)}`);
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
          setEditedProfile(data);
        } else {
          setIsUserNotFound(true)
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setIsUserNotFound(true)
      }
    };

    if (username) {
      fetchProfile();
    }
  }, [username]);

  if (username[0] !== "@") return notFound();
  if (isUserNotFound) return notFound()

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg p-8">
        <div className="flex items-center gap-8 mb-8">
          {profile.avatarUrl ? <Image
            src={profile.avatarUrl}
            alt={profile.name || profile.username}
            className="w-20 h-20 object-cover rounded-full"
            height={100}
            width={100}
          /> : <div>
            image
          </div>}


          <div className="flex-1">
            {isEditing ? (
              <Input
                value={editedProfile.name || ''}
                onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                className="mb-2"
                placeholder="Name"
              />
            ) : (
              <h1 className="text-3xl font-bold mb-2">{profile.name || profile.username}</h1>
            )}

            <p className="text-gray-400">@{profile.username}</p>
            <p className="text-gray-400">Joined {new Date(profile.createdAt).toLocaleDateString()}</p>
            <p className="text-purple-400">Tokens: {profile.tokens}</p>
          </div>

          {isOwnProfile && (
            <div>
              {isEditing ? (
                <div className="space-x-2">
                  <Button onClick={handleSave}>Save</Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                </div>
              ) : (
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              )}
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                value={editedProfile.email || ''}
                onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                type="email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Avatar URL</label>
              <Input
                value={editedProfile.avatarUrl || ''}
                onChange={(e) => setEditedProfile({ ...editedProfile, avatarUrl: e.target.value })}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {isOwnProfile && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Email</h2>
                <p className="text-gray-400">{profile.email}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
