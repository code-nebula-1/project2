'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateSettings, type Settings } from '@/actions/settings';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Settings as SettingsIcon, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

interface TeamsSettingsPanelProps {
    settings: Settings;
}

export function TeamsSettingsPanel({ settings }: TeamsSettingsPanelProps) {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [showJoinTeam, setShowJoinTeam] = useState(settings.showJoinTeam);

    const handleToggle = async (checked: boolean) => {
        setIsLoading(true);
        setShowJoinTeam(checked);

        try {
            await updateSettings({ showJoinTeam: checked });

            toast({
                title: 'Success',
                description: `Join team section ${checked ? 'enabled' : 'disabled'}`,
            });

            router.refresh();
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to update settings',
                variant: 'destructive',
            });
            // Revert on error
            setShowJoinTeam(!checked);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mb-6 bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <SettingsIcon className="w-5 h-5 text-gray-600" />
                        <h3 className="text-lg font-semibold text-gray-900">
                            Join Team Section
                        </h3>
                        <span
                            className={`text-xs px-2 py-1 rounded-full ${showJoinTeam
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                        >
                            {showJoinTeam ? 'Visible' : 'Hidden'}
                        </span>
                    </div>
                    <p className="text-sm text-gray-600">
                        Control whether the &quot;Apply Now&quot; button appears in the contact section on the home page
                    </p>
                </div>

                <div className="flex items-center gap-4 ml-6">
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-700">
                            {showJoinTeam ? 'Showing' : 'Hidden'}
                        </span>
                        <Switch
                            checked={showJoinTeam}
                            onCheckedChange={handleToggle}
                            disabled={isLoading}
                        />
                    </div>

                    <Link href="/admin/settings">
                        <Button variant="outline" size="sm">
                            <SettingsIcon className="w-4 h-4 mr-2" />
                            Full Settings
                            <ExternalLink className="w-3 h-3 ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>

            {showJoinTeam && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="font-medium text-gray-700 mb-1">Section Title:</p>
                            <p className="text-gray-600">
                                {settings.joinTeamTitle || 'Join Our Team'}
                            </p>
                        </div>
                        <div>
                            <p className="font-medium text-gray-700 mb-1">Content Preview:</p>
                            <p className="text-gray-600 line-clamp-2">
                                {settings.joinTeamContent || 'No content set'}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

