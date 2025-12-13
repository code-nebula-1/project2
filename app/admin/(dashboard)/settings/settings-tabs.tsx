'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SettingsForm } from './settings-form';
import { LocationSettingsForm } from './location-settings-form';
import { Users, MapPin } from 'lucide-react';
import type { SettingResult, JoinTeamData, MapLocationData } from '@/actions/settings';

interface SettingsTabsProps {
  joinTeamSettings: SettingResult<JoinTeamData>;
  locationSettings: SettingResult<MapLocationData>;
}

export function SettingsTabs({ joinTeamSettings, locationSettings }: SettingsTabsProps) {
  return (
    <Tabs defaultValue="join-team" className="w-full">
      <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0 h-auto">
        <TabsTrigger 
          value="join-team" 
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3"
        >
          <Users className="w-4 h-4 mr-2" />
          Join Our Team
        </TabsTrigger>
        <TabsTrigger 
          value="location" 
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3"
        >
          <MapPin className="w-4 h-4 mr-2" />
          Location
        </TabsTrigger>
      </TabsList>

      <TabsContent value="join-team" className="mt-0">
        <SettingsForm settings={joinTeamSettings} />
      </TabsContent>

      <TabsContent value="location" className="mt-0">
        <LocationSettingsForm settings={locationSettings} />
      </TabsContent>
    </Tabs>
  );
}


