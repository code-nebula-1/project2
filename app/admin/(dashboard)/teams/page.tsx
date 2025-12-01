import { getTeamMembers } from '@/actions/teams';
import { PageTitle } from '@/components/page-title';
import { TeamsList } from './teams-list';

export default async function TeamsPage() {
  const teams = await getTeamMembers();

  return (
    <div>
      <PageTitle title="Team Members" />
      <TeamsList initialTeams={teams} />
    </div>
  );
}


