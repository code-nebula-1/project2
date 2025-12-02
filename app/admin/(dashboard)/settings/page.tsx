import { getSettings } from '@/actions/settings';
import { PageTitle } from '@/components/page-title';
import { SettingsForm } from './settings-form';

export default async function SettingsPage() {
  const settings = await getSettings();

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

          <SettingsForm settings={settings} />
        </div>
      </div>
    </div>
  );
}

