import { getTeamMembers } from '@/actions/teams';
import { getSettings } from '@/actions/settings';
import { PageTitle } from '@/components/page-title';
import { TeamsList } from './teams-list';
import { TeamsSettingsPanel } from './teams-settings-panel';

export default async function TeamsPage() {
  const teams = await getTeamMembers();
  const settings = await getSettings();

  return (
    <div>
      <PageTitle title="Team Members" />
      <TeamsSettingsPanel settings={settings} />
      <TeamsList initialTeams={teams} />
    </div>
  );
}


