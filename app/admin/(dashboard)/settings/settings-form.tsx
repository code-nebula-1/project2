'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateSettings, type Settings } from '@/actions/settings';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface SettingsFormProps {
  settings: Settings;
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    showJoinTeam: settings.showJoinTeam,
    joinTeamTitle: settings.joinTeamTitle || '',
    joinTeamContent: settings.joinTeamContent || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateSettings({
        showJoinTeam: formData.showJoinTeam,
        joinTeamTitle: formData.joinTeamTitle,
        joinTeamContent: formData.joinTeamContent,
      });

      toast({
        title: 'Success',
        description: 'Settings updated successfully',
      });

      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update settings',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      {/* Join Team Section Toggle */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Join Team Section</h3>
          <p className="text-sm text-gray-600 mb-4">
            Control the visibility of the &quot;Apply Now&quot; button and customize the content of the &quot;Join Our Team&quot; section on the home page.
          </p>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex-1">
            <Label htmlFor="show-join-team" className="text-base font-medium">
              Show Apply Now Button
            </Label>
            <p className="text-sm text-gray-600 mt-1">
              Display the &quot;Apply Now&quot; and &quot;Learn More&quot; buttons in the contact section
            </p>
          </div>
          <Switch
            id="show-join-team"
            checked={formData.showJoinTeam}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, showJoinTeam: checked })
            }
          />
        </div>

        {/* Title Input */}
        <div className="space-y-2">
          <Label htmlFor="join-team-title">Section Title</Label>
          <Input
            id="join-team-title"
            value={formData.joinTeamTitle}
            onChange={(e) =>
              setFormData({ ...formData, joinTeamTitle: e.target.value })
            }
            placeholder="e.g., Join Our Team"
            disabled={!formData.showJoinTeam}
          />
        </div>

        {/* Content Textarea */}
        <div className="space-y-2">
          <Label htmlFor="join-team-content">Section Content</Label>
          <Textarea
            id="join-team-content"
            value={formData.joinTeamContent}
            onChange={(e) =>
              setFormData({ ...formData, joinTeamContent: e.target.value })
            }
            placeholder="Enter the content for the join team section..."
            rows={6}
            disabled={!formData.showJoinTeam}
          />
          <p className="text-sm text-gray-500">
            This text will be displayed in the join team section on the home page.
          </p>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4 border-t border-gray-200">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}

