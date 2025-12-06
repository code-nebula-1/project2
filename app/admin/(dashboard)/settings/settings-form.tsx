'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateJoinTeamSettings, type SettingResult, type JoinTeamData } from '@/actions/settings';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface SettingsFormProps {
  settings: SettingResult<JoinTeamData>;
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    status: settings.status,
    title: settings.data.title || '',
    content: settings.data.content || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateJoinTeamSettings(
        {
          title: formData.title,
          content: formData.content,
        },
        formData.status
      );

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
            Control the visibility and content of the &quot;Join Our Team&quot; section on the Teams page.
          </p>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex-1">
            <Label htmlFor="show-join-team" className="text-base font-medium">
              Show Join Team Section
            </Label>
            <p className="text-sm text-gray-600 mt-1">
              Display the join team section on the public teams page
            </p>
          </div>
          <Switch
            id="show-join-team"
            checked={formData.status}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, status: checked })
            }
          />
        </div>

        {/* Title Input */}
        <div className="space-y-2">
          <Label htmlFor="join-team-title">Section Title</Label>
          <Input
            id="join-team-title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="e.g., Join Our Team"
            disabled={!formData.status}
          />
        </div>

        {/* Content Textarea */}
        <div className="space-y-2">
          <Label htmlFor="join-team-content">Section Content</Label>
          <Textarea
            id="join-team-content"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            placeholder="Enter the content for the join team section..."
            rows={6}
            disabled={!formData.status}
          />
          <p className="text-sm text-gray-500">
            This text will be displayed in the join team section on the Teams page.
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
