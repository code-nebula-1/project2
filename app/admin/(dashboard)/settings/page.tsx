import { getJoinTeamSettings, getMapLocationSettings } from '@/actions/settings';
import { PageTitle } from '@/components/page-title';
import { SettingsTabs } from './settings-tabs';

export default async function SettingsPage() {
  const [joinTeamSettings, locationSettings] = await Promise.all([
    getJoinTeamSettings(),
    getMapLocationSettings(),
  ]);

  return (
    <div>
      <PageTitle title="Settings" />

      <div className="max-w-4xl">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Website Settings</h2>
            <p className="text-sm text-gray-600 mt-1">
              Manage various settings for your website
            </p>
          </div>

          <SettingsTabs 
            joinTeamSettings={joinTeamSettings} 
            locationSettings={locationSettings} 
          />
        </div>
      </div>
    </div>
  );
}
